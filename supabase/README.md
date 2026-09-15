# Supabase (YOUR project)

This app is wired so **auth, database, and storage hit your Supabase project** — not Xroga's.

## 1. Connect in Xroga (recommended)
1. Open **Ship setup → Authorize Supabase** (Org OAuth App — no paste)
2. Pick an existing project **or create one** in the panel
3. Xroga fetches keys and applies schema + AI memory + storage RLS automatically
4. Connect **Vercel** and approve project environment access so keys sync on deploy

## 2. This migration file
`supabase/migrations/001_initial.sql` matches what Xroga auto-applies on Authorize.
Keep it in the repo for `supabase db push` / SQL Editor if you rebuild outside Xroga.

## 3. Confirm
- `/api/health` on your Vercel deploy should show `hasSupabase: true`
- Sign-in at `/login` uses magic links against **your** Auth providers


