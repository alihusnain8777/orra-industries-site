-- Step 1: run this once in Supabase > SQL Editor

create table if not exists public.docs (
  path        text primary key,          -- e.g. products/asa-sw-fb-001, buyers/<user id>, leads/RFQ-1050
  collection  text not null,             -- site | products | posts | buyers | leads | admin
  owner       uuid,                      -- buyer's user id for buyers/* rows
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

create schema if not exists private;
grant usage on schema private to anon, authenticated;
create or replace function private.is_admin() returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

alter table public.docs   enable row level security;
alter table public.admins enable row level security;

-- Everyone (also Google) can read the public catalogue
drop policy if exists "public read" on public.docs;
create policy "public read" on public.docs for select
  using (collection in ('site','products','posts'));

-- Staff can do everything
drop policy if exists "admin all" on public.docs;
create policy "admin all" on public.docs for all
  using (private.is_admin()) with check (private.is_admin());

-- A buyer reads and writes only their own row buyers/<their id>
drop policy if exists "buyer read own" on public.docs;
create policy "buyer read own" on public.docs for select
  using (collection = 'buyers' and owner = auth.uid());
drop policy if exists "buyer insert own" on public.docs;
create policy "buyer insert own" on public.docs for insert
  with check (collection = 'buyers' and owner = auth.uid() and path = 'buyers/' || auth.uid()::text);
drop policy if exists "buyer update own" on public.docs;
create policy "buyer update own" on public.docs for update
  using (collection = 'buyers' and owner = auth.uid())
  with check (collection = 'buyers' and owner = auth.uid() and path = 'buyers/' || auth.uid()::text);

-- Visitors without an account can send an RFQ or message (insert only, cannot read)
drop policy if exists "lead insert" on public.docs;
create policy "lead insert" on public.docs for insert
  with check (collection = 'leads' and path like 'leads/%' and length(data::text) < 20000);

-- A signed-in user may check whether they are staff
drop policy if exists "admin self check" on public.admins;
create policy "admin self check" on public.admins for select using (user_id = auth.uid());

-- Photo storage: public bucket, only staff upload or delete
insert into storage.buckets (id, name, public) values ('media','media', true)
  on conflict (id) do nothing;
drop policy if exists "media read" on storage.objects;
create policy "media read" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "media staff write" on storage.objects;
create policy "media staff write" on storage.objects for insert with check (bucket_id = 'media' and private.is_admin());
drop policy if exists "media staff delete" on storage.objects;
create policy "media staff delete" on storage.objects for delete using (bucket_id = 'media' and private.is_admin());
