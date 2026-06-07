# element824.github.io

Personal site and writing hub for **Koushik Nagarajan** — AI architect, technology educator, and Microsoft Data & AI professional based in Australia.

🌐 **Live site:** [element824.github.io](https://element824.github.io)

---

## About

This is the source for my personal GitHub Pages site. It's a hand-crafted, static HTML site — no framework, no build step, no CMS. Just intentional HTML, CSS, and a little JavaScript.

The design is dark, typographic, and precise: `Space Grotesk` for headings, `JetBrains Mono` for metadata, `Inter` for body copy — against a deep navy background with a cyan/purple/pink accent palette.

---

## Structure

```
/
├── index.html              # Main landing page (About, Expertise, Leadership, Writing, Contact)
├── blog/
│   ├── index.html          # Writing index — all posts
│   ├── cognitive-surrender.html
│   ├── agent-memory-three-layers.html
│   └── sculpt-not-spec.html
├── css/
│   └── style.css           # Global stylesheet
├── js/
│   └── main.js             # Nav toggle, scroll behaviour
├── favicon.png
├── robots.txt
└── sitemap.xml
```

---

## Writing

All posts live in `/blog/` as standalone HTML files. Each post follows the same template: shared nav, `post-wrap` layout, consistent typographic components (callouts, stat blocks, scenario cards, film quotes, reference lists, author card).

| Post | Topic | Published |
|------|-------|-----------|
| [Cognitive Surrender: The Tool That Thinks](https://element824.github.io/blog/cognitive-surrender.html) | AI & Cognitive Science | June 2026 |
| [Why Your AI Agent Keeps Forgetting](https://element824.github.io/blog/agent-memory-three-layers.html) | AI Architecture | April 2026 |
| [Sculpt, Not Spec](https://element824.github.io/blog/sculpt-not-spec.html) | AI Philosophy | April 2026 |

---

## Design System

The site uses a small set of reusable CSS components for post bodies:

- **`.callout`** — highlighted insight or key concept block
- **`.stat-block`** — data point or quote with icon
- **`.scenario-card` / `.layer-card`** — grid cards for structured comparisons or lists
- **`.film-quote`** — styled blockquote for film/book dialogue
- **`.refs-list`** — clean reference list at the bottom of each post
- **`.author-card`** — author bio footer

---

## Deployment

Static site hosted on **GitHub Pages** from the `master` branch root. No build pipeline — changes pushed to `master` go live automatically via GitHub Pages.

---

## Contact

- **LinkedIn:** [koushiknagarajan](https://www.linkedin.com/in/koushiknagarajan/)
- **GitHub:** [element824](https://github.com/element824)
- **Site:** [element824.github.io](https://element824.github.io)
