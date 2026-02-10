import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";
const git = simpleGit();

// Fill 2025 with natural-looking contributions
// 50% empty, 30% light (2 commits), 15% medium (5 commits), 5% really green (10 commits)
// Total: ~700 commits
const fillYear2025 = async () => {
    const startOfYear = moment("2025-01-01").startOf("day");
    const endOfYear = moment("2025-12-31").endOf("day");
    const daysDiff = endOfYear.diff(startOfYear, "days");

    const commitPatterns = [];

    // Distribute 365 days into intensity levels
    for (let i = 0; i <= daysDiff; i++) {
        const rand = Math.random();
        
        if (rand < 0.50) {
            // 50% empty days
            commitPatterns.push({ day: i, commits: 0 });
        } else if (rand < 0.80) {
            // 30% light green (2 commits)
            commitPatterns.push({ day: i, commits: 2 });
        } else if (rand < 0.95) {
            // 15% medium green (5 commits)
            commitPatterns.push({ day: i, commits: 5 });
        } else {
            // 5% really green (10 commits)
            commitPatterns.push({ day: i, commits: 10 });
        }
    }

    let totalCommits = 0;
    for (const pattern of commitPatterns) {
        const commitDate = startOfYear.clone().add(pattern.day, "days");
        
        for (let c = 0; c < pattern.commits; c++) {
            const date = commitDate.clone().add(c * 3600, "seconds").format();
            const data = { date: date };

            await new Promise((resolve) => {
                jsonfile.writeFile(path, data, (err) => {
                    if (err) {
                        console.error(`Failed to write on ${date}:`, err);
                        resolve();
                        return;
                    }

                    git.add([path])
                        .commit(date, { "--date": date })
                        .then(() => {
                            totalCommits++;
                            console.log(`[${totalCommits}] Committed to ${date}`);
                            resolve();
                        })
                        .catch((gitErr) => {
                            console.error(`Git failed on ${date}:`, gitErr);
                            resolve();
                        });
                });
            });
        }
    }

    console.log(`\n✓ Done! Created ${totalCommits} commits across 2025.`);
    
    // Push all at once at the end
    try {
        await git.push();
        console.log("✓ Pushed to remote!");
    } catch (err) {
        console.error("Push failed:", err);
    }
};

// Run it
fillYear2025();