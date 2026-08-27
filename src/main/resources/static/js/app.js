// ============================================================
//  AlgoForge — Main App Logic
// ============================================================

// ---------- State ----------
let appData = {
  userMeta: {
    assessmentDone: false, startingPhase: 1,
    currentTopicId: "arrays", geminiApiKey: "", userName: "Learner"
  },
  streakData: { currentStreak: 0, longestStreak: 0, lastActiveDate: "" },
  dailySessions: [],
  progressMap: {},
  mistakeLog: [],
  problemDoneMap: {}
};

let sessionState = {
  topic: null, lazyMode: false,
  problemsDone: {}, hintUsed: {},
  startTime: 0, step: "problems"
};

let onboardHistory = "";
let tutorHistory = "";
let currentScreen = "dashboard";

// ---------- Init ----------
window.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  applyTheme();
  if (!appData.userMeta.assessmentDone) {
    showOnboarding();
  } else {
    showMainApp();
  }
});

async function loadData() {
  try {
    const res = await fetch("/api/data");
    const text = await res.text();
    if (text && text !== "{}") {
      const parsed = JSON.parse(text);
      const shouldMigrateSolvedProblems = !parsed.problemDoneMap;
      appData = { ...appData, ...parsed };
      normalizeAppData(shouldMigrateSolvedProblems);
      localStorage.setItem("nova_backup", JSON.stringify(appData));
      return;
    }
  } catch (e) { /* server not responding — try local backup */ }

  // Fallback: load from localStorage if server data unavailable
  const backup = localStorage.getItem("nova_backup");
  if (backup) {
    try {
      const parsed = JSON.parse(backup);
      const shouldMigrate = !parsed.problemDoneMap;
      appData = { ...appData, ...parsed };
      normalizeAppData(shouldMigrate);
    } catch (e2) {}
  }
}

async function saveData() {
  // Always save to localStorage immediately — zero-latency backup
  localStorage.setItem("nova_backup", JSON.stringify(appData));
  try {
    await fetch("/api/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData)
    });
  } catch (e) {}
}

// ============================================================
//  ONBOARDING
// ============================================================

function showOnboarding() {
  document.getElementById("onboarding").style.display = "flex";
  document.getElementById("main-app").classList.add("hidden");
}

function showStep(id) {
  document.querySelectorAll(".onboard-step").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if (id === "step-chat") {
    kickOffOnboardChat();
  }
}

// --- API Key ---
async function handleApiKeySubmit() {
  const input = document.getElementById("apikey-input");
  const btn   = document.getElementById("apikey-btn");
  const err   = document.getElementById("apikey-error");
  const key   = input.value.trim();

  if (!key) { showError(err, "Please enter your API key."); return; }

  btn.disabled = true;
  btn.textContent = "Verifying...";
  err.classList.add("hidden");

  try {
    const res = await fetch("/api/validate-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey: key })
    });
    const data = await res.json();
    if (data.valid) {
      appData.userMeta.geminiApiKey = key;
      await saveData();
      showStep("step-chat");
    } else {
      showError(err, data.error || "Invalid API key. Please try again.");
      btn.disabled = false;
      btn.textContent = "Verify & Continue →";
    }
  } catch (e) {
    showError(err, "Connection error. Is the server running?");
    btn.disabled = false;
    btn.textContent = "Verify & Continue →";
  }
}

// --- Onboarding Chat ---
async function kickOffOnboardChat() {
  const container = document.getElementById("onboard-messages");
  container.innerHTML = "";
  onboardHistory = "";

  setOnboardInputEnabled(false);
  const typing = addTypingIndicator("onboard-messages");

  const reply = await geminiChat("Start the conversation. Greet warmly and ask your first question to understand the user's DSA background. Keep it short and casual.", "onboarding");
  removeTypingIndicator(typing);
  addBotBubble("onboard-messages", reply);
  setOnboardInputEnabled(true);
  onboardHistory += `Assistant: ${reply}\n`;
}

async function sendOnboardMessage() {
  const input = document.getElementById("onboard-input");
  const msg = input.value.trim();
  if (!msg) return;

  input.value = "";
  setOnboardInputEnabled(false);
  addUserBubble("onboard-messages", msg);
  onboardHistory += `User: ${msg}\n`;

  const typing = addTypingIndicator("onboard-messages");
  const reply = await geminiChat(msg, "onboarding", onboardHistory);
  removeTypingIndicator(typing);

  const phase = extractPhase(reply);
  const cleanReply = reply.replace(/\[PHASE:\d\]/g, "").trim();

  onboardHistory += `Assistant: ${reply}\n`;
  addBotBubble("onboard-messages", cleanReply);

  if (phase > 0) {
    setTimeout(() => showPhaseResult(phase), 1200);
  } else {
    setOnboardInputEnabled(true);
  }
}

function showPhaseResult(phase) {
  const topicId = phase === 1 ? "arrays" : phase === 2 ? "linked_list" : phase === 3 ? "binary_trees" : "dp_basics";
  const topic = getTopicById(topicId);

  appData.userMeta.assessmentDone = true;
  appData.userMeta.startingPhase = phase;
  appData.userMeta.currentTopicId = topicId;
  appData.progressMap[topicId] = { status: "in_progress", hintsUsed: 0, dateCompleted: "" };
  saveData();

  const card = document.createElement("div");
  card.className = "phase-result-card";
  card.innerHTML = `
    <div class="big-icon">🎯</div>
    <div class="phase-label">You'll start from Phase ${phase}</div>
    <div class="topic-label">${topic.name}</div>
    <button class="btn-primary" onclick="finishOnboarding()" style="margin-top:8px;padding:12px 32px">Start Learning →</button>
  `;

  const row = document.createElement("div");
  row.className = "bubble-row bot";
  row.appendChild(card);
  document.getElementById("onboard-messages").appendChild(row);
  scrollChatToBottom("onboard-messages");
}

function finishOnboarding() {
  document.getElementById("onboarding").style.display = "none";
  showMainApp();
}

function setOnboardInputEnabled(enabled) {
  document.getElementById("onboard-input").disabled = !enabled;
  document.getElementById("onboard-send").disabled = !enabled;
  if (enabled) document.getElementById("onboard-input").focus();
}

// ============================================================
//  MAIN APP
// ============================================================

function showMainApp() {
  document.getElementById("main-app").classList.remove("hidden");
  document.getElementById("onboarding").style.display = "none";
  navigate("dashboard");
}

function navigate(screen) {
  currentScreen = screen;
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));

  const s = document.getElementById(`screen-${screen}`);
  if (s) s.classList.add("active");

  const n = document.querySelector(`.nav-item[data-screen="${screen}"]`);
  if (n) n.classList.add("active");

  if (screen === "dashboard") renderDashboard();
  else if (screen === "session") renderSession();
  else if (screen === "progress") renderProgress();
  else if (screen === "mistakes") renderMistakes();
  else if (screen === "solved") renderSolved();
  else if (screen === "settings") renderSettings();
}

// ============================================================
//  DASHBOARD
// ============================================================

function renderDashboard() {
  updateStreakIfNeeded();

  const topic = getTopicById(appData.userMeta.currentTopicId);
  const streak = appData.streakData;
  const today = todayStr();
  const hour = new Date().getHours();

  // Greeting
  const name = appData.userMeta.userName && appData.userMeta.userName !== "Learner" ? `, ${appData.userMeta.userName}` : "";
  const greet = hour < 12 ? `Good morning${name}` : hour < 17 ? `Good afternoon${name}` : `Good evening${name}`;
  document.getElementById("dash-greeting").textContent = greet;
  document.getElementById("dash-date").textContent = new Date().toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long" });

  // Streak badge
  document.getElementById("dash-streak-badge").innerHTML =
    `<span>🔥</span><span style="color:var(--orange)">${streak.currentStreak}</span><span style="font-size:12px;color:var(--text2)">day streak</span>`;
  document.getElementById("sidebar-streak").textContent = streak.currentStreak;

  // Alerts
  const alertsEl = document.getElementById("dash-alerts");
  alertsEl.innerHTML = "";
  if (isStreakBroken()) {
    alertsEl.innerHTML += `<div class="alert-card streak-lost"><div class="alert-title">😔 Streak Lost — Let's Restart</div><p>You missed a day. Start fresh today and build back stronger!</p></div>`;
  }
  if (hour >= 22 && !hasDoneSessionToday()) {
    alertsEl.innerHTML += `<div class="alert-card guilt"><div class="alert-title">⏰ It's late — don't break the streak!</div><p>Even 5 minutes counts. Hit Lazy Mode and keep that streak alive!</p></div>`;
  }

  // Topic card
  document.getElementById("tc-phase-badge").textContent = `Phase ${topic.phase}`;
  document.getElementById("tc-topic-name").textContent = topic.name;
  document.getElementById("tc-pattern").textContent = "Pattern: " + topic.pattern;
  const startBtn = document.getElementById("tc-start-btn");
  if (hasDoneSessionToday()) {
    startBtn.textContent = "✓ Session Done Today";
    startBtn.disabled = true;
    startBtn.style.cssText = "background:#0a2e1e;color:var(--green);cursor:default";
  } else {
    startBtn.textContent = "▶ Start Session";
    startBtn.disabled = false;
    startBtn.style.cssText = "";
  }

  // Due reviews
  const due = getMistakesDueToday();
  const dueEl = document.getElementById("dash-due-card");
  if (due.length > 0) {
    dueEl.className = "due-card";
    dueEl.innerHTML = `<div class="due-title">📌 ${due.length} problem${due.length > 1 ? "s" : ""} due for review</div><p>Spaced repetition ready. Review to solidify memory.</p>`;
    dueEl.onclick = () => navigate("mistakes");
    dueEl.style.display = "";
  } else {
    dueEl.style.display = "none";
  }

  // Activity grid
  renderActivityGrid();

  // Stats
  document.getElementById("stat-problems").textContent = getTotalProblemsSolved();
  document.getElementById("stat-topics").textContent = getTopicsDone();
  document.getElementById("stat-skips").textContent = getSkipsUsed();
}

function renderActivityGrid() {
  const grid = document.getElementById("activity-grid");
  grid.innerHTML = "";
  const activity = getLast30Days();
  Object.entries(activity).forEach(([date, status]) => {
    const cell = document.createElement("div");
    cell.className = `activity-cell cell-${status}`;
    cell.setAttribute("data-tip", `${date} — ${status}`);
    grid.appendChild(cell);
  });
}

// ============================================================
//  SESSION
// ============================================================

function startLazyMode() {
  sessionState.lazyMode = true;
  navigate("session");
}

function renderSession() {
  const topicId = appData.userMeta.currentTopicId;
  sessionState.topic = getTopicById(topicId);
  sessionState.lazyMode = sessionState.lazyMode || false;
  sessionState.problemsDone = {};
  sessionState.hintUsed = {};
  sessionState.startTime = Date.now();

  // Restore saved problem checks. These persist until the user unchecks them.
  const doneNames = getMarkedProblemNames(topicId);
  (sessionState.topic.problems || []).forEach((problem, idx) => {
    if (doneNames.has(getProblemKey(problem))) sessionState.problemsDone[idx] = true;
  });

  if (sessionState.lazyMode) {
    const dueReviews = getMistakesDueToday();
    if (dueReviews.length > 0) {
      showLazyReviewStep(dueReviews[0]);
    } else {
      showProblemsStep();
    }
  } else {
    showProblemsStep();
  }
}

function showProblemsStep() {
  sessionState.step = "problems";
  const t = sessionState.topic;
  const problems = t.problems || [];

  const diffOrder = ["Easy", "Medium", "Hard"];
  const groups = diffOrder
    .map(diff => ({ diff, items: problems.map((p, i) => ({ p, i })).filter(({ p }) => p.difficulty === diff) }))
    .filter(g => g.items.length > 0);

  const diffColors = { Easy: "var(--green)", Medium: "var(--orange)", Hard: "var(--red)" };

  const groupHtml = groups.map((g, gi) => `
    <div style="border:1px solid var(--border);border-radius:10px;margin-bottom:8px;overflow:hidden">
      <div onclick="toggleProblemGroup(${gi})" style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;cursor:pointer;background:var(--bg2);user-select:none">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:12px;font-weight:700;color:${diffColors[g.diff]}">${g.diff.toUpperCase()}</span>
          <span style="font-size:12px;color:var(--text2)">${g.items.length} problems</span>
        </div>
        <span id="pg-chevron-${gi}" style="color:var(--text2);font-size:11px;transition:transform .2s">▼</span>
      </div>
      <div id="pg-group-${gi}" style="display:none">
        ${g.items.map(({ p, i }) => `
          <div class="problem-card ${sessionState.problemsDone[i] ? 'done' : ''}" id="pcard-${i}" style="border-radius:0;border:none;border-top:1px solid var(--border);margin:0">
            <div class="problem-top">
              <span class="problem-name">${p.name}</span>
            </div>
            <div class="problem-links">
              ${p.leetcodeLink ? `<a class="link-btn" href="${p.leetcodeLink}" target="_blank">LeetCode ↗</a>` : ""}
              ${p.tufLink ? `<a class="link-btn" href="${p.tufLink}" target="_blank">TUF ↗</a>` : ""}
            </div>
            <div class="problem-footer">
              <label class="done-check">
                <input type="checkbox" id="done-${i}" ${sessionState.problemsDone[i] ? "checked" : ""} onchange="markDone(${i}, this.checked)">
                <label for="done-${i}">Mark as Done</label>
              </label>
              <button class="hint-btn" onclick="getHint(${i}, '${p.name.replace(/'/g, "\\'")}')">💡 Hint</button>
              ${(() => { const inReview = (appData.mistakeLog || []).some(m => m.problemName === p.name && m.topicId === t.id); return `<button class="hint-btn review-btn ${inReview ? "in-review" : ""}" id="rbtn-${i}" onclick="addToReview(${i}, '${p.name.replace(/'/g, "\\'")}')">📌 ${inReview ? "✓ In Review" : "Review"}</button>`; })()}
            </div>
          </div>`).join("")}
      </div>
    </div>`).join("");

  setSessionContent(`
    <div class="session-step">
      <div class="session-top-bar">
        <button class="session-back" onclick="navigate('dashboard')">← Back</button>
        <span class="phase-badge" style="display:inline-block">Phase ${t.phase}</span>
      </div>
      <div style="margin-bottom:16px">
        <h2 style="font-size:22px;font-weight:800;margin-bottom:2px">${t.name}</h2>
        <p style="color:var(--text2);font-size:13px;margin:0">${t.keyIdea || ""}</p>
      </div>
      ${groupHtml}
      <button class="btn-primary" onclick="completeSession()" style="width:100%;margin-top:8px">Complete Session ✓</button>
    </div>
  `);
}

function toggleProblemGroup(gi) {
  const group = document.getElementById(`pg-group-${gi}`);
  const chevron = document.getElementById(`pg-chevron-${gi}`);
  const isOpen = group.style.display !== "none";
  group.style.display = isOpen ? "none" : "block";
  chevron.style.transform = isOpen ? "" : "rotate(180deg)";
}

function showLazyReviewStep(mistake) {
  const topic = ROADMAP.find(t => t.id === mistake.topicId);
  const problem = topic ? (topic.problems || []).find(p => p.name === mistake.problemName) : null;

  setSessionContent(`
    <div class="session-step">
      <div class="session-top-bar">
        <button class="session-back" onclick="navigate('dashboard')">← Exit</button>
        <span style="color:var(--text2);font-size:13px">⚡ Lazy Mode — Review</span>
      </div>
      <div class="card" style="border-color:rgba(240,168,90,.2)">
        <div style="font-size:10px;font-weight:600;color:var(--orange);text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px">Due for Review</div>
        <div style="font-size:19px;font-weight:700;margin-bottom:4px">${mistake.problemName}</div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:14px">${mistake.topicName} · ${mistake.type === 'stuck' ? '💡 Got stuck before' : '⏭ Skipped approach before'}</div>
        ${problem && (problem.leetcodeLink || problem.tufLink) ? `
        <div class="problem-links" style="margin-bottom:14px">
          ${problem.leetcodeLink ? `<a class="link-btn" href="${problem.leetcodeLink}" target="_blank">LeetCode ↗</a>` : ''}
          ${problem.tufLink ? `<a class="link-btn" href="${problem.tufLink}" target="_blank">TUF ↗</a>` : ''}
        </div>` : ''}
        <p style="color:var(--text2);font-size:13px">Re-read the problem. Even 5 minutes of re-exposure strengthens memory.</p>
      </div>
      <button class="btn-primary" style="width:100%" onclick="completeLazyReview('${mistake.id}')">✓ Reviewed — Done for today</button>
      <button class="btn-ghost" style="width:100%;margin-top:4px" onclick="skipLazyReview()">Skip — solve a new problem instead</button>
    </div>
  `);
}

function completeLazyReview(mistakeId) {
  markReviewed(mistakeId);
  const mins = Math.round((Date.now() - sessionState.startTime) / 60000);
  const today = todayStr();

  appData.dailySessions = appData.dailySessions.filter(s => s.date !== today);
  appData.dailySessions.push({
    date: today, topicId: sessionState.topic.id,
    problemsDone: 0, timeTaken: mins,
    skipped: false, lazyMode: true
  });
  markTodayActive();
  saveData();
  sessionState.lazyMode = false;

  setSessionContent(`
    <div class="session-step">
      <div class="wrapup-card">
        <div class="wrapup-emoji">🔥</div>
        <div class="wrapup-title">Streak kept alive.</div>
        <div class="wrapup-msg">Good. Come back tomorrow for a full session on ${sessionState.topic ? sessionState.topic.name : 'your topic'}.</div>
        <div class="wrapup-stats">
          <div class="wrapup-stat"><span class="ws-val">🔥${appData.streakData.currentStreak}</span><span class="ws-lbl">Streak</span></div>
        </div>
      </div>
      <button class="btn-primary" onclick="navigate('dashboard')" style="width:100%">Back to Dashboard</button>
    </div>
  `);
}

function skipLazyReview() {
  showProblemsStep();
}

function markDone(idx, checked) {
  sessionState.problemsDone[idx] = checked;
  const card = document.getElementById(`pcard-${idx}`);
  if (card) card.className = `problem-card ${checked ? "done" : ""}`;

  // Persist immediately — don't wait for "Complete Session"
  const today = todayStr();
  const topic = sessionState.topic;
  const p = topic.problems[idx];
  setProblemMarkedDone(topic.id, p, checked);

  let session = appData.dailySessions.find(s => s.date === today && s.topicId === topic.id);
  if (!session) {
    session = { date: today, topicId: topic.id, problemsDone: 0, timeTaken: 0, skipped: false, lazyMode: sessionState.lazyMode, solvedProblems: [] };
    appData.dailySessions.push(session);
  }
  if (!session.solvedProblems) session.solvedProblems = [];

  if (checked) {
    if (!session.solvedProblems.find(sp => sp.name === p.name)) {
      session.solvedProblems.push({ name: p.name, difficulty: p.difficulty, leetcodeLink: p.leetcodeLink || "", tufLink: p.tufLink || "" });
    }
  } else {
    session.solvedProblems = session.solvedProblems.filter(sp => sp.name !== p.name);
  }
  session.problemsDone = Object.values(sessionState.problemsDone).filter(Boolean).length;
  if (checked) markTodayActive();
  saveData();
}

function getHint(idx, name) {
  sessionState.hintUsed[idx] = true;
  logMistake(sessionState.topic.id, sessionState.topic.name, name, "stuck");
  openChatWithContext(`I'm stuck on: "${name}" (${sessionState.topic.name} topic). Give me a small hint without spoiling the solution.`);
}

function addToReview(idx, name) {
  const topicId = sessionState.topic.id;
  const already = (appData.mistakeLog || []).some(m => m.problemName === name && m.topicId === topicId);
  if (already) {
    appData.mistakeLog = appData.mistakeLog.filter(m => !(m.problemName === name && m.topicId === topicId));
    saveData();
    const btn = document.getElementById(`rbtn-${idx}`);
    if (btn) { btn.textContent = "📌 Review"; btn.classList.remove("in-review"); }
  } else {
    logMistake(topicId, sessionState.topic.name, name, "review");
    const btn = document.getElementById(`rbtn-${idx}`);
    if (btn) { btn.textContent = "📌 ✓ In Review"; btn.classList.add("in-review"); }
  }
}

function completeSession() {
  const done = Object.values(sessionState.problemsDone).filter(Boolean).length;
  const total = (sessionState.topic.problems || []).length;

  if (done < total) {
    if (!confirm(`You've marked ${done}/${total} problems done. Complete anyway?`)) return;
  }

  const mins = Math.round((Date.now() - sessionState.startTime) / 60000);
  const today = todayStr();
  const problems = sessionState.topic.problems || [];
  const solvedProblems = problems
    .filter((p, i) => sessionState.problemsDone[i])
    .map(p => ({ name: p.name, difficulty: p.difficulty, leetcodeLink: p.leetcodeLink || "", tufLink: p.tufLink || "" }));

  // Update or create session entry (preserve other topics' sessions for today)
  const existingIdx = appData.dailySessions.findIndex(s => s.date === today && s.topicId === sessionState.topic.id);
  const sessionEntry = { date: today, topicId: sessionState.topic.id, problemsDone: done, timeTaken: mins, skipped: false, lazyMode: sessionState.lazyMode, solvedProblems };
  if (existingIdx >= 0) appData.dailySessions[existingIdx] = sessionEntry;
  else appData.dailySessions.push(sessionEntry);

  // Update streak
  markTodayActive();

  // Advance topic only on full sessions, not lazy mode
  if (done === total && !sessionState.lazyMode) {
    appData.progressMap[sessionState.topic.id] = {
      status: "done", dateCompleted: today, hintsUsed: 0
    };
    const next = getNextTopic(sessionState.topic.id);
    if (next) {
      appData.userMeta.currentTopicId = next.id;
      appData.progressMap[next.id] = { status: "in_progress", hintsUsed: 0, dateCompleted: "" };
    }
  }

  saveData();
  sessionState.lazyMode = false;
  showWrapUpStep(done, total, mins);
}

function showWrapUpStep(done, total, mins) {
  const t = sessionState.topic;
  const next = getNextTopic(t.id);
  const wrapEmoji = sessionState.lazyMode ? "🔥"
    : done === total ? "✨"
    : done >= Math.ceil(total / 2) ? "💪"
    : "🌱";
  const msg = sessionState.lazyMode
    ? "Streak maintained! Do a full session tomorrow to keep progressing."
    : done === total
      ? "Clean session. Every problem you finish is real progress."
      : done >= Math.ceil(total / 2)
        ? "Solid work. Consistency beats perfection — keep showing up."
        : "You started, and that matters. Push a little further tomorrow.";

  setSessionContent(`
    <div class="session-step">
      <div class="wrapup-card">
        <div class="wrapup-emoji">${wrapEmoji}</div>
        <div class="wrapup-title">Session done.</div>
        <div class="wrapup-msg">${msg}</div>
        <div class="wrapup-stats">
          <div class="wrapup-stat"><span class="ws-val">${done}/${total}</span><span class="ws-lbl">Problems</span></div>
          <div class="wrapup-stat"><span class="ws-val">${mins}m</span><span class="ws-lbl">Time</span></div>
          <div class="wrapup-stat"><span class="ws-val">🔥${appData.streakData.currentStreak}</span><span class="ws-lbl">Streak</span></div>
        </div>
      </div>
      ${next ? `
        <div class="next-topic-card">
          <div class="nt-label">Next up</div>
          <div class="nt-name">${next.name}</div>
        </div>` : ""}
      <button class="btn-primary" onclick="navigate('dashboard')" style="width:100%">Back to Dashboard</button>
    </div>
  `);
}


function setSessionContent(html) {
  document.getElementById("session-content").innerHTML = html;
}

// ============================================================
//  PROGRESS
// ============================================================

function renderProgress() {
  const sm = appData;

  // Stats
  const statsEl = document.getElementById("progress-stats");
  statsEl.innerHTML = `
    <div class="stat-card"><span class="stat-value" style="color:var(--orange)">${sm.streakData.currentStreak}</span><span class="stat-label">Current Streak</span></div>
    <div class="stat-card"><span class="stat-value" style="color:var(--orange)">${sm.streakData.longestStreak}</span><span class="stat-label">Longest Streak</span></div>
    <div class="stat-card"><span class="stat-value">${getTotalProblemsSolved()}</span><span class="stat-label">Total Solved</span></div>
    <div class="stat-card"><span class="stat-value">${getTopicsDone()}</span><span class="stat-label">Topics Done</span></div>
  `;

  // Roadmap per phase
  const roadmapEl = document.getElementById("progress-roadmap");
  roadmapEl.innerHTML = "";

  const phaseNames = ["", "Foundation", "Linear Structures", "Non-Linear", "Advanced"];
  for (let phase = 1; phase <= 4; phase++) {
    const topics = ROADMAP.filter(t => t.phase === phase);
    const totalProblems = topics.reduce((sum, t) => sum + (t.problems || []).length, 0);
    const solvedProblems = topics.reduce((sum, t) => {
      const dm = getTopicDoneMap(t.id, false);
      return sum + Object.values(dm).filter(Boolean).length;
    }, 0);
    const pct = totalProblems > 0 ? Math.round(solvedProblems / totalProblems * 100) : 0;

    let topicRows = topics.map(t => {
      const prog = sm.progressMap[t.id] || { status: "locked", hintsUsed: 0 };
      const cls = prog.status === "done" ? "tr-done" : prog.status === "in_progress" ? "tr-progress" : "tr-locked";
      const dotColor = prog.status === "done" ? "var(--green)" : prog.status === "in_progress" ? "var(--orange)" : "#3d3d5e";
      const statusText = prog.status === "done" ? "✓ Done" : prog.status === "in_progress" ? "▶ Active" : "🔒";
      const clickable = prog.status !== "locked" ? `onclick="jumpToTopic('${t.id}')" style="cursor:pointer"` : "";
      const hints = prog.hintsUsed > 0 ? `<span class="hints-used">💡${prog.hintsUsed}</span>` : "";
      return `<div class="topic-row ${cls}" ${clickable}>
        <div class="tr-dot" style="background:${dotColor}"></div>
        <span class="tr-name">${t.name}</span>
        ${hints}
        <span class="tr-status">${statusText}</span>
      </div>`;
    }).join("");

    roadmapEl.innerHTML += `
      <div class="card roadmap-phase">
        <div class="phase-header">
          <span class="phase-badge">Phase ${phase}</span>
          <span style="font-size:15px;font-weight:700">${phaseNames[phase]}</span>
          <span class="phase-pct">${pct}%</span>
        </div>
        <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
        ${topicRows}
      </div>
    `;
  }
}

function jumpToTopic(id) {
  appData.userMeta.currentTopicId = id;
  saveData();
  navigate("session");
}

// ============================================================
//  MISTAKES
// ============================================================

function renderMistakes() {
  const el = document.getElementById("mistakes-content");
  const all = appData.mistakeLog || [];
  const due = getMistakesDueToday();

  if (all.length === 0) {
    el.innerHTML = `<div class="empty-state"><div class="es-icon">🎉</div><p>No mistakes yet! As you use hints and skip approaches, they'll appear here for spaced repetition review.</p></div>`;
    return;
  }

  let html = "";

  if (due.length > 0) {
    html += `<div class="mistakes-section-title" style="color:var(--red)">Due for review today (${due.length})</div>`;
    html += due.map(m => mistakeCardHTML(m, true)).join("");
  }

  html += `<div class="mistakes-section-title">All Mistakes (${all.length})</div>`;
  html += all.map(m => mistakeCardHTML(m, false)).join("");

  html += `<button class="btn-primary" onclick="analyzeWeaknesses()" style="width:100%;margin-top:8px">🤖 Analyze My Weak Patterns</button>`;

  el.innerHTML = html;
}

function mistakeCardHTML(m, isDue) {
  const typeText = m.type === "stuck" ? "Got stuck" : "Skipped";
  const reviewBtn = isDue ? `<button class="review-btn" onclick="markReviewed('${m.id}')">✓ Reviewed</button>` : `<span class="next-review">Next: ${m.nextReviewDate || "N/A"}</span>`;
  return `
    <div class="mistake-card ${isDue ? "due" : ""}">
      <div class="mistake-top">
        <span class="mistake-topic-badge">${m.topicName}</span>
        <span class="mistake-date">${m.date}</span>
      </div>
      <div class="mistake-name">${m.problemName}</div>
      <div class="mistake-type">${typeText}</div>
      <div class="mistake-footer">
        ${reviewBtn}
        <span style="margin-left:auto;font-size:11px;color:var(--text2)">Reviews: ${m.reviewCount || 0}</span>
      </div>
    </div>
  `;
}

function markReviewed(id) {
  const intervals = [3, 7, 14, 30];
  const m = appData.mistakeLog.find(m => m.id === id);
  if (m) {
    const days = intervals[Math.min(m.reviewCount || 0, intervals.length - 1)];
    m.nextReviewDate = addDays(todayStr(), days);
    m.reviewCount = (m.reviewCount || 0) + 1;
    saveData();
    renderMistakes();
  }
}

function analyzeWeaknesses() {
  const all = appData.mistakeLog || [];
  if (all.length === 0) return;
  const summary = all.map(m => `${m.topicName} — ${m.problemName} (${m.type})`).join("\n");
  openChatWithContext(`Analyze these DSA mistake patterns and tell me my top 3 weak areas:\n${summary}\n\nGive specific advice for each weakness in 2-3 lines.`);
}

// ============================================================
//  SOLVED PROBLEMS
// ============================================================

function renderSolved() {
  const el = document.getElementById("solved-content");

  // Only collect problems that are currently marked done.
  const solvedByTopic = {};
  (ROADMAP || []).forEach(topic => {
    const doneNames = getMarkedProblemNames(topic.id);
    const problems = (topic.problems || [])
      .filter(p => doneNames.has(getProblemKey(p)))
      .map(p => ({
        name: p.name,
        difficulty: p.difficulty,
        leetcodeLink: p.leetcodeLink || "",
        tufLink: p.tufLink || "",
        date: getFirstSolvedDate(topic.id, p.name)
      }));

    if (problems.length > 0) {
      solvedByTopic[topic.id] = { topicName: topic.name, problems };
    }
  });

  const entries = Object.values(solvedByTopic);
  const totalSolved = entries.reduce((sum, t) => sum + t.problems.length, 0);

  if (totalSolved === 0) {
    el.innerHTML = `<div class="empty-state"><div class="es-icon">🎯</div><p>No solved problems yet. Mark problems as done during a session — they'll appear here with solution links.</p></div>`;
    return;
  }

  el.innerHTML = `
    <p style="color:var(--text2);font-size:13px;margin-bottom:20px">${totalSolved} problem${totalSolved !== 1 ? "s" : ""} solved</p>
    ${entries.map((t, i) => `
      <div style="border:1px solid var(--border);border-radius:10px;margin-bottom:8px;overflow:hidden">
        <div onclick="toggleSolvedGroup(${i})" style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;cursor:pointer;background:var(--bg2)">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:14px;font-weight:600">${t.topicName}</span>
            <span style="font-size:11px;color:var(--green);font-weight:600">${t.problems.length} solved</span>
          </div>
          <span id="chevron-${i}" style="color:var(--text2);font-size:12px;transition:transform .2s">▼</span>
        </div>
        <div id="solved-group-${i}" style="display:none">
          ${t.problems.map(p => `
            <div style="display:flex;align-items:center;gap:10px;padding:10px 18px;border-top:1px solid var(--border);background:var(--bg)">
              <span class="diff-badge diff-${p.difficulty.toLowerCase()}">${{Easy:"🌱",Medium:"🌿",Hard:"🔥"}[p.difficulty]||""} ${p.difficulty}</span>
              <span style="flex:1;font-size:13px">${p.name}</span>
              <span style="font-size:11px;color:var(--text2)">${p.date || ""}</span>
              <div style="display:flex;gap:5px">
                ${p.leetcodeLink ? `<a class="link-btn" href="${p.leetcodeLink}" target="_blank">LC ↗</a>` : ""}
                ${p.tufLink ? `<a class="link-btn" href="${p.tufLink}" target="_blank">TUF ↗</a>` : ""}
              </div>
            </div>`).join("")}
        </div>
      </div>`).join("")}`;
}

function toggleSolvedGroup(i) {
  const group = document.getElementById(`solved-group-${i}`);
  const chevron = document.getElementById(`chevron-${i}`);
  const isOpen = group.style.display !== "none";
  group.style.display = isOpen ? "none" : "block";
  chevron.style.transform = isOpen ? "" : "rotate(180deg)";
}

// ============================================================
//  SETTINGS
// ============================================================

function renderSettings() {
  const keyInput = document.getElementById("settings-key");
  const nameInput = document.getElementById("settings-name");
  if (keyInput) keyInput.value = appData.userMeta.geminiApiKey || "";
  if (nameInput) nameInput.value = appData.userMeta.userName || "";
  const tog = document.getElementById("theme-toggle");
  if (tog) tog.checked = appData.userMeta.theme === "light";
}

async function saveApiKey() {
  const key = document.getElementById("settings-key").value.trim();
  const status = document.getElementById("settings-key-status");
  appData.userMeta.geminiApiKey = key;
  await saveData();
  status.textContent = "✓ API key saved!";
  status.classList.remove("hidden");
  setTimeout(() => status.classList.add("hidden"), 3000);
}

function saveName() {
  appData.userMeta.userName = document.getElementById("settings-name").value.trim();
  saveData();
}

function toggleTheme(isLight) {
  document.documentElement.setAttribute("data-theme", isLight ? "light" : "dark");
  appData.userMeta.theme = isLight ? "light" : "dark";
  saveData();
}

function applyTheme() {
  const isLight = appData.userMeta.theme === "light";
  document.documentElement.setAttribute("data-theme", isLight ? "light" : "dark");
  const tog = document.getElementById("theme-toggle");
  if (tog) tog.checked = isLight;
}

function resetApp() {
  if (!confirm("Are you sure? This will erase ALL progress and cannot be undone.")) return;
  appData = {
    userMeta: { assessmentDone: false, startingPhase: 1, currentTopicId: "arrays", geminiApiKey: appData.userMeta.geminiApiKey, userName: "Learner" },
    streakData: { currentStreak: 0, longestStreak: 0, lastActiveDate: "" },
    dailySessions: [], progressMap: {}, mistakeLog: [], problemDoneMap: {}
  };
  saveData();
  document.getElementById("main-app").classList.add("hidden");
  showOnboarding();
}

// ============================================================
//  CHATBOT (Tutor panel)
// ============================================================

function toggleChatPanel() {
  const panel = document.getElementById("chat-panel");
  const fab = document.getElementById("chat-fab");
  panel.classList.toggle("hidden");
  const isOpen = !panel.classList.contains("hidden");
  if (fab) fab.classList.toggle("hidden", isOpen);
  if (isOpen) {
    const msgs = document.getElementById("tutor-messages");
    if (msgs.children.length === 0) {
      addBotBubble("tutor-messages", "Ask me anything — concepts, hints, Java tips. I'll guide you, not give away the answer.");
    }
    document.getElementById("tutor-input").focus();
  }
}

async function sendTutorMessage(preset) {
  const input = document.getElementById("tutor-input");
  const msg = preset || input.value.trim();
  if (!msg) return;
  if (!preset) input.value = "";

  const panel = document.getElementById("chat-panel");
  if (panel.classList.contains("hidden")) {
    panel.classList.remove("hidden");
    const fab = document.getElementById("chat-fab");
    if (fab) fab.classList.add("hidden");
  }

  addUserBubble("tutor-messages", msg);
  tutorHistory += `User: ${msg}\n`;

  // Detect if user is asking to learn/explore a specific topic
  const detectedTopic = detectTopicFromMessage(msg);
  if (detectedTopic && isLearningRequest(msg)) {
    const cardRow = document.createElement("div");
    cardRow.className = "bubble-row bot";
    cardRow.innerHTML = renderTopicResourceCard(detectedTopic);
    document.getElementById("tutor-messages").appendChild(cardRow);
    scrollChatToBottom("tutor-messages");
  }

  const topic = getTopicById(appData.userMeta.currentTopicId);
  const resourceGuide = `If the user asks to learn or explore a topic: suggest GeeksForGeeks, Striver (TakeUForward), and NeetCode specifically. Give a 3-step practice plan: 1) understand concept, 2) solve easy problems, 3) attempt medium. Be specific and concise.`;
  const context = `Current topic: ${topic.name} (Phase ${topic.phase})\nPattern: ${topic.pattern}\nJava note: ${topic.javaNote}\n${resourceGuide}\n\n${tutorHistory}`;

  const typing = addTypingIndicator("tutor-messages");
  const reply = await geminiChat(msg, "tutor", context);
  removeTypingIndicator(typing);

  tutorHistory += `Assistant: ${reply}\n`;
  addBotBubble("tutor-messages", reply);
}

function openChatWithContext(presetMessage) {
  sendTutorMessage(presetMessage);
}

function promptLearnTopic() {
  const panel = document.getElementById("chat-panel");
  if (panel.classList.contains("hidden")) panel.classList.remove("hidden");
  const input = document.getElementById("tutor-input");
  input.value = "I want to learn ";
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  // Show available topics as a hint bubble
  const msgs = document.getElementById("tutor-messages");
  const existing = document.getElementById("topic-hint-bubble");
  if (!existing) {
    const topics = ROADMAP.map(t => t.name);
    const hint = document.createElement("div");
    hint.id = "topic-hint-bubble";
    hint.className = "bubble-row bot";
    hint.innerHTML = `<div class="bubble bot" style="font-size:13px">
      Type a topic after "I want to learn " and press Enter. Available topics:<br><br>
      ${topics.map(n => `<span style="display:inline-block;background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:3px 9px;margin:3px 3px 0 0;font-size:12px;cursor:pointer" onclick="pickLearnTopic('${n}')">${n}</span>`).join("")}
    </div>`;
    msgs.appendChild(hint);
    scrollChatToBottom("tutor-messages");
  }
}

function pickLearnTopic(name) {
  document.getElementById("topic-hint-bubble")?.remove();
  sendTutorMessage(`I want to learn ${name}`);
}

function detectTopicFromMessage(msg) {
  const lower = msg.toLowerCase();
  const msgWords = lower.split(/\s+/).filter(w => w.length > 3);

  return ROADMAP.find(t => {
    // Full name match
    if (lower.includes(t.name.toLowerCase())) return true;
    // ID match (arrays → "arrays")
    if (lower.includes(t.id.replace(/_/g, " "))) return true;
    // Word-level match: "array" matches "arrays", "tree" matches "trees" etc.
    const nameWords = t.name.toLowerCase().replace(/[&,]/g, " ").split(/\s+/).filter(w => w.length > 3);
    if (msgWords.some(mw => nameWords.some(nw => nw.startsWith(mw) || mw.startsWith(nw)))) return true;
    // Pattern keyword match
    if (t.pattern) {
      const patternWords = t.pattern.toLowerCase().split(/[\s,]+/).filter(w => w.length > 4);
      if (msgWords.some(mw => patternWords.some(pw => pw.startsWith(mw) || mw.startsWith(pw)))) return true;
    }
    return false;
  }) || null;
}

function isLearningRequest(msg) {
  const triggers = ["learn", "study", "resource", "how to", "where to", "practice", "material", "video", "course", "understand", "start", "begin", "explore"];
  const lower = msg.toLowerCase();
  return triggers.some(t => lower.includes(t));
}

function renderTopicResourceCard(topic) {
  const problems = topic.problems || [];
  const problemRows = problems.map(p => `
    <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--border)">
      <span class="diff-badge diff-${p.difficulty.toLowerCase()}">${{Easy:"🌱",Medium:"🌿",Hard:"🔥"}[p.difficulty]||""} ${p.difficulty}</span>
      <span style="flex:1;font-size:13px">${p.name}</span>
      <div style="display:flex;gap:5px">
        ${p.leetcodeLink ? `<a class="link-btn" href="${p.leetcodeLink}" target="_blank">LC ↗</a>` : ""}
        ${p.tufLink ? `<a class="link-btn" href="${p.tufLink}" target="_blank">TUF ↗</a>` : ""}
      </div>
    </div>`).join("");

  const gfgUrl = `https://www.google.com/search?q=${encodeURIComponent(topic.name + " geeksforgeeks")}`;
  const ytStriverUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(topic.name + " striver")}`;
  const ytNeetUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(topic.name + " neetcode")}`;

  return `
    <div style="background:var(--bg3);border:1px solid rgba(129,140,248,.2);border-radius:12px;padding:16px;width:100%">
      <div style="font-size:10px;font-weight:600;color:var(--accent);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px">Topic Resources</div>
      <div style="font-size:17px;font-weight:700;margin-bottom:2px">${topic.name}</div>
      <div style="font-size:12px;color:var(--text2);margin-bottom:14px">${topic.pattern}</div>

      <div style="font-size:10px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Learn from</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
        <a class="link-btn" href="${gfgUrl}" target="_blank">GFG ↗</a>
        <a class="link-btn" href="${ytStriverUrl}" target="_blank">Striver ↗</a>
        <a class="link-btn" href="${ytNeetUrl}" target="_blank">NeetCode ↗</a>
      </div>

      <div style="font-size:10px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px">Practice Problems</div>
      ${problemRows || '<div style="color:var(--text2);font-size:13px">No problems mapped yet.</div>'}
    </div>`;
}

// ============================================================
//  GEMINI API
// ============================================================

async function geminiChat(message, mode, history) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: history || "", mode })
    });
    const data = await res.json();
    if (data.reply === "__NO_KEY__") return "No API key configured on the server.";
    return data.reply || "No response.";
  } catch (e) {
    return "Connection error. Make sure the server is running.";
  }
}

// ============================================================
//  CHAT UI HELPERS
// ============================================================

function addBotBubble(containerId, text) {
  const row = document.createElement("div");
  row.className = "bubble-row bot";
  row.innerHTML = `<span class="bubble-avatar">🤖</span><div class="bubble bot">${escapeHtml(text)}</div>`;
  document.getElementById(containerId).appendChild(row);
  scrollChatToBottom(containerId);
}

function addUserBubble(containerId, text) {
  const row = document.createElement("div");
  row.className = "bubble-row user";
  row.innerHTML = `<div class="bubble user">${escapeHtml(text)}</div>`;
  document.getElementById(containerId).appendChild(row);
  scrollChatToBottom(containerId);
}

function addTypingIndicator(containerId) {
  const el = document.createElement("div");
  el.className = "typing-indicator";
  el.textContent = "⏳ Gemini is thinking...";
  document.getElementById(containerId).appendChild(el);
  scrollChatToBottom(containerId);
  return el;
}

function removeTypingIndicator(el) {
  el && el.remove();
}

function scrollChatToBottom(containerId) {
  const el = document.getElementById(containerId);
  if (el) requestAnimationFrame(() => el.scrollTop = el.scrollHeight);
}

// keyboard: Enter to send (Shift+Enter = newline)
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    if (document.activeElement === document.getElementById("onboard-input")) {
      e.preventDefault(); sendOnboardMessage();
    } else if (document.activeElement === document.getElementById("tutor-input")) {
      e.preventDefault(); sendTutorMessage();
    }
  }
});

// ============================================================
//  DATA HELPERS
// ============================================================

function normalizeAppData(migrateSolvedProblems = false) {
  appData.dailySessions = Array.isArray(appData.dailySessions) ? appData.dailySessions : [];
  appData.progressMap = appData.progressMap || {};
  appData.mistakeLog = Array.isArray(appData.mistakeLog) ? appData.mistakeLog : [];
  appData.problemDoneMap = appData.problemDoneMap && typeof appData.problemDoneMap === "object" ? appData.problemDoneMap : {};

  if (migrateSolvedProblems) {
    appData.dailySessions.forEach(session => {
      (session.solvedProblems || []).forEach(problem => {
        if (!problem || !problem.name) return;
        getTopicDoneMap(session.topicId)[problem.name] = true;
      });
    });
  }
}

function getProblemKey(problem) {
  return problem && problem.name ? problem.name : "";
}

function getTopicDoneMap(topicId, create = true) {
  appData.problemDoneMap = appData.problemDoneMap || {};
  if (!appData.problemDoneMap[topicId] && create) appData.problemDoneMap[topicId] = {};
  return appData.problemDoneMap[topicId] || {};
}

function getMarkedProblemNames(topicId) {
  const doneMap = getTopicDoneMap(topicId, false);
  return new Set(Object.keys(doneMap).filter(name => doneMap[name]));
}

function setProblemMarkedDone(topicId, problem, checked) {
  const key = getProblemKey(problem);
  if (!key) return;

  const doneMap = getTopicDoneMap(topicId);
  if (checked) {
    doneMap[key] = true;
  } else {
    delete doneMap[key];
    if (Object.keys(doneMap).length === 0) delete appData.problemDoneMap[topicId];
  }
}

function getFirstSolvedDate(topicId, problemName) {
  const session = (appData.dailySessions || []).find(s =>
    s.topicId === topicId && (s.solvedProblems || []).some(p => p.name === problemName)
  );
  return session ? session.date : "";
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function hasDoneSessionToday() {
  const today = todayStr();
  return (appData.dailySessions || []).some(s => s.date === today && !s.skipped);
}

function markTodayActive() {
  const today = todayStr();
  const yesterday = addDays(today, -1);
  const sd = appData.streakData;

  if (sd.lastActiveDate === today) return;
  if (sd.lastActiveDate === yesterday) {
    sd.currentStreak++;
  } else {
    sd.currentStreak = 1;
  }
  if (sd.currentStreak > sd.longestStreak) sd.longestStreak = sd.currentStreak;
  sd.lastActiveDate = today;
}

function updateStreakIfNeeded() {
  // Check if streak is broken (last active was > 1 day ago)
  const sd = appData.streakData;
  if (!sd.lastActiveDate) return;
  const yesterday = addDays(todayStr(), -1);
  if (sd.lastActiveDate < yesterday) {
    sd.currentStreak = 0;
    saveData();
  }
}

function isStreakBroken() {
  const sd = appData.streakData;
  if (!sd.lastActiveDate) return false;
  const yesterday = addDays(todayStr(), -1);
  return sd.lastActiveDate < yesterday && sd.currentStreak === 0 && (appData.dailySessions || []).length > 0;
}

function getLast30Days() {
  const result = {};
  for (let i = 29; i >= 0; i--) {
    const d = addDays(todayStr(), -i);
    result[d] = "none";
  }
  (appData.dailySessions || []).forEach(s => {
    if (result.hasOwnProperty(s.date)) {
      result[s.date] = s.skipped ? "skip" : s.lazyMode ? "lazy" : "full";
    }
  });
  return result;
}

function getMistakesDueToday() {
  const today = todayStr();
  return (appData.mistakeLog || []).filter(m => m.nextReviewDate && m.nextReviewDate <= today);
}

function getTotalProblemsSolved() {
  return Object.values(appData.problemDoneMap || {})
    .reduce((sum, topicMap) => sum + Object.values(topicMap || {}).filter(Boolean).length, 0);
}

function getTopicsDone() {
  return Object.values(appData.progressMap || {}).filter(p => p.status === "done").length;
}

function getSkipsUsed() {
  return (appData.dailySessions || []).filter(s => s.skipped).length;
}

function logMistake(topicId, topicName, problemName, type) {
  const id = Math.random().toString(36).slice(2);
  const today = todayStr();
  appData.mistakeLog = appData.mistakeLog || [];
  appData.mistakeLog.push({
    id, topicId, topicName, problemName,
    date: today, type,
    nextReviewDate: addDays(today, 3),
    reviewCount: 0
  });
  saveData();
}

function extractPhase(text) {
  const m = text.match(/\[PHASE:([1-4])\]/);
  return m ? parseInt(m[1]) : -1;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove("hidden");
}
