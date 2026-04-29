# Deployment

## Primary deployment: GitHub Pages (working path)

This repository is deployed via **GitHub Pages** using:

- Workflow: `.github/workflows/deploy.yml`
- Trigger: push to `main` (and manual `workflow_dispatch`)

The workflow builds the app, copies `dist/index.html` to `dist/404.html` for SPA routing, uploads the artifact, and deploys to Pages.

Live URL:
- https://wundr-space.github.io/orb-advisor

## Optional deployment: Netlify (currently erroring)

Netlify can still be used, but the current error means JavaScript asset requests are being served HTML:

`Failed to load module script ... MIME type of "text/html"`

That happens when the JS file path is missing or rewritten to `index.html`.

### Netlify checks

1. In **Site configuration → Build & deploy**:
   - Build command: `npm run build`
   - Publish directory: `dist`
2. Deploy logs should show Vite output files in `dist/assets/`.
3. In browser DevTools Network, open `index-*.js`:
   - If Response is HTML, Netlify is serving fallback instead of the JS asset.
4. Confirm the published `index.html` is from `dist` (it should reference `/assets/...`, not `/src/main.tsx`).

## Netlify config in repo

`netlify.toml` is configured for SPA fallback while preserving `/assets/*` static files.

## Local smoke test

```bash
npm ci
npm run build
npm run dev
```
