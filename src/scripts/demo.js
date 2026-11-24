/* The demo runs on the app's constants for ADD at skill level 3.
   VIEW  = 900 + 450 * (3 + 2) = 3150 ms   (difficulty_config.json · view)
   ANSWER = 5000 + 3000 * (3 - 1) = 11000 ms
   PEEK   = 2000 ms                        (practice.peekRevealMs) */

const QUESTIONS = [
  { a: 476, b: 83 },
  { a: 358, b: 47 },
  { a: 624, b: 89 },
  { a: 537, b: 68 },
  { a: 291, b: 76 },
];

const VIEW_MS = 3150;
const ANSWER_MS = 11000;
const PEEK_MS = 2000;
const BEADS = 5;

const COACH = {
  Exact: "Try a larger stack when you are ready to hold more expressions in memory.",
  Timeout: "Estimate the leading digits first, then finish the calculation.",
  "Off by 1": "Double-check the units digit before you submit.",
  "Digit swap": "Check tens and units before you submit your answer.",
  "1-digit slip": "Recheck the middle digits of your answer.",
  "Magnitude error": "Estimate how many digits the answer should have.",
  Miss: "Recheck the middle digits of your answer.",
};

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initDemo() {
  const panel = document.querySelector("[data-stage]")?.closest(".panel");
  if (!panel) return;

  const $ = (sel) => panel.querySelector(sel);

  const els = {
    rod: $("[data-rod]"),
    score: $("[data-score]"),
    stage: $("[data-stage]"),
    phase: $("[data-phase]"),
    expr: $("[data-expr]"),
    mask: $("[data-mask]"),
    timer: $("[data-timer]"),
    hint: $("[data-hint]"),
    count: $("[data-count]"),
    answer: $("[data-answer]"),
    input: $("[data-input]"),
    peek: $("[data-peek]"),
    keypad: $("[data-keypad]"),
    start: $("[data-start]"),
    submit: $("[data-submit]"),
    reveal: $("[data-reveal]"),
    next: $("[data-next]"),
    summary: $("[data-summary]"),
    again: $("[data-again]"),
    live: $("[data-live]"),
    reset: $("[data-reset]"),
    rCorrect: $("[data-r-correct]"),
    rYours: $("[data-r-yours]"),
    rDiff: $("[data-r-diff]"),
    rDigits: $("[data-r-digits]"),
    rType: $("[data-r-type]"),
    rCoach: $("[data-r-coach]"),
    sCorrect: $("[data-s-correct]"),
    sLine: $("[data-s-line]"),
    roundLabel: $("[data-round-label]"),
  };

  const state = {
    phase: "idle",
    round: 0,
    correct: 0,
    peeked: false,
    raf: 0,
    timers: [],
  };

  const beads = [];
  if (els.rod) {
    for (let i = 0; i < BEADS; i += 1) {
      const bead = document.createElement("span");
      bead.className = "bead";
      els.rod.appendChild(bead);
      beads.push(bead);
    }
  }

  const clearTimers = () => {
    if (state.raf) cancelAnimationFrame(state.raf);
    state.raf = 0;
    for (const id of state.timers) window.clearTimeout(id);
    state.timers = [];
  };

  const later = (fn, ms) => {
    const id = window.setTimeout(fn, ms);
    state.timers.push(id);
    return id;
  };

  const announce = (text) => {
    if (els.live) els.live.textContent = text;
  };

  const expression = (q) => `${q.a} + ${q.b}`;
  const answerOf = (q) => q.a + q.b;

  const layoutFrame = () => {
    if (!els.rod || beads.length === 0) return;
    const width = els.rod.clientWidth;
    if (!width) return;
    const pitch = width / 8.4;
    const beadWidth = Math.min(pitch * 0.85, 44);
    beads.forEach((bead, i) => {
      bead.style.width = `${beadWidth}px`;
      const left = i < state.correct ? i * pitch : width - (BEADS - i) * pitch;
      bead.style.left = `${Math.max(0, Math.min(width - beadWidth, left))}px`;
    });
  };

  const paintFrame = () => {
    beads.forEach((bead, i) => bead.classList.toggle("is-filled", i < state.correct));
    if (els.score) els.score.textContent = `${state.correct} of ${BEADS} held`;
    layoutFrame();
  };

  const setPhase = (key) => {
    state.phase = key;
    const labels = {
      idle: "Ready",
      show: "Memorize",
      mask: "Hold it…",
      answer: "Answer",
      reveal: "Reveal",
      summary: "Round complete",
    };
    if (els.phase) els.phase.textContent = labels[key] ?? "Ready";
    if (els.stage) els.stage.dataset.state = key;
  };

  const bar = (fraction) => {
    if (els.timer) els.timer.style.transform = `scaleX(${Math.max(0, Math.min(1, fraction))})`;
  };

  const runCountdown = (duration, onDone) => {
    const started = performance.now();
    const tick = (now) => {
      const elapsed = now - started;
      bar(1 - elapsed / duration);
      if (elapsed >= duration) {
        state.raf = 0;
        onDone();
        return;
      }
      state.raf = requestAnimationFrame(tick);
    };
    state.raf = requestAnimationFrame(tick);
  };

  const resetPanel = () => {
    clearTimers();
    state.round = 0;
    state.correct = 0;
    state.peeked = false;
    state.phase = "idle";

    if (els.mask) {
      els.mask.classList.remove("is-closed", "is-past");
    }
    if (els.expr) els.expr.innerHTML = '<span class="op">—</span>';
    if (els.expr) els.expr.classList.remove("is-peeking");
    if (els.hint)
      els.hint.textContent =
        "Press start. The expression stays for a few seconds, then the screen clears.";
    if (els.count) els.count.textContent = "00 / 05";
    if (els.answer) els.answer.hidden = true;
    if (els.keypad) els.keypad.hidden = true;
    if (els.start) els.start.hidden = false;
    if (els.reveal) els.reveal.hidden = true;
    if (els.summary) els.summary.hidden = true;
    if (els.peek) els.peek.disabled = false;
    if (els.input) els.input.value = "";
    if (els.submit) els.submit.disabled = false;
    if (els.roundLabel) els.roundLabel.textContent = "ADD · L3 · STACK 1";
    bar(1);
    setPhase("idle");
    paintFrame();
    announce("Round reset.");
  };

  const maskThenAnswer = () => {
    setPhase("mask");
    if (els.mask) els.mask.classList.add("is-closed");
    const wipe = reduceMotion ? 30 : 260;
    later(() => {
      if (els.mask) els.mask.classList.add("is-past");
    }, wipe);
    later(() => {
      if (els.mask) els.mask.classList.remove("is-closed", "is-past");
      if (els.expr) els.expr.innerHTML = "";
      if (els.answer) els.answer.hidden = false;
      if (els.keypad) els.keypad.hidden = false;
      if (els.input) {
        els.input.value = "";
        els.input.focus({ preventScroll: true });
      }
      if (els.hint) els.hint.textContent = "The expression is gone. Rebuild it, then submit.";
      setPhase("answer");
      announce(`Question ${state.round + 1} of ${BEADS}. Answer now.`);
      runCountdown(ANSWER_MS, () => submit(true));
    }, wipe * 2 + 20);
  };

  const showQuestion = () => {
    clearTimers();
    const q = QUESTIONS[state.round];
    if (!q) return;

    if (els.reveal) els.reveal.hidden = true;
    if (els.summary) els.summary.hidden = true;
    if (els.answer) els.answer.hidden = true;
    if (els.keypad) els.keypad.hidden = true;
    if (els.start) els.start.hidden = true;
    if (els.mask) els.mask.classList.remove("is-closed", "is-past");
    if (els.expr) {
      els.expr.classList.remove("is-peeking");
      els.expr.innerHTML = `${q.a} <span class="op">+</span> ${q.b}`;
    }
    if (els.count) els.count.textContent = `${String(state.round + 1).padStart(2, "0")} / 05`;
    if (els.hint) els.hint.textContent = "Hold the expression. It disappears on its own.";
    if (els.peek) els.peek.disabled = false;
    state.peeked = false;
    bar(1);
    setPhase("show");
    announce(`Question ${state.round + 1} of ${BEADS}. Memorize the expression.`);

    runCountdown(VIEW_MS, maskThenAnswer);
  };

  const classify = (raw, correct) => {
    if (raw === "" || raw === null) return "Timeout";
    const user = Number(raw);
    if (!Number.isFinite(user)) return "Miss";
    if (user === correct) return "Exact";
    const u = String(user);
    const c = String(correct);
    if (Math.abs(user - correct) === 1) return "Off by 1";
    if (u.length !== c.length) return "Magnitude error";

    let adjacentSwap = false;
    for (let i = 0; i < u.length - 1; i += 1) {
      const chars = u.split("");
      [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
      if (chars.join("") === c) {
        adjacentSwap = true;
        break;
      }
    }
    if (adjacentSwap) return "Digit swap";

    let differing = 0;
    for (let i = 0; i < c.length; i += 1) if (u[i] !== c[i]) differing += 1;
    if (differing === 1) return "1-digit slip";
    return "Miss";
  };

  const digitMatches = (raw, correct) => {
    const c = String(correct);
    const u = String(raw ?? "").padStart(c.length, " ").slice(-c.length);
    let matches = 0;
    for (let i = 0; i < c.length; i += 1) if (u[i] === c[i]) matches += 1;
    return { matches, length: c.length, aligned: u };
  };

  const renderDigits = (aligned, correct) => {
    if (!els.rDigits) return;
    els.rDigits.textContent = "";
    for (let i = 0; i < correct.length; i += 1) {
      const span = document.createElement("span");
      const mine = aligned[i] ?? " ";
      span.textContent = mine.trim() === "" ? "·" : mine;
      span.className = mine === correct[i] ? "ok" : "bad";
      els.rDigits.appendChild(span);
    }
  };

  const submit = (timedOut = false) => {
    if (state.phase !== "answer") return;
    clearTimers();
    bar(0);

    const q = QUESTIONS[state.round];
    const correct = answerOf(q);
    const raw = timedOut ? "" : (els.input?.value ?? "").replace(/\D/g, "");
    const type = timedOut ? "Timeout" : classify(raw, correct);

    if (type === "Exact") state.correct += 1;
    paintFrame();

    const { matches, length, aligned } = digitMatches(raw, correct);
    const userNumber = raw === "" ? null : Number(raw);
    const diff = userNumber === null ? null : userNumber - correct;

    if (els.answer) els.answer.hidden = true;
    if (els.keypad) els.keypad.hidden = true;
    if (els.hint) els.hint.textContent = "";
    if (els.rCorrect) els.rCorrect.textContent = String(correct);
    if (els.rYours) els.rYours.textContent = userNumber === null ? "—" : String(userNumber);
    if (els.rDiff) {
      if (diff === null) els.rDiff.textContent = "No answer";
      else if (diff === 0) els.rDiff.textContent = "Exact";
      else els.rDiff.textContent = `${diff > 0 ? "+" : "−"}${Math.abs(diff)} ${diff > 0 ? "too high" : "too low"}`;
    }
    if (els.rType) els.rType.textContent = type;
    if (els.rCoach) els.rCoach.textContent = COACH[type] ?? COACH.Miss;
    renderDigits(aligned, String(correct));

    if (els.next) {
      els.next.textContent =
        state.round === QUESTIONS.length - 1 ? "See the round" : "Next expression";
    }
    if (els.reveal) els.reveal.hidden = false;
    setPhase("reveal");
    announce(
      `${type === "Exact" ? "Correct" : "Not quite"}. The answer is ${correct}. ` +
        `${matches} of ${length} digits matched.`,
    );
  };

  const finish = () => {
    if (els.reveal) els.reveal.hidden = true;
    if (els.expr) els.expr.innerHTML = "";
    if (els.count) els.count.textContent = "05 / 05";
    if (els.sCorrect) els.sCorrect.textContent = String(state.correct);
    if (els.sLine) {
      if (state.correct === BEADS)
        els.sLine.textContent =
          "Every expression came back intact. The app starts at Level 1 and gets harder from there.";
      else if (state.correct === 0)
        els.sLine.textContent =
          "Nothing held this time. The frame stays honest — that is the whole point of it.";
      else
        els.sLine.textContent = `You held ${state.correct} of ${BEADS}. The beads only fill on answers that survived.`;
    }
    if (els.summary) els.summary.hidden = false;
    setPhase("summary");
    announce(`Round complete. ${state.correct} of ${BEADS} correct.`);
  };

  const next = () => {
    state.round += 1;
    if (state.round >= QUESTIONS.length) finish();
    else showQuestion();
  };

  const start = () => {
    resetPanel();
    if (els.start) els.start.hidden = true;
    showQuestion();
  };

  const peek = () => {
    if (els.peek?.disabled) return;
    const q = QUESTIONS[state.round];
    if (!q || els.expr === null) return;
    state.peeked = true;
    if (els.peek) els.peek.disabled = true;
    if (els.expr) {
      els.expr.classList.add("is-peeking");
      els.expr.innerHTML = `${q.a} <span class="op">+</span> ${q.b}`;
    }
    if (els.hint) els.hint.textContent = "Peek used. In the app this question scores 0 XP.";
    announce("Expression revealed for a moment.");
    later(() => {
      if (!els.expr) return;
      els.expr.classList.remove("is-peeking");
      els.expr.innerHTML = "";
    }, PEEK_MS);
  };

  const pressKey = (key) => {
    if (state.phase !== "answer" || !els.input) return;
    if (key === "back") {
      els.input.value = els.input.value.slice(0, -1);
    } else if (/^\d$/.test(key) && els.input.value.length < 7) {
      els.input.value += key;
    }
    els.input.focus({ preventScroll: true });
  };

  // events
  els.start?.addEventListener("click", start);
  els.reset?.addEventListener("click", resetPanel);
  els.again?.addEventListener("click", start);
  els.next?.addEventListener("click", next);
  els.submit?.addEventListener("click", () => submit(false));
  els.peek?.addEventListener("click", peek);

  const keypadButtons = Array.from(panel.querySelectorAll("[data-key]"));
  keypadButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      pressKey(button.dataset.key ?? "");
    });
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      keypadButtons[(index + direction + keypadButtons.length) % keypadButtons.length].focus();
    });
  });

  els.input?.addEventListener("input", () => {
    els.input.value = els.input.value.replace(/\D/g, "").slice(0, 7);
  });

  els.input?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (state.phase !== "answer") {
      if (event.key === "Escape" && state.phase !== "idle") resetPanel();
      return;
    }
    if (event.target instanceof HTMLInputElement && event.target !== els.input) return;
    if (/^\d$/.test(event.key)) {
      pressKey(event.key);
      event.preventDefault();
    } else if (event.key === "Backspace") {
      pressKey("back");
      event.preventDefault();
    } else if (event.key === "Enter" && event.target !== els.peek) {
      event.preventDefault();
      submit(false);
    } else if (event.key === "Escape") {
      event.preventDefault();
      resetPanel();
    }
  });

  window.addEventListener("resize", layoutFrame);

  layoutFrame();
  paintFrame();
  setPhase("idle");

  return { start, reset: resetPanel };
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDemo, { once: true });
  } else {
    initDemo();
  }
}
