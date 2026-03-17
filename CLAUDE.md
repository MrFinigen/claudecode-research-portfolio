# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static personal portfolio website for Michael Gayed, UX Researcher at Commonwealth Bank of Australia. Plain HTML/CSS/JS — no build tools, no frameworks, no dependencies.

## Running the site

Open any HTML file directly in a browser:
```
open index.html
open case-study-1.html
open case-study-2.html
```

Or serve locally (avoids any file:// quirks with fonts):
```
python3 -m http.server 8000
```

## Architecture

**Three pages, one shared stylesheet:**

- `index.html` — single-page layout: hero → case study cards → full CV/about → contact
- `case-study-1.html` — CommBank App Cards (mixed-methods research)
- `case-study-2.html` — CommBank Bank Vault (ethnographic research)
- `css/styles.css` — all styles for all three pages; organised by: design tokens → reset → typography → layout → components → page-specific → animations → responsive
- `js/main.js` — ~50 lines; Intersection Observer for scroll fade-ins, sticky nav `.scrolled` class toggle

**Design tokens** are CSS custom properties at the top of `styles.css` (`:root`). Change colours, spacing, and fonts there — not inline.

**Content and assets** live under `Content/Assests/` (note the typo in the folder name — preserve it):
- `Content/Assests/CV _ Resume (Community).pdf` — linked from CV download buttons
- `Content/Assests/images/Case study 1 images/` — images for case study 1
- `Content/Assests/images/Case study 2 images/` — images for case study 2

## Key conventions

- **Animations**: add class `fade-in` to any element for scroll-triggered fade-in-up. Add `fade-in-delay-1` through `fade-in-delay-4` for staggered timing. The JS observer fires once and unobserves.
- **Responsive breakpoint**: 768px (and 480px for stacked buttons). CSS is desktop-first with `@media (max-width: 768px)` overrides at the bottom of `styles.css`.
- **Section spacing**: controlled by `--section-pad` CSS variable (96px desktop, 56px mobile).
- **No nav links on mobile** — `.nav__links` is hidden at 768px via `display:none`. If adding a hamburger menu, that CSS rule is the entry point.

## Git workflow

Commit and push to GitHub after every meaningful change:
```
git add <specific files>
git commit -m "descriptive message"
git push origin main
```

Remote: `https://github.com/MrFinigen/claudecode-research-portfolio`
