const api = window.gitTimeMachine;

const styles = `
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

:root {
    --bg-1: #0d1117;
    --bg-2: #161b22;
    --card: #1c2128;
    --card-2: #22272e;
    --accent: #58a6ff;
    --accent-dark: #1f6feb;
    --accent-2: #56d364;
    --text: #f0f6fc;
    --text-secondary: #c9d1d9;
    --muted: #8b949e;
    --border: rgba(240, 246, 252, 0.1);
    --lvl-0: #161b22;
    --lvl-1: #0e4429;
    --lvl-2: #006d32;
    --lvl-3: #26a641;
    --lvl-4: #39d353;
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-1);
    color: var(--text);
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
}

.app {
    display: grid;
    grid-template-columns: 280px 1fr;
    height: 100vh;
    position: relative;
    overflow: hidden;
}



.sidebar {
    padding: 16px 12px;
    background: var(--bg-2);
    border-right: 1px solid var(--border);
    position: relative;
    z-index: 1;
    overflow-y: auto;
    overflow-x: hidden;
}

.sidebar::-webkit-scrollbar {
    width: 4px;
}

.sidebar::-webkit-scrollbar-track {
    background: transparent;
}

.sidebar::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
}

.sidebar > * + * {
    margin-top: 10px;
}

.main {
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    z-index: 1;
    overflow-y: auto;
    overflow-x: hidden;
}

.main::-webkit-scrollbar {
    width: 4px;
}

.main::-webkit-scrollbar-track {
    background: transparent;
}

.main::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
}

.brand {
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
}

.brand h1 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.02em;
}

.brand p {
    margin: 4px 0 0;
    color: var(--muted);
    font-size: 10px;
    line-height: 1.4;
    font-weight: 400;
}

.panel {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.panel h2 {
    margin: 0 0 6px;
    font-size: 11px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.01em;
}

.panel p {
    margin: 2px 0 0;
    color: var(--muted);
    font-size: 10px;
    line-height: 1.4;
}

.hero {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: flex-start;
}

.path-picker {
    flex: 1;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 9px;
    color: var(--muted);
    margin-bottom: 6px;
}

.field span {
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.field input,
.field select {
    padding: 5px 8px;
    background: var(--bg-1);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text);
    font-size: 10px;
    outline: none;
    transition: border-color 0.15s ease;
}

.field input:focus,
.field select:focus {
    border-color: var(--accent);
    background: var(--bg-2);
}

.field.inline {
    flex-direction: row;
    align-items: center;
    gap: 6px;
}

.field.inline span {
    width: 80px;
    font-size: 9px;
}

.row {
    display: flex;
    gap: 4px;
}

.search {
    width: 100%;
    padding: 5px 8px;
    background: var(--bg-1);
    border: 1px solid var(--border);
    border-radius: 6px;
    color: var(--text);
    margin-bottom: 6px;
    font-size: 10px;
    outline: none;
    transition: border-color 0.15s ease;
}

.search:focus {
    border-color: var(--accent);
    background: var(--bg-2);
}

.btn {
    border: none;
    border-radius: 6px;
    padding: 6px 10px;
    font-weight: 500;
    font-size: 10px;
    cursor: pointer;
    transition: all 0.15s ease;
}

.btn.primary {
    background: var(--accent);
    color: #ffffff;
    border: 1px solid transparent;
}

.btn.primary:hover {
    background: var(--accent-dark);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(88, 166, 255, 0.3);
}

.btn.ghost {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-secondary);
}

.btn.ghost:hover {
    background: var(--card);
    border-color: var(--muted);
    color: var(--text);
}

.btn.chip {
    background: var(--card);
    color: var(--text-secondary);
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid var(--border);
    font-size: 9px;
    font-weight: 500;
}

.btn.chip:hover {
    background: var(--card-2);
    border-color: var(--accent);
    color: var(--text);
}

.repo-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 220px;
    overflow-y: auto;
    padding-right: 2px;
}

.repo-list::-webkit-scrollbar {
    width: 3px;
}

.repo-list::-webkit-scrollbar-track {
    background: transparent;
}

.repo-list::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
}

.repo-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--text);
    cursor: pointer;
    text-align: left;
    transition: all 0.12s ease;
}

.repo-card:hover {
    background: var(--card-2);
    border-color: var(--accent);
    transform: translateX(2px);
}

.repo-card.selected {
    background: rgba(88, 166, 255, 0.18);
    border-color: var(--accent);
    box-shadow: 0 0 0 1px rgba(88, 166, 255, 0.45);
}

.repo-card strong {
    display: block;
    font-size: 10px;
}

.repo-card span {
    font-size: 8px;
    color: var(--muted);
}

.badge {
    background: rgba(88, 166, 255, 0.15);
    color: var(--accent);
    padding: 2px 6px;
    border-radius: 999px;
    font-size: 8px;
    flex-shrink: 0;
    font-weight: 500;
    border: 1px solid rgba(88, 166, 255, 0.2);
}

.empty {
    font-size: 9px;
    color: var(--muted);
    text-align: center;
    padding: 10px;
}

.grid-panel {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.grid-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
}

.grid-actions {
    display: flex;
    gap: 4px;
    align-items: center;
}

.pattern-bar {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
    font-size: 9px;
    color: var(--muted);
}

.grid-wrap {
    overflow-x: auto;
    padding-bottom: 4px;
}

.grid-wrap::-webkit-scrollbar {
    height: 3px;
}

.grid-wrap::-webkit-scrollbar-track {
    background: transparent;
}

.grid-wrap::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
}

.calendar {
    display: grid;
    grid-template-rows: 14px repeat(7, 10px);
    grid-template-columns: 30px repeat(53, 10px);
    gap: 2px;
    padding: 4px;
}

.day-label {
    font-size: 8px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 4px;
    text-align: right;
}

.month-label {
    font-size: 8px;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 2px;
}

.cell {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: var(--lvl-0);
    cursor: pointer;
    transition: all 0.1s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.cell.lvl-0 { background: var(--lvl-0); }
.cell.lvl-1 { background: var(--lvl-1); }
.cell.lvl-2 { background: var(--lvl-2); }
.cell.lvl-3 { background: var(--lvl-3); }
.cell.lvl-4 { background: var(--lvl-4); }

.cell.selected {
    outline: 2px solid var(--accent);
    outline-offset: 1px;
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.2);
}

.cell:hover {
    transform: scale(1.15);
    border-color: var(--muted);
}

.legend {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 9px;
    color: var(--muted);
}

.legend-squares {
    display: flex;
    gap: 3px;
}

.controls {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.control-block h2 {
    margin-bottom: 4px;
}

.progress {
    margin-top: 4px;
    font-size: 9px;
    color: var(--accent-2);
}

.log-output {
    margin-top: 6px;
    padding: 6px;
    min-height: 70px;
    max-height: 140px;
    overflow-y: auto;
    background: var(--card-2);
    border: 1px solid var(--border);
    border-radius: 6px;
    font-size: 9px;
    color: var(--text-secondary);
    white-space: pre-wrap;
}
`;

const levelToCount = [0, 1, 2, 3, 5];

const countToLevel = (count) => {
    if (count <= 0) return 0;
    if (count <= 1) return 1;
    if (count <= 2) return 2;
    if (count <= 4) return 3;
    return 4;
};

const state = {
    repos: [],
    selectedRepo: null,
    rootPath: "",
    repoPath: "",
    year: new Date().getFullYear(),
    availableYears: [],
    githubCountsByYear: {},
    githubLoaded: false,
    days: [],
    existingCounts: {},
    desiredCounts: {},
    selectedDate: null,
    isRunning: false
};

const injectStyles = () => {
    const style = document.createElement("style");
    style.textContent = styles;
    document.head.appendChild(style);
};

const el = (tag, options = {}) => {
    const node = document.createElement(tag);
    if (options.id) node.id = options.id;
    if (options.className) node.className = options.className;
    if (options.text) node.textContent = options.text;
    if (options.type) node.type = options.type;
    if (options.placeholder) node.placeholder = options.placeholder;
    if (options.html) node.innerHTML = options.html;
    if (options.attrs) {
        Object.entries(options.attrs).forEach(([key, value]) => {
            node.setAttribute(key, value);
        });
    }
    return node;
};

const buildUI = () => {
    document.title = "Git Time Machine";
    document.body.innerHTML = "";
    injectStyles();

    const app = el("div", { className: "app" });

    const sidebar = el("aside", { className: "sidebar" });
    const brand = el("div", { className: "brand" });
    brand.append(
        el("h1", { text: "Git Time Machine" }),
        el("p", { text: "Design contribution patterns and commit with precision." })
    );

    const accessPanel = el("section", { className: "panel" });
    accessPanel.append(el("h2", { text: "GitHub Access" }));
    const tokenLabel = el("label", { className: "field" });
    tokenLabel.append(el("span", { text: "Token" }));
    tokenLabel.append(el("input", { id: "tokenInput", type: "password", placeholder: "ghp_..." }));
    accessPanel.append(tokenLabel);
    accessPanel.append(el("button", { id: "loadRepos", className: "btn primary", text: "Load Repos" }));

    const repoPanel = el("section", { className: "panel" });
    repoPanel.append(el("h2", { text: "Repos" }));
    repoPanel.append(el("input", { id: "repoSearch", className: "search", type: "text", placeholder: "Search repositories" }));
    repoPanel.append(el("div", { id: "repoList", className: "repo-list" }));

    sidebar.append(brand, accessPanel, repoPanel);

    const main = el("main", { className: "main" });

    const hero = el("section", { className: "panel hero" });
    const heroLeft = el("div");
    heroLeft.append(el("h2", { text: "Commit Target" }));
    heroLeft.append(el("p", { id: "repoMeta", text: "Where new commits will be written." }));

    const pathPicker = el("div", { className: "path-picker" });
    const pathLabel = el("label", { className: "field" });
    pathLabel.append(el("span", { text: "Commit target (git repo)" }));
    const pathRow = el("div", { className: "row" });
    pathRow.append(el("input", { id: "repoPath", type: "text", placeholder: "Click Browse Repo to select" }));
    pathRow.append(el("button", { id: "browseRepo", className: "btn ghost", text: "Browse Repo" }));
    pathLabel.append(pathRow);
    pathPicker.append(pathLabel);

    hero.append(heroLeft, pathPicker);

    const gridPanel = el("section", { className: "panel grid-panel" });
    const gridHeader = el("div", { className: "grid-header" });
    const headerText = el("div");
    headerText.append(el("h2", { text: "Contribution Canvas" }));
    headerText.append(el("p", { text: "Load your GitHub profile, then click squares to plan more commits." }));
    const headerActions = el("div", { className: "grid-actions" });
    const yearLabel = el("label", { className: "field inline" });
    yearLabel.append(el("span", { text: "Year" }));
    yearLabel.append(el("select", { id: "yearSelect" }));
    headerActions.append(yearLabel);
    headerActions.append(el("button", { id: "loadExisting", className: "btn ghost", text: "Load from GitHub" }));
    gridHeader.append(headerText, headerActions);

    const patternBar = el("div", { className: "pattern-bar" });
    patternBar.append(el("span", { text: "Patterns" }));
    [
        { id: "clear", label: "Clear" },
        { id: "diagonal", label: "Diagonal" },
        { id: "wave", label: "Wave" },
        { id: "smile", label: "Smile" },
        { id: "blocks", label: "Blocks" }
    ].forEach((pattern) => {
        const btn = el("button", { className: "btn chip", text: pattern.label });
        btn.dataset.pattern = pattern.id;
        patternBar.append(btn);
    });

    const gridWrap = el("div", { className: "grid-wrap" });
    gridWrap.append(el("div", { id: "calendarGrid", className: "calendar" }));

    const legend = el("div", { className: "legend" });
    legend.append(el("span", { text: "Less" }));
    const legendSquares = el("div", { className: "legend-squares" });
    ["lvl-0", "lvl-1", "lvl-2", "lvl-3", "lvl-4"].forEach((lvl) => {
        legendSquares.append(el("span", { className: `cell ${lvl}` }));
    });
    legend.append(legendSquares, el("span", { text: "More" }));

    gridPanel.append(gridHeader, patternBar, gridWrap, legend);

    const controls = el("section", { className: "panel controls" });
    const selectedBlock = el("div", { className: "control-block" });
    selectedBlock.append(el("h2", { text: "Selected Day" }));
    selectedBlock.append(el("p", { id: "selectedDate", text: "No day selected." }));
    const selectedLabel = el("label", { className: "field inline" });
    selectedLabel.append(el("span", { text: "Desired commits" }));
    selectedLabel.append(el("input", { id: "selectedCount", type: "number", attrs: { min: "0", max: "50", value: "0" } }));
    selectedBlock.append(selectedLabel);

    const planBlock = el("div", { className: "control-block" });
    planBlock.append(el("h2", { text: "Plan Summary" }));
    planBlock.append(el("p", { id: "planSummary", text: "No plan yet." }));
    const pushLabel = el("label", { className: "field inline" });
    pushLabel.append(el("span", { text: "Push after run" }));
    pushLabel.append(el("input", { id: "pushAfter", type: "checkbox" }));
    const actionRow = el("div", { className: "row" });
    actionRow.append(el("button", { id: "previewPlan", className: "btn ghost", text: "Preview Plan" }));
    actionRow.append(el("button", { id: "runPlan", className: "btn primary", text: "Run Commits" }));
    planBlock.append(pushLabel, actionRow, el("div", { id: "progress", className: "progress" }), el("div", { id: "logOutput", className: "log-output" }));

    controls.append(selectedBlock, planBlock);

    main.append(hero, gridPanel, controls);

    app.append(sidebar, main);
    document.body.appendChild(app);
};

buildUI();

const elements = {
    tokenInput: document.getElementById("tokenInput"),
    loadRepos: document.getElementById("loadRepos"),
    repoSearch: document.getElementById("repoSearch"),
    repoList: document.getElementById("repoList"),
    repoMeta: document.getElementById("repoMeta"),
    browseRepo: document.getElementById("browseRepo"),
    repoPath: document.getElementById("repoPath"),
    yearSelect: document.getElementById("yearSelect"),
    loadExisting: document.getElementById("loadExisting"),
    calendarGrid: document.getElementById("calendarGrid"),
    selectedDate: document.getElementById("selectedDate"),
    selectedCount: document.getElementById("selectedCount"),
    planSummary: document.getElementById("planSummary"),
    previewPlan: document.getElementById("previewPlan"),
    runPlan: document.getElementById("runPlan"),
    pushAfter: document.getElementById("pushAfter"),
    progress: document.getElementById("progress"),
    logOutput: document.getElementById("logOutput")
};

const formatDateLabel = (dateStr) => {
    const date = new Date(`${dateStr}T00:00:00`);
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
};

const buildCalendarDays = (year) => {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);
    const days = [];

    let weekIndex = 0;
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay();
        if (days.length > 0 && dayOfWeek === 0) {
            weekIndex += 1;
        }
        const dateStr = d.toISOString().slice(0, 10);
        days.push({
            date: dateStr,
            dayOfWeek,
            weekIndex
        });
    }

    return days;
};

const getExistingCount = (date) => state.existingCounts[date] || 0;
const getDesiredCount = (date) => state.desiredCounts[date] ?? 0;

const setDesiredCount = (date, count) => {
    const safe = Math.max(0, Number(count) || 0);
    state.desiredCounts[date] = safe;
    if (state.selectedDate === date) {
        elements.selectedCount.value = safe;
    }
};

const renderRepoList = () => {
    elements.repoList.innerHTML = "";
    const query = elements.repoSearch.value.toLowerCase();

    const filtered = state.repos.filter((repo) =>
        repo.fullName.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "No repos found.";
        elements.repoList.appendChild(empty);
        return;
    }

    filtered.forEach((repo) => {
        const card = document.createElement("button");
        card.className = "repo-card";
        if (state.selectedRepo && state.selectedRepo.fullName === repo.fullName) {
            card.classList.add("selected");
        }
        card.type = "button";
        card.innerHTML = `
            <div>
                <strong>${repo.name}</strong>
                <span>${repo.fullName}</span>
            </div>
            <span class="badge">${repo.private ? "Private" : "Public"}</span>
        `;

        card.addEventListener("click", () => selectRepo(repo));
        elements.repoList.appendChild(card);
    });
};

const selectRepo = async (repo) => {
    state.selectedRepo = repo;
    elements.repoMeta.textContent = `${repo.fullName} • ${repo.defaultBranch}`;
    elements.repoPath.placeholder = "Click Browse Repo to select";
    renderRepoList();
};

const renderCalendar = () => {
    elements.calendarGrid.innerHTML = "";

    const dayLabels = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayLabels.forEach((label, index) => {
        const labelCell = document.createElement("div");
        labelCell.className = "day-label";
        labelCell.textContent = label;
        labelCell.style.gridRow = `${index + 1}`;
        labelCell.style.gridColumn = "1";
        elements.calendarGrid.appendChild(labelCell);
    });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthStarts = {};
    
    state.days.forEach((day) => {
        const date = new Date(`${day.date}T00:00:00`);
        const month = date.getMonth();
        const key = `${state.year}-${month}`;
        
        if (!monthStarts[key]) {
            monthStarts[key] = day.weekIndex;
        }
    });

    Object.entries(monthStarts).forEach(([key, weekIndex]) => {
        const month = parseInt(key.split("-")[1]);
        const monthLabel = document.createElement("div");
        monthLabel.className = "month-label";
        monthLabel.textContent = months[month];
        monthLabel.style.gridColumn = `${weekIndex + 2}`;
        monthLabel.style.gridRow = "1";
        elements.calendarGrid.appendChild(monthLabel);
    });

    state.days.forEach((day) => {
        const existing = getExistingCount(day.date);
        const desired = getDesiredCount(day.date);
        const desiredLevel = countToLevel(desired);
        const existingLevel = countToLevel(existing);

        const cell = document.createElement("div");
        cell.className = `cell lvl-${desiredLevel}`;
        cell.dataset.date = day.date;
        cell.dataset.existingLevel = String(existingLevel);
        cell.style.gridColumn = `${day.weekIndex + 2}`;
        cell.style.gridRow = `${day.dayOfWeek + 2}`;
        cell.title = `${formatDateLabel(day.date)}\nExisting: ${existing}\nDesired: ${desired}`;

        if (state.selectedDate === day.date) {
            cell.classList.add("selected");
        }

        cell.addEventListener("click", () => {
            state.selectedDate = day.date;
            const currentDesired = getDesiredCount(day.date);
            setDesiredCount(day.date, currentDesired + 1);
            updateSelected();
            renderCalendar();
            updateSummary();
        });

        cell.addEventListener("dblclick", () => {
            state.selectedDate = day.date;
            const currentDesired = getDesiredCount(day.date);
            setDesiredCount(day.date, currentDesired + 1);
            updateSelected();
            renderCalendar();
            updateSummary();
        });

        elements.calendarGrid.appendChild(cell);
    });
};

const updateSelected = () => {
    if (!state.selectedDate) {
        elements.selectedDate.textContent = "No day selected.";
        elements.selectedCount.value = 0;
        return;
    }

    elements.selectedDate.textContent = formatDateLabel(state.selectedDate);
    elements.selectedCount.value = getDesiredCount(state.selectedDate);
};

const updateSummary = () => {
    const plan = buildPlan();
    const total = plan.reduce((sum, entry) => sum + entry.count, 0);
    if (total === 0) {
        elements.planSummary.textContent = "No additional commits planned yet.";
    } else {
        elements.planSummary.textContent = `${total} commits across ${plan.length} days.`;
    }
};

const appendLog = (message) => {
    const target = elements.logOutput;
    if (!target) {
        return;
    }
    const stamp = new Date().toLocaleTimeString();
    target.textContent += `[${stamp}] ${message}\n`;
    target.scrollTop = target.scrollHeight;
};

const buildPlan = () => {
    const plan = [];
    state.days.forEach((day) => {
        const existing = getExistingCount(day.date);
        const desired = getDesiredCount(day.date);
        const additional = Math.max(0, desired - existing);
        if (additional > 0) {
            plan.push({ date: day.date, count: additional });
        }
    });
    return plan;
};

const applyPattern = (pattern) => {
    const desired = { ...state.desiredCounts };

    if (pattern === "clear") {
        state.days.forEach((day) => {
            desired[day.date] = getExistingCount(day.date);
        });
    }

    if (pattern === "diagonal") {
        state.days.forEach((day) => {
            if (day.weekIndex % 7 === day.dayOfWeek) {
                desired[day.date] = Math.max(desired[day.date] || 0, levelToCount[3]);
            }
        });
    }

    if (pattern === "wave") {
        state.days.forEach((day) => {
            const wave = Math.round((Math.sin(day.weekIndex / 4) + 1) * 3);
            if (day.dayOfWeek === wave) {
                desired[day.date] = Math.max(desired[day.date] || 0, levelToCount[4]);
            }
        });
    }

    if (pattern === "smile") {
        state.days.forEach((day) => {
            if ((day.weekIndex === 10 || day.weekIndex === 16) && day.dayOfWeek === 2) {
                desired[day.date] = levelToCount[4];
            }
            if (day.weekIndex >= 8 && day.weekIndex <= 18 && day.dayOfWeek === 5) {
                desired[day.date] = levelToCount[3];
            }
            if (day.weekIndex >= 9 && day.weekIndex <= 17 && day.dayOfWeek === 4) {
                desired[day.date] = levelToCount[2];
            }
        });
    }

    if (pattern === "blocks") {
        state.days.forEach((day) => {
            if (day.weekIndex >= 2 && day.weekIndex <= 8 && day.dayOfWeek <= 4) {
                desired[day.date] = levelToCount[4];
            }
            if (day.weekIndex >= 18 && day.weekIndex <= 26 && day.dayOfWeek <= 4) {
                desired[day.date] = levelToCount[3];
            }
            if (day.weekIndex >= 34 && day.weekIndex <= 40 && day.dayOfWeek <= 4) {
                desired[day.date] = levelToCount[2];
            }
        });
    }

    state.desiredCounts = desired;
    renderCalendar();
    updateSummary();
};

const getFallbackYears = () => {
    const current = new Date().getFullYear();
    return Array.from({ length: 4 }, (_, index) => current - index);
};

const setYearOptions = (years) => {
    const list = Array.isArray(years) && years.length > 0
        ? years.slice().sort((a, b) => b - a)
        : getFallbackYears();

    elements.yearSelect.innerHTML = "";
    if (!list.includes(state.year)) {
        state.year = list[0];
    }

    list.forEach((year) => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        if (year === state.year) {
            option.selected = true;
        }
        elements.yearSelect.appendChild(option);
    });
};

const initYearSelect = () => {
    setYearOptions(getFallbackYears());
};

const loadAvailableYears = async (token) => {
    if (!token) {
        return;
    }

    try {
        const years = await api.loadGithubYears(token);
        const normalized = years.map((year) => Number(year)).filter(Boolean);
        if (normalized.length > 0) {
            state.availableYears = normalized;
            setYearOptions(state.availableYears);
        }
    } catch (error) {
        console.log("Could not load GitHub years:", error.message);
    }
};

const refreshCalendarState = () => {
    state.days = buildCalendarDays(state.year);
    state.desiredCounts = { ...state.existingCounts };
    renderCalendar();
    updateSummary();
};

const loadExisting = async () => {
    const token = elements.tokenInput.value.trim();
    if (!token) {
        alert("Please enter your GitHub token first to load your contribution graph.");
        return;
    }

    elements.loadExisting.disabled = true;
    elements.loadExisting.textContent = "Loading...";

    try {
        if (state.availableYears.length === 0) {
            await loadAvailableYears(token);
        }
        if (!state.githubLoaded) {
            state.githubCountsByYear = {};
            for (const year of state.availableYears) {
                elements.loadExisting.textContent = `Loading ${year}...`;
                const counts = await api.loadGithubContribs(token, year);
                state.githubCountsByYear[year] = counts || {};
            }
            state.githubLoaded = true;
        }
        state.existingCounts = state.githubCountsByYear[state.year] || {};
        state.desiredCounts = { ...state.existingCounts };
        refreshCalendarState();
        elements.repoMeta.textContent = `Loaded ${state.year} contributions from GitHub profile`;
    } catch (error) {
        alert(error.message || "Failed to load contributions from GitHub.");
    } finally {
        elements.loadExisting.disabled = false;
        elements.loadExisting.textContent = "Load from GitHub";
    }
};

const previewPlan = () => {
    const plan = buildPlan();
    const total = plan.reduce((sum, entry) => sum + entry.count, 0);
    if (total === 0) {
        elements.planSummary.textContent = "No additional commits planned yet.";
        return;
    }

    elements.planSummary.textContent = `${total} commits across ${plan.length} days.`;
};

const runPlan = async () => {
    if (state.isRunning) {
        elements.runPlan.disabled = true;
        elements.runPlan.textContent = "Stopping...";
        appendLog("Stop requested");
        try {
            await api.cancelCommits();
        } catch (error) {
            appendLog(error.message || "Stop request failed");
        }
        return;
    }

    if (!state.repoPath) {
        alert("No git repository detected. Either:\n1. Run this from a git repo folder, or\n2. Set a local root folder and select a repo");
        return;
    }

    const plan = buildPlan();
    if (plan.length === 0) {
        alert("No commits to run.");
        return;
    }

    if (!confirm(`Run ${plan.length} days of commits now?`)) {
        return;
    }

    state.isRunning = true;
    elements.runPlan.disabled = false;
    elements.runPlan.textContent = "Stop Committing";
    elements.progress.textContent = "Starting...";
    elements.logOutput.textContent = "";
    appendLog(`Run started for ${plan.length} days`);

    api.onCommitProgress((payload) => {
        elements.progress.textContent = `Committed ${payload.total} (last: ${payload.date} #${payload.index})`;
        appendLog(`Committed ${payload.total} (last: ${payload.date} #${payload.index})`);
    });

    try {
        const result = await api.runCommits(state.repoPath, plan, elements.pushAfter.checked);
        if (result && result.cancelled) {
            elements.progress.textContent = `Stopped. ${result.total} commits created.`;
            appendLog(`Stopped after ${result.total} commits`);
        } else {
            elements.progress.textContent = `Done. ${result.total} commits created.`;
            appendLog(`Done. ${result.total} commits created.`);
        }
        await loadExisting();
    } catch (error) {
        elements.progress.textContent = "";
        appendLog(error.message || "Commit run failed");
        alert(error.message || "Commit run failed.");
    } finally {
        state.isRunning = false;
        elements.runPlan.disabled = false;
        elements.runPlan.textContent = "Run Commits";
    }
};

const init = async () => {
    initYearSelect();
    refreshCalendarState();

    elements.tokenInput.addEventListener("change", async () => {
        await loadAvailableYears(elements.tokenInput.value.trim());
    });

    elements.loadRepos.addEventListener("click", async () => {
        elements.loadRepos.disabled = true;
        elements.loadRepos.textContent = "Loading...";
        try {
            state.repos = await api.listRepos(elements.tokenInput.value.trim());
            renderRepoList();
        } catch (error) {
            alert(error.message || "Failed to load repos.");
        } finally {
            elements.loadRepos.disabled = false;
            elements.loadRepos.textContent = "Load Repos";
        }
    });

    elements.repoSearch.addEventListener("input", renderRepoList);

    elements.browseRepo.addEventListener("click", async () => {
        if (!state.selectedRepo) {
            alert("Select a repo from the list first.");
            return;
        }
        const folder = await api.pickFolder();
        if (folder) {
            const repoName = folder.split(/[/\\]/).pop();
            const parentFolder = folder.substring(0, folder.lastIndexOf(repoName));
            const resolved = await api.resolveRepoPath(parentFolder, repoName);
            if (resolved) {
                state.repoPath = resolved;
                elements.repoPath.value = resolved;
                elements.repoPath.placeholder = "Click Browse Repo to select";
            } else {
                alert("Selected folder is not a git repository (no .git folder found)");
            }
        }
    });

    elements.repoPath.addEventListener("change", (event) => {
        state.repoPath = event.target.value.trim();
    });

    elements.yearSelect.addEventListener("change", async () => {
        state.year = Number(elements.yearSelect.value);
        if (state.githubLoaded) {
            const cached = state.githubCountsByYear[state.year];
            if (cached) {
                state.existingCounts = cached;
                refreshCalendarState();
                elements.repoMeta.textContent = `Loaded ${state.year} contributions from GitHub profile`;
                return;
            }
            const token = elements.tokenInput.value.trim();
            if (token) {
                elements.loadExisting.textContent = `Loading ${state.year}...`;
                const counts = await api.loadGithubContribs(token, state.year);
                state.githubCountsByYear[state.year] = counts || {};
                state.existingCounts = state.githubCountsByYear[state.year];
                refreshCalendarState();
                elements.repoMeta.textContent = `Loaded ${state.year} contributions from GitHub profile`;
                elements.loadExisting.textContent = "Load from GitHub";
                return;
            }
        }
        state.existingCounts = {};
        refreshCalendarState();
    });

    elements.loadExisting.addEventListener("click", loadExisting);

    document.querySelectorAll("[data-pattern]").forEach((button) => {
        button.addEventListener("click", () => applyPattern(button.dataset.pattern));
    });

    elements.selectedCount.addEventListener("change", (event) => {
        if (!state.selectedDate) {
            return;
        }
        setDesiredCount(state.selectedDate, event.target.value);
        renderCalendar();
        updateSummary();
    });

    elements.previewPlan.addEventListener("click", previewPlan);
    elements.runPlan.addEventListener("click", runPlan);
};

init();
