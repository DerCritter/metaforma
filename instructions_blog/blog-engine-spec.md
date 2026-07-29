# Blog Engine — Sistema multiagente de contenido
### Spec de implementación para Antigravity

**Objetivo:** publicar 1 artículo por semana en inglés y alemán, de calidad técnica real, de forma totalmente automática y con coste 0, sobre arquitectura y buenas prácticas de render con IA.

**Cómo usar este documento:** cada bloque marcado como `PROMPT` va literalmente a un archivo de agente. El resto es arquitectura que Antigravity debe implementar. Orden de implementación al final (§11).

---

## 1. Decisiones de stack (y por qué)

| Decisión | Elección | Motivo |
|---|---|---|
| Dónde vive el contenido | **`content/articles.ts`**, el sistema que ya existe | El repositorio ya tiene un tipo `Article` con bloques tipados, EN/DE integrados, `ArticleLayout` y generador de sitemap. Introducir MDX sería reconstruir algo que ya funciona. Los agentes generan objetos `Article`, no archivos markdown. |
| Renderizado | **Prerenderizado en el build** con `react-dom/server` | La web es una SPA de Vite y hoy sirve HTML vacío. Sin esto el blog no es rastreable. Ver fase 1 del ANTIGRAVITY-TASK. |
| Hosting | Vercel (ya en uso) | Redespliega en cada push a `main`. |
| Scheduler | **GitHub Actions con `cron`** | Gratis (2.000 min/mes en repos privados; el pipeline consume ~5 min/semana). Es el "servidor" del sistema sin pagar servidor. |
| Modelo | **Gemini Flash / Flash-Lite vía API** (nunca Pro) | Desde el 1 de abril de 2026 los modelos Pro salieron del free tier. Solo Flash y Flash-Lite siguen siendo gratis. Ver §4b. |
| Estado / memoria | Archivos JSON en `content/_state/` | El sistema recuerda qué publicó, con qué keywords y con qué resultado, sin base de datos. |

> **Regla de oro del diseño:** la única infraestructura con estado es el repositorio. Si el repo sobrevive, el sistema sobrevive. Nada vive en la nube de nadie.

---

## 2. Estructura de carpetas

```
repo/
├─ .github/workflows/
│  └─ blog-pipeline.yml            # cron semanal
├─ agents/
│  ├─ 00-orchestrator.md
│  ├─ 01-strategist.md
│  ├─ 02-researcher.md
│  ├─ 03-writer-en.md
│  ├─ 04-localizer-de.md
│  ├─ 05-reviewer.md
│  ├─ 06-publisher.md
│  └─ shared/
│     ├─ brand-voice.md            # tono, quién eres, qué NO decir
│     ├─ quality-rubric.md         # criterios de aprobación
│     └─ anti-slop.md              # prohibiciones de estilo
├─ content/
│  ├─ articles.ts                 # YA EXISTE — destino final de los artículos
│  ├─ _state/
│  │  ├─ editorial-calendar.json   # cola de temas planificados
│  │  ├─ published-index.json      # histórico: qué se publicó, keywords usadas
│  │  ├─ keyword-map.json          # clusters SEO EN/DE y su estado
│  │  └─ run-log.json              # resultado de cada ejecución
│  └─ _drafts/                     # objetos Article aprobados sin publicar
├─ assets/
│  ├─ renders/                     # TUS renders, la materia prima visual
│  └─ image-library.json           # inventario con descripción + alt text
└─ scripts/
   └─ run-pipeline.ts              # orquestador ejecutable
```

---

## 3. Los archivos de estado (el cerebro del sistema)

Sin esto, los agentes repiten temas, se contradicen y canibalizan sus propias keywords. Es la parte que más gente se salta y la que más importa.

### `keyword-map.json`
```json
{
  "clusters": [
    {
      "id": "ai-render-workflow",
      "pillar_en": "AI rendering workflow for architects",
      "pillar_de": "KI-Rendering-Workflow für Architekten",
      "keywords_en": ["ai architectural rendering", "stable diffusion architecture workflow"],
      "keywords_de": ["KI Architekturvisualisierung", "Architektur Rendering KI"],
      "posts_published": 3,
      "target_posts": 8,
      "status": "active"
    }
  ]
}
```

### `published-index.json`
```json
{
  "posts": [
    {
      "slug": "controlnet-depth-maps-architecture",
      "date": "2026-07-21",
      "cluster": "ai-render-workflow",
      "title_en": "...", "title_de": "...",
      "primary_keyword_en": "...", "primary_keyword_de": "...",
      "internal_links_out": ["previous-slug"],
      "thesis": "Una frase con el argumento central, para que el Strategist no repita el ángulo.",
      "word_count": 1840
    }
  ]
}
```

### `editorial-calendar.json`
Cola de 6–8 temas aprobados por delante. El Strategist la rellena; el Writer la consume. **El buffer es lo que hace que el sistema no falle nunca en público.**

---

## 4. Los agentes (6 + orquestador)

Seis es el número correcto: uno por cambio de responsabilidad real. Más agentes = más coste, más latencia y más superficie para que uno alucine y contamine al siguiente.

### 00 · Orchestrator
No escribe contenido. Ejecuta el grafo, gestiona reintentos, escribe `run-log.json` y decide si se publica o se aborta.

```
PROMPT (agents/00-orchestrator.md)
You are the editor-in-chief of an automated blog pipeline for an
architectural visualization studio specializing in AI-assisted rendering.

You never write content yourself. You:
1. Read content/_state/ to establish current context.
2. Invoke sub-agents in order, passing only the artifacts they need.
3. Enforce the two quality gates. A post that fails a gate twice is
   NEVER published — you write the failure to run-log.json, open a
   GitHub issue titled "Blog pipeline: manual review needed", and
   fall back to the next approved draft in content/_drafts/.
4. Update all state files at the end of a successful run.

Silence is better than a bad post. Publishing something mediocre under
the studio's name costs more than skipping a week.
```

### 01 · Strategist
**Input:** `keyword-map.json`, `published-index.json`, fecha actual.
**Output:** un brief de artículo (tema, ángulo, keyword primaria EN + DE, intención de búsqueda, 3 enlaces internos, promesa concreta al lector).

Reglas duras:
- Prohibido un tema cuyo `thesis` se solape con los últimos 12 posts.
- Cada post pertenece a un cluster; nunca posts sueltos y huérfanos.
- Alterna: 60% técnico-práctico (workflows, ControlNet, LoRAs, prompts, post-pro), 25% arquitectura/diseño (materialidad, luz, composición), 15% negocio (cómo un estudio contrata visualización, precios, plazos). **Ese 15% es el que convierte en clientes.**

### 02 · Researcher
**Input:** brief.
**Output:** dossier de hechos con fuentes verificables (URLs), números concretos, versiones de software y sus fechas, y una lista explícita de "lo que NO he podido verificar".

Regla clave: el Writer solo puede afirmar lo que está en el dossier. Todo lo demás se escribe como opinión declarada del estudio, no como hecho. Esto es lo que separa un blog técnico creíble de contenido genérico de IA.

### 03 · Writer EN
**Input:** brief + dossier + `brand-voice.md` + `anti-slop.md`.
**Output:** un objeto `Article` válido en inglés, 1.400–2.000 palabras,
usando únicamente los tipos de bloque que ya define `content/articles.ts`
(`h2`, `h3`, `p`, `image`, `comparison`, `synthesis`, `aerial-integration`,
`callout`). No markdown, no frontmatter: TypeScript que compile.

```
PROMPT (extracto — agents/03-writer-en.md)
Write for a working architect or 3D artist who already knows their craft
and is evaluating whether AI belongs in their pipeline. They are skeptical
and they are right to be.

Hard rules:
- Open with the specific problem, never with "In today's rapidly evolving
  world of architectural visualization."
- Every claim about a tool, version, or result comes from the dossier.
  If it is not in the dossier, do not assert it.
- Include at least one concrete, reproducible workflow: settings, order of
  operations, what breaks and why.
- Show the failure modes. A post that only says the technology is great is
  marketing, and readers can smell it.
- No em dashes as a stylistic tic. No "delve", "leverage", "landscape",
  "game-changer", "unlock", "harness", "in the realm of".
- No bullet lists longer than 5 items. Prose carries the argument.
- End with a specific takeaway, not a summary of what was just said.
```

### 04 · Localizer DE
**No es un traductor.** El mercado DACH (Alemania, Austria, Suiza) es el segundo mercado de visualización arquitectónica de Europa y busca con términos propios: *Architekturvisualisierung*, *Innenraumvisualisierung*, *3D-Renderings Architektur*. Una traducción literal de keywords en inglés no posiciona en Google.de.

```
PROMPT (extracto — agents/04-localizer-de.md)
Transcreate, do not translate. You are writing for German-speaking
architects in DE/AT/CH.

- Use the German primary keyword from the brief, not a translation of the
  English one. Search intent differs by market.
- Address the reader with "Sie". German professional writing rewards
  precision and directness; do not import English marketing enthusiasm.
- Convert units, currency, and any legal/regulatory reference to the DACH
  context. If a claim is US-specific, cut it or flag it.
- Keep technical terms in English where the industry does (ControlNet,
  LoRA, denoise, render pass). Do not invent German equivalents.
- The German post is a first-class article with its own hreflang entry,
  not a secondary version.
```

### 05 · Reviewer
El único agente que puede decir que no. Corre **dos veces**: una sobre el EN, otra sobre el DE.

Devuelve JSON estricto: `{ "verdict": "pass" | "revise" | "reject", "scores": {...}, "issues": [...] }`

| Eje | Umbral |
|---|---|
| Precisión factual (todo verificable contra el dossier) | bloqueante |
| Profundidad técnica (¿un profesional aprende algo?) | ≥ 7/10 |
| Voz y anti-slop (sin frases prohibidas, sin relleno) | ≥ 8/10 |
| SEO (keyword en title/H1/primeros 100 palabras, meta, slug, enlaces internos) | bloqueante |
| Originalidad frente a `published-index.json` | bloqueante |
| Alemán: naturalidad nativa y keyword local correcta | ≥ 8/10 |

Al Reviewer se le pasa el borrador **sin decirle qué agente lo escribió ni cuántas rondas lleva**. Si sabe que es la segunda ronda, tiende a aprobar por complacencia.

### 06 · Publisher
Slug, frontmatter, `hreflang` cruzado EN↔DE, JSON-LD `Article`, selección de imágenes desde `image-library.json` con alt text descriptivo, enlaces internos, commit y push.

**Imágenes:** siempre tus propios renders, referenciados desde
`assets/image-library.json` y presentes en `public/`. Los bloques `comparison`
y `synthesis` son tu mejor activo: muestran antes y después, que es
exactamente lo que un cliente de patrimonio necesita ver. Es gratis, es tu portfolio trabajando dentro del blog, y ningún banco de imágenes te va a dar credibilidad en tu propio oficio. El `image-library.json` debe tener, por cada render, una descripción de qué muestra técnicamente para que el Publisher elija con criterio.

---

## 4b. Política de modelos y coste cero

**Garantía de coste cero, no negociable:** el proyecto de Google Cloud asociado
a la clave **no debe tener facturación activada**. Sin billing, al agotar la
cuota las peticiones fallan con un 429 y no hay forma de generar cargo. El día
que se active billing, esa protección desaparece.

**Modelos permitidos:** solo la gama Flash y Flash-Lite. Los modelos Pro son de
pago desde el 1 de abril de 2026. Verificar en AI Studio qué modelos muestran
free tier antes de fijar el identificador en el código, porque esto cambia.

| Agente | Modelo | Motivo |
|---|---|---|
| Strategist | Flash-Lite | Tarea estructurada, salida JSON |
| Researcher | Flash | Necesita precisión y grounding |
| Writer EN | Flash | Prosa |
| Localizer DE | Flash | Transcreación |
| Reviewer | Flash | El rol más exigente disponible |
| Publisher | Flash-Lite | Mecánico |

**Privacidad:** en el free tier Google puede usar los prompts para entrenar.
Los artículos se publican igualmente, así que da igual — pero **nunca** enviar
documentación de cliente, planos, ni material bajo NDA a través de este
pipeline.

### Compensaciones de calidad (gratis, aprovechando el margen de cuota)

El free tier permite 1.500 peticiones diarias y el pipeline necesita ~10 por
semana. Ese margen se gasta en calidad:

1. **Best-of-3.** El Writer genera tres borradores independientes del mismo
   brief, con temperaturas ligeramente distintas. El Reviewer los puntúa y se
   queda con el mejor. Descarta los otros dos sin más.
2. **Autocrítica previa.** Antes de pasar al Reviewer, el borrador ganador
   vuelve al Writer junto con `anti-slop.md` y una única instrucción: localizar
   y reescribir cada frase que viole una regla. Los modelos rápidos detectan
   sus propios clichés razonablemente bien cuando se les pide de forma
   explícita, pero no lo hacen por iniciativa propia.
3. **Umbrales elevados.** Con Flash, todos los umbrales de
   `quality-rubric.md` suben de 7 a 8. `voice` y `originality` suben a 9.
4. **Tres rondas en vez de dos** antes de abortar.

Coste total: unas 18 llamadas por artículo en lugar de 6. Sigue siendo menos
del 2% de la cuota diaria.

---

El error clásico es generar y publicar el mismo día. Si algo falla, hay un hueco público. Con buffer, un fallo es invisible.

```
LUNES 06:00 UTC  → Pipeline completo: Strategist → Researcher → Writer →
                    Localizer → Reviewer ×2 → aprobado → content/_drafts/
JUEVES 09:00 UTC → Publisher toma el draft MÁS ANTIGUO aprobado,
                    lo mueve a content/blog/, commit, deploy.
```

Objetivo: mantener siempre **2–3 drafts aprobados en cola**. Si un lunes el pipeline falla, el jueves se publica igual desde el buffer y tú recibes un issue en GitHub para revisar con calma.

---

## 6. Los dos gates y la política de fallo

```
Gate 1 (tras el Writer EN)     → si "revise": hasta 2 reintentos con los issues como input
Gate 2 (tras el Localizer DE)  → si "revise": hasta 2 reintentos
Cualquier "reject"             → aborta, GitHub issue, NO publica
Tres "revise" seguidos         → aborta, GitHub issue, NO publica
```

Máximo 2 rondas por gate. Sin este límite un agente puede entrar en un bucle de reescritura que quema cuota y produce texto cada vez más plano.

---

## 7. GitHub Action

```yaml
# .github/workflows/blog-pipeline.yml
name: blog-pipeline
on:
  schedule:
    - cron: '0 6 * * 1'   # generación: lunes 06:00 UTC
    - cron: '0 9 * * 4'   # publicación: jueves 09:00 UTC
  workflow_dispatch:       # botón manual para pruebas

jobs:
  run:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npx tsx scripts/run-pipeline.ts
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          MODE: ${{ github.event.schedule == '0 9 * * 4' && 'publish' || 'generate' }}
      - name: Commit
        run: |
          git config user.name "blog-bot"
          git config user.email "bot@users.noreply.github.com"
          git add -A && git diff --staged --quiet || git commit -m "content: automated run"
          git push
```

---

## 8. Reglas anti-slop (`agents/shared/anti-slop.md`)

Esto es lo que hace que el blog no parezca escrito por una IA, que es exactamente el riesgo cuando vendes servicios de IA.

**Prohibido:**
- Aperturas de contexto genérico ("As the industry evolves...", "In today's...").
- Listas de 7+ puntos que sustituyen al argumento.
- Conclusiones que resumen lo ya dicho.
- Adjetivos sin dato detrás: "powerful", "revolutionary", "cutting-edge", "seamless".
- Simetría artificial: tres secciones de tres párrafos con tres ejemplos cada una.
- Hablar de la IA en abstracto sin nombrar herramienta, versión y ajuste concreto.

**Obligatorio en cada post:**
- Un número, ajuste o parámetro que el lector pueda reproducir hoy.
- Una limitación o fallo real de la técnica descrita.
- Una opinión del estudio, marcada como opinión.

---

## 9. Estrategia editorial (los primeros 6 meses)

Cuatro clusters, ~6 posts cada uno. Un cluster completo posiciona; 24 posts sueltos no.

1. **Workflow de render con IA** — dónde encaja la IA en un pipeline profesional, qué sustituye y qué no.
2. **Control y consistencia** — el problema real del sector: geometría fiel, materiales coherentes, misma escena en varias vistas.
3. **Arquitectura y representación** — luz, materialidad, atmósfera, cómo se lee un render. Este cluster es el que te da autoridad como arquitecto, no como operador de herramientas.
4. **Trabajar con un estudio de visualización** — plazos, formatos de entrega, qué necesita el cliente preparar, cómo se presupuesta. **Este es el cluster que convierte.**

Cada post enlaza a 2–3 posts del mismo cluster y 1 a una página de servicio.

---

## 10. Medición y aprendizaje

Añade al `run-log.json` una entrada mensual con datos de Google Search Console (API gratuita): impresiones y posición media por post. El Strategist lee esas métricas en su prompt y prioriza clusters con tracción real. Sin este bucle el sistema escribe a ciegas durante un año.

---

## 11. Orden de implementación en Antigravity

1. Estructura de carpetas + schemas JSON vacíos + ruta `/blog` con hreflang.
2. `brand-voice.md`, `anti-slop.md`, `quality-rubric.md`. **Escríbelos tú a mano**, no los generes: son el ADN del sistema y lo único irreemplazable aquí.
3. `image-library.json` con tus renders reales y sus descripciones.
4. Strategist + Researcher. Ejecútalos solos y valida 5 briefs a mano.
5. Writer EN + Reviewer. Itera la rúbrica hasta que el Reviewer rechace lo que tú rechazarías.
6. Localizer DE + segundo pase del Reviewer.
7. Publisher.
8. GitHub Action, primero solo con `workflow_dispatch`.
9. Genera 3 posts manualmente al buffer.
10. Activa el cron.

No actives la automatización total hasta el paso 10. El punto 5 es el que decide si el sistema funciona: si el Reviewer aprueba texto que a ti no te gusta, arregla la rúbrica antes de seguir.
