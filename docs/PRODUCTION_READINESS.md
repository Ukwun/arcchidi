# Arcchidi production-readiness assessment

Updated 19 November 2026.

## Executive conclusion

This repository currently delivers a public, responsive architecture and
design-build marketing site for Arc. Chidiebere Barnabas Ndubuisi / Buildscope International
Limited. It is not yet the multi-user project-management product described in
the latest brief.

The public site can be deployed as a lead-generation website after the owner
verifies the production domain, contact details, imagery, claims, and Netlify
form notifications. It is not honest or safe to call it a production platform
for thousands of users until identity, permissions, durable data, project
activity, and operational controls are built.

## What the product is trying to accomplish

The current product promise is to help residential clients in Nigeria and the
diaspora make better building decisions: understand the practice, inspect
selected work, choose a service or package, and submit a project enquiry.

The larger product vision is a trusted project workspace where each person sees
the right information for their role and project. Clients, architects, project
managers, contractors, consultants, and admins must be identified, authorized,
and shown an auditable view of conversations, documents, budgets, inspections,
approvals, payments, and progress.

## What is implemented now

- Next.js 16 App Router with TypeScript, static project routes, metadata,
  sitemap, robots, optimized `next/image` assets, and local fonts.
- Responsive home page with hero, services, packages, monitoring explanation,
  project cards, process, profile, and enquiry form.
- Five project records and generated case-study pages with image/status labels
  that distinguish design visualizations, construction, and completed work.
- Desktop and mobile navigation, skip link, keyboard focus styles,
  reduced-motion handling, and scroll-reveal enhancements.
- Netlify Forms registration and a thank-you route for public enquiries.
- Social/SEO metadata and structured data for the practice.
- Custom not-found and route-error recovery UI.

## What is not implemented

There is no database, account creation, login, session management, password or
passkey flow, organization/project membership, role-based access control,
admin console, client dashboard, project activity feed, file storage,
notifications, messaging, payments, audit log, search, rate limiting, or
analytics/observability pipeline.

The sample monitoring report is explicitly illustrative marketing content. It
must not be connected to a real client workflow without replacing it with
authorized, project-scoped data. The v2 testimonial placeholders and the
unsupported 20–40% cost statistic are intentionally not published.

## Production risks to resolve

1. **Identity and authorization:** choose an identity provider and model users,
   organizations, projects, memberships, roles, and invitations. Every read
   and mutation must authorize against the current user and project—not merely
   hide a button in the UI.
2. **Durable data:** choose a managed relational database and migrations. Keep
   financial figures, project status, inspection records, and approvals
   versioned and attributable.
3. **Files:** store plans, reports, invoices, and photos in private object
   storage with signed, expiring access URLs and malware/content checks.
4. **Workflow:** define state transitions for enquiry, project setup,
   inspection, report review, approval, payment request, and completion. Add
   idempotency and optimistic-concurrency protection to writes.
5. **Notifications:** add transactional email/WhatsApp/SMS only after consent,
   delivery tracking, retries, unsubscribe handling, and preferences exist.
6. **Security and privacy:** add server-side validation, abuse controls, CSP,
   secret management, backups, retention/deletion rules, and an incident
   response process. Do not collect identity or financial documents through
   the public form.
7. **Operations:** add structured logs, error tracking, uptime checks,
   database/storage backups, health checks, CI build/lint/type checks, staged
   deploys, and a rollback plan.
8. **Truthful content:** verify all credentials, address, phone/email routing,
   project values, dates, statuses, and image permissions before publishing.
   Written client consent is a release gate for naming or showing Grand Villa
   Retreat, Uzii, its images, location, or estate value.
9. **Cost claims:** never present an undated estimate as a guarantee. Every
   published cost plan needs a pricing date, assumptions, exclusions, and a
   change-notification process.
10. **Credentials and offices:** publish the ARCON credential only as a
    personal credential attached to the architect, never as a firm registration
    claim, and do not publish the registration number. Keep the operating
    address and phone number consistent across the website, proposals, and
    invoices; label any separate registered office explicitly.
11. **Time-sensitive pricing:** do not publish an old foreign-currency monthly
    estimate without a dated exchange-rate basis. The v2 “about $170 per month”
    figure remains intentionally unpublished.

## Recommended target architecture

Use this repository as the web application and server-side boundary:

- Next.js App Router server components for public pages and authenticated
  workspace pages.
- Managed authentication with verified email/phone and optional MFA.
- PostgreSQL (or equivalent managed relational database) with migrations and a
  server-only data-access layer.
- Object storage for private project files, accessed through short-lived
  signed URLs.
- Server Actions or Route Handlers with schema validation, authorization,
  idempotency keys, and audit events for every mutation.
- Background jobs for notifications, report generation, file processing, and
  retries rather than blocking user requests.
- CDN/image optimization for public imagery; private assets must never be
  exposed through a public path.

Core entities should include `User`, `Organization`, `Project`, `Membership`,
`Invitation`, `ProjectEvent`, `Document`, `Inspection`, `BudgetSnapshot`,
`PaymentRequest`, `Message`, `Notification`, and `AuditEvent`. A project event
should record actor, role, timestamp, type, payload/version, and related
entities so the activity history is explainable.

## Next implementation sequence

### Release 0 — public-site launch

- Confirm production domain, Netlify project, form notification recipient,
  spam handling, redirects, and HTTPS.
- Verify every published claim, project status, image caption, price, and
  contact channel with the owner.
- Run mobile/desktop browser checks, Lighthouse, link checks, and a real form
  submission in production.
- Add privacy-conscious analytics and monitor form delivery.

### Release 1 — secure foundation

- Choose auth, database, object storage, email, and observability vendors.
- Add environment schema and secret validation at startup.
- Add migrations, development-only fixtures, DAL/DTO boundaries, roles,
  memberships, invitations, and audit events.
- Add `/login`, `/invite`, `/app`, and admin-only routes with server-side
  authorization.

### Release 2 — real client workflow

- Convert enquiries into tracked records with ownership and status.
- Add project onboarding, milestones, documents, inspection reports, comments,
  budget snapshots, approvals, and notifications.
- Replace illustrative report content with project-scoped queries and clear
  empty/loading/error states.
- Add accessible responsive tables/cards and localized activity timestamps.

### Release 3 — scale and trust

- Load-test read/write paths, file access, notifications, and search.
- Add backup restore drills, rate-limit tuning, alert thresholds, retention
  controls, security review, dependency updates, and staged rollout.
- Establish support procedures for recovery, disputes, deleted users, failed
  notifications, and data export.

## Definition of done for “live”

The public site is live only when production form delivery and domain checks
pass. The real platform is live only when a test client, staff member, and
contractor can be invited; each sees only permitted projects; a project event,
document, report, approval, and notification can be created and audited; failed
requests recover safely; backups restore; and the owner can monitor and roll
back the release.

## Verification performed

- `npm run lint` passes.
- `npm run build` passes on Next.js 16.4.6 and generates the public routes and
  project case studies.
- Browser automation was unavailable in the current session, so responsive
  visual verification and real Netlify form delivery remain deployment checks.
