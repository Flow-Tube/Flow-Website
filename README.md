<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://assets.flow-tube.org/v1/banners/flow-tube-dark.svg">
    <img alt="Flow-Tube. Open-source, privacy-first YouTube and YouTube Music clients for every screen." src="https://assets.flow-tube.org/v1/banners/flow-tube-light.svg" width="100%">
  </picture>
  <h1>Flow — Website</h1>
  <p>Marketing site, changelog, and patron listing for <a href="https://github.com/Flow-Tube/Flow">Flow</a>, an open-source YouTube client.</p>
  <p>
    <a href="https://flow-tube.org">flow-tube.org</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/Flow-Tube/Flow">Flow (Android)</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/flowneuro/flow-desktop">Flow (Desktop)</a>
  </p>
</div>

---

## Stack

- **React 18** + **TypeScript**, bundled with **Vite**
- **Tailwind CSS** for styling, with the theme defined as CSS variables in [`src/styles/globals.css`](src/styles/globals.css)
- **Framer Motion** for animation
- **React Router** for routing
- **Lucide** for icons

## Routes

| Path         | Page                                        |
| ------------ | ------------------------------------------- |
| `/`          | Home — hero, features, engine, FAQ, support |
| `/changelog` | Release notes, split by platform            |
| `/patrons`   | Patrons, grouped by support tier            |
| `/about`     | Project background                          |
| `/privacy`   | Privacy policy                              |
| `/dmca`      | DMCA notice                                 |

## Getting started

Requires Node.js 18 or newer.

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # type-check and build to dist/
npm run preview  # serve the production build locally
```

## Project layout

```text
src/
├── components/
│   ├── layout/     Header, Section
│   ├── sections/   Home page sections (Hero, Features, NeuroEngine, …)
│   └── ui/         Button, reveal animations
├── pages/          Route-level pages
├── styles/         Global CSS and theme variables
└── lib/            Small helpers
public/             Static assets, content JSON, sitemap, robots
```

## Content

Live data (stats, downloads, changelogs and contributors) is fetched in the browser from
[`assets.flow-tube.org/data/v1/`](https://assets.flow-tube.org/data/v1/index.json), so it stays
fresh without rebuilding the site. The feeds are built hourly in
[Flow-Tube/Brand](https://github.com/Flow-Tube/Brand#data-feeds). Set `VITE_DATA_URL` to read them
from somewhere else.

| File | Used by | Purpose |
| --- | --- | --- |
| `changelogs.json` | `/changelog`, Hero | Per-version release notes, one entry per platform build. |
| `contributors.json` | `/about`, Support | Project owner and contributors. |
| `downloads.json` | `/download` | Latest releases, IzzyOnDroid and nightlies. |
| `stats.json` | Hero, Header, Footer | Star, download and contributor counts. |

Patrons are the exception: [`public/patrons.json`](public/patrons.json) is edited by hand and
powers `/patrons`. See the file's `_note` field for the exact format.

## Hosting

The site is hosted on [Cloudflare Pages](https://pages.cloudflare.com), which builds `main` with
`npm run build` and serves `dist/`. Cache headers live in [`public/_headers`](public/_headers).
Unknown paths fall back to `index.html`, so React Router handles them.

## Related repositories

- [Flow-Tube/Flow](https://github.com/Flow-Tube/Flow) — the Android app
- [flowneuro/flow-desktop](https://github.com/flowneuro/flow-desktop) — the desktop app (Rust, Tauri 2)

## License

GPL-3.0. See [LICENSE](LICENSE).

## Note

The website was built with the assisstance of claude code

## Credits

Parts of this website's redesign (the two-tone sections, tone-aware buttons,
navigation dropdowns and footer layout) were inspired by the design of
[Zen Browser's website](https://zen-browser.app).
