# Organismo Planner — Specification & Design Document

**Date**: 2026-07-22  
**Status**: Approved  
**Location**: `docs/superpowers/specs/2026-07-22-planner-organism-design.md`  
**Target Path**: `src/organisms/Planner/`  

---

## 1. Overview & Objectives

The **Planner** organism is a vertical timeline column-agenda calendar component for `UIComponentLibrary`. It renders:
- **Left**: Sticky vertical time axis with slot labels and hour ticks.
- **Right**: Parallel resource/entity columns with customizable headers and absolutely positioned event cards.
- **Top**: Interactive collapsible toolbar with independent parameter pills (Start Hour, End Hour, Granularity, Column Count).

---

## 2. Architecture & File Structure

The component is composed of 11 modular files in `src/organisms/Planner/`:

```
src/organisms/Planner/
├── Planner.tsx                  # Root component & public interfaces
├── Planner.module.css           # Root layout & loading overlay styles
├── PlannerToolbar.tsx           # Collapsible pill bar & inline config drawer
├── PlannerToolbar.module.css    # Pill states & drawer animation styles
├── PlannerTimeline.tsx          # Sticky vertical time axis column
├── PlannerTimeline.module.css   # Time slot tick & label styles
├── PlannerGrid.tsx              # Header row & scrollable column container
├── PlannerGrid.module.css       # Sticky header cells & body scroll region
├── PlannerColumn.tsx            # Single column body with positioned event cards
├── PlannerColumn.module.css     # Slot background rows & event card wrappers
├── plannerUtils.ts              # Pure helper functions (math, formatting, overlap tracks)
├── Planner.stories.tsx          # 9 Storybook stories
└── index.ts                     # Public barrel export
```

### Isolation Rules
- Internal sub-components (`PlannerToolbar`, `PlannerTimeline`, `PlannerGrid`, `PlannerColumn`) are NOT exported directly from `index.ts`.
- `plannerUtils.ts` contains pure functions (no React state/hooks) and IS exported for consumer utility.
- Styling is strictly CSS Modules + design tokens from `@src/tokens/tokens.css`.

---

## 3. Data Structures & Types

```ts
export type PlannerGranularity = 15 | 30 | 60; // minutes per slot

export interface PlannerConfig {
  startHour: number;      // 0–23 (e.g. 7 = 7:00 AM)
  endHour: number;        // 0–23 (e.g. 18 = 6:00 PM)
  granularity: PlannerGranularity;
  slotHeight?: number;    // px per slot (default: 48)
}

export type PlannerParamKey = 'startHour' | 'endHour' | 'granularity' | 'columns';

export interface PlannerColumn<TMeta = unknown> {
  id: string;
  meta: TMeta;
}

export interface PlannerEvent<TMeta = unknown> {
  id: string;
  columnId: string;
  startMin: number;       // minutes relative to startHour
  durationMin: number;    // total duration in minutes
  color?: string;         // direct CSS color string
  meta: TMeta;
}

export interface PlannerProps<TCol = unknown, TEvent = unknown> {
  config: PlannerConfig;
  onConfigChange?: (config: PlannerConfig) => void;
  columns: PlannerColumn<TCol>[];
  events: PlannerEvent<TEvent>[];
  renderColumnHeader: (col: PlannerColumn<TCol>, index: number) => React.ReactNode;
  renderEventCard: (event: PlannerEvent<TEvent>) => React.ReactNode;
  visibleParams?: PlannerParamKey[];
  minStartHour?: number;  // default: 0
  maxEndHour?: number;    // default: 23
  maxColumns?: number;    // default: 10
  onEventClick?: (event: PlannerEvent<TEvent>) => void;
  onSlotClick?: (columnId: string, startMin: number) => void;
  onEventMove?: (id: string, newColumnId: string, newStartMin: number) => void;
  onEventResize?: (id: string, newDurationMin: number) => void;
  loading?: boolean;
  className?: string;
}
```

---

## 4. Pure Utilities (`plannerUtils.ts`)

```ts
export function calcSlotCount(config: PlannerConfig): number {
  return ((config.endHour - config.startHour) * 60) / config.granularity;
}

export function calcEventPosition(
  event: PlannerEvent,
  config: PlannerConfig,
  slotHeight: number
): { top: number; height: number } {
  const top = (event.startMin / config.granularity) * slotHeight;
  const height = Math.max(slotHeight * 0.6, (event.durationMin / config.granularity) * slotHeight - 4);
  return { top, height };
}

export function pxToMinutes(
  px: number,
  config: PlannerConfig,
  slotHeight: number
): number {
  const raw = Math.round((px / slotHeight) * config.granularity);
  return Math.max(0, raw - (raw % config.granularity));
}

export function formatTime(totalHour: number, minutes: number): string {
  const h = Math.floor(totalHour) + Math.floor(minutes / 60);
  const m = minutes % 60;
  const ap = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  return `${hh}:${String(m).padStart(2, '0')} ${ap}`;
}

export function formatEventRange(event: PlannerEvent, config: PlannerConfig): string {
  const absStart = config.startHour * 60 + event.startMin;
  const absEnd = absStart + event.durationMin;
  return `${formatTime(0, absStart)} – ${formatTime(0, absEnd)}`;
}

export function eventsOverlap(a: PlannerEvent, b: PlannerEvent): boolean {
  return (
    a.columnId === b.columnId &&
    a.startMin < b.startMin + b.durationMin &&
    b.startMin < a.startMin + a.durationMin
  );
}

export function groupOverlappingEvents(events: PlannerEvent[]): Map<string, number> {
  const trackMap = new Map<string, number>();
  const sorted = [...events].sort((a, b) => a.startMin - b.startMin);
  const tracks: number[] = [];

  for (const ev of sorted) {
    let assigned = -1;
    for (let t = 0; t < tracks.length; t++) {
      if (ev.startMin >= tracks[t]) {
        assigned = t;
        break;
      }
    }
    if (assigned === -1) {
      assigned = tracks.length;
      tracks.push(0);
    }
    tracks[assigned] = ev.startMin + ev.durationMin;
    trackMap.set(ev.id, assigned);
  }
  return trackMap;
}
```

---

## 5. Overlapping Events Layout Strategy

When `N` events overlap in the same time slice within a column:
1. `groupOverlappingEvents` assigns each event to a track index `i` (`0, 1, ..., N - 1`).
2. Width and position calculations:
   - `widthPercent = 100 / N`
   - `leftPercent = i * widthPercent`
   - Style: `left: calc(${leftPercent}% + 2px)`, `width: calc(${widthPercent}% - 4px)`

---

## 6. Accessibility & Keyboard Support

- **Event Cards**: Rendered inside `<div role="button" tabIndex={0} aria-label="..." onKeyDown={...}>`.
- **Clickable Slots**: When `onSlotClick` is provided, background grid slots render with `role="button"` and `tabIndex={0}`.
- **Toolbar Pills**: `aria-expanded="true|false"` set on active parameter pills.
- **Timeline Axis**: Marked with `aria-hidden="true"` as decorative axis indicators.

---

## 7. Storybook Stories

Component stories registered under `Organisms/Planner` with `tags: ['autodocs']`:
1. `Default`: Standard 3 columns, 7:00 AM – 6:00 PM, 30-min granularity.
2. `AllParams`: 4 columns, 8:00 AM – 5:00 PM, 15-min granularity.
3. `HiddenParams`: `visibleParams: []` (no toolbar).
4. `PartialParams`: `visibleParams: ['granularity', 'columns']`.
5. `Granularity15min`: High density view.
6. `Granularity60min`: Low density view.
7. `OverlappingEvents`: Overlapping events on single column demonstrating track division.
8. `Loading`: Spinner loading overlay state.
9. `SingleColumn`: Single column agenda view.
