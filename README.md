# EDOLARK Real Estate

A multi-page real estate website for **EDOLARK LTD**, built with Next.js 15, React 19 and TypeScript.

## Pages

- **Home** — hero, featured projects, services and contact CTA
- **About us** — company story, values and office details
- **Services** — residential sales, development, investment advisory, project marketing and property management
- **Projects** — present and past developments
- **Project detail** — each project has its own page with a photo gallery (3–5 images)
- **Team** — meet the team
- **Contact** — form, address, phone, WhatsApp, Instagram and email

## Run locally

```bash
npm install
npm run typecheck
npm run build
npm run start   # production server on :3000
npm run dev     # development server on :3000
```

Open [http://localhost:3000](http://localhost:3000).

## Google / SEO

The site ships with:

- Page-level metadata and Open Graph tags
- `/sitemap.xml` and `/robots.txt`
- LocalBusiness JSON-LD schema
- Canonical URLs

To appear on Google you still need to:

1. Deploy the site to a live domain (e.g. Vercel, Netlify, Hostinger, etc.).
2. Verify ownership in [Google Search Console](https://search.google.com/search-console).
3. Submit the sitemap at `https://yourdomain.com/sitemap.xml`.

## Social links

- **Instagram:** https://instagram.com/edolarkltd
- **WhatsApp:** https://wa.me/2348062125925
- **Email:** mailto:info@edolarkltd.com
- **Phone:** +234 806 212 5925
- **Office:** 1 Ogunyemi Street, Pedro, Gbagada, Lagos State, Nigeria

## Notes

- Replace placeholder team names and photos in `lib/data.ts` before going live.
- Property/project content, prices and contact details are configured in `lib/data.ts`.
- The enquiry form is a front-end demo; connect it to your CRM or email API for production submissions.
