# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static personal portfolio website for Michael Gayed, UX Researcher at Commonwealth Bank of Australia. Plain HTML/CSS/JS — no build tools, no frameworks, no dependencies.

## Running the site

Must be served (not opened as `file://`) because browsers block local font loading:
```
python3 -m http.server 8000
# then open http://localhost:8000
```

## Architecture

**Three pages, one shared stylesheet and one JS file:**

- `index.html` — hero → stats band → case study cards → about/CV → contact
- `case-study-1.html` — CommBank App Cards (mixed-methods)
- `case-study-2.html` — CommBank Bank Vault (ethnographic)
- `css/styles.css` — all styles for all three pages
- `js/main.js` — scroll animations, number counters, card tilt, sticky nav

**Assets** live under `Content/Assests/` (typo in folder name — preserve it):
- `Content/Assests/CV _ Resume (Community).pdf` — CV download target
- `Content/Assests/images/Case study 1 images/` — case study 1 images
- `Content/Assests/images/Case study 2 images/` — case study 2 images
- `Content/fonts/` — local `.otf` font files (currently Talina DEMO + Mileast)

## Design tokens

All colours, spacing, and fonts are CSS custom properties in `:root` at the top of `styles.css`. Change values there, not inline. Key tokens:

| Token | Purpose |
|---|---|
| `--bg` / `--bg-1` / `--bg-2` / `--bg-3` / `--bg-4` | Dark background layers (lightest = `--bg-4`) |
| `--text` / `--text-mid` / `--text-faint` | Text hierarchy |
| `--accent` | Terracotta `#C4623A` — buttons, labels, dots |
| `--font-display` | Heading font stack — currently Talina, fallback DM Serif Display |
| `--font-body` | Body font — Inter |
| `--section-pad` | Section vertical padding (112px desktop, 64px mobile) |
| `--max-w` | Max content width (1160px) |

## Custom fonts

Fonts are loaded via `@font-face` at the top of `styles.css`, pointing to `../Content/fonts/`. To switch the display font, change the first entry in `--font-display`. To add a new font, add a `@font-face` block and update the token.

## Animation system

Scroll animations use a `data-anim` attribute + `.animated` class toggled by `IntersectionObserver` in `main.js`. Use `--delay` CSS custom property for stagger timing.

| `data-anim` value | Motion |
|---|---|
| `up` | fade + translateY(48px) |
| `up-xl` | fade + translateY(72px) + blur — for large headings |
| `left` | translateX(-64px) — section headers, left-column content |
| `right` | translateX(64px) — right-column content |
| `card-l` | translateX(-80px) + rotate(-3deg) — left card |
| `card-r` | translateX(80px) + rotate(3deg) — right card |
| `scale` | scale(0.78) — stat cards, gallery items |
| `pop` | scale(0.55) — skill tags |

**JS auto-stagger**: skill tags, gallery items, stat cards, method cards, and `.rq-item` elements inside their containers are staggered automatically by `main.js` — no per-element attributes needed.

**Number counters**: add `data-count="40" data-suffix="%"` to any element to animate it counting up on scroll entry.

**Card tilt**: `.card` elements get a 3D mouse-tracking tilt on desktop automatically (no markup needed).

## Responsive breakpoints

- `960px` — two-column grids collapse; `card-l`/`card-r` animations revert to plain `up`
- `768px` — nav links hidden, container padding reduces, single-column stats band
- `480px` — stacked CTAs, single-column stats/methods

## Git workflow

Commit and push to GitHub after every meaningful change:
```
git add <specific files>
git commit -m "descriptive message"
git push origin main
```

Remote: `https://github.com/MrFinigen/claudecode-research-portfolio`
