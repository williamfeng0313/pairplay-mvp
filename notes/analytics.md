# Analytics decision

`lib/analytics.ts` does NOT need to be changed.

The existing `trackEvent(eventName, params)` helper already accepts arbitrary
event names and string/number/boolean parameters and already protects localhost
from sending production GA4 events.

The new `components/RandomDateIdea.tsx` imports that helper and sends:

1. `ld_date_randomize`
   - `idea_category`
   - `idea_mood`
   - `idea_duration`
   - `idea_budget`

2. `ld_date_filter_change`
   - `filter_type`
   - `filter_value`

3. `ld_date_idea_cta_click`
   - `idea_category`
   - `destination`

Recommended GA4 custom dimensions only if you later want these parameters in
standard Explore/reporting:
- Idea Category → `idea_category`
- Idea Mood → `idea_mood`

Do not mark these events as Key Events yet.
