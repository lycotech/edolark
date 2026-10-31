# EDOLARK Real Estate

A responsive real estate marketing homepage for **EDOLARK LTD**, built with Next.js, React and TypeScript. The visual direction uses the supplied red-and-charcoal EDOLARK logo, warm neutrals and editorial typography.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run typecheck
npm run build
```

## Included

- Responsive desktop and mobile navigation
- Property search by location, type and budget
- Property-type filters and empty states
- Saved homes persisted in local storage
- Property details and enquiry modal
- General consultation enquiry flow with success feedback
- Keyboard-accessible controls, visible focus states and reduced-motion support

Property listings, prices and contact details are sample content and can be replaced in `lib/properties.ts` and `components/edolark-home.tsx`. The enquiry form is a front-end demo and needs an API or CRM connection for production submissions.
