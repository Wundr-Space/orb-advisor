# Deployment (Netlify repo-import setup)

This project is deployed via **Netlify’s Git repository import flow** (not via GitHub Actions).

## Current deployment path

1. Connect this repository in the Netlify dashboard.
2. Netlify builds on push using:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. `netlify.toml` provides SPA routing fallback so client-side routes resolve to `index.html`.

## Required file

- `netlify.toml`
  - `[build]` command is `npm run build`
  - `[build]` publish directory is `dist`
  - `[[redirects]]` rewrites `/*` to `/index.html` with status `200`

## Netlify dashboard settings to verify

In **Site configuration → Build & deploy**:
- Build command: `npm run build`
- Publish directory: `dist`

In **Site configuration → Domain management**:
- Add/verify custom domain if needed

## How to test before push

```bash
npm ci
npm run build
```

Then validate locally with:

```bash
npm run dev
```

## Notes

- No GitHub Actions deployment workflow is required for this setup.
- If deployment behaviour changes in the future (e.g. preview channels, multi-env), update this document first.


## Troubleshooting

### Error: "Expected a JavaScript-or-Wasm module script but the server responded with MIME type text/html"

This usually means Netlify is serving the source `index.html` (repo root) or rewriting JS asset URLs to `index.html`.

Check:
1. **Publish directory is exactly `dist`** in Netlify Site configuration.
2. A fresh deploy has run after updating `netlify.toml`.
3. Asset paths like `/assets/index-*.js` return JavaScript (not HTML) in DevTools Network tab.

The `netlify.toml` in this repo keeps `/assets/*` as static files and only falls back to `/index.html` for app routes.
