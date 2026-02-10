# git-time-machine
Great Scott! This repo lets you send Git commits back in time 🕒🚗

## GUI
The Electron GUI is built entirely in JavaScript (no HTML/CSS files). It helps you browse GitHub repos, preview existing contribution grids, and design commit patterns.

### Run
1. Install dependencies: `npm install`
2. Start the app: `npm run gui`

### Notes
- The GUI uses a GitHub token to list repos. It is only held in memory.
- Pick a local root folder so the app can resolve the repo path automatically.
- Use "Load Existing" to visualize current commits before adding a pattern.
