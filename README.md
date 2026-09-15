# Real Estate Platform

Built with **Xroga AI** — coding agent that pushes to your GitHub and deploys on your Vercel.

## What you get
- Next.js App Router UI + middleware session refresh
- `/api/health` and `/api/chat`
- Supabase auth (`/login`, `/auth/*`) against **your** project
- `supabase/migrations/001_initial.sql` — profiles, RLS, optional storage
- Lemon Squeezy checkout (`/api/checkout`) + webhook (`/api/webhooks/lemon-squeezy`)

## Ship
1. Authorize GitHub + Vercel in Xroga Ship setup
2. Authorize Supabase (create or pick your project) — Xroga applies schema + memory + storage
3. Optional: save Lemon Squeezy API key / store / variant / webhook secret in Xroga Integrations
4. Build in Workspace — Xroga pushes, syncs vault → Vercel env when possible, deploys
5. Later prompts update the **same** GitHub repo automatically (we remember it after first ship)

## Prompt

Customize the Real Estate Platform template. Preserve search, filtering, sorting, property details, favourites, and the mortgage calculator.

