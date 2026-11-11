-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists public.content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  phone text,
  email text,
  interest text,
  message text,
  handled boolean not null default false
);

-- Lock the tables: only the server (service role key) can read or write them.
alter table public.content enable row level security;
alter table public.enquiries enable row level security;

-- Public bucket for uploaded project photos.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
