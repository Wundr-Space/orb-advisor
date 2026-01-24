

# Debug Skills Panel Implementation

## Overview
Add a debug toggle that reveals a side panel showing live skill scores extracted from the AI's conversation. The panel will parse the AI's responses in real-time to display and update skill assessments as they're mentioned.

## How It Works

The system will:
1. Add a debug toggle (Switch) in the corner of the screen
2. When enabled, show a fixed panel on the left side
3. Parse AI assistant messages for skill mentions and scores
4. Display all 26 skills with their current assessed scores (or "Not assessed" if not yet evaluated)
5. Update in real-time as the conversation progresses

## Implementation Steps

### 1. Create Skill Scores Hook
Create `src/hooks/useSkillScores.ts` to:
- Define the skill list as a typed array with name, rank, and employer demand percentage
- Parse messages to extract skill scores using regex patterns (e.g., "Analytical thinking: 4/5" or similar formats)
- Return a live-updating map of skill scores
- Handle both explicit scores and inferred mentions

### 2. Create Debug Panel Component
Create `src/components/SkillsDebugPanel.tsx`:
- Display all 26 skills in a scrollable list
- Show skill name, employer demand %, and current score
- Color-code based on assessment status (grey for unassessed, cyan gradient for scored)
- Use progress bars or score indicators for visual clarity
- Include a legend explaining the scoring system

### 3. Update Index Page
Modify `src/pages/Index.tsx`:
- Add debug toggle state (`showDebugPanel`)
- Render a fixed-position toggle in the top-right corner
- Conditionally render the SkillsDebugPanel on the left
- Pass the current messages (voice or text) to the panel
- Adjust main content layout when panel is visible

## Technical Details

### Skills Data Structure
```typescript
interface Skill {
  rank: number;
  name: string;
  employerDemand: number;
  score: number | null; // 1-5 or null if not assessed
}
```

### Score Parsing Logic
The hook will search for patterns like:
- "Analytical thinking: 4/5"
- "Score: 4 out of 5"
- "rated 4/5"
- Markdown format from the "Skills Snapshot" summary

### Layout Changes
When debug panel is visible:
- Panel: Fixed left sidebar, ~300px wide
- Main content: Shifts right or uses remaining space
- Toggle: Always visible in top-right corner

### Files to Create
1. `src/hooks/useSkillScores.ts` - Score parsing and state management
2. `src/components/SkillsDebugPanel.tsx` - Visual debug panel

### Files to Modify
1. `src/pages/Index.tsx` - Add toggle and panel integration

## Visual Design
- Dark themed panel matching the app aesthetic
- Cyan/primary accent for assessed skills
- Subtle animations when scores update
- Compact layout to not obstruct the main chat experience

