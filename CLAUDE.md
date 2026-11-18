# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A personal "link in bio" page built with React 19 + Vite, Tailwind CSS v4, shadcn/ui-style components, and `motion` (Framer Motion). Plain JavaScript (JSX), no TypeScript, no tests.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/`
- `npm run lint` — oxlint

## Architecture

- **Content is data-driven.** Every profile field and link lives in `src/data/links.js` (`profile`, `contact`, `categories`, `links`). The WhatsApp, Email and Call links are built from `contact.email` and `contact.phone`; `mailto:`/`tel:` URLs open in the same tab, web URLs in a new one. Change content there, not in components. A link's `icon` is a key into `src/lib/icons.js` (react-icons brand icon + brand colour shown on hover), its `category` must match a `categories` id, and `featured: true` puts it in the large "Quick contact" tiles as well as the list.
- **Two layouts, one page.** `src/App.jsx` uses a media query (`useIsDesktop`: at least 768px wide and 500px tall, so landscape phones stay mobile) to render exactly one of: a full-screen mobile app (sticky top bar + page) or a full-screen desktop layout (Notion-like sidebar + scrolling page with a sticky top bar). Both render the same `Page` component. Only one is mounted at a time on purpose: the category pills use motion `layoutId`s that would clash if both were mounted.
- **Category filtering** shows as a sidebar on desktop at `lg` and up, and as `CategoryTabs` inside the page below `lg`. Both drive the same `filter` state in `App`. At `xl` and up, `Page` splits into two columns: profile and quick contact on the left (sticky), links on the right.
- **Theming.** Colours are shadcn-style CSS variables in `src/index.css` (`:root` and `.dark`), mapped to Tailwind via `@theme inline`. Keep the palette neutral (black/white). An inline script in `index.html` applies the saved theme before first paint. `src/hooks/use-theme.js` toggles the `.dark` class and persists it to `localStorage`, using a View Transitions circular reveal when the browser supports it. The page cover is three blurred `.cover-blob` spans drifting on CSS keyframes (`cover-drift` in `src/index.css`), tinted from `--foreground` so they work in both themes and stop under reduced motion.
- **UI primitives** in `src/components/ui/` follow shadcn/ui conventions. `components.json` is configured for JSX (`tsx: false`) with the `@/` alias (set in both `vite.config.js` and `jsconfig.json`), so `npx shadcn@latest add <component>` should work.
- **Motion.** The app is wrapped in `<MotionConfig reducedMotion="user">`. Entrance animations use the staggered `item` variant exported from `src/components/links.jsx`.
- **Fonts** load from Google Fonts in `index.html`: Geist (sans), Instrument Serif (the name heading), Geist Mono (labels and handles). The families are registered as `--font-sans/serif/mono` in `src/index.css`.
- **Static assets** go in `public/` (`profile.jpg`, `favicon.png`) (see Deployment for how to reference them).

## Deployment

GitHub Pages at https://milan-sony.github.io/sociallinks/ via `.github/workflows/deploy.yml`, which builds and deploys on every push to `master` (repo Settings → Pages → Source must be "GitHub Actions"). Because of this, `vite.config.js` sets `base: '/sociallinks/'`. Reference files in `public/` from JS with `import.meta.env.BASE_URL` (as `profile.avatar` does), never a bare `/file` path. Test the deployed build locally with `npm run build && npm run preview`, then open `/sociallinks/`.

## Preloader

The preloader is plain HTML/CSS inlined in `index.html` (`#preloader`) so it paints before the JS bundle loads, and it follows the saved theme. `src/main.jsx` waits for fonts and the avatar (shown at least `MIN_SHOW_MS`, at most `MAX_WAIT_MS`), then renders `App` and fades the preloader out. The name in the preloader is hardcoded in `index.html`; update it there if `profile.name` changes.
