const state = {
  lang: "en",
  speedIndex: 1,
  answers: Array(5).fill(null),
  correct: Array(5).fill(false),
  checked: Array(5).fill(false),
  lab: {
    tileIndex: 1,
    demand: 7,
    capacity: 2,
    alpha: 0.5,
  },
};

const speeds = [0.75, 1, 1.25, 1.5, 2];
const baseWidths = { A: 2, B: 2, C: 2, D: 2, E: 1, F: 1 };

const quiz = [
  {
    en: "What does this lab primarily adjust?",
    zh: "本实验主要调整什么？",
    options: [
      { en: "The modeled width of cells", zh: "单元在布局模型中的宽度" },
      { en: "The row order in a standard-cell library", zh: "标准单元库中的行顺序" },
      { en: "The clock-tree topology", zh: "时钟树拓扑" },
    ],
    answer: 0,
    explainEn:
      "Cell inflation scales the dimension used by the placement model; this toy changes width.",
    explainZh: "单元膨胀缩放布局模型使用的维度；本实验调整宽度。",
  },
  {
    en: "What is the toy chip divided into?",
    zh: "本实验把示例芯片划分成什么？",
    options: [
      { en: "A 4 × 2 GCell grid over a 12 × 8 chip", zh: "12×8 芯片上的 4×2 GCell 网格" },
      { en: "A 16 × 16 switch matrix", zh: "16×16 开关矩阵" },
      { en: "Three rows of standard-cell sites", zh: "三行标准单元站点" },
    ],
    answer: 0,
    explainEn: "The source lab uses a 12 by 8 chip and four by two GCell grid.",
    explainZh: "源实验使用 12×8 芯片和 4×2 GCell 网格。",
  },
  {
    en: "Demand is 7 and capacity is 2. What are congestion and overflow?",
    zh: "需求为 7、容量为 2。拥挤度和溢出分别是多少？",
    options: [
      { en: "Congestion 3.5; overflow 5", zh: "拥挤度 3.5，溢出 5" },
      { en: "Congestion 5; overflow 3.5", zh: "拥挤度 5，溢出 3.5" },
      { en: "Congestion 9; overflow 2", zh: "拥挤度 9，溢出 2" },
    ],
    answer: 0,
    explainEn:
      "Congestion is 7 / 2 = 3.5. Overflow is max(0, 7 − 2) = 5.",
    explainZh: "拥挤度为 7 / 2 = 3.5；溢出为 max(0, 7 − 2) = 5。",
  },
  {
    en: "With c = 3.5 and α = 0.5, what is the width multiplier?",
    zh: "当 c = 3.5、α = 0.5 时，宽度倍率是多少？",
    options: [
      { en: "2.25×", zh: "2.25 倍" },
      { en: "1.75×", zh: "1.75 倍" },
      { en: "3.5×", zh: "3.5 倍" },
    ],
    answer: 0,
    explainEn:
      "The multiplier is 1 + 0.5 × (3.5 − 1) = 2.25.",
    explainZh: "倍率为 1 + 0.5 × (3.5 − 1) = 2.25。",
  },
  {
    en: "A cell sits in a GCell with congestion 0.8. What should inflation do?",
    zh: "某个单元所在 GCell 的拥挤度为 0.8，膨胀应如何处理？",
    options: [
      { en: "Keep the exact base width", zh: "保持精确的基础宽度" },
      { en: "Inflate the width by 0.8×", zh: "把宽度放大 0.8 倍" },
      { en: "Inflate every cell in the chip", zh: "膨胀芯片中的所有单元" },
    ],
    answer: 0,
    explainEn:
      "The rule applies only when c > 1. A quiet tile keeps its base width.",
    explainZh: "规则只在 c > 1 时生效；安静网格保持基础宽度。",
  },
];

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    const active = button.dataset.setLang === lang;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  setVideoLanguage(lang);
  renderQuiz();
  renderLabExplanation();
}

function setVideoLanguage(lang) {
  const videos = {
    en: document.querySelector("#video-en"),
    zh: document.querySelector("#video-zh"),
  };
  const previous = currentVideo();
  const previousTime = Number.isFinite(previous.currentTime) ? previous.currentTime : 0;
  const wasPlaying = !previous.paused;

  document.querySelectorAll("[data-video-lang]").forEach((button) => {
    const active = button.dataset.videoLang === lang;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  Object.entries(videos).forEach(([videoLang, video]) => {
    const active = videoLang === lang;
    if (!active) video.pause();
    video.hidden = !active;
    video.classList.toggle("is-current", active);
    video.playbackRate = speeds[state.speedIndex];
  });

  const next = videos[lang];
  if (next !== previous && next.readyState > 0) {
    next.currentTime = Math.min(previousTime, Math.max(0, next.duration || previousTime));
    if (wasPlaying) next.play().catch(() => {});
  }
  updateTime();
}

function currentVideo() {
  return state.lang === "zh"
    ? document.querySelector("#video-zh")
    : document.querySelector("#video-en");
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const whole = Math.max(0, Math.floor(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}

function updateTime() {
  const video = currentVideo();
  document.querySelector("#time-readout").textContent =
    `${formatTime(video.currentTime)} / ${formatTime(video.duration || 216.63)}`;
}

function seekVideo(video, targetTime) {
  const applySeek = () => {
    const duration = Number.isFinite(video.duration) ? video.duration : targetTime;
    video.currentTime = Math.min(targetTime, duration);
    updateTime();
  };

  if (video.readyState > 0) {
    applySeek();
    return;
  }

  video.addEventListener("loadedmetadata", applySeek, { once: true });
  video.load();
}

function cycleSpeed() {
  state.speedIndex = (state.speedIndex + 1) % speeds.length;
  const speed = speeds[state.speedIndex];
  document.querySelectorAll("video").forEach((video) => {
    video.playbackRate = speed;
  });
  document.querySelector("#speed-value").textContent = `${speed}×`;
}

function renderQuiz() {
  const list = document.querySelector("#quiz-list");
  list.innerHTML = "";

  quiz.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "quiz-card";

    const head = document.createElement("div");
    head.className = "quiz-head";
    head.innerHTML = `
      <span class="quiz-index">${String(index + 1).padStart(2, "0")}</span>
      <h3 class="quiz-question"><span>${state.lang === "en" ? item.en : item.zh}</span></h3>
    `;

    const options = document.createElement("div");
    options.className = "quiz-options";
    item.options.forEach((option, optionIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      if (state.answers[index] === optionIndex) button.classList.add("is-selected");
      if (state.checked[index] && optionIndex === item.answer) button.classList.add("is-correct");
      if (
        state.checked[index] &&
        state.answers[index] === optionIndex &&
        optionIndex !== item.answer
      ) {
        button.classList.add("is-wrong");
      }
      button.innerHTML = `
        <span class="option-key">${String.fromCharCode(65 + optionIndex)}</span>
        <span>${state.lang === "en" ? option.en : option.zh}</span>
      `;
      button.addEventListener("click", () => {
        if (state.correct[index]) return;
        state.answers[index] = optionIndex;
        state.checked[index] = false;
        renderQuiz();
      });
      options.appendChild(button);
    });

    const actions = document.createElement("div");
    actions.className = "quiz-actions";
    const check = document.createElement("button");
    check.type = "button";
    check.className = "check-button";
    check.textContent = state.lang === "en" ? "Check answer" : "提交答案";
    check.disabled = state.answers[index] === null || state.correct[index];
    check.addEventListener("click", () => {
      state.checked[index] = true;
      state.correct[index] = state.answers[index] === item.answer;
      renderQuiz();
    });

    const feedback = document.createElement("div");
    const isCorrect = state.checked[index] && state.answers[index] === item.answer;
    const isWrong = state.checked[index] && state.answers[index] !== item.answer;
    feedback.className = "quiz-feedback";
    if (isCorrect) feedback.classList.add("is-visible", "is-correct");
    if (isWrong) feedback.classList.add("is-visible", "is-wrong");
    feedback.textContent = isCorrect
      ? state.lang === "en"
        ? `Correct. ${item.explainEn}`
        : `正确。${item.explainZh}`
      : state.lang === "en"
        ? `Not yet. ${item.explainEn}`
        : `还不对。${item.explainZh}`;

    actions.append(check, feedback);
    card.append(head, options, actions);
    list.appendChild(card);
  });
  updateScore();
}

function updateScore() {
  const score = state.correct.filter(Boolean).length;
  document.querySelector("#score-value").textContent = String(score);
  document.querySelector("#score-progress").style.width = `${score * 20}%`;
  const message = document.querySelector("#score-message");
  if (score === 5) {
    message.innerHTML =
      state.lang === "en"
        ? "<span class='en'>Signal clear. All five checks pass.</span>"
        : "<span class='zh'>信号清晰，五道检查全部通过。</span>";
  } else if (score >= 3) {
    message.innerHTML =
      state.lang === "en"
        ? "<span class='en'>Strong progress. Recheck the local rule.</span>"
        : "<span class='zh'>进展不错，再检查局部规则。</span>";
  } else {
    message.innerHTML =
      state.lang === "en"
        ? "<span class='en'>Read congestion, then scale widths.</span>"
        : "<span class='zh'>先读拥挤度，再缩放宽度。</span>";
  }
}

function resetQuiz() {
  state.answers.fill(null);
  state.correct.fill(false);
  state.checked.fill(false);
  renderQuiz();
}

function labMetrics() {
  const congestion = state.lab.demand / state.lab.capacity;
  const overflow = Math.max(0, state.lab.demand - state.lab.capacity);
  const multiplier = congestion > 1
    ? 1 + state.lab.alpha * (congestion - 1)
    : 1;
  return { congestion, overflow, multiplier };
}

function formatNumber(value) {
  return Number(value).toFixed(2);
}

function renderInteractiveGrid(metrics, widths) {
  const grid = document.querySelector("#interactive-grid");
  grid.innerHTML = "";
  for (let index = 0; index < 8; index += 1) {
    const i = index % 4;
    const j = index < 4 ? 1 : 0;
    const selected = index === state.lab.tileIndex;
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = `interactive-tile${selected ? " is-selected" : ""}`;
    tile.setAttribute("aria-pressed", String(selected));
    tile.setAttribute("aria-label", `GCell ${i}, ${j}`);
    tile.innerHTML = `
      <span>GCell (${i}, ${j})</span>
      <b>${selected ? formatNumber(metrics.congestion) : "—"}</b>
    `;
    if (selected) {
      const miniCells = document.createElement("div");
      miniCells.className = "mini-cells";
      Object.entries(widths).forEach(([id, width]) => {
        const cell = document.createElement("i");
        cell.textContent = id;
        cell.style.setProperty("--cell-width", Math.round(13 + width * 3.6));
        miniCells.appendChild(cell);
      });
      tile.appendChild(miniCells);
    }
    tile.addEventListener("click", () => {
      state.lab.tileIndex = index;
      renderLab();
    });
    grid.appendChild(tile);
  }
}

function renderSeedCells(widths) {
  const container = document.querySelector("#seed-cells");
  container.innerHTML = "";
  Object.entries(widths).forEach(([id, width]) => {
    const cell = document.createElement("span");
    cell.className = `seed-cell${id === "E" || id === "F" ? " gold" : ""}`;
    cell.textContent = id;
    cell.dataset.width = `${width.toFixed(width % 1 === 0 ? 0 : 2)}w`;
    cell.style.setProperty("--width", `${Math.round(20 + width * 7)}px`);
    container.appendChild(cell);
  });
}

function renderLabExplanation() {
  const { congestion, overflow, multiplier } = labMetrics();
  const explanation = document.querySelector("#lab-explanation");
  if (congestion > 1) {
    explanation.innerHTML = `
      <span class="en">c = ${formatNumber(state.lab.demand)} / ${formatNumber(state.lab.capacity)} = ${formatNumber(congestion)}. Since c &gt; 1, width is scaled by ${formatNumber(multiplier)}×. Overflow is ${formatNumber(overflow)}.</span>
      <span class="zh">c = ${formatNumber(state.lab.demand)} / ${formatNumber(state.lab.capacity)} = ${formatNumber(congestion)}。因为 c &gt; 1，宽度乘以 ${formatNumber(multiplier)}。溢出为 ${formatNumber(overflow)}。</span>
    `;
  } else {
    explanation.innerHTML = `
      <span class="en">c = ${formatNumber(congestion)}. Because c ≤ 1, every cell keeps its base width. The seed is visible, but it is not a hot region.</span>
      <span class="zh">c = ${formatNumber(congestion)}。因为 c ≤ 1，所有单元保持基础宽度。种子仍可观察，但它不是热点区域。</span>
    `;
  }
}

function renderLab() {
  const metrics = labMetrics();
  const widths = Object.fromEntries(
    Object.entries(baseWidths).map(([id, width]) => [
      id,
      width * metrics.multiplier,
    ])
  );
  const i = state.lab.tileIndex % 4;
  const j = state.lab.tileIndex < 4 ? 1 : 0;

  document.querySelector("#demand-range").value = String(state.lab.demand);
  document.querySelector("#capacity-range").value = String(state.lab.capacity);
  document.querySelector("#alpha-range").value = String(state.lab.alpha);
  document.querySelector("#demand-value").textContent = state.lab.demand.toFixed(1);
  document.querySelector("#capacity-value").textContent = state.lab.capacity.toFixed(1);
  document.querySelector("#alpha-value").textContent = state.lab.alpha.toFixed(2);
  document.querySelector("#tile-label").textContent = `GCell (${i}, ${j})`;
  document.querySelector("#rule-state").textContent = metrics.congestion > 1 ? "HOT" : "QUIET";
  document.querySelector("#rule-state").style.color =
    metrics.congestion > 1 ? "var(--gold-bright)" : "var(--green-bright)";
  document.querySelector("#coordinate-state").textContent = "FIXED";
  document.querySelector("#congestion-value").textContent = formatNumber(metrics.congestion);
  document.querySelector("#overflow-value").textContent = formatNumber(metrics.overflow);
  document.querySelector("#multiplier-value").textContent = formatNumber(metrics.multiplier);
  document.querySelector("#wide-result").textContent =
    `2 → ${formatNumber(widths.A)}`;
  document.querySelector("#narrow-result").textContent =
    `1 → ${formatNumber(widths.E)}`;

  renderInteractiveGrid(metrics, widths);
  renderSeedCells(widths);
  renderLabExplanation();

  document.querySelectorAll("[data-preset]").forEach((button) => {
    const isClustered = button.dataset.preset === "clustered";
    const active =
      (isClustered && state.lab.demand === 7 && state.lab.capacity === 2) ||
      (!isClustered && state.lab.demand === 1.6 && state.lab.capacity === 2);
    button.classList.toggle("is-active", active);
  });
}

function applyPreset(name) {
  state.lab.tileIndex = 1;
  if (name === "quiet") {
    Object.assign(state.lab, { demand: 1.6, capacity: 2, alpha: 0.5 });
  } else {
    Object.assign(state.lab, { demand: 7, capacity: 2, alpha: 0.5 });
  }
  renderLab();
}

document.querySelectorAll("[data-set-lang]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.setLang));
});

document.querySelectorAll("[data-video-lang]").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.videoLang));
});

document.querySelectorAll("[data-seek]").forEach((button) => {
  button.addEventListener("click", () => {
    const video = currentVideo();
    seekVideo(video, Number(button.dataset.seek));
    video.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

document.querySelector("#speed-button").addEventListener("click", cycleSpeed);
document.querySelector("#reset-quiz").addEventListener("click", resetQuiz);
document.querySelector("#lab-reset").addEventListener("click", () => applyPreset("clustered"));
document.querySelectorAll("[data-preset]").forEach((button) => {
  button.addEventListener("click", () => applyPreset(button.dataset.preset));
});

document.querySelector("#demand-range").addEventListener("input", (event) => {
  state.lab.demand = Number(event.target.value);
  renderLab();
});
document.querySelector("#capacity-range").addEventListener("input", (event) => {
  state.lab.capacity = Number(event.target.value);
  renderLab();
});
document.querySelector("#alpha-range").addEventListener("input", (event) => {
  state.lab.alpha = Number(event.target.value);
  renderLab();
});

document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("timeupdate", () => {
    if (video === currentVideo()) updateTime();
  });
  video.addEventListener("loadedmetadata", updateTime);
});

renderQuiz();
renderLab();
