-- PHASE 2 ONLY: real room / invite architecture.
-- Do not run this until you want shared rooms.

create table if not exists rooms (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  game_slug text not null,
  status text not null default 'waiting',
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '24 hours')
);

create table if not exists room_players (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references rooms(id) on delete cascade,
  player_key text not null,
  display_name text,
  joined_at timestamptz not null default now()
);

create table if not exists room_answers (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references rooms(id) on delete cascade,
  player_key text not null,
  question_index int not null,
  answer text not null,
  created_at timestamptz not null default now(),
  unique(room_id, player_key, question_index)
);

create index if not exists rooms_code_idx on rooms(code);
create index if not exists room_answers_room_idx on room_answers(room_id);

-- Production:
-- 1) add RLS
-- 2) restrict writes to unexpired rooms
-- 3) use anonymous random player_key
-- 4) scheduled cleanup of expired rooms
