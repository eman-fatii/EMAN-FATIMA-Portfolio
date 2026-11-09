# Eman Fatima – Personal Portfolio Website

Official Website: [https://emanfatimaportfolio.vercel.app](https://emanfatimaportfolio.vercel.app)

A modern, responsive, animated, SEO-optimized full-stack personal portfolio and digital marketing hub for **Eman Fatima** — BS Computer Engineering student (3rd Semester) specializing in Social Media Management, Digital Marketing, Email Marketing, and Business Productivity suites.

---

## 🚀 Key Features

- **Premium Black & Red Design System**: High-end modern agency aesthetic (`#080808` obsidian canvas, `#181818` card surfaces, `#E50914` signature red accents).
- **Multi-Page Routing**: Completely independent client-side routes powered by React Router with zero-refresh 404s via `vercel.json`.
  - `/` — Homepage (Hero, About, Featured Skills, Academic Timeline, Certificates, Latest Articles, Contact CTA)
  - `/about` — Detailed 8-section biography, academic pathway, strengths, and future vision.
  - `/skills` — Filterable skill categories (Social Media, Digital Marketing, Productivity Tools) with active competency indicators.
  - `/contact` — Validated contact form, honeypot anti-spam protection, direct mail link, and FAQ accordion.
  - `/blog` — Public blog with search, category filtering, and responsive article cards.
  - `/blog/:slug` — Unique individual article pages with dynamic SEO metadata, social share links, and related articles.
  - `/privacy-policy` & `/terms-and-conditions` — Transparent legal documentation.
  - `/admin/login`, `/admin/signup`, `/admin/dashboard` — Role-protected administrative dashboard.
- **Supabase PostgreSQL Integration**:
  - Ready-to-execute schema in `supabase/schema.sql` with Row Level Security (RLS) policies.
  - Public visitors can only view published content and submit contact inquiries.
  - Administrators can create, edit, delete, and publish skills, certificates, blog articles, and profile details.
  - Automatic fallback to browser persistence mode so the entire site is 100% interactive out-of-the-box before connecting live Supabase keys.
- **SEO, AEO & GEO Excellence**:
  - `public/robots.txt`
  - `public/sitemap.xml`
  - `public/llms.txt` for AI answer engines
  - Schema.org JSON-LD structured data (`Person`, `WebSite`, `BlogPosting`, `FAQPage`)
  - Canonical URLs, OpenGraph social cards, and Twitter summary cards.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons, React Router v7
- **Backend / Database**: Supabase (PostgreSQL, Supabase Auth, Row Level Security, Storage)
- **Deployment**: Vercel & Google AI Studio

---

## 🔑 Environment Variables & Setup

Create a `.env` file in the root directory (or configure in Vercel project settings):

```env
# Optional: Supabase Credentials (if connecting cloud PostgreSQL)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Owner Provisioning Key for Admin Onboarding
VITE_ADMIN_INVITE_CODE=EMAN_PORTFOLIO_ADMIN_2026
```

### 1. Supabase PostgreSQL Schema Setup
1. Open your Supabase Dashboard -> **SQL Editor**.
2. Open `supabase/schema.sql` from this repository and run the script.
3. This creates all 6 tables (`profiles`, `skills`, `certificates`, `blog_posts`, `contact_messages`, `site_settings`) and sets up secure Row Level Security policies.

### 2. Admin Access
- Navigate to `/admin/login`.
- Default owner email: `emanfatima9300@gmail.com`.
- To register or provision an admin, visit `/admin/signup` and input the secure Provisioning Key: `EMAN_PORTFOLIO_ADMIN_2026`.

---

## 📦 Deployment to Vercel

1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. The included `vercel.json` automatically configures single-page application (SPA) rewrites so direct navigation and refreshes to nested routes (`/about`, `/skills`, `/blog/:slug`, etc.) work without 404 errors.
4. Add your custom domain: `https://emanfatimaportfolio.vercel.app`.
