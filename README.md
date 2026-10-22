# ARCHITECT / Sector 57 website concept

An original, responsive architecture and spatial-design website concept built with Next.js, TypeScript, Tailwind CSS, Framer Motion and Lucide React.

This is a private sales demonstration for the business listed publicly as **ARCHITECT** in Sector 57, Gurugram. It is **not** the business's verified official website. The directory listing supplied for the concept is the source for the public phone number and address only; the visual identity, service catalogue, portfolio, process, qualifications, hours, email address and social profiles remain unverified.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/demo/architect-sector-57](http://localhost:3000/demo/architect-sector-57).

The exact validation commands are:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`NEXT_PUBLIC_SITE_URL` is optional. If supplied, it is used as the metadata base for canonical and social metadata. No API key or external form service is required for the demo.

## Route architecture

The app uses one dynamic catch-all route:

```text
src/app/demo/[slug]/[[...path]]/page.tsx
```

The typed registry in `src/data/business-demos.ts` is resolved by `src/lib/demo-route-resolver.ts`. A future prospect can be added by registering another `BusinessConfig` with a different slug; the shared site shell, navigation, cards, galleries, form and page renderers do not need to be duplicated.

Current routes include:

- `/demo/architect-sector-57`
- `/demo/architect-sector-57/about`
- `/demo/architect-sector-57/services`
- `/demo/architect-sector-57/services/architectural-planning`
- `/demo/architect-sector-57/services/glass-facade-solutions`
- `/demo/architect-sector-57/services/interior-spatial-planning`
- `/demo/architect-sector-57/services/3d-visualization`
- `/demo/architect-sector-57/projects`
- `/demo/architect-sector-57/projects/courtyard-residence`
- `/demo/architect-sector-57/projects/lightwell-house`
- `/demo/architect-sector-57/projects/urban-glass-house`
- `/demo/architect-sector-57/projects/warm-minimal-interior`
- `/demo/architect-sector-57/process`
- `/demo/architect-sector-57/insights`
- `/demo/architect-sector-57/insights/planning-home-natural-light`
- `/demo/architect-sector-57/insights/glass-stone-timber-material-harmony`
- `/demo/architect-sector-57/insights/questions-before-architecture-project`
- `/demo/architect-sector-57/faq`
- `/demo/architect-sector-57/contact`
- `/demo/architect-sector-57/privacy`
- `/demo/architect-sector-57/terms`

Unknown slugs and unsupported paths resolve to the styled 404 state.

## Content and concept transparency

The business registry keeps `ownerApprovalRequired`, `approvalStatus`, `disclosure` and `disclosureNote` on unverified services, projects and articles. Concept cards, project details, editorial notes and the footer explicitly disclose that they are illustrative. No testimonials, ratings, awards, founder details, credentials, years of experience, completed commissions, fees, turnaround promises or approval guarantees are fabricated.

The public facts used in the current configuration are:

- Listing name: `ARCHITECT` (used as a provisional working name)
- Phone: `+91 94669 40493`
- Address: `PLOT NO 2585P, Sector 57 Road, near MKM Market Road, Block G, Sushant Lok 2, Sector 57, Gurugram, Haryana 122011, India`

Reference listing: <https://glassy.in/glass-business/architect-sector-57-gurugram/>. This is treated as a directory source, not as an official company website.

The contact form is intentionally demo-only. It validates locally with Zod, shows an honest confirmation and does not send, store or log personal data. Connect a reviewed email or CRM provider only after the owner approves the content, consent language and credentials.

## Images and brand assets

The SVG brand assets and architecture imagery in `public/brand/` and `public/images/architect/` are original lightweight illustrative concept artwork created for this demo. They are not photographs of the business or verified projects. See [`docs/asset-provenance.md`](docs/asset-provenance.md). Approved photography and portfolio material must replace them before any official launch.

## Launch checklist

See [`docs/owner-approval-checklist.md`](docs/owner-approval-checklist.md) for the information that must be confirmed before publishing, and [`docs/deployment.md`](docs/deployment.md) for a Vercel-ready deployment outline. Demo metadata is `noindex`/`nofollow`, `robots` disallows `/demo/`, and the sitemap intentionally contains no demo URLs.
