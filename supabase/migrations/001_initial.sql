-- Real Estate Platform — initial schema for YOUR Supabase project
-- Apply in Supabase Dashboard → SQL Editor, or: supabase db push
-- Auth users live in auth.users; app data below uses auth.uid() RLS.

create extension if not exists "pgcrypto";

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- App records owned by the signed-in user
create table if not exists public.app_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  body text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists app_items_user_id_idx on public.app_items (user_id);

alter table public.app_items enable row level security;

create policy "app_items_select_own"
  on public.app_items for select
  using (auth.uid() = user_id);

create policy "app_items_insert_own"
  on public.app_items for insert
  with check (auth.uid() = user_id);

create policy "app_items_update_own"
  on public.app_items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "app_items_delete_own"
  on public.app_items for delete
  using (auth.uid() = user_id);

