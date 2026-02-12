const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");
const simpleGit = require("simple-git");

let cancelCommitRun = false;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        minWidth: 900,
        minHeight: 600,
        backgroundColor: "#0d1117",
        icon: path.join(__dirname, "..", "images", "logo.png"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    const rendererPath = path.join(__dirname, "renderer", "renderer.js");
    const rendererSource = fs.readFileSync(rendererPath, "utf8");
    const safeRendererSource = rendererSource.replace(/<\/script>/g, "<\\/script>");
    const html = `<!doctype html>
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Git Time Machine</title>
            </head>
            <body>
                <script>${safeRendererSource}</script>
            </body>
        </html>`;

    win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

const githubRequest = async (token, url) => {
    const headers = {
        "User-Agent": "git-time-machine-gui",
        "Accept": "application/vnd.github+json"
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, { headers });
    if (!response.ok) {
        const message = await response.text();
        throw new Error(`GitHub API error ${response.status}: ${message}`);
    }

    return response.json();
};

ipcMain.handle("pick-folder", async () => {
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
        title: "Select repo root folder"
    });

    if (result.canceled || result.filePaths.length === 0) {
        return null;
    }

    return result.filePaths[0];
});

ipcMain.handle("list-repos", async (_event, { token }) => {
    if (!token) {
        throw new Error("GitHub token is required.");
    }

    const repos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const url = `https://api.github.com/user/repos?per_page=100&page=${page}&sort=updated`;
        const data = await githubRequest(token, url);

        repos.push(...data.map((repo) => ({
            name: repo.name,
            fullName: repo.full_name,
            private: repo.private,
            defaultBranch: repo.default_branch,
            htmlUrl: repo.html_url
        })));

        if (data.length < 100) {
            hasMore = false;
        } else {
            page += 1;
        }
    }

    return repos;
});

ipcMain.handle("resolve-repo-path", async (_event, { root, repoName }) => {
    if (!root || !repoName) {
        return null;
    }

    const candidate = path.join(root, repoName);
    if (fs.existsSync(candidate) && fs.existsSync(path.join(candidate, ".git"))) {
        return candidate;
    }

    return null;
});

ipcMain.handle("load-github-contribs", async (_event, { token, year }) => {
    if (!token) {
        throw new Error("GitHub token is required.");
    }

    const startDate = `${year}-01-01T00:00:00.000Z`;
    const endDate = `${year}-12-31T23:59:59.999Z`;

    const query = `
        query {
            viewer {
                contributionsCollection(from: "${startDate}", to: "${endDate}") {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                            }
                        }
                    }
                }
            }
        }
    `;

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "git-time-machine-gui"
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`GitHub API error ${response.status}: ${message}`);
    }

    const data = await response.json();
    
    if (data.errors) {
        throw new Error(data.errors[0].message);
    }

    const counts = {};
    const weeks = data.data.viewer.contributionsCollection.contributionCalendar.weeks;
    
    weeks.forEach(week => {
        week.contributionDays.forEach(day => {
            counts[day.date] = day.contributionCount;
        });
    });

    return counts;
});

ipcMain.handle("load-github-years", async (_event, { token }) => {
    if (!token) {
        throw new Error("GitHub token is required.");
    }

    const query = `
        query {
            viewer {
                contributionsCollection {
                    contributionYears
                }
            }
        }
    `;

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "User-Agent": "git-time-machine-gui"
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`GitHub API error ${response.status}: ${message}`);
    }

    const data = await response.json();
    if (data.errors) {
        throw new Error(data.errors[0].message);
    }

    return data.data.viewer.contributionsCollection.contributionYears || [];
});


ipcMain.handle("cancel-commits", async () => {
    cancelCommitRun = true;
    return { ok: true };
});
ipcMain.handle("load-contribs", async (_event, { repoPath, year }) => {
    if (!repoPath) {
        throw new Error("Repo path is required.");
    }

    const git = simpleGit({ baseDir: repoPath });
    const since = `${year}-01-01T00:00:00`;
    const until = `${year}-12-31T23:59:59`;

    const raw = await git.raw([
        "log",
        `--since=${since}`,
        `--until=${until}`,
        "--pretty=format:%cI"
    ]);

    const counts = {};
    raw.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
            return;
        }
        const dateKey = trimmed.slice(0, 10);
        counts[dateKey] = (counts[dateKey] || 0) + 1;
    });

    return counts;
});

ipcMain.handle("run-commits", async (event, { repoPath, plan, pushAfter }) => {
    if (!repoPath) {
        throw new Error("Repo path is required.");
    }

    const git = simpleGit({ baseDir: repoPath });
    const targetFile = path.join(repoPath, ".git-time-machine.json");

    let total = 0;
    cancelCommitRun = false;
    for (const entry of plan) {
        if (!entry || !entry.date || !entry.count) {
            continue;
        }

        for (let i = 0; i < entry.count; i += 1) {
            if (cancelCommitRun) {
                return { total, cancelled: true };
            }
            const baseDate = new Date(`${entry.date}T12:00:00`);
            const commitDate = new Date(baseDate.getTime() + i * 60000);
            const isoDate = commitDate.toISOString();

            const payload = JSON.stringify({ date: isoDate, index: i }, null, 2);
            await fsp.writeFile(targetFile, payload, "utf8");

            await git.add([targetFile]);
            await git.commit(`chore: time-machine ${entry.date} #${i + 1}`, {
                "--date": isoDate
            });

            total += 1;
            event.sender.send("commit-progress", {
                date: entry.date,
                index: i + 1,
                total
            });
        }
    }

    if (cancelCommitRun) {
        return { total, cancelled: true };
    }
    if (pushAfter) {
        await git.push();
    }

    return { total };
});
