<div align="center">
  <img src="public/flow-icon.svg" width="72" height="72" alt="Flow logo" />
  <h1>Flow — Website</h1>
  <p>The marketing and changelog site for <a href="https://github.com/A-EDev/Flow">Flow</a>, an open-source YouTube client.</p>
  <p>
    <a href="https://flow.aedev.me">flow.aedev.me</a>
    &nbsp;·&nbsp;
    <a href="https://github.com/A-EDev/Flow">Flow app</a>
    &nbsp;·&nbsp;
    <a href="LICENSE">GPL-3.0</a>
  </p>
</div>

---

## Stack

- **React 18** + **TypeScript**, bundled with **Vite**
- **Tailwind CSS** for styling, with the theme defined as CSS variables in [`src/styles/globals.css`](src/styles/globals.css)
- **Framer Motion** for animation
- **React Router** for the handful of routes
- **Lucide** for icons

## Routes

| Path         | Page                                          |
| ------------ | --------------------------------------------- |
| `/`          | Home — hero, features, engine, FAQ, support   |
| `/changelog` | Release notes, split by platform              |
| `/about`     | Project background                            |
| `/privacy`   | Privacy policy                                |
| `/dmca`      | DMCA notice                                   |

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
public/             Static assets, stats.json, sitemap, robots
```

## GitHub stats

Star and download counts are read from [`public/stats.json`](public/stats.json)
rather than the GitHub API, so no requests are made from the browser. The file
is refreshed hourly by the workflow in
[`.github/workflows/update-stats.yml`](.github/workflows/update-stats.yml),
which fetches the latest numbers and commits them back.

## License

GPL-3.0. See [LICENSE](LICENSE).

## Note

The website was built with the assisstance of claude code
