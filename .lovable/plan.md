

## Summary
Reduce the job recommendations to 4 or 8 cards and ensure all cards in each row have consistent heights.

## Changes

### 1. Update Job Count Limit
**File:** `src/hooks/useJobRecommendations.ts`

Change the slice from 5 to either 4 or 8 (your preference - 4 fits nicely in one row on larger screens, 8 gives two full rows):
- Current: `.slice(0, 5)`
- Updated: `.slice(0, 4)` or `.slice(0, 8)`

### 2. Fix Equal Height Cards
**File:** `src/components/JobCardsPanel.tsx`

Update the grid wrapper around each card to ensure equal heights using CSS Grid's implicit stretching:
- Add `h-full` to the motion.div wrapper so each card stretches to fill its grid cell

### 3. Ensure Card Fills Container
**File:** `src/components/JobMatchCard.tsx`

Add `h-full` to the card's root div so it expands to fill the wrapper:
- Current: `className="rounded-2xl border border-border bg-card p-4 ... flex flex-col group"`
- Updated: Add `h-full` to ensure the card fills its parent container

This approach uses CSS Grid's natural behavior where all items in a row stretch to match the tallest item, combined with `h-full` on children to propagate that height down.

---

**Question:** Would you prefer 4 jobs (one clean row on desktop) or 8 jobs (two full rows)?

