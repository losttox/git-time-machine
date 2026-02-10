const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("gitTimeMachine", {
    pickFolder: () => ipcRenderer.invoke("pick-folder"),
    listRepos: (token) => ipcRenderer.invoke("list-repos", { token }),
    resolveRepoPath: (root, repoName) => ipcRenderer.invoke("resolve-repo-path", { root, repoName }),
    getCurrentRepo: () => ipcRenderer.invoke("get-current-repo"),
    loadGithubYears: (token) => ipcRenderer.invoke("load-github-years", { token }),
    loadGithubContribs: (token, year) => ipcRenderer.invoke("load-github-contribs", { token, year }),
    loadContribs: (repoPath, year) => ipcRenderer.invoke("load-contribs", { repoPath, year }),
    runCommits: (repoPath, plan, pushAfter) => ipcRenderer.invoke("run-commits", { repoPath, plan, pushAfter }),
    onCommitProgress: (handler) => {
        ipcRenderer.removeAllListeners("commit-progress");
        ipcRenderer.on("commit-progress", (_event, payload) => handler(payload));
    }
});
