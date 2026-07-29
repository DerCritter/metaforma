# editorial-strategy.md — Metaforma

Replaces §9 of `blog-engine-spec.md`. Read by the Strategist agent alongside
`keyword-map.json`.

---

## What Metaforma actually is

An AI rendering studio. Two wings, roughly equal:

- **Denkmal / heritage** — listed and historic properties, restoration and
  adaptive reuse.
- **New build** — residential, commercial, off-plan development.

Clients are commercial, not institutional: **Immobilien agencies, Denkmal-
Immobilien specialists, Bauträger and project developers, and architecture
studios** that outsource visualization.

This matters because the reader who converts is not a conservation officer with
a public budget. It is someone who needs to sell a building — often before it
exists, or before it is restored.

---

## Two tracks, one blog

The audiences want opposite things and the blog serves both, deliberately.

**Track A — Craft.** For architects, 3D artists, and studio staff. Technique,
workflow, control, tools. This track builds authority and earns the search
rankings. It rarely converts directly, and that is fine: it is what makes the
commercial track believable.

**Track B — Commercial.** For Bauträger, developers, and agencies. How
visualization sells property, what it costs, what to prepare, how fast, what
good looks like. This track converts. It is worthless without Track A, because
without demonstrated craft it reads as advertising.

**Split: 50 / 50.** Alternate weeks. Never run three consecutive posts from the
same track.

---

## Clusters

### A1 — Fidelity and control *(flagship, cross-cutting)*
The technical differentiator, and it applies to both wings. Generative models
invent plausible detail; on a listed façade that is a defect, and on a new build
it is drift from the architect's design intent.
- Constraining generation with survey data, photos, and 3D base geometry.
- Auditing a generated image against its source.
- Multi-view consistency across a full presentation set.
- Material truth: stone, brick bond, patina, glass, metal.
- What source quality you actually need before AI is worth using.
- Where the technique still fails.

### A2 — Workflows
- Low-quality photo to editorial render set, end to end.
- Anchor image and aesthetic propagation across a gallery.
- Sketch and 3D draft to photorealistic output.
- Post-production as correction, not enhancement.
- Iterating with an architect in the loop.
- Delivery formats and what breaks in each.

### B1 — Denkmalimmobilien *(highest-intent commercial cluster)*
Marketing and selling listed property. This is where heritage expertise becomes
revenue, and where competition is thinnest.
- Showing a restored state credibly to a buyer before restoration begins.
- Denkmalschutz constraints and what can and cannot be shown.
- Visualization for Denkmal-AfA investor material.
- Adaptive reuse: communicating a change of use to a buyer.
- What a Denkmal exposé needs that a standard one does not.
- Labelling: keeping an interpretation legible as an interpretation.

### B2 — New build and off-plan
- Selling off-plan: what buyers need to see to commit.
- Exposé and portal imagery that survives compression.
- Investor and stakeholder presentations.
- Competition and tender visuals under deadline.
- Consistency across a full project's marketing set.
- Where AI still costs more time than it saves.

### C — Tools and news *(ongoing, folded into both tracks)*
Judged on one criterion: does it hold to the source? Always tested on a real
project, never a feature list.

### D — Commissioning *(low volume, high conversion)*
- Scoping and pricing a visualization commission.
- What a client should prepare before the first call.
- Working with a studio as a Bauträger versus as an architecture practice.
- Timelines and revision cycles that actually hold.

---

## Positioning

"AI rendering for architecture" is saturated — funded tools are spending real
money there. Do not compete head-on.

Metaforma's defensible ground is the intersection: **AI rendering for property
that has to be sold, including property that is legally protected.** The tool
vendors cannot write B1 credibly at all, and cannot write A1 honestly, because
the failure mode being described is their product's core behaviour.

Enter through the narrow, high-intent terms. Broad traffic follows authority.

---

## Language: EN and DE

German is not a translation target. It is likely the primary market: DACH has
dense listed stock, an established Denkmal investment product, and Bauträger who
buy visualization as a line item.

Target German terms directly, not translations of the English ones:
`Architekturvisualisierung`, `Immobilienvisualisierung`, `Denkmalimmobilie`,
`Denkmal-AfA`, `Bauträger Marketing`, `Projektentwickler Visualisierung`,
`3D-Visualisierung Immobilien`, `Exposé Bilder`, `Off-Plan Verkauf`,
`Denkmalpflege`, `historische Bausubstanz`.

Adapt regulatory and tax references to DE/AT/CH. German readers in this sector
will notice immediately if the article assumes another country's rules — and the
tax framing around Denkmal property is specifically German.

---

## Cadence

One post per week, published EN and DE.

- Weeks 1, 3 — Track A (craft)
- Weeks 2, 4 — Track B (commercial)

Finish a cluster before opening the next within each track. Six connected posts
rank; twenty-four scattered ones do not.

Every post links to 2–3 posts in its own cluster, at least 1 across tracks, and
1 to a services page.

---

## Constraints for the Strategist

- Never propose a topic whose thesis overlaps the last 12 entries in
  `published-index.json`.
- Prefer topics illustrated by a real Metaforma project. The portfolio includes
  a monastic complex converted to residences, an industrial building to lofts,
  workplace inside a historic shell, and high-end new-build commercial. Use them.
- Track B posts must still meet the same evidence standard as Track A. A
  commercial topic is not a licence for marketing prose — see `anti-slop.md`.
- Tool coverage angles on fidelity, never on features.
- No speculation about the future of the industry. We report what we ran.
