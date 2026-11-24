# Phase 1 — concept, directions, choice

## The concept, in one sentence

> The page is built like a round: it shows you something, takes it away, asks you to answer, and then
> tells you exactly what you did wrong — so the visitor feels the memory load instead of reading a
> claim about it.

That sentence governs everything. The product's loop is SHOW → MASK → ANSWER → REVEAL. The site
performs the same sequence: the hero shows a real screen and then partly covers it; the demo masks
the expression on a real timer; the ranks section reveals a shield with the same geometry the app
draws. Nothing on the page is a metaphor the app doesn't already use.

The page's spine is the counting frame — four rods, five beads — the one graphic the app draws from
the learner's own progress. Beads move only when something real is answered.

---

## Direction A — "The training desk" (chosen)

A wide, asymmetric two-column page that borrows the app's own adaptive layout: a narrow left rail
(abacus mark, numbered section index, the demo's state), and an offset editorial column to its right.

- Hero is a 7/5 split: the statement and the real metadata on the left, a 360×800 capture on the
  right, bleeding off the section edge at desktop and stacking under the text at mobile.
- The demo is a two-column desk: the explanation pins in the left column on ≥1080 px while the
  panel scrolls beside it; on mobile the panel comes first and the explanation follows. The panel
  itself never pins, because it grows when the reveal opens and a tall sticky element clips its own
  last row.
- Sections are not uniform blocks. The loop is a 2×2 with unequal rows; modes are a typographic list
  with hairline rules; the rank ladder is a single horizontal band that breaks the container; the
  screenshot gallery is a light-theme interruption inside the dark page.
- Rhythm: 128 / 64 / 96 / 80 / 112 / 64 / 96 / 80 px. Never equalised.

**Why this one:** the structure is not a mood board, it is the app's `DashboardLayout` (rail on wide
windows, one column on narrow) and the landscape round screen (keys beside the question concretely
translate to demo beside the copy). The site is legible as the same product because it is organised
the same way. It also solves the demo problem honestly: a live panel in the reading column never
needs a modal, fake browser chrome, or a scroll hijack.

## Direction B — "The ladder" (rejected)

A vertical 12-level ruler runs the full page; each section hangs off a step, the rank ladder becomes
the scroll spine, and the demo interrupts as a full-bleed takeover.

**Why it was rejected:** it is a timeline dressed as a game. The ruler implies a sequence the page
doesn't actually have, it fights the app's own dashboard metaphor, and the full-bleed takeover would
either hijack scroll or need a modal — both banned in spirit. It also reads as the generic "vertical
progress line" landing page at a glance.

---

## The signature interactive moment

**One real round, with the counting frame as the answer.**

1. A single expression appears, in JetBrains Mono, in the demo panel — e.g. `47 + 86`.
2. The view timer, computed from the app's own formula (base 900 ms + 450 ms per digit, clamped at
   1200 ms), runs out. A shutter wipes across the expression in 240 ms. It is gone.
3. The visitor types the answer with the keyboard or the on-screen keypad. Digits appear in the
   answer slot at display size, tabular.
4. Reveal: the correct answer, the visitor's answer, the signed difference, how many digits matched
   ("3/3 digits match", "off by 1", "carry slip"), and a coach note drawn from the app's real strings
   — `Hold the carry digit in mind before moving to the next column.`
5. One bead slides left on the frame for a correct answer. A wrong answer leaves the bead where it
   is, and the frame keeps showing the truth.

A second, harder round (stack 2, two slots, A and B, answer in order) is one button away for anyone
who wants the real thing. The frame resets and refills.

The frame is not decoration and not a page-progress bar. It only ever reflects answers in the demo.
That constraint is what makes it honest.

---

## Art direction, section by section

| Section | Surface | Dominant device |
|---|---|---|
| Rail | Ink, hairline right edge | Mono section numbers, 2 px citron marker on the active section |
| Hero | Ink | 64–96 px Grotesk statement, one citron word; real capture, cropped right |
| Loop | Ink, one Pine block | Four beats with the mask wipe replayed as a still sequence |
| Demo | Surface, citron submit bar | The frame, the shutter, the slot |
| Modes | Ink | Hairline list; status chips Shipped / In 1.2 / Planned |
| Progression | Pine band | Eight shields on the real RP thresholds; 12 of 40 badges |
| Proof | Chalk/paper | Real 360×800 captures at native size, honest caption |
| Privacy | Ink | Four facts, no icons-as-decoration |
| Roadmap | Surface | Three dated columns, no vague "soon" |
| Tech | Ink | Stack list in mono, verifiable test coverage only |
| Footer | Ink, hairline top | Build log dates, language line |

## Anti-goals for this build

No gradient, no blob, no glass, no emoji, no fake store badge, no download counter, no testimonial, no
"trusted by", no stock phone mockup, no invented mascot, no purple-blue anything. Master's lavender
appears only inside a Master shield.
