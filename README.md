# Git Time Machine ⏰

Design and manipulate your GitHub contribution history with precision. Create realistic contribution patterns, visualize your GitHub profile, and backdate commits to any time period.

## Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Git** installed and configured
- **A terminal/command prompt** (PowerShell, CMD, Terminal, etc.) - **No VS Code required!**
- **A GitHub Personal Access Token** (Classic) with `repo` and `user` scopes - [Create here](https://github.com/settings/tokens)

**Note**: This is a standalone desktop application. You don't need VS Code or any IDE - just run the commands in any terminal.

## Installation

1. **Download** the repository:
   - Option A: Clone with git: `git clone https://github.com/losttox/git-time-machine.git`
   - Option B: Download ZIP from GitHub and extract it

2. **Launch the app**:
   
   ### Easy Way (Recommended):
   Just **double-click** the startup script:
   - **Windows**: Double-click `start.bat`
   - **Mac/Linux**: Double-click `start.sh` (or run `./start.sh` in terminal)
   
   The script automatically:
   - ✅ Checks if Node.js is installed
   - ✅ Installs dependencies (first time only)
   - ✅ Launches the app
   
   ### Manual Way:
   Open a terminal in the project folder and run:
   ```bash
   npm install    # First time only
   npm run gui    # Start the app
   ```
   
   **Note for Mac/Linux users**: If the script won't run, make it executable first:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

## Getting Your GitHub Token

To use this tool, you'll need a GitHub Personal Access Token:

1. Go to [GitHub Settings → Personal access tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `repo` and `user`
4. Generate the token
5. **Copy it immediately** - GitHub won't show it again
6. Paste it into the "Token" field in the app

## Before You Start

**Important**: You need to have your target repository **already cloned locally** on your computer before using this tool.

**Create REPO** - make sure you create a repo to any name and put it as private + enable README, make sure you also enable private contribution graph in your profile so it can be seen after commits.
For example, if you want to add commits to your `awesome-project` repository:

1. **Clone it first** (if you haven't already):
   ```bash
   git clone https://github.com/yourusername/awesome-project.git
   ```
   Or download it and navigate to it in terminal, then run `git init` if needed.

2. **Remember the folder location** - you'll need to point the app to this folder using the "Browse Repo" button

The app works by modifying the git history in your **local repository folder**. It doesn't connect to GitHub directly to write commits - it creates commits locally, and then you can push them to GitHub.

## How to Use

### Step 1: Load Your Repositories
1. Enter your GitHub token in the "Token" field
2. Click "Load Repos" - this lists your GitHub repos so you can view contribution data
3. Select your target repository from the list
4. Click "Browse Repo" and **navigate to the local folder** where you cloned that repository
   - Example: `C:\Users\YourName\Documents\awesome-project`
   - The folder should contain a `.git` folder

### Step 2: Load Current Contributions (Optional)
1. Select the year you want to work with
2. Click "Load from GitHub"
3. Your existing contribution data will be visualized (green squares show current activity)

### Step 3: Choose or Design a Pattern

#### Smart Patterns (Realistic Activity)
- **Casual**: 0-3 commits per day, sparse weekends
- **Busy**: 4-6 commits on weekdays, 0-4 on weekends
- **Organic**: Natural momentum-based streaks
- **Mild**: Very sparse, 0-3 commits total
- **Intense**: High activity with variation
- **Sporadic**: Random bursts throughout the year

#### Fun Patterns (Visual Designs)
- **Diagonal**: Diagonal stripe pattern
- **Wave**: Wave-like visualization
- **Smile**: Smiley face design
- **Blocks**: Three distinct blocks
- **Checkerboard**: Checkerboard pattern
- **Gradient**: Intensity gradient
- **Stripes**: Vertical stripes

#### Text-to-Graph
Type any word or text to render it as **pixel art** on your contribution graph:
- Supports A-Z letters and 0-9 numbers
- Real-time rendering as you type
- Perfect for adding messages to your contribution history

### Step 4: Customize Your Plan

1. **Manually adjust dates** (optional):
   - Click any square on the calendar to select a date
   - Enter desired number of commits in "Desired commits"
   - The square will change color to reflect the new value

2. **Review your plan**:
   - "Plan Summary" shows total commits planned
   - Ensure the plan meets your needs

3. **Additional options**:
   - Check "Push after run" to automatically push commits after creation
   - Use "Preview Plan" to see what will happen

### Step 5: Run the Commits

1. Click "Run Commits" to start the process
2. The app will:
   - Create commits with backdated timestamps
   - Add them to your git history
   - Optionally push them to GitHub
3. Watch the progress in the log output

## Important Notes ⚠️

- **Local Repository Required**: You must have the target repository cloned on your computer. The app modifies local git history, not GitHub directly
- **⚠️ Permanent Changes**: Once commits are pushed to GitHub, you can't easily undo them. To completely remove them from your contribution graph, you'll need to delete and recreate the repository
- **Backups First**: Always back up your repository before using this tool
- **History Rewriting**: This tool rewrites git history. Use on a branch or clone if unsure
- **GitHub API Limits**: Respect GitHub's rate limits when loading contribution data
- **Token Security**: Tokens are only held in memory and never saved to disk
- **Git Configuration**: Ensure git is properly configured with your name and email:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@github.com"
  ```

## Features

✅ Browse and preview your GitHub repositories  
✅ Visualize existing contributions from GitHub  
✅ 13+ pre-built contribution patterns (realistic + fun)  
✅ Real-time pixel art text rendering  
✅ Manually customize individual days  
✅ Preview commit plans before running  
✅ Automatic git push integration  
✅ Real-time progress logging  
✅ Clean, dark-themed interface  

## Architecture

- **Frontend**: Built with JavaScript (no separate HTML files)
- **Backend**: Electron + Node.js
- **Git Operations**: `simple-git` library
- **GitHub API**: GraphQL queries for contribution data
- **Styling**: CSS-in-JS with design system theme variables

## Troubleshooting

### Token Issues
- **"Invalid token"**: Check that your token hasn't expired and has the right scopes
- **Repos not loading**: Ensure token has `repo` scope

### Git Issues
- **"Not a git repository"**: Make sure you browse to the correct local repo folder (should contain a `.git` folder)
- **"Repository not found"**: Clone the repository first using `git clone` before using the app
- **Can't find my repo**: The app modifies LOCAL repositories on your computer, not remote GitHub repos directly
- **Commits not pushing**: Check that "Push after run" is enabled and token has `repo` scope

### Pattern Issues
- **Text not rendering**: Use only A-Z, 0-9, and spaces
- **Commits not appearing**: Wait a moment for GitHub to update, then reload

## How to Undo / Remove Commits ⚠️

**Important**: Once you've created commits with this tool and pushed them to GitHub, removing them requires deleting and recreating the repository.

### If You Haven't Pushed Yet (Local Only)
- Use `git reset --hard HEAD~<number>` to remove the last commits
- Or delete the local repo folder and clone fresh from GitHub

### If You've Already Pushed to GitHub
**There's no easy undo button.** To completely remove the commits from your GitHub contribution graph:

1. **Delete the repository** on GitHub (Settings → Danger Zone → Delete repository)
2. **Create a new repository** with the same name
3. **Push your original code** (without the fake commits)

**Why?** Because the commits are now part of your GitHub contribution history. Even if you delete commits locally and force push, GitHub's contribution graph caches this data.

**Prevention is key**: 
- Always test on a test repository first
- Use small patterns before committing to large ones
- Keep backups before running

## Safety Tips

1. **Test on a branch first**: Create a test branch before applying patterns
2. **Start small**: Try a light pattern (Casual) before Intense
3. **Verify before pushing**: Always preview the plan first
4. **Respect limits**: Don't create thousands of commits at once
5. **Keep backups**: Have a git remote backup of your repo
6. **Create a test repo**: Practice on a throwaway repository before using on your main repos

## Author

Created by [losttox](https://github.com/losttox)

## License

Use responsibly! This tool is for creative and legitimate purposes only.
