# Git Time Machine ⏰

Design and manipulate your GitHub contribution history with precision. Create realistic contribution patterns, visualize your GitHub profile, and backdate commits to any time period.

## Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Git** installed and configured
- **A GitHub Personal Access Token** (Classic) with `repo` and `user` scopes - [Create here](https://github.com/settings/tokens)

## Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/losttox/git-time-machine.git
   cd git-time-machine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Electron GUI:
   ```bash
   npm run gui
   ```

## Getting Your GitHub Token

To use this tool, you'll need a GitHub Personal Access Token:

1. Go to [GitHub Settings → Personal access tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `repo` and `user`
4. Generate the token
5. **Copy it immediately** - GitHub won't show it again
6. Paste it into the "Token" field in the app

## How to Use

### Step 1: Load Your Repositories
1. Enter your GitHub token in the "Token" field
2. Click "Load Repos"
3. Select your target repository from the list
4. Click "Browse Repo" to select the local folder containing your repo

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
- **"Not a git repository"**: Make sure you browse to the correct local repo folder
- **Commits not pushing**: Check that "Push after run" is enabled and token has `repo` scope

### Pattern Issues
- **Text not rendering**: Use only A-Z, 0-9, and spaces
- **Commits not appearing**: Wait a moment for GitHub to update, then reload

## Safety Tips

1. **Test on a branch first**: Create a test branch before applying patterns
2. **Start small**: Try a light pattern (Casual) before Intense
3. **Verify before pushing**: Always preview the plan first
4. **Respect limits**: Don't create thousands of commits at once
5. **Keep backups**: Have a git remote backup of your repo

## Author

Created by [losttox](https://github.com/losttox)

## License

Use responsibly! This tool is for creative and legitimate purposes only.
