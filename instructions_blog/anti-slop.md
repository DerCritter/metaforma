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

---

## BANNED — structures

- **Context-setting openings.** Any first paragraph that describes the state
  of the industry rather than a specific situation.
- **Recap conclusions.** A final section that restates what the article
  already said. End on a new thought or stop.
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

- Any factual claim, version number, benchmark, or date not present in the
  research dossier. If it is not in the dossier, it does not go in the post.
- Discussing "AI" in the abstract without naming a specific tool, model, or
  setting.
- Adjectives about quality with no measurement behind them. "Dramatically
  better" needs a comparison the reader can see or reproduce.
- Predictions about the future of the industry. We report what we ran.
- Praising a tool without naming what it does badly.

---

## REQUIRED — every article

1. **One reproducible element.** A setting, a value, a sequence, a prompt
   structure, a node graph. Something the reader can do today.
2. **One honest limitation.** Where this technique breaks, and what it looks
   like when it breaks.
3. **One marked opinion.** A judgment the studio owns, signalled as such
   ("we stopped using this because…"). Opinion is allowed. Opinion disguised
   as fact is not.
4. **Specific nouns.** Not "the software", but the name and version.

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
