# Agent Notes: EDOLARK Real Estate

## Project Identity

- Name: **EDOLARK LIMITED** (RC 1099055)
- Primary brand colors: charcoal `#1b1c1b` and EDOLARK red `#d5141b` (derived from the bright red in `public/logo2.jpeg`)
- Supporting palette: warm paper `#faf9f6`, sand `#f0ede7`, muted `#6c6a65`
- Typography: DM Sans for UI text, Instrument Serif for headings (loaded via `next/font/google`)
- Logo assets:
  - `public/edolark-logo-transparent.png` — dark/red transparent mark for light backgrounds
  - `public/edolark-logo-light.png` — white/red transparent mark for dark backgrounds
  - `app/icon.png` — 64×64 favicon

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Plain CSS in `app/globals.css` (no Tailwind / CSS-in-JS)

## Run / Build

```bash
npm install
npm run typecheck   # tsc --noEmit
npm run build       # production build to .next/
npm run start       # production server on :3000
npm run dev         # development server on :3000
```

## Design system ("Blueprint Noir", Nov 2026 redesign)

- Dark hero + ink sections alternate with warm paper sections; red is the single accent. All styling lives in `app/globals.css` (plain CSS, section comments).
- Motion is dependency-free: `components/motion.tsx` (Reveal, SplitText, Counter, Magnetic, Parallax, ScrollFill) and `components/chrome.tsx` (Preloader, Cursor, ScrollProgress, FloatingActions). `app/template.tsx` fades pages in.
- `<html>` gets `js` (scroll animations enabled) and `seen` (skip intro) classes from an inline script in `app/layout.tsx`; the preloader sets `data-ready` on `<html>` which starts the hero headline animation.
- Home `HorizontalShowcase` pins on desktop (>=900px) and becomes a swipe row on mobile.
- Headline text for `SplitText` uses `
` for line breaks and `*word*` for the red italic accent.
- Everything respects `prefers-reduced-motion`.

## Pages

- `app/page.tsx` — homepage
- `app/about/page.tsx` — About us
- `app/services/page.tsx` — Our services
- `app/projects/page.tsx` — Project listing
- `app/projects/[slug]/page.tsx` — Project detail with photo gallery
- `app/team/page.tsx` — Meet the team
- `app/contact/page.tsx` — Contact form and details
- `app/sitemap.ts` and `app/robots.ts` — SEO files

## Data

- `lib/data.ts` holds company info, projects, services and team members.
- Project data is sourced from the `2026 EDOLARK LTD PROFILE.pptx`.
- Project images are stored in `public/projects/<project-folder>/` and referenced from `lib/data.ts`. Most project photos were extracted from the PowerPoint (resized to <=2000px JPEG); `public/projects/shared/` holds interior shots.
- `lib/data.ts` also exports `welcomeMessage`, `approach`, `values`, `equipment`, `credentials` and `portfolioStates()` used by the home/about/services pages.
- Image paths are encoded with `encodeURI()` when passed to Next `<Image>`.
- Original supplied logos are `public/logo.jpeg` and `public/logo2.jpeg`; the processed transparent logos are `public/edolark-logo-transparent.png` and `public/edolark-logo-light.png`.

## Important Notes

- The enquiry form is a front-end demo. Submitting it shows a success state but does not call an API.
- Projects without photos show a blueprint-grid tile with the Edolark logo.
- Contact details, team bios and project information come from the company profile PowerPoint; verify before production use.
- The logo is a supplied asset. Keep it in the public folder and do not overwrite `logo.jpeg` / `logo2.jpeg` without confirming with the user.
