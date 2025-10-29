# x-hec impact platform

A Next.js 14 (App Router) application for the Master X-HEC Entrepreneurs student association. The site highlights upcoming events, including the impact hackathon, and provides a gated application flow powered by Supabase auth and database.

## key features

- landing page with categories grid and hero CTA leading to the impact hackathon
- hackathon detail page with organizers, participants preview, and conditional application card
- magic link authentication with email verification gate before form access
- application form validated with zod and routed through a secured Supabase API handler
- account dashboard listing the authenticated user's submissions
- tailwind CSS with shadcn/ui components (button, card, input, select, badge, avatar, textarea, dropdown menu, dialog, toast)

## local setup

1. **install dependencies**
   ```bash
   npm install
   ```
2. **configure environment**
   Create a `.env.local` file using the provided `.env.example` template and supply:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000 # optional but recommended for auth redirects
   ```
   Ensure the Supabase project has an email confirmation policy enabled and a `subscription` table matching the expected schema.

3. **start the development server**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to explore the experience.

## scripts

- `npm run dev` – start the development server
- `npm run lint` – run ESLint across the project
- `npm run build` / `npm run start` – production build and serve

## supabase notes

- the API route at `/api/subscribe` enforces a single application per user per event slug (`impact-hackathon-13-dec`)
- email verification is required before the form submission is accepted; resend is available from the apply card
- update the `subscription` table to include optional `status` values if you want richer dashboard labels

## deployment checklist

- set the environment variables (same as `.env.local`) on the hosting platform
- configure Supabase auth redirect to `<site-url>/auth/callback`
- allow `images.unsplash.com` as an external domain if using Next.js image optimization
