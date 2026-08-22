# PairPlay MVP Architecture

## 1. Business objective
Phase 1 has one job: prove SEO traffic + ad monetization can work.

Do NOT optimize for accounts, subscriptions, social graph, or daily retention yet.

Primary loop:
Google Search → game page → start game → second page/game → ad impressions.

Secondary experimental loop:
Google Search → game → invite partner → partner joins.

## 2. Stack
- Next.js App Router
- TypeScript
- Plain CSS for zero styling dependency
- Static question datasets
- Local browser state for MVP
- Vercel deployment
- Supabase reserved for Phase 2 rooms only

## 3. Core engines
### Choice Engine
Used by:
- Would You Rather
- This or That

### Question Deck Engine
Used by:
- Couple Questions
- Future deep/romantic/long-distance decks

### Quiz Engine
Used by:
- Couple Quiz
- Future Who Knows Me Better

### Compatibility Engine
MVP: two people answer on one device.
Phase 2: asynchronous invite link + score comparison.

## 4. MVP URLs
/
  Target: online games for couples

/games
  Browse hub

/would-you-rather-questions-for-couples
  Target: would you rather questions for couples

/this-or-that-for-couples
  Product page

/couple-questions
  Target: couple questions / questions for couples

/couple-quiz
  Target: couple quiz

/couple-compatibility-test
  Target: couple compatibility test

/long-distance-couple-games
  Target: long distance couple games

/date-night-games
  Scenario page

/about
/privacy
/terms

## 5. Ad architecture
MVP reserves slots but does not inject real ads.

Recommended first public layout:
- Home: one slot after Popular Games
- Game pages: one slot after game interaction
- Scenario pages: one slot after game cards

Do not put an ad above the primary game interaction in Phase 1.
Goal: protect start rate and user intent.

After AdSense approval:
- add client ID in env
- add slot IDs per page family
- test viewability and layout shift

## 6. SEO architecture
Homepage = biggest weak-intent keyword.
Product pages = exact game intent.
Scenario pages = long-distance/date-night intent.

One URL per search intent cluster.
Do NOT create separate pages for trivial synonyms.

Internal link flow:
Homepage → Game → Related Game → Scenario → Game.

## 7. Question data model
Future structured record:
- id
- text
- game_type
- category
- tone
- relationship_stage
- long_distance
- difficulty
- explicit_content=false

Do not scrape competitor question banks.
Build original datasets.

## 8. Phase 2 real room model
Supabase tables:
- rooms
- room_players
- room_answers

Room flow:
Create room → generate code → partner joins → answer → reveal.

Keep:
- no signup
- anonymous player keys
- 24h expiry
- automatic cleanup

## 9. MVP metrics
Product:
- Game Start Rate > 35%
- 5 Question Completion > 50%
- Second Game Click > 15%
- Share Rate > 5%
- Partner Join / Share > 20% once real rooms exist

SEO:
- pages indexed
- target impressions appear
- low-KD pages begin entering Top 100/50
- one page trends toward Top 20–30 within 60–90 days

## 10. Stop-loss
Do not build Daily Game until:
1. SEO is bringing real traffic
2. ads are approved and generating impressions
3. at least one product page has repeat use or share behavior

If traffic exists but game-start rate is poor, fix product first.
If engagement is good but rankings are dead after 90 days, rethink SEO/authority before adding features.
