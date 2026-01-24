
# Fix SVG Height Issue on Mobile View

## Problem Analysis
The `ProfileBlobChart` component's SVG is only rendering at ~105px height on mobile, even though its container has ~200px available. This happens because:

1. **ResizeObserver timing issue**: The `h-full` class on the container div relies on its parent having a defined height
2. **Flexbox measurement**: On mobile, when the card layout changes (2 columns instead of 4), the flexbox hasn't fully calculated the available space when the ResizeObserver fires
3. **Content-based height**: The div with `className="w-full h-full"` reports its content height rather than the available flex space

## Solution
Use **absolute positioning** for the SVG within a **relative container** that has an explicit aspect ratio or minimum height. This ensures the SVG always fills its container regardless of flexbox timing.

## Changes

### 1. Update `ProfileBlobChart.tsx`
- Change the container div to use `position: relative` with explicit sizing
- Make the SVG use `position: absolute` with `inset-0` to fill the container completely
- This decouples the SVG sizing from content-based measurement

### 2. Update `JobMatchCard.tsx`  
- Change the blob container from `flex-1 min-h-0` to use `aspect-square` or a fixed aspect ratio
- This gives the container a predictable height based on its width, which works consistently on mobile

---

## Technical Details

**ProfileBlobChart.tsx changes (lines 350-359):**
```tsx
return (
  <div ref={containerRef} className="w-full h-full relative">
    <svg 
      ref={svgRef} 
      className="absolute inset-0 w-full h-full"
      style={{ background: 'hsl(var(--muted) / 0.3)' }}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="xMidYMid meet"
    />
  </div>
);
```

**JobMatchCard.tsx changes (lines 45-51):**
```tsx
{/* Blob Chart */}
<div 
  className="rounded-xl overflow-hidden bg-muted/30 relative"
  style={{ aspectRatio: '4/3', minHeight: 120 }}
>
  <ProfileBlobChart skillMatches={skillMatches} matchPercentage={matchScore} />
</div>
```

This approach:
- Uses `aspectRatio: '4/3'` to give a consistent height relative to width on all screen sizes
- The absolute positioning ensures the SVG fills whatever space is available
- Works correctly with the 2-column mobile grid layout
