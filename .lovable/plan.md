

# Pikuniku-Inspired Redesign

## Overview
Transform the career advisor from a dark sci-fi aesthetic to a playful, friendly Pikuniku-inspired design featuring:
- A cute red blob character with round spectacles as the advisor avatar
- Muted, soft pastel backgrounds (cream, soft greens, light blues)
- Bold, simple shapes and colors
- Warm, approachable feel that reduces intimidation for job seekers

## Visual Direction

### Color Palette (Pikuniku-inspired)
| Element | Current | New |
|---------|---------|-----|
| Background | Deep space dark (#0a0b0e) | Soft cream/beige (#F5F0E8) |
| Primary | Electric cyan | Coral red (#E85A4F) - blob color |
| Secondary | Dark blue | Soft sage green (#A8C686) |
| Accent | Bright cyan | Sunny yellow (#F6C344) |
| Text | Light gray | Warm charcoal (#3D3D3D) |
| Cards | Dark gray | White with subtle shadows |

### The Blob Advisor Character
Replace the glowing orb with a friendly blob character:
- Simple red/coral rounded blob shape (like Pikuniku protagonist)
- Round black spectacles (circular frames)
- Simple dot eyes behind glasses
- No mouth (minimalist face)
- Subtle idle bobbing animation
- Speaking animation: gentle squish/stretch
- Listening animation: slight lean forward

```text
Character Design:
    ┌──────────┐
   │  ●   ●   │  <- round spectacles with dot eyes
   │          │
    └──────────┘
       blob body (organic rounded shape)
```

## Implementation Steps

### 1. Update CSS Variables (src/index.css)
Replace the dark sci-fi theme with Pikuniku-inspired colors:
- Cream/beige background
- Coral red as primary (blob color)
- Sage green and yellow accents
- Remove grid pattern, add subtle texture or solid muted colors
- Update sidebar colors to match

### 2. Create BlobAdvisor Component (replace GlowingOrb.tsx)
Build a new character component:
- SVG-based blob shape with organic curves
- Round spectacles rendered as circles with bridge
- Simple dot eyes
- Framer Motion animations for:
  - Idle: gentle floating/bobbing
  - Speaking: rhythmic squish (scale X/Y alternating)
  - Listening: slight forward lean, attentive pose
- Status indicator becomes friendlier (no glowing dots)

### 3. Update Index Page (src/pages/Index.tsx)
- Replace GlowingOrb with BlobAdvisor
- Remove dark background overlays and grid pattern
- Update header styling to be warmer
- Simplify feature hints to colorful pills

### 4. Update ChatModeSelector (src/components/ChatModeSelector.tsx)
- Bold, solid-colored buttons (no glow effects)
- Rounded, friendly button shapes
- Playful hover animations (slight bounce)
- Remove backdrop blur and sci-fi shadows

### 5. Update StartButton (src/components/StartButton.tsx)
- Solid coral button for start
- Simple shadow instead of glow
- Friendly icon styling
- Bouncy hover effect

### 6. Update TextChatPanel (src/components/TextChatPanel.tsx)
- White/cream card background
- User messages: coral colored bubbles
- Assistant messages: soft green bubbles
- Rounded, friendly message shapes
- Remove dark theme styling

### 7. Update SkillsDebugPanel (src/components/SkillsDebugPanel.tsx)
- Soft cream background
- Colorful score indicators (use the yellow/green palette)
- Friendly card styling with subtle shadows
- Remove neon/glow effects

### 8. Update Tailwind Config (tailwind.config.ts)
- Add new blob-related animations (squish, bob, bounce)
- Update color definitions
- Remove orb-related animations

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Complete color system overhaul, remove sci-fi patterns |
| `src/components/GlowingOrb.tsx` | Replace entirely with `BlobAdvisor.tsx` |
| `src/pages/Index.tsx` | Update to use BlobAdvisor, remove dark overlays |
| `src/components/ChatModeSelector.tsx` | Friendly button styling |
| `src/components/StartButton.tsx` | Warm button design |
| `src/components/TextChatPanel.tsx` | Light theme chat bubbles |
| `src/components/SkillsDebugPanel.tsx` | Soft pastel styling |
| `tailwind.config.ts` | New animations, remove orb config |

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/BlobAdvisor.tsx` | New friendly blob character with spectacles |

## Technical Details

### BlobAdvisor SVG Structure
```text
<svg>
  <!-- Blob body - organic rounded red shape -->
  <path d="..." fill="coral" />
  
  <!-- Spectacles -->
  <circle /> <!-- left lens frame -->
  <circle /> <!-- right lens frame -->
  <line /> <!-- bridge -->
  <line /> <!-- left arm -->
  <line /> <!-- right arm -->
  
  <!-- Eyes (inside glasses) -->
  <circle /> <!-- left eye dot -->
  <circle /> <!-- right eye dot -->
</svg>
```

### New Animations
```text
- blob-bob: Gentle up/down floating (slower, friendlier than current)
- blob-speak: Alternating scaleX/scaleY for speaking motion
- blob-listen: Slight rotation/lean animation
- button-bounce: Playful hover bounce effect
```

### Before/After Comparison
```text
BEFORE (Sci-fi):
- Dark space background
- Glowing cyan orb with rotating rings
- Neon shadows and grid patterns
- Cold, techy feel

AFTER (Pikuniku):
- Soft cream background
- Friendly red blob with glasses
- Solid colors, simple shapes
- Warm, approachable feel
```

