# TwoLumi Room Code MVP — Setup

## What this update does

It turns the homepage room box into a real two-person pairing flow:

1. Player A clicks **Create Room**
2. Server creates a 6-character room code
3. Player A lands on `/room/ABC123`
4. Player A sends the code to Player B
5. Player B enters the code on the homepage
6. Server validates the code and joins Player B
7. Both room pages detect the paired state automatically

This update validates the room-code / pairing layer only.
It intentionally does **not** synchronize game questions/answers yet.

## Product constraints chosen for MVP

- no login
- exactly 2 players per room
- 6-character code
- 2-hour room expiry
- no personal profile data
- room status checked every 2 seconds
- first synchronized game comes only after pairing is proven



## Step 1 — Create a Supabase project

Create one free Supabase project.

Then open:

**SQL Editor → New query**

Paste and run:

`supabase/schema.sql`

## Step 2 — Get Supabase credentials

Supabase Project Settings → API.

You need:

- Project URL
- `service_role` key

The service-role key is SECRET.

## Step 3 — Local `.env.local`

Create a file named:

`.env.local`

in the project root:

```env
NEXT_PUBLIC_SITE_URL=https://twolumi.com
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SECRET_KEY=YOUR_SB_SECRET_KEY
```

Never use `NEXT_PUBLIC_` for the service-role key.

## Step 4 — Run locally

```powershell
npm.cmd run dev
```

Test with two browser windows:

Window A:

- open homepage
- click Create Room
- copy code

Window B / Incognito:

- open homepage
- enter code
- click Join Room

Expected:

- Window B joins
- within ~2 seconds Window A changes to **You're paired!**



## Step 5 — Vercel env vars

Vercel → Project → Settings → Environment Variables

Add:

```text
SUPABASE_URL
SUPABASE_SECRET_KEY
NEXT_PUBLIC_SITE_URL=https://twolumi.com
```

Apply at least to Production.

Redeploy.

## Step 6 — Push

```powershell
git add .
git commit -m "Add room code pairing MVP"
git push
```



## What NOT to build yet

Do not add:

- user accounts
- chat
- avatars
- friends
- leaderboards
- Daily Game
- full synchronized game engine

First prove users actually create/join rooms.

## Next milestone

Once pairing works, synchronize exactly one game:

**Would You Rather**

That will test the real viral loop:

Google user → Create Room → Send Code → Partner joins → Both answer → Reveal.