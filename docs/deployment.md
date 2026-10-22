# Deployment notes

The project is a standard Next.js App Router application and can be deployed to Vercel without a database.

## Local production check

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```

## Vercel

1. Import the repository into Vercel.
2. Use the detected Next.js framework and the default build command `npm run build`.
3. Add `NEXT_PUBLIC_SITE_URL` only when a real approved domain is available. It should include the scheme, for example `https://www.example.com`.
4. Keep the demo configuration in `src/data/business-demos.ts` at `noIndex: true` until the owner approves the brand, content, assets, contact flow and domain.
5. If a live form provider is added, use server-side validation and deployment secrets. Never place provider credentials in `NEXT_PUBLIC_*` variables or in source files.

The current form is deliberately local-only. A live provider should be added as a focused server action or route handler after approval; the UI already keeps the submission boundary explicit.
