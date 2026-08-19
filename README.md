<h1 align="center">Ahmed Huzaifa Malik — Portfolio</h1>

<p align="center">
  A case-study portfolio for data science work.<br>
  Built with Astro, hand-written CSS, and a visual language borrowed from scientific plotting.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-BC52EE?style=flat-square&logo=astro&logoColor=white" alt="Astro">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/dependencies-none-22A884?style=flat-square" alt="No runtime dependencies">
</p>

**Live site:** _add your URL here_

---

## Overview

Most developer portfolios are a scrolling wall of project cards: a title, a stack
list, a repository link, and nothing that shows how the person actually thinks.
I wanted the opposite — a site where each project is written up properly, the
reasoning behind every decision is on the page, and the claims are verifiable
because you can call the model yourself.

It's a single scrolling page covering education, experience, projects, a longer
introduction and contact details, with each project expanding into a full case
study. Every case study follows the same spine: the problem, the data, the
decisions I made and why, what went wrong, and what I'd do differently. That
fourth section is deliberate. The mistakes are usually the most informative part,
and almost no junior portfolio admits to any.

The design is built around the idea that the page is itself a figure. The palette
is lifted from **viridis**, the colormap used across scientific Python, and hue
encodes value consistently everywhere on the site — deep indigo is low, yellow is
high. The same ramp runs through the background, the precision–recall curves, the
risk meter and the highlighted metrics, so colour means one thing throughout
rather than being decoration.

---

## What I built

### A live background that models what it depicts

The page sits on a canvas field of points pulled toward drifting centroids, with
edges drawn between near neighbours inside each cluster. It's what a t-SNE or UMAP
embedding looks like while it settles, and it never fully converges — the
centroids keep moving, so the structure continually reorganises. It pauses when
the tab is hidden, scales its point count to the viewport, and switches off
entirely under `prefers-reduced-motion`.

### A hero that states the problem before the copy does

On the landing section, every dot is one transaction and 3.50% of them ignite.
That's the real fraud rate in the IEEE-CIS dataset, and the class imbalance —
the single hardest thing about the project — is visible before a word of text
explains it.

### Case studies as structured content, not hardcoded pages

Each project is a Markdown file with typed frontmatter validated by a Zod schema
at build time. A malformed metric or a missing field fails the build instead of
shipping broken. Adding a project means adding a file; the index, the routing and
the detail page follow automatically.

### Figures drawn from real numbers

- **Precision–recall curves** generated from the reported areas (0.548 against a
  0.186 baseline), animated to draw themselves on scroll via `stroke-dashoffset`.
- **A recall visual** showing what 0.78 means operationally — of every ten
  customers about to leave, eight land on the call list and two don't.
- **A significance callout** for the chi-square result on category return rates.

Where I didn't have the real underlying numbers, I left the figure out rather than
inventing plausible ones.

### A working call to a deployed model

The Projects section embeds a control that sends a transaction to the live
FastAPI service and renders the returned probability on a gradient risk meter. It
checks `/health` on load, handles the free tier's 10–30 second cold start
explicitly rather than looking broken while the container wakes, and states
plainly that a three-field form exercises only a fraction of the model's 431
features — so the score sits near the uncertain middle by design.

### Motion that serves the content

Section reveals, count-up on tabular figures, curves that draw, and a scroll-spy
that tracks the active section in the navigation. All of it is progressive
enhancement: with JavaScript disabled the page renders normally rather than
staying invisible, and every animation is disabled for users who ask for reduced
motion.

---

## Tools I used

**Framework and language**

| | |
|---|---|
| **Astro 5** | static site generation, content collections, file-based routing |
| **JavaScript (ES6)** | canvas animation, IntersectionObserver, `fetch` against the live API |
| **CSS3** | design tokens, grid, `clip-path`, keyframe animation, container-aware layout |
| **Zod** | build-time schema validation on case-study frontmatter |

**Graphics and motion**

| | |
|---|---|
| **Canvas 2D** | the live embedding field and the class-imbalance point field |
| **SVG** | precision–recall curves, plotted from data rather than drawn by hand |

**Typography**

| | |
|---|---|
| **Bricolage Grotesque** | display face |
| **IBM Plex Sans** | body text |
| **IBM Plex Mono** | data, labels and axis ticks |

**Tooling**

| | |
|---|---|
| **Git & GitHub** | version control |
| **VS Code** | development |
| **Vercel** | hosting |

No CSS framework, no component library, no runtime JavaScript framework. Every
style in the project is hand-written.

---

## Accessibility

Responsive down to 360px, visible keyboard focus throughout, a skip link, semantic
landmarks, labelled SVG figures, and full `prefers-reduced-motion` support.

---

## Author

**Ahmed Huzaifa Malik** — Data Analyst · Data Scientist
BS Data Science, Pak-Austria Fachhochschule Institute of Applied Sciences and Technology

[LinkedIn](https://www.linkedin.com/in/ahmed-huzaifa-malik/) ·
[GitHub](https://github.com/real-huzaifa) ·
