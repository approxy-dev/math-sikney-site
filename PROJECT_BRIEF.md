# Math Sikney — launch site brief

> **Historical Phase 0 brief (24 November 2026).** The site has since shipped as a 1.2.0 release page with a signed direct-download APK, GitHub and feedback links, a text-only Devanagari note in place of the Nepali screenshot, and 1.2.0 screenshots. Current facts live in `README.md` and `QA_REPORT.md`; where this brief disagrees with them, they win.

**Phase 0 deliverable.** Written 24 November 2026 from the app source at
`E:\Math-Sikney-main\Math-Sikney-main` (the canonical build) and the spec pack in
`DOC/`. Every claim below is tagged with where it comes from. Nothing here is
invented; where the product is silent, the gap is listed in §8 and §9 instead of
being filled with marketing copy.

Status key:

- **BUILT** — present in the canonical source, covered by tests or render evidence.
- **IN PROGRESS** — in the working tree on an unreleased version, behind a build flag or preset.
- **PLANNED** — written in a spec or the improvement report, no implementation in the tree.
- **MISSING** — needed for the site, does not exist anywhere yet.

---

## 1. What the product actually is

| | |
|---|---|
| Product name in app | **Mental Math Visualizer** (`app_name`, `res/values/strings.xml`) |
| Project / package name | **Math Sikney** — `app.mathsikney.mmv` (`app/build.gradle.kts`) |
| Platform | Native Android, Kotlin + Jetpack Compose, Material 3 |
| minSdk / target | 26 (Android 8.0) / 36 |
| Version in tree | `versionName 1.2.0`, `versionCode 3` |
| Last documented release | **1.1.0** (code 2), report dated 18 Nov 2026; handbook updated 19 Nov 2026 |
| Release artifacts | `app-debug.apk` (22 MB), `app-release-unsigned.apk` (2.26 MB) — **no signed build, no store listing** |
| Network | **No `INTERNET` permission.** Fully offline; Room + DataStore; manual JSON/CSV export |
| Languages | English, Nepali; Latin or Devanagari numerals |
| Price | Not stated anywhere. **Ask.** |
| Team | Not stated anywhere. **Ask.** |

**One line, from the app itself:** *Memorize the expression, then solve it after it disappears.*
(`setup_intro`) and *Visualize. Hold. Solve.* (`onboarding_title`).

**The vision, from `DOC/01_PRD.md`:** "Make people genuinely good at holding numbers in their
mind — see it, hold it, compute it, answer. Turn that grind into a ranked, collectible,
increasingly brutal game."

### The core loop (this is the whole product)

`SHOW expression → MASK (it disappears) → ANSWER from memory → REVEAL`
Reveal shows the signed difference, how many digits matched, and a classified error type
(`err_type_carry`, `err_type_transposition`, `err_type_magnitude`, …). Wrong answers get a coach
note about the specific mistake (`coach_carry`, `coach_swap`, `coach_size`, …).

Stacks raise the load: more expressions held at once, answered in order, called order, reverse
order, or shuffled. This is the thing the site must make someone *feel* in ten seconds.

---

## 2. Who the site is for

Straight from the PRD personas, narrowed to people who would visit a launch page:

1. **Exam-speed students (14–22)** — entrance-test pressure, want speed and accuracy, respond to a
   visible ladder and a daily target.
2. **Adults rebuilding mental arithmetic** — short sessions, streaks, no account, no ads.
3. **Abacus / anzan learners** — already understand visualization drills; the stack + mask + called
   order is the feature that convinces them.
4. **Grinders** — want a hard ladder; Grandmaster, hearts, 40 badges.

Not the audience: children under 13 as a primary segment (kid mode is `PLANNED`, and the app ships
an age gate only as an optional onboarding field), and anyone who needs cloud sync or multi-device.

---

## 3. The one job of the site

> Convince a skeptical, numerate visitor that this is a real, finished-feeling training system —
> not another flashcard app — by letting them fail once, correctly, in the browser.

The site is **not** a download funnel yet. There is no store listing. Its honest conversion is:
*play the demo → understand the loop → want the release → follow the build.*

**Success criteria for the build**

- A visitor can complete one full round in the demo (keyboard or touch) in under 20 seconds, and the
  reveal tells them *why* they were wrong, not just that they were.
- The demo and the screenshots are visibly the same product: same loop, same palette, same numerals.
- Every number on the page traces to a config file or a string resource.
- Lighthouse mobile ≥ 95, LCP < 2 s, WCAG AA, no layout shift, works at 360 px.

---

## 4. Feature inventory

### 4.1 Built and shipping (in the 1.1.0 line)

| Area | What is true | Evidence |
|---|---|---|
| Round engine | SHOW → MASK → ANSWER → REVEAL with per-phase timers, pause, resume, interrupted-match recovery, forfeit penalty | `feature/round/RoundScreen.kt`, `training.xml` (`recovery_*`, `grace_resume`) |
| Operations | ADD, SUB, MUL, DIV, MIXED — five separate progressions, separate ranks, separate badges | `domain/model/DomainModels.kt` |
| Skill levels | 1–12 per operation; MUL and DIV capped at 6; next level unlocked by passing a Level Test | `assets/config/difficulty_config.json` |
| Level Test | 10 questions, pass at 8 correct with at most 2 timeouts, stack 1 | same |
| Practice | stack 1–4, view time 2/3/5/8/12/20 s or Auto, visible warm-up, peek for 2 s at 0 XP, mask flash, position shuffle | `strings.xml` (`setup_*`), config `practice` |
| Ranked Match | 6 rounds at Bronze → 3 at Master/GM; tier-scaled stack, mask, hearts (from Gold), shields, called/reverse/mixed order (from Diamond/Heroic), win-streak RP bonus, forfeit = up to half max loss | `assets/config/rank_table.json`, `domain/rank/RankEngine.kt` |
| Daily Challenge | seeded, 5 rounds, stack 2, 1.25× XP, +60 completion bonus, one per day | config `daily` |
| Fails Review | drills missed expressions until 2 consecutive hits | `strings.xml` (`play_fails_desc`) |
| Ranks | 8 tiers, Bronze→Grandmaster; Bronze–Heroic have 3 divisions; Master has 10 stars; GM is open-ended. Thresholds 0 / 300 / 660 / 1110 / 1650 / 2310 / 3090 / 4090 RP | `rank_table.json`, `RankEngine.kt` |
| XP & streaks | base 10 XP, +0.35 per level, +0.25 per stack item, up to +50% speed bonus, mode multipliers (Practice 0.5× … Ranked 1.5×), +50 daily-goal bonus; account level max 100; streak freezes | `domain/xp/XpAndStreak.kt`, config `xp` |
| Achievements | **40 badges**: 6 per operation (carry, speed, stack, big numbers, perfect tests, rank) + 10 general; 3 tiers each plus one-offs | `domain/achievements/AchievementCatalog.kt`, `values/achievements.xml` |
| Stats | accuracy, mean answer time, 7/30-day trend with empty days marked, weak spots, error-type breakdown | README §App summary, `stats_*` strings |
| History | filter by operation, paged loading, per-session breakdown | `dashboard.xml` (`history_*`) |
| Profile | name 2–24 chars, one of six symbols, daily goal, editable | `isValidDisplayName`, `setup_*` |
| Settings | English/Nepali, Latin/Devanagari numerals, dark/light/system, sound, haptics, reduce motion | `settings_*` strings |
| Backup | compressed schema-2 JSON export/import with validation (16 MiB plain, 64 MiB gzip expanded), attempts CSV, local reset | README §Local data |
| Adaptive layout | bottom nav on phones, rail on wide windows, two dashboard columns, keypad beside the question in landscape | README, `build/reports/design/evidence.json` |
| Privacy | no accounts, no ads, no analytics, no cloud, no internet permission | `privacy_details` string, manifest |

### 4.2 In progress — present in the tree, not in a public release

| Area | State | Evidence |
|---|---|---|
| Stack Challenge | Built: build-your-round stacks, stack multiplier, golden tower, round receipt, optional timer. Compiled in by default (`mmv.stackRounds=true`). | `values/stack_learning.xml`, `feature/play/StackScreens.kt` |
| Learn & Explore | Built: 5 foundation skills (count to 10, bonds to 5, bonds to 10, add within 10/20), five experience presets (Kids, Teens, Student, Adult, Calm), first-run tutorial session. Gated on `LEARNING_FOUNDATIONS` and child-safe/Kids/Calm presets. | `domain/learning/Learning.kt`, `MainActivity.kt:215,377`, `values/learning*` |
| Version 1.2.0 | `versionCode 3` in the tree with the two features above; README still documents 1.1.0. Nothing published. | `app/build.gradle.kts` vs `README.md` |

### 4.3 Planned — documented, not built

From `DOC/01_PRD.md` P1/P2 and the 128-item register in `MMV_Fix_Implementation_Report.md`:

- **P1:** Flash Anzan mode, personal bests, local reminders + widget, shareable Daily result card,
  weekly summary, worked solutions, multiplication mastery heatmap, Speed Ladder, daily quests,
  printable worksheets, projector mode, named Practice presets, interactive first-run tutorial
  (partly done), two-minute session entry, classroom challenge codes.
- **P2:** Overload stacks of 5–6 (config reserves them; UI stops at 4), multiple learner profiles,
  seasons with soft reset, ghost races, pass-and-play, teacher dashboard, kid mode + parent gate,
  story mode, spaced repetition, adaptive practice, estimation rounds, extra languages, encrypted
  backups, mascot, adventure map, Sparks currency, richer sound.
- **P3:** seasonal progression, spoken questions, dyslexia/dyscalculia options, music.

### 4.4 Missing — required by the site brief, does not exist

| Need | Reality | Consequence |
|---|---|---|
| Brand logo / mascot | Only the launcher abacus glyph exists (3 rods, 3 citron beads, on `#233027`). A dead, unused `ic_mmv_icon.png` shows a cyan→purple neon hexagon from an abandoned direction. | Use the launcher abacus as the mark. Do **not** use the neon PNG — it contradicts the shipped UI. |
| Badge art | No bitmap badges. Emblems are drawn in Canvas: hexagon shield, tier colour, dot for standard tiers, white diamond for Heroic/Master/Grandmaster. | Site redraws the same geometry as SVG. That is the real badge art; inventing new illustrations would be a lie. |
| High-res screenshots | All render evidence is 1× at 360×800 (phone), 840×600 (tablet), 800×400 (landscape). Emulator cannot boot on this machine (no hypervisor driver). | Show them near native size (≤ 340 CSS px). Do not upscale to a full-bleed hero. |
| Store link | None. Release APK is unsigned. | No "Get it on Google Play" button. |
| Email capture endpoint | None. | Either supply one (Buttondown/Formspree/etc.) or ship "Follow the build" without a form. |
| Team names, roles, contact | None anywhere in the repo. | Ask before writing the team section. |
| Launch date / price | None. | Omit. |

---

## 5. Colour and type — extracted, not invented

Full values, contrast pairs and usage rules are in `DESIGN_TOKENS.md`. Summary:

- **Palette:** Ink `#151916`, Chalk `#F4F4E9`, Citron `#D4ED82`, Pine `#334A32`, plus surfaces
  `#1E241F` / `#303931` and semantic success/warning/danger. Light theme invert: paper `#F6F6EF`,
  card `#FDFDF7`, primary `#3F5C23`.
- **Tier colours:** Bronze `#E1AE88`, Silver `#C4CECC`, Gold `#F2CB79`, Platinum `#8DDBC1`,
  Diamond `#AAC9FA`, Heroic `#FFA5A2`, Master `#D7B6EB`, Grandmaster `#FFB684` (dark values).
- **Type:** Space Grotesk (headlines, UI labels), Plus Jakarta Sans (body), JetBrains Mono
  (numerals and score display). That is two typefaces plus one display face — at the brief's limit.
- **Devanagari:** not covered by the bundled fonts (all three subsets have zero Devanagari glyphs);
  Android falls back to the system font. The site must self-host a Devanagari face (Noto Sans
  Devanagari) for the Nepali sample line.
- **Shape:** radii 8 / 12 / 18 / 24 dp, 1 dp `#3D483E` card borders, no drop shadows, flat tonal
  surfaces.
- **Art motifs:** the counting frame (4 rods × 5 beads, filled from the left, unused beads pushed
  right), the abacus launcher mark, hexagon rank shields, slot dots A/B/C/D, mono numerals.

---

## 6. Site scope and section order

Static site, mobile-first, Astro or Vite + vanilla CSS/JS, no framework runtime, deployable to
Vercel. Sections:

1. **Hero** — abacus mark, wordmark, "Visualize. Hold. Solve.", one real phone capture, one primary
   action (scroll to demo). No gradient, no blob, no centered generic stack.
2. **The loop** — SHOW → MASK → ANSWER → REVEAL as a four-beat sequence with the counting frame
   filling. This carries the signature interaction.
3. **Playable demo** — one real round in the browser: expression appears, masks, you type the answer
   with keyboard or the on-screen keypad, reveal shows correct answer, your answer, digit matches and
   the error label. Uses the real view-time and scoring constants.
4. **Modes** — the five shipping modes plus the two experimental ones, each tagged honestly
   (`Shipped 1.1.0` / `In 1.2` / `Planned`).
5. **Progression** — rank ladder with real RP thresholds and the eight tier shields; a strip of the
   40 badges, marked as a selection, not the full set.
6. **Proof** — real screenshots at real size: home, ranks, landscape round, stack setup, stats,
   onboarding, Nepali home.
7. **Privacy** — no internet permission, no accounts, no ads, no analytics, export you own. This is a
   differentiator, not boilerplate.
8. **Roadmap** — what shipped, what is in 1.2, what is planned, with dates only where a date exists
   (report 18 Nov 2026, handbook 19 Nov 2026).
9. **Tech & team** — Kotlin/Compose/Room, minSdk 26, test coverage claims that are verifiable;
   team block pending real names.
10. **Footer** — build log, language switch (EN / नेपाली sample), licence/contact pending.

---

## 7. What the site may and may not say

**May say (verified):** 5 operations · levels 1–12 (× and ÷ to 6) · 8 rank tiers · 40 badges ·
10-question level tests · 5-round daily · 5 modes + 2 experimental · offline, no internet permission ·
no accounts, ads or analytics · minSdk 26 · English + Nepali · 3 bundled typefaces.

**May not say:** download counts, user counts, ratings, testimonials, "trusted by", "#1", launch
dates, price, "free forever", "AI-powered", "personalized learning" (adaptive practice is planned),
"available on Google Play", any performance stat about learners, any screenshot that is not from
`app/build/reports/design/`.

---

## 8. Contradictions to resolve

1. **Two names.** The app label is "Mental Math Visualizer"; the project, folder and package are
   Math Sikney. The launch brief calls it "Math Sikney". *Proposal:* wordmark **Math Sikney**,
   descriptor "the mental math visualizer", and keep the Play-style name consistent once a listing
   exists. Needs a decision because it sets the H1 and the OG title.
2. **Two versions.** README says 1.1.0 and "128 improvement items"; the build says 1.2.0 with Stack
   Challenge and Learn & Explore compiled in. *Proposal:* site says "1.1.0 documented release,
   1.2.0 in progress", and the roadmap section shows the split.
3. **Two brand directions.** Shipped UI is dark botanical (Ink/Citron/Pine). The unused
   `ic_mmv_icon.png` is neon cyan/purple with a glow. *Proposal:* delete the dead asset from the
   site's mental model; never reference it.
4. **Docs claim modes the PRD never listed.** Stack Challenge and Learn & Explore are not in
   `01_PRD.md` P0; they come from the later master vision and the stack spec. *Proposal:* label them
   as 1.2 work, not as launch features.
5. **"Levels 1–12" is only true per operation.** MUL and DIV stop at 6 (`operationCaps`). *Proposal:*
   always write "12 levels — × and ÷ cap at 6".
6. **Overload exists only as configuration.** `stack.overloadMax: 6` is in the config, the UI caps at
   4. *Proposal:* roadmap only.
7. **Missing specs.** `00_README_FOR_AGENTS.md` references `07_UI_UX_SPEC.md`,
   `09_ROADMAP_AND_TASKS.md` and `10_AGENT_PROMPTS.md`; none exist in either `DOC` folder.
   *Impact:* no authoritative UI spec to design against — the source and the render evidence are the
   spec. Note this in the site's "built from the source" claim only if we link the repo.
8. **Launcher vs UI.** Launcher background `#233027` and bead rod `#96A58F` are not in the theme
   palette. *Proposal:* treat them as logo-only colours, not site tokens.

---

## 9. Questions that block or shape the build

**Blocking**

1. **Name:** Math Sikney or Mental Math Visualizer as the H1/wordmark?
2. **Primary action:** no store listing exists. Choose one —
   (a) scroll to the demo, with a secondary "Follow the build" (no form),
   (b) email capture, which needs a real endpoint (Buttondown / Formspree / Vercel form),
   (c) link to a public repository or APK — needs a URL and a signing decision.
3. **Team section:** real names, roles, links — or omit the section and replace it with "Built solo,
   offline, in Kotlin" plus the repo link?
4. **Analytics:** Plausible (site id needed) or Vercel Analytics? If neither, ship without analytics
   rather than with a fake cookie banner.

**Non-blocking, but decide before Phase 2**

5. **Nepali:** include a Nepali toggle for the whole page, or an English page with one Nepali proof
   line ("गणित सिकाइ")? Whole-page translation needs real Nepali copy — the app's `values-ne`
   strings can be reused but marketing prose does not exist.
6. **Light or dark site?** The app defaults to dark (`ThemeMode.DARK`). A dark site is more faithful;
   a light hero with dark sections is more readable for screenshots. Recommendation: dark default
   with a light section for the screenshots, matching the app's own dark/light themes.
7. **Demo scope:** one round of ADD Level 1 with stack 1 (fast, teachable), or a stack-2 round with
   two answer slots (more impressive, more instructions)? Recommendation: stack 1 first, with a
   stack-2 "make it harder" second round.
8. **Domain / OG image text:** what URL and what one-line promise should the share card carry?

---

## 10. Constraints (from the brief, restated as build rules)

- Static, mobile-first, Astro or Vite, vanilla CSS/JS, Vercel-deployable.
- App palette, app fonts, app radii. No new palette.
- Asymmetric layouts, varied section rhythm. Not a centered hero + three cards.
- Max 2 typefaces + 1 display; self-hosted; Devanagari supported.
- Max 3 signature animations, all disabled under `prefers-reduced-motion`.
- Banned: purple-blue gradients, gradient blobs, glassmorphism, emoji icons, vague AI copy, fake
  stats or testimonials, stock mockups, lorem ipsum.
- Quality: Lighthouse mobile ≥ 95, LCP < 2 s, AVIF/WebP with width/height, WCAG AA, keyboard support,
  OG/Twitter image, meta + JSON-LD, 360–1440 px, privacy-friendly analytics.
- Phase 3: screenshot every section at 360/768/1440, fix overflow, contrast, tap targets ≥ 44 px,
  layout shift; report what cannot be verified.

---

## 11. Definition of done

- Phase 1: one-sentence concept, two layout directions with rationale, one chosen, one signature
  interaction described precisely enough to build.
- Phase 2: every section above implemented, demo playable by keyboard and touch, all copy traceable,
  all screenshots real, roadmap honest.
- Phase 3: three viewport passes, accessibility and performance evidence, a written list of what is
  unverifiable (store link, real team, high-DPI captures).
