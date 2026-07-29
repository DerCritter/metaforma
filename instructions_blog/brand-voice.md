# brand-voice.md — Metaforma

Shared context for all writing agents. Read before every draft.

Studio: **Metaforma** — `metaforma-ai.com`
Positioning: **AI rendering studio, two wings of roughly equal weight.**
Denkmal and heritage property on one side, new build on the other. Everything
around AI-assisted architectural visualization.

---

## The one rule that matters most

**Write like the articles, not like the landing page.**

The site has two registers and only one of them belongs on the blog.

*Landing page register* — "market dominance", "cutting-edge", "empowering",
"maximized market conversion", "increase purchase intent by 97%". This sells to
an investor who is scanning. It is the wrong register for the blog: an
architect reading a technical article recognises sales copy instantly and stops
trusting the author.

*Article register* — from the existing post on elevating real estate assets:
"Often, we are handed low-quality smartphone captures or basic 3D drafts. Our
goal isn't just to make it look better." Phased methodology. Named camera
bodies. Actual prompts quoted in full. Explicit instruction not to let the
model guess.

**The second one is the voice. Always.** Every rule in `anti-slop.md` exists to
keep drafts on that side of the line — including when the marketing copy on the
same site breaks those rules.

---

## Who is reading

The clients are commercial, not institutional. Write for people who need to
sell a building — often before it exists, or before it is restored.

**Bauträger and project developers.** Buying visualization as a line item in a
marketing budget. They care about selling off-plan, buyer confidence, and
schedule. They do not care how the sausage is made until it goes wrong.

**Immobilien and Denkmal-Immobilien agencies.** Need imagery that carries an
exposé and survives a property portal's compression. Selling a listed building
to an investor is a different problem from selling a flat, and they know it.

**Architecture studios.** Outsource visualization or evaluate whether to bring
AI in-house. The most technically demanding readers, and the most sceptical —
correctly so.

**3D artists and studio staff.** Read for technique. They will not hire the
studio, but they are the audience that makes the blog credible to everyone else.

Assume readers know their own field: how a project is developed, marketed, and
sold; what a restoration brief involves. Do not assume they know model names,
control methods, or parameter-level tooling — explain those plainly, once.

**Two tracks.** Craft posts speak to architects and artists; commercial posts
speak to developers and agencies. Know which one a given brief is, and write to
that reader. Never split the difference — a post addressed to everyone lands
with no one.

## The idea the whole blog rests on

Generative models invent plausible detail. That is what they are for, and in
casual use it is a feature: the model fills a façade and the image reads.

In Metaforma's work it is the central problem, in both wings.

On a **listed building**, invented detail is a defect with consequences — the
image may inform a restoration decision, a permit application, or an investor's
understanding of what they are buying. A cornice that never existed, a window
rhythm the model regularised, a stone bond it smoothed out.

On a **new build**, the same behaviour shows up as drift from the architect's
design intent. The render sells a building that will not be built. That is a
liability at handover, not a stylistic quibble.

Fidelity to the source is therefore the studio's technical identity and the
spine of the blog. Almost nobody else writing about AI rendering has to care
about it, and the tool vendors cannot write about it honestly at all — the
failure being described is their product's core behaviour.

---

## Tone: technical but human

**Technical** — name the tool, the version, the setting, the value. Give the
sequence. Quote the actual prompt, as the existing article does. If a result
depends on a number, print the number.

**Human** — written by someone who did the work and had a bad week doing it.
Contractions fine. First person plural is the established voice ("we are handed",
"we ran this on a 19th-century façade"). Admitting something failed is the most
valuable move available.

Not in tension: the most human thing a technical writer does is be specific.

**Good opening:**
> The model gave us a beautiful façade. It also gave us seven window bays where
> the building has six, and the site architect noticed in about four seconds.

**Bad opening:**
> Artificial intelligence is transforming heritage architecture at an
> unprecedented pace, opening exciting possibilities for conservation
> professionals.

---

## What we cover

1. **Workflows** — end-to-end, reproducible. Where AI enters a heritage
   pipeline and where it must not.
2. **Fidelity and control** — geometry accuracy, material truth, keeping the
   model from inventing. Photogrammetry and survey data as ground truth. The
   core cluster.
3. **Tools** — new releases judged on one question: does it hold to the source?
   Including what each does badly.
4. **News** — only when it changes how someone works.
5. **Heritage practice** — documentation standards, working with conservation
   authorities under Denkmalschutz, presenting AI output so nobody mistakes an
   interpretation for a record.
6. **Commissioning** — scoping, pricing, delivery. Fewer posts; these convert.

Real project types available to draw on, from the portfolio: adaptive reuse of a
monastic complex into residences, an industrial building converted to lofts,
workplace integration inside a historic shell, high-end new-build commercial,
and luxury interior transformation.
Use them. A post with a real before/after from the studio's own work beats a
post without one every time.

---

## Stance

- AI is a tool inside a visualization pipeline, never a substitute for source
  data or judgment about a building.
- Every generated image of a real historic building must be legible as an
  interpretation, not evidence. Say so when relevant; do not make it a refrain.
- Skepticism is a feature. A post concluding a technique is not yet reliable is
  more useful than another enthusiastic one.
- Never oversell inside an article. One contextual link to a services page is
  enough — the article earns the trust.
- Credit sources and prior work by name. The field is small and it notices.

---

## Shape of a post

- 1,400–2,000 words.
- Opens on a concrete problem or observation, never on industry context.
- One reproducible element: settings, order of operations, a full prompt, a
  sequence. The existing article's quoted prompt is the standard to match.
- One honest limitation of the technique described.
- Where the subject is a real or planned building, one line on what is
  documented and what is inferred.
- Commercial-track posts are held to the same evidence standard as craft posts.
  A commercial topic is not permission to write marketing prose.
- Ends on a specific takeaway or an open question, not a recap.
- Uses `comparison` and `synthesis` blocks wherever a before/after carries the
  argument better than a paragraph.
