# Portfolio — Ahmed Huzaifa Malik

A case-study portfolio for data science work, built with Astro.

The design direction is **latent space**: black ground, white type, and a palette
lifted from the **viridis** colormap — the actual colour language of scientific
plotting. Hue encodes value consistently across the whole site: deep indigo is
low, yellow is high. The same ramp runs through the background field, the
precision–recall curves, the risk meter and the metric highlights, so colour
means one thing everywhere.

Two pieces of motion carry it:

- **The live field** — a full-page canvas of points pulled toward drifting
  centroids, with edges drawn between near neighbours. It is what a t-SNE or
  UMAP embedding looks like while it settles, and it never fully stops.
- **The class-imbalance field** — on the landing page, every dot is one
  transaction and 3.50% ignite. That is the real fraud rate, stating the hard
  part of the problem before a word of copy does.

---

## Stack

| | |
|---|---|
| **Astro 5** | static site generator, content collections for case studies |
| **Vanilla CSS** | hand-written design tokens, no framework |
| **Canvas + SVG** | hero point field, precision–recall curves, confusion matrix |
| **Zero runtime JS framework** | ships as static HTML; scripts are small and progressive |

Case studies are Markdown files with typed frontmatter, validated by a Zod
schema at build time — a malformed metric or a missing field fails the build
rather than shipping broken.

## Structure

```
src/
├── components/
│   ├── Field.astro          live background — drifting embedding cloud
│   ├── PointField.astro     class imbalance as a dot field
│   ├── PRCurve.astro        precision–recall curves, drawn from reported AUC
│   ├── Recall.astro         recall shown as customers found vs missed
│   ├── Signif.astro         the chi-square result
│   └── LiveScore.astro      calls the deployed fraud API from the browser
├── content/projects/        one Markdown file per case study
├── content.config.ts        frontmatter schema
├── layouts/Base.astro       shell, nav, footer, scroll reveal
├── pages/
│   ├── index.astro          landing
│   ├── projects/            index + [...id] case study template
│   ├── about.astro
│   └── 404.astro
├── styles/global.css        design tokens and base styles
└── config.ts                fraud API endpoint
public/                      CV and static assets
```

## Local development

Requires Node 18+.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve the built site
```

## Deploying

Vercel detects Astro automatically.

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Accept the detected settings — build `npm run build`, output `dist`
4. Deploy

Then set the real URL in `astro.config.mjs` (`site:`) so metadata resolves
correctly.

## Wiring up the live demo

`src/config.ts` points at the deployed service:

```ts
export const FRAUD_API = 'https://fraud-detection-api.containers.snapdeploy.app';
```

The component calls `GET /health` on load and `POST /predict` on submit, and it
handles the free tier's 10–30 second cold start explicitly rather than looking
broken while the container wakes.

**Check before publishing:** the API must send CORS headers permitting this
site's origin. It already serves the GitHub Pages demo, so if the allowed origin
list is `*` this works unchanged; if it names that origin specifically, add the
Vercel domain to the FastAPI `CORSMiddleware` config.

The component reads `fraud_probability`, `probability` or `score` from the JSON
response, whichever is present.

## Adding a case study

Drop a Markdown file into `src/content/projects/`:

```yaml
---
title: "Short, specific title"
order: 4
outcome: "One line: the result"
role: "Your role"
period: "2026"
stack: ["Python", "SQL"]
repo: "https://github.com/..."
figure: "none"        # pr | recall | signif | none
metrics:
  - { value: "0.91", label: "F1", hl: true }
---
```

The body follows a fixed spine: the problem, the data, decisions and why,
what went wrong, what I'd do differently. The "what went wrong" section is
deliberate — it is usually the most informative part.

## Accessibility

Responsive to 360px, visible keyboard focus, skip link, semantic landmarks,
labelled SVG figures, and `prefers-reduced-motion` honoured throughout.
Scroll reveals are progressive enhancement: with JavaScript disabled the
content renders normally rather than staying invisible.

## Author

**Ahmed Huzaifa Malik** — BS Data Science, Pak-Austria Fachhochschule Institute
of Applied Sciences and Technology.

[LinkedIn](https://www.linkedin.com/in/ahmed-huzaifa-malik/) ·
[GitHub](https://github.com/real-huzaifa) ·
ahmedhuzaifamalik@gmail.com
