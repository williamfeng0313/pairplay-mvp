-- TwoLumi MVP room-code schema
-- Run in Supabase SQL Editor once.

create extension if not exists pgcrypto;

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  game_slug text not null default 'would-you-rather',
  host_token uuid not null default gen_random_uuid(),
  guest_token uuid,
  status text not null default 'waiting'
    check (status in ('waiting', 'ready')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '2 hours')
);

create unique index if not exists rooms_code_idx on public.rooms(code);
create index if not exists rooms_expires_at_idx on public.rooms(expires_at);

-- Block all direct public access.
-- The Next.js API routes use SUPABASE_SECRET_KEY on the server,
-- which bypasses RLS.
alter table public.rooms enable row level security;

-- Intentionally no anon/authenticated policies.
-- Do NOT expose SUPABASE_SECRET_KEY to the browser.
