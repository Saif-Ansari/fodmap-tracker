# 🌿 FODMAP Tracker

A personal health tracking app for managing the [Monash University Low-FODMAP protocol](https://www.monashfodmap.com/) — a clinician-recommended dietary intervention for IBS and related gut conditions.

Built as a real tool to solve a real problem: existing FODMAP apps are food lookup databases. None of them let you log meals, track symptoms, and analyse patterns over time.

---

## What it does

**Daily logging**
- Log every meal with type, time, and foods eaten
- Log every bowel movement with urgency level and time relative to waking
- Quick-entry modals optimised for mobile use

**Pattern analysis**
- 7-day movement frequency bar chart
- Week-on-week trend (improving vs. not)
- Urgency breakdown over time
- Insights screen for spotting meal → symptom correlations

**Data ownership**
- Stored in your own Supabase instance — not locked to any service
- CSV export for doctor visits or manual analysis
- Per-user Row Level Security — data is isolated per account

---

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite |
| Auth & DB | Supabase (PostgreSQL + Auth + RLS) |
| Hosting | Vercel |
| Access control | Vercel Edge Middleware (HTTP Basic Auth) |
| Icons | Lucide React |

---

## Architecture notes

**Storage abstraction** — `useStorage.js` is the only file that talks to Supabase. Swapping the backend means rewriting one file. This is how the app migrated from `localStorage` (v1) to Supabase (v2) without touching any screen components.

**Auth gate** — `useAuth.js` manages Supabase session state. `App.jsx` renders an auth screen if no session is present. All data queries are scoped to `user.id`.

**Responsive layout** — position:fixed sidebar on desktop (≥768px), bottom nav on mobile. No layout logic in JS — pure CSS class switching.

**Edge Middleware** — `middleware.js` runs at the Vercel edge before any request reaches the app. Password lives in an env var (`APP_PASSWORD`), never in the JS bundle.

---

## Run locally

```bash
git clone https://github.com/yourusername/gut-tracker.git
cd gut-tracker
npm install
```

Create a `.env` file:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Set up the database (run once in Supabase SQL editor):

```bash
# Contents are in supabase-setup.sql
```

```bash
npm run dev
```

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Import to [Vercel](https://vercel.com) — auto-detects Vite
3. Set environment variables in Vercel dashboard:

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase publishable (anon) key |
| `APP_PASSWORD` | Password for HTTP Basic Auth gate |

---

## Database schema

Two tables — `meals` and `movements` — with RLS policies that restrict each user to their own rows.

```sql
-- See supabase-setup.sql for the full schema
```

---

## Differentiation from existing apps

| Feature | Fig / Monash app | Gut Tracker |
|---|---|---|
| Food safety lookup | ✅ | ❌ (not the goal) |
| Personal symptom log | ❌ | ✅ |
| Meal → movement patterns | ❌ | ✅ |
| Week-on-week trend | ❌ | ✅ |
| CSV export for doctors | ❌ | ✅ |
| Self-hosted, data ownership | ❌ | ✅ |

---

## Roadmap

- [ ] Sleep / wake time logging per day
- [ ] Daily symptom score (0–10)
- [ ] FODMAP reintroduction tracker (3-day challenge protocol)
- [ ] Meal → movement correlation view
