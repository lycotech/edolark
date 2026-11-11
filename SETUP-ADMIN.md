# Edolark site admin — one-time setup

The site has a private admin at **`/admin`** where the team can edit projects (with photo uploads), team members,
services, equipment, and read contact-form enquiries. Until the steps below are done, the website keeps working
exactly as before using the content built into the code.

## 1. Create the database (Supabase, free tier)

1. Go to https://supabase.com and create a project (any name, e.g. `edolark`). Pick a region close to Nigeria/Europe.
2. In the project, open **SQL Editor → New query**, paste the whole of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**.
   This creates the `content` and `enquiries` tables and a public `media` storage bucket for photos.
3. Open **Project Settings → API** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** secret key → `SUPABASE_SERVICE_ROLE_KEY` (keep it secret; never put it in browser code)

## 2. Add environment variables in Vercel

In Vercel: **Project → Settings → Environment Variables**, add for Production (and Preview if you like):

| Name | Value |
| --- | --- |
| `SUPABASE_URL` | the Project URL from step 1 |
| `SUPABASE_SERVICE_ROLE_KEY` | the service_role key from step 1 |
| `ADMIN_PASSWORD` | a long password the Edolark team will use to log in |
| `ADMIN_SESSION_SECRET` | any long random string (optional but recommended) |

Then **redeploy** (Deployments → ⋯ → Redeploy) so the variables take effect.

For local development copy `.env.example` to `.env.local` and fill the same values.

## 3. Use it

1. Open `https://<your-site>/admin` and log in with `ADMIN_PASSWORD`.
2. The editors start pre-filled with the current site content. Make a change and press **Save changes** —
   the live site updates immediately.
3. **Projects:** add/edit/delete, reorder (the order is the site order), upload photos (resized automatically),
   and use ★ to make a photo the cover (the first photo is the cover).
4. **Enquiries:** every Contact-form message is stored here (and still emailed to info@edolark.com).

## Notes

- Nothing is saved until you press **Save changes**. Switching tabs keeps your unsaved edits.
- Photos from the old static site (`/projects/...`) and new uploads (Supabase) can sit side by side in a gallery.
- Anyone with the admin password can edit the site. Change `ADMIN_PASSWORD` in Vercel and redeploy to rotate it.
- The first time you press Save on a section, the current built-in content is copied into the database; after that
  the database is the source of truth for that section.
