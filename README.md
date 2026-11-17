# Arc. Chidi Ndubisi

A residential design-build portfolio for Arc. Chidi Ndubisi, built with the
Next.js App Router, React, and TypeScript.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Validation

```bash
npm run lint
npm run build
```

## Netlify Forms

`public/netlify-forms.html` registers the enquiry form and its fields with
Netlify's Next.js runtime. Keep its field names aligned with the visible form
in `src/app/page.tsx`.

## Motion

Scroll reveals are progressive enhancements and respect the visitor's reduced
motion preference. Keep page content visible when JavaScript or the observer
API is unavailable.

## Project imagery and status

Approved project images are stored in `public/images`. Use the shared project
data in `src/data/projects.ts` to keep image captions, project status, and case
study content consistent. Label design visualizations separately from
completed or in-progress construction; do not present a render as a photograph
of a completed building.

## Content

The supplied reference content was approved for use. Testimonials shown as
placeholders in that reference are not published as testimonials. Add future
projects and claims only when their details and image status are confirmed.

## Production readiness

See [docs/PRODUCTION_READINESS.md](docs/PRODUCTION_READINESS.md) for the
current product assessment, verified capabilities, launch checklist, and the
architecture required to evolve this public site into a real multi-user
project workspace. The repository currently contains no authentication,
database, client portal, or project activity system.
