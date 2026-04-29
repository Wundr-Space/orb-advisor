# Deployment guide (Pollie prototype)

This repo includes:
- `netlify.toml` for Netlify static hosting
- `vercel.json` for Vercel SPA rewrites
- `.github/workflows/deploy-static.yml` for CI build + optional deploys

## 1) Required GitHub Secrets

Set these in **GitHub → Settings → Secrets and variables → Actions**.

### Netlify (optional)
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

### Vercel (optional)
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

If Netlify secrets are present, the Netlify deploy job runs.
If Vercel secrets are present, the Vercel deploy job runs.
If neither is present, CI still builds and uploads `dist` as an artifact.

## 2) Workflow behaviour

Workflow file: `.github/workflows/deploy-static.yml`

- Triggers on pushes to `main`
- Can also be triggered manually via **Run workflow**
- Always runs `npm ci` + `npm run build`
- Deploy jobs are conditional on secrets

## 3) First deploy checklist

1. Push branch and merge to `main`.
2. Add required secrets for your hosting platform.
3. Trigger the workflow (push or manual).
4. Confirm green checks in **Actions**.
5. Open deployed URL and verify:
   - Pollie landing view renders
   - Postcode `PO16 9AA` returns 2 mock ballot cards
   - Direct route loads do not 404 (SPA fallback works)

## 4) Local verification

```bash
npm ci
npm run build
npm run dev
```

Then open the app and test `PO16 9AA`.

## 5) Zero-secret option: GitHub Pages

A no-secrets deployment workflow is included at `.github/workflows/deploy-pages.yml`.

- It deploys automatically from `main` to GitHub Pages
- It builds with `--base=/<repo-name>/` so routes and assets resolve correctly
- Enable in GitHub: **Settings → Pages → Build and deployment = GitHub Actions**


After the first successful deploy, copy the URL from:
- **Actions → Deploy to GitHub Pages → deployment step output**, or
- **Settings → Pages**

Share that URL with testers for the Pollie UX review round.
