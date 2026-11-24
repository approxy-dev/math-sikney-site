# Math Sikney — design tokens

Extracted from the canonical app, not chosen for the site. Source files:

- `designsystem/theme/Color.kt` — raw palette and tier/slot colours
- `designsystem/theme/Theme.kt` — dark and light schemes, semantic extras, shapes
- `designsystem/theme/Type.kt` — type roles and sizes
- `designsystem/components/Components.kt` — shield geometry, 1 dp card borders
- `designsystem/components/DashboardLayout.kt` — counting-frame geometry
- `res/drawable/ic_launcher_foreground.xml` — the only brand mark
- `res/values/*.xml` — all shipped copy

Contrast ratios below were computed from these hex values (WCAG 2.1 relative luminance).

---

## 1. Colour

### 1.1 Raw palette

| Token | Hex | Role in the app |
|---|---|---|
| `--ink` | `#151916` | Background, keypad numerals' ground, primary text in light mode |
| `--chalk` | `#F4F4E9` | Primary text on ink, warm paper |
| `--citron` | `#D4ED82` | Primary action, daily-goal card, progress, focus |
| `--pine` | `#334A32` | Secondary container, calm block, dark forest |
| `--ink-2` | `#1E241F` | Surface (cards on ink) |
| `--ink-3` | `#303931` | Surface variant, keypad keys, chips |
| `--pine-2` | `#354639` | Secondary container in dark theme |
| `--sage` | `#B5C0B5` | Muted text on ink |
| `--outline` | `#829080` | Icon strokes, secondary outlines |
| `--hairline` | `#3D483E` | 1 dp card and divider borders |
| `--success` | `#9BD9B3` | Correct, positive RP |
| `--warning` | `#EBC48C` | Caution, near miss |
| `--danger` | `#FFA5A2` | Wrong, negative RP, destructive |

Light-theme counterparts: paper `#F6F6EF`, card `#FDFDF7`, surface variant `#E7EAE0`,
muted text `#4E5C50`, primary `#3F5C23`, hairline `#CED3C8`, success `#246442`,
warning `#79511B`, danger `#9F3B36`.

### 1.2 Semantic tokens — dark (site default)

| Token | Value | Notes |
|---|---|---|
| `--bg` | `#151916` | Page |
| `--surface` | `#1E241F` | Cards, demo shell |
| `--surface-2` | `#303931` | Keys, chips, nested blocks |
| `--text` | `#F4F4E9` | 16.04:1 on bg |
| `--text-muted` | `#B5C0B5` | 9.45:1 on bg, 8.42:1 on surface |
| `--border` | `#3D483E` | 1 px, never dashed |
| `--primary` | `#D4ED82` | 13.73:1 against ink |
| `--on-primary` | `#151916` | 13.73:1 on citron |
| `--accent-panel` | `#334A32` | Chalk on pine 8.75:1 |
| `--focus` | `#D4ED82` | 2 px ring, 2 px offset |

### 1.3 Semantic tokens — light (used for the screenshot section)

| Token | Value | Notes |
|---|---|---|
| `--bg` | `#F6F6EF` | |
| `--surface` | `#FDFDF7` | |
| `--surface-2` | `#E7EAE0` | |
| `--text` | `#151916` | 16.36:1 |
| `--text-muted` | `#4E5C50` | 6.51:1 |
| `--border` | `#CED3C8` | |
| `--primary` | `#3F5C23` | 6.99:1 on paper; white on it 7.59:1 |
| `--on-primary` | `#FFFFFF` | |

### 1.4 Tier colours (rank shields and ladder only)

| Tier | Dark | Light |
|---|---|---|
| Bronze | `#E1AE88` | `#854B26` |
| Silver | `#C4CECC` | `#495D5A` |
| Gold | `#F2CB79` | `#795700` |
| Platinum | `#8DDBC1` | `#276854` |
| Diamond | `#AAC9FA` | `#355D92` |
| Heroic | `#FFA5A2` | `#943E45` |
| Master | `#D7B6EB` | `#71518B` |
| Grandmaster | `#FFB684` | `#8A4A23` |

All dark tier colours clear 9:1 against Ink text. They are **accent only**: a shield, a ladder dot, a
1 px rule. Never a surface fill larger than a badge, never a gradient, never a page background.

### 1.5 Slot colours

Slots are labelled A–D and colour-coded in the round screen:

| Slot | Dark | Light |
|---|---|---|
| A | `#D4ED82` (citron) | `#334A32` (pine) |
| B | `#F2CB79` | `#795700` |
| C | `#B9B7EB` | `#61558A` |
| D | `#94CEBF` | `#316859` |

### 1.6 Rules

- One citron surface per view. It marks the single most important action or state, exactly as the
  daily-goal card does in the app.
- No gradients anywhere. The app uses flat fills and 1 px borders; the only gradient in the codebase
  is the 35%-alpha radial glow inside the shield canvas, which reads as a tint.
- No purple-blue pairing. Master's lavender exists only inside a Master shield.
- No glass, no blur, no shadow. Depth comes from surface steps (`bg → surface → surface-2`) and
  hairlines.

---

## 2. Type

Two typefaces plus one display face — the brief's ceiling, and exactly what the app ships.

| Role | Family | Weights used |
|---|---|---|
| Display / headings / UI labels | **Space Grotesk** | 600, 700 (500 for small labels) |
| Body / long copy | **Plus Jakarta Sans** | 400, 500 |
| Numerals, scores, timers, RP | **JetBrains Mono** | 500, 700 — display face, numerals only |

### 2.1 App scale (reference)

| App role | Size / line | Family | Use |
|---|---|---|---|
| displayLarge | 44 / 52, −0.5 tracking | Mono Bold | Huge figures: "12", "0 RP" |
| displayMedium | 32 / 38 | Grotesk Bold | Screen titles |
| headlineMedium | 24 / 30 | Grotesk Bold | Section heads |
| titleLarge | 20 / 26 | Grotesk SemiBold | Card titles |
| titleMedium | 16 / 22 | Grotesk SemiBold | List titles |
| bodyLarge | 16 / 23 | Jakarta | Body |
| bodyMedium | 14 / 20 | Jakarta | Supporting |
| labelLarge | 14 / 20, +0.25 | Grotesk SemiBold | Buttons, chips |
| labelMedium | 12 / 16, +0.3 | Jakarta Medium | Captions |
| labelSmall | 11 / 14 | Mono Medium | Meta, counters |

### 2.2 Web scale (fluid, mobile first)

| Token | CSS | Family / weight | Use |
|---|---|---|---|
| `--fs-display` | `clamp(2.75rem, 8.5vw, 6.5rem)` / 0.92 | Grotesk 700, −0.04em | Hero statement |
| `--fs-h2` | `clamp(1.75rem, 4.2vw, 3rem)` / 1.02 | Grotesk 700, −0.03em | Section heads |
| `--fs-h3` | `clamp(1.25rem, 2.2vw, 1.625rem)` / 1.15 | Grotesk 600, −0.02em | Card heads |
| `--fs-lead` | `clamp(1.0625rem, 1.5vw, 1.25rem)` / 1.55 | Jakarta 400 | Intros |
| `--fs-body` | `1rem` / 1.65 | Jakarta 400 | Copy |
| `--fs-small` | `0.875rem` / 1.5 | Jakarta 400 | Captions |
| `--fs-label` | `0.75rem` / 1.3, +0.02em | Grotesk 600 | Chips, tags |
| `--fs-num` | `clamp(3rem, 9vw, 5.5rem)` / 1 | Mono 700, tabular | Demo answer, the "12" |

Numerals: always `font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1;` and never
letter-spaced. Every figure on the page that a user might compare sits in Mono — scores, RP, levels,
counts, timers. Prose numbers can stay in the text face.

### 2.3 Devanagari

None of the three bundled fonts contains a single Devanagari glyph (verified: 291, 285 and 394
glyphs, zero in U+0900–097F). Android falls back to the system face. The site self-hosts
**Noto Sans Devanagari 400/600** purely as a script fallback:

```css
font-family: "Space Grotesk", "Noto Sans Devanagari", system-ui, sans-serif;
```

Rules: no uppercase, no letter-spacing, line-height 1.75, test at 130% zoom (the app's own Nepali
render is validated at 1.3× font scale).

### 2.4 Loading

- Self-host WOFF2 only, `font-display: swap`, preload the two faces used above the fold
  (Grotesk 700 + Jakarta 400). Mono loads on the demo's first numeral, or preload it too if the hero
  shows a number.
- Subset Latin + Latin-1 punctuation. Devanagari subset only if the Nepali line ships.
- No faux bold: ship real 600/700 weights. The app bundles single-weight TTFs and synthesises weight;
  the site should not repeat that, since synthetic bold smears at display sizes.

---

## 3. Space

Base unit **4 px**. Steps in use in the app: 4, 6, 8, 10, 12, 16, 20, 24, 32. Site adds 48, 64, 96,
128 for section rhythm.

| Token | Value |
|---|---|
| `--s-1` | 4px |
| `--s-2` | 8px |
| `--s-3` | 12px |
| `--s-4` | 16px |
| `--s-5` | 20px |
| `--s-6` | 24px |
| `--s-8` | 32px |
| `--s-12` | 48px |
| `--s-16` | 64px |
| `--s-24` | 96px |
| `--s-32` | 128px |

Vertical rhythm is intentionally uneven: hero 96/128, loop 64, demo 96, modes 80, ranks 112, proof
64, privacy 96, roadmap 80. Do not equalise section padding.

Layout: 12-column grid, 24 px gutter, max width 1240 px, page padding 20 px at 360, 32 at 768, 48 at
1440. Asymmetric splits in use: 5/7, 4/8 with a 1-column offset, and full-bleed strips that break the
grid on one side only.

---

## 4. Shape and depth

| Token | Value | Use |
|---|---|---|
| `--r-1` | 8px | Inputs, small chips |
| `--r-2` | 12px | Buttons, tags |
| `--r-3` | 18px | Cards, demo shell |
| `--r-4` | 24px | Hero panels, screenshot frames |
| `--r-pill` | 999px | Filters, status pills |

Border: `1px solid var(--border)`. Cards never use shadow. Pressed state is `translateY(1px)` plus a
surface step, not a shadow.

---

## 5. Motion

Duration tokens: `--t-1: 120ms`, `--t-2: 180ms`, `--t-3: 240ms`, `--t-4: 320ms`, `--t-5: 420ms`.
Easing: `--ease-out: cubic-bezier(.2, 0, 0, 1)`; `--ease-in-out: cubic-bezier(.4, 0, .2, 1)`.

**Exactly three signature animations** (everything else is a ≤120 ms state change):

1. **Bead slide** — the counting frame's beads travel from the right rail to the left as progress
   fills, 320 ms, staggered 24 ms per bead. Used in the hero frame, the loop section and the demo's
   result.
2. **Mask wipe** — the expression is covered by a chalk-coloured (or ink-coloured, per theme) plane
   that sweeps across in 240 ms when the view timer ends. This is the product's core gesture; it must
   feel like a shutter, not a fade.
3. **Emblem stamp** — when the rank ladder enters the viewport, the current tier's shield drops 8 px
   and settles in 420 ms with a single 2% overshoot. Plays once, never on scroll back.

`prefers-reduced-motion: reduce`: all three jump to their final state instantly (beads placed, mask
fully closed, emblem in place). Keep opacity changes at ≤ 120 ms or remove them. No parallax, no
auto-playing loops, no scroll-jacking.

---

## 6. Brand marks and illustration

### 6.1 Logo — the launcher abacus (only real mark)

`res/drawable/ic_launcher_foreground.xml`, 108×108 viewBox, on `#233027`:

```svg
<svg viewBox="0 0 108 108" role="img" aria-label="Math Sikney">
  <rect width="108" height="108" fill="#233027"/>
  <path d="M28,40 H80 M28,54 H80 M28,68 H80"
        stroke="#96A58F" stroke-width="2" stroke-linecap="round"/>
  <path d="M34,36 v8 M44,36 v8 M72,36 v8 M34,50 v8 M62,50 v8 M72,50 v8
           M52,64 v8 M62,64 v8 M72,64 v8"
        stroke="#D4ED82" stroke-width="7.5" stroke-linecap="round"/>
</svg>
```

Rods are sage, beads are citron, beads sit at irregular positions — keep the irregularity, it is what
makes it read as an abacus rather than a menu icon. Minimum size 24 px. Never recolor, never add a
glow.

### 6.2 Counting frame

Four rods, five beads each, from `CountingFrame()`:

- `pitch = width / 8.4`, bead width `0.85 × pitch`, bead height `min(1.25 × pitch, rowHeight × 0.76)`,
  corner radius = half the bead width (pill).
- Filled beads pack from the **left** at `column × pitch`; unfilled beads align to the **right** edge
  at `width − (5 − column) × pitch`. The gap in the middle is the point.
- Rod line: 1.4 dp, full width, `--hairline` on ink; beads `--citron` when filled, a darker citron
  (`#A6C25C`) with `#70883B` track inside the citron card, per `HomeScreen`.
- 20 beads = 100% of the daily goal.
- Inside the citron card the bead colours sit at 1.55:1 and 3.08:1 against the fill. That is fine for
  decoration only because the same card states the count in words and figures ("12 of 20
  questions"). When the frame is the only progress indicator on the site, add the count beside it.

### 6.3 Rank shield

Hexagon, drawn to these fractions of the box:

```
(0.50,0.08) (0.88,0.25) (0.82,0.68) (0.50,0.92) (0.18,0.68) (0.12,0.25)
```

Fill: vertical tier colour 85% → 35%. Stroke: tier colour, 6% of width. Below the top three tiers, a
white dot at (0.50, 0.48) radius 0.11. Heroic, Master and Grandmaster replace the dot with a white
diamond: (0.50,0.26) (0.68,0.50) (0.50,0.72) (0.32,0.50). Reproduce exactly; do not invent crests.

### 6.4 Everything else

- Icons: 2 px stroke, round caps, 24 px grid, `currentColor`. Lucide/Phosphor-class line icons match
  the app's Material outlined set. **No emoji, ever.**
- Slot dot: 8 px filled circle in the slot colour, plus the letter in Mono 600 at 12 px.
- Keypad: 3×4 grid, keys `--surface-2`, radius 12, numeral in Mono 500 at 24 px, submit bar full
  width in citron.
- Phone frames for screenshots: 1 px `--border` outline, radius 28, no notch, no reflection, no
  floating shadows. The screenshots are 360×800; display at 300–340 px wide and say so.

---

## 7. Accessibility tokens

| Item | Rule |
|---|---|
| Tap target | ≥ 44×44 px; keypad keys 56 px; visual size may be smaller than the hit area |
| Focus | 2 px `--focus` ring, 2 px offset, 4 px radius; on citron use `--ink` ring |
| Text contrast | Body ≥ 7:1 wherever possible; the palette gives 6.5:1 at worst on light paper |
| Minimum type | 14 px body, 12 px labels; never below 12 px |
| Motion | honour `prefers-reduced-motion`; no autoplay over 5 s |
| Colour alone | never the only signal — pair tier colours with the tier name; pair correct/wrong with an icon and text |
| Demo | fully operable by keyboard: type digits, Backspace, Enter to submit, Esc to reset; focus never trapped |

---

## 8. Copy voice

Sentence case. Second person. Concrete verbs. Numbers in Mono, digits not words. Calm during play,
warmer after. No exclamation marks except where the app already uses one ("No sessions yet. Pick a
mode to begin!").

Real lines to reuse verbatim (all from `res/values`):

- "Visualize. Hold. Solve."
- "Memorize the expression, then solve it after it disappears."
- "See expressions, hold them in memory, and climb from Bronze to Grandmaster."
- "Each operation has its own rank."
- "Accuracy, answer speed, and matching digits determine your rank points."
- "Hold the carry digit in mind before moving to the next column."
- "Your data stays on this device."
- "MMV works offline and has no accounts, ads, analytics, or cloud synchronization."

Do not write: "unlock your potential", "supercharge", "seamlessly", "revolutionary", "elevate",
"game-changing", "dive into", "whether you're a student or a pro".

---

## 9. Do / don't

| Do | Don't |
|---|---|
| Citron for one action per view | Citron cards stacked down the page |
| Flat surfaces with 1 px borders | Glassmorphism, blur, soft shadows |
| Asymmetric 5/7 or offset splits | Centered hero + three equal cards |
| Mono numerals for every figure | Body-font numbers that don't align |
| Real 360×800 captures at native size | Upscaled or stock phone mockups |
| Tier colour inside a shield | Tier colour as a section background or gradient |
| Sentence-case labels | All-caps tracking everywhere |
| Beads that move with real progress | Decorative animation that means nothing |
| Honest status chips (Shipped / In 1.2 / Planned) | "Coming soon" with no substance |
