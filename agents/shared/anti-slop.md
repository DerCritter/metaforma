# anti-slop.md

Hard constraints on style. These are not preferences. A draft that violates a
BANNED rule fails review regardless of how good the content is.

The stakes are specific: this studio sells AI-assisted rendering. A blog that
reads as machine-written is an argument against hiring us.

---

## BANNED — vocabulary

Never use these words or phrases in any language variant:

delve, leverage (as a verb), harness, unlock, elevate, empower, seamless,
robust, cutting-edge, game-changer, revolutionary, transformative, unprecedented,
paradigm shift, landscape (figurative), realm, journey (figurative), tapestry,
testament to, at its core, it's worth noting, needless to say, in conclusion,
dive into, embark, navigate (figurative), pave the way, usher in, boasts,
ever-evolving, fast-paced world, in today's, as we move forward.

German equivalents are equally banned: bahnbrechend, revolutionär, nahtlos,
wegweisend, in der heutigen schnelllebigen Welt, es ist erwähnenswert,
zusammenfassend lässt sich sagen.

**Abstract Nouns as Subjects** — If a sentence's subject is a concept rather than a person, a tool, or a building, rewrite it. Specific bans: "atmospheric translation", "the generative impulse", "spatial experience", "design narrative", "evocative", "the true value emerges", "this is where X becomes Y".

**Lofty Re-phrasings** — Banned construction: "the challenge is no longer about X; it is about Y".

---

## BANNED — structures

- **Context-setting openings.** Any first paragraph that describes the state
  of the industry rather than a specific situation.
- **Recap conclusions.** A final section that restates what the article
  already said. BANNED: closing sentences that restate the opening claim in loftier terms. End on a specific, grounded takeaway or stop.
- **Rule of three everywhere.** Three sections with three subpoints and three
  examples each. Real arguments are lopsided; some points need four
  paragraphs and some need one sentence.
- **Bullet lists over 5 items**, and bullet lists that replace an argument.
  If the list items need explanation, they are paragraphs.
- **Bold every third phrase.** Bold marks the one thing that matters in a
  section, or nothing.
- **Rhetorical question headers.** "But what does this mean for architects?"
- **Hedged non-claims.** "It can be argued that AI may potentially offer
  certain benefits in some contexts." Take a position or cut the sentence.
- **Symmetrical pro/con sections** that conclude the truth is somewhere in
  the middle.
- **Em dashes as a tic.** One per article at most.

---

## BANNED — content

- Fabricated or hallucinated tools, version numbers, or workflows. You must rely on real industry knowledge and web research about actual AI platforms (e.g., Veras, Midjourney, ArchiVinci).
- Hallucinating or inventing image URLs. Always include exactly ONE single `image` block near the beginning of the article to serve as the hero cover. Do not include any other images in the article. You must select this hero image from the studio's existing project portfolio (e.g., the high-quality photos used in the projects section). Never invent fake URLs.
- Discussing "AI" in the abstract without naming a specific tool, model, or
  setting.
- Adjectives about quality with no measurement behind them. "Dramatically
  better" needs a comparison the reader can see or reproduce.
- Predictions about the future of the industry. We report what we ran.
- Praising a tool without naming what it does badly.

---

## REQUIRED — every article

1. **One reproducible or actionable element.** A specific workflow step, a prompt structure, or an integration tip (e.g., "linking Veras to Revit"). Something the reader can understand and try today.
2. **One honest limitation.** Where this technique breaks, and what it looks
   like when it breaks.
3. **One marked opinion.** A judgment the studio owns, signalled as such
   ("we prefer this workflow because…"). Opinion is allowed. Opinion disguised
   as fact is not.
4. **Specific nouns.** Not "the software", but the name (e.g., "Midjourney v6", "SketchUp").

---

## Calibration

**Slop:**
> AI-powered rendering tools have revolutionized the way architects approach
> visualization, offering unprecedented speed and flexibility. By leveraging
> these cutting-edge solutions, studios can unlock new creative possibilities
> and streamline their workflows.

**Acceptable:**
> We moved depth-map generation out of the render engine and into ControlNet
> about six months ago. It cut our iteration time on interior views roughly
> in half. It also broke every time the client asked for a change in ceiling
> height, because the depth map was baked from the old geometry and nobody
> remembered to regenerate it. Here is the order of operations that fixed it.
