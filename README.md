# EDOLARK Real Estate

A multi-page construction and real estate website for **EDOLARK LIMITED**, built with Next.js 15, React 19 and TypeScript.

## Pages

- **Home** — hero, featured projects, services and contact CTA
- **About us** — company story, mission, vision, values and office details
- **Services** — building design & construction, renovation, project management, maintenance, landscaping and procurement
- **Projects** — present and past developments with photo galleries
- **Project detail** — each project has its own page with a photo gallery (3–5 images where available)
- **Team** — meet the directors and professionals
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
- LocalBusiness/GeneralContractor JSON-LD schema
- Canonical URLs

To appear on Google you still need to:

1. Deploy the site to a live domain (e.g. Vercel, Netlify, Hostinger, etc.).
2. Verify ownership in [Google Search Console](https://search.google.com/search-console).
3. Submit the sitemap at `https://yourdomain.com/sitemap.xml`.

## Social links

- **Instagram:** https://instagram.com/edolarkltd
- **WhatsApp:** https://wa.me/2348062125925
- **Email:** mailto:info@edolark.com
- **Phone:** +234 806 212 5925
- **Office:** Plot 1 Ogunyemi Street, Pedro, Gbagada, Lagos State, Nigeria

## Notes

- Team names and bios come from the 2026 company profile PowerPoint.
- Project data is configured in `lib/data.ts` and project images are stored in `public/projects/`.
- Projects without supplied photos display the Edolark logo as a placeholder until images are added.
- The enquiry form is a front-end demo; connect it to your CRM or email API for production submissions.
