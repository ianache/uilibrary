# Organismo Planner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the full `Planner` organism (calendar column agenda component) for `UIComponentLibrary` following strict CSS Modules, CSS Custom Properties, and Storybook 8 rules.

**Architecture:** 
- 11 modular files in `src/organisms/Planner/`.
- Pure utilities in `plannerUtils.ts` without React hooks/DOM dependencies.
- Sub-components (`PlannerToolbar`, `PlannerTimeline`, `PlannerGrid`, `PlannerColumn`) kept internal to the organism directory.
- `Planner.tsx` root component orchestrates toolbar config, columns slicing, and loading state.

**Tech Stack:** React 18, TypeScript 5, Vite 5, CSS Modules, clsx, Storybook 8.

## Global Constraints

- CSS Modules + Tokens from `src/tokens/tokens.css`.
- Strictly no external margin on the root container.
- TypeScript without `any`. Generics `<TCol, TEvent>` where applicable.
- Accessibility: `role="button"`, `tabIndex`, `aria-label`, keyboard listeners.

---

### Task 1: Math & Layout Utilities (`plannerUtils.ts`)

**Files:**
- Create: `src/organisms/Planner/plannerUtils.ts`

**Interfaces:**
- Consumes: `src/organisms/Planner/Planner.tsx` (types `PlannerConfig`, `PlannerEvent`)
- Produces: `calcSlotCount`, `calcEventPosition`, `pxToMinutes`, `formatTime`, `formatEventRange`, `eventsOverlap`, `groupOverlappingEvents`

- [ ] **Step 1: Create `src/organisms/Planner/plannerUtils.ts`**

```ts
import type { PlannerConfig, PlannerEvent } from './Planner';

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

- [ ] **Step 2: Commit Task 1**

```bash
git add src/organisms/Planner/plannerUtils.ts
git commit -m "feat: add plannerUtils for time math and event overlap tracking"
```

---

### Task 2: Sub-Components Part 1 (`PlannerTimeline` & `PlannerColumn`)

**Files:**
- Create: `src/organisms/Planner/PlannerTimeline.tsx`
- Create: `src/organisms/Planner/PlannerTimeline.module.css`
- Create: `src/organisms/Planner/PlannerColumn.tsx`
- Create: `src/organisms/Planner/PlannerColumn.module.css`

**Interfaces:**
- Consumes: `plannerUtils.ts`, `src/tokens/tokens.css`, `clsx`
- Produces: `PlannerTimeline`, `PlannerColumn`

- [ ] **Step 1: Create `PlannerTimeline.module.css`**

```css
.timeline {
  width: 64px;
  flex-shrink: 0;
  border-right: 1px solid var(--color-border-strong);
  background: var(--color-bg);
  position: sticky;
  left: 0;
  z-index: 5;
}

.slot {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 4px 8px 0 0;
  border-bottom: 1px solid var(--color-border);
  box-sizing: border-box;
}

.slotMajor {
  background: var(--color-bg-subtle);
}

.label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.labelMajor {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}
```

- [ ] **Step 2: Create `PlannerTimeline.tsx`**

```tsx
import React from 'react';
import clsx from 'clsx';
import type { PlannerConfig } from './Planner';
import { calcSlotCount, formatTime } from './plannerUtils';
import styles from './PlannerTimeline.module.css';

export interface PlannerTimelineProps {
  config: PlannerConfig;
  slotHeight: number;
}

export const PlannerTimeline: React.FC<PlannerTimelineProps> = ({ config, slotHeight }) => {
  const totalSlots = calcSlotCount(config);
  const slots = Array.from({ length: totalSlots });

  return (
    <div className={styles.timeline} aria-hidden="true">
      {slots.map((_, index) => {
        const totalMin = config.startHour * 60 + index * config.granularity;
        const hour = Math.floor(totalMin / 60);
        const min = totalMin % 60;
        const isMajor = min === 0;

        let labelText = '';
        if (isMajor) {
          labelText = formatTime(hour, 0);
        } else if (config.granularity === 15) {
          labelText = `:${String(min).padStart(2, '0')}`;
        } else if (config.granularity === 30) {
          labelText = ':30';
        }

        return (
          <div
            key={index}
            style={{ height: slotHeight }}
            className={clsx(styles.slot, isMajor && styles.slotMajor)}
          >
            {labelText && (
              <span className={clsx(styles.label, isMajor && styles.labelMajor)}>
                {labelText}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};
```

- [ ] **Step 3: Create `PlannerColumn.module.css`**

```css
.column {
  flex: 1;
  position: relative;
  border-right: 1px solid var(--color-border);
  box-sizing: border-box;
}

.column:last-child {
  border-right: none;
}

.gridRow {
  width: 100%;
  border-bottom: 1px solid var(--color-border);
  box-sizing: border-box;
}

.gridRowMajor {
  background: color-mix(in srgb, var(--color-bg-subtle) 50%, transparent);
}

.gridRowClickable {
  cursor: pointer;
}

.eventWrapper {
  position: absolute;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  box-sizing: border-box;
  transition: var(--transition-fast);
  z-index: 2;
}

.eventWrapper:hover {
  filter: brightness(0.95);
}

.eventWrapper:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 1px;
}

@media (prefers-reduced-motion: reduce) {
  .eventWrapper {
    transition: none;
  }
}
```

- [ ] **Step 4: Create `PlannerColumn.tsx`**

```tsx
import React from 'react';
import clsx from 'clsx';
import type { PlannerColumn as IPlannerColumn, PlannerConfig, PlannerEvent } from './Planner';
import { calcSlotCount, calcEventPosition, formatEventRange, groupOverlappingEvents, pxToMinutes } from './plannerUtils';
import styles from './PlannerColumn.module.css';

export interface PlannerColumnProps<TCol = unknown, TEvent = unknown> {
  column: IPlannerColumn<TCol>;
  events: PlannerEvent<TEvent>[];
  config: PlannerConfig;
  slotHeight: number;
  renderColumnHeader: (col: IPlannerColumn<TCol>, index: number) => React.ReactNode;
  renderEventCard: (event: PlannerEvent<TEvent>) => React.ReactNode;
  index: number;
  onEventClick?: (event: PlannerEvent<TEvent>) => void;
  onSlotClick?: (columnId: string, startMin: number) => void;
}

export function PlannerColumn<TCol = unknown, TEvent = unknown>({
  column,
  events,
  config,
  slotHeight,
  renderEventCard,
  onEventClick,
  onSlotClick,
}: PlannerColumnProps<TCol, TEvent>) {
  const totalSlots = calcSlotCount(config);
  const slots = Array.from({ length: totalSlots });
  const trackMap = groupOverlappingEvents(events);

  // Group max tracks count for overlapping events
  const totalTracks = Math.max(1, ...Array.from(trackMap.values()).map(t => t + 1));

  const handleColumnBodyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSlotClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const startMin = pxToMinutes(offsetY, config, slotHeight);
    onSlotClick(column.id, startMin);
  };

  return (
    <div className={styles.column} onClick={handleColumnBodyClick}>
      {slots.map((_, idx) => {
        const totalMin = config.startHour * 60 + idx * config.granularity;
        const isMajor = totalMin % 60 === 0;

        return (
          <div
            key={idx}
            style={{ height: slotHeight }}
            className={clsx(
              styles.gridRow,
              isMajor && styles.gridRowMajor,
              onSlotClick && styles.gridRowClickable
            )}
            role={onSlotClick ? 'button' : undefined}
            tabIndex={onSlotClick ? 0 : undefined}
          />
        );
      })}

      {events.map((event) => {
        const { top, height } = calcEventPosition(event, config, slotHeight);
        const trackIndex = trackMap.get(event.id) ?? 0;
        const widthPercent = 100 / totalTracks;
        const leftPercent = trackIndex * widthPercent;

        return (
          <div
            key={event.id}
            role="button"
            tabIndex={0}
            aria-label={`Evento: ${formatEventRange(event, config)}`}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick?.(event);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                onEventClick?.(event);
              }
            }}
            style={{
              position: 'absolute',
              top: `${top}px`,
              height: `${height}px`,
              left: totalTracks === 1 ? '4px' : `calc(${leftPercent}% + 2px)`,
              width: totalTracks === 1 ? 'calc(100% - 8px)' : `calc(${widthPercent}% - 4px)`,
              backgroundColor: event.color,
            }}
            className={styles.eventWrapper}
          >
            {renderEventCard(event)}
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 5: Commit Task 2**

```bash
git add src/organisms/Planner/PlannerTimeline.tsx src/organisms/Planner/PlannerTimeline.module.css src/organisms/Planner/PlannerColumn.tsx src/organisms/Planner/PlannerColumn.module.css
git commit -m "feat: add PlannerTimeline and PlannerColumn sub-components"
```

---

### Task 3: Sub-Components Part 2 (`PlannerToolbar` & `PlannerGrid`)

**Files:**
- Create: `src/organisms/Planner/PlannerToolbar.tsx`
- Create: `src/organisms/Planner/PlannerToolbar.module.css`
- Create: `src/organisms/Planner/PlannerGrid.tsx`
- Create: `src/organisms/Planner/PlannerGrid.module.css`

**Interfaces:**
- Consumes: `src/atoms/Button`, `src/atoms/Icon`, `src/atoms/Input`, `src/atoms/Select`, `plannerUtils.ts`
- Produces: `PlannerToolbar`, `PlannerGrid`

- [ ] **Step 1: Create `PlannerToolbar.module.css`**

```css
.toolbarRoot {
  margin-bottom: var(--space-3);
}

.pillsWrapper {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
  padding-bottom: var(--space-2);
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border-strong);
  cursor: pointer;
  font-size: var(--font-size-xs);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  transition: var(--transition-fast);
}

.pill:hover {
  background: var(--color-bg-subtle);
}

.pillActive {
  background: var(--color-primary-50);
  border-color: var(--color-primary-300);
  color: var(--color-primary-700);
}

.panel {
  overflow: hidden;
  transition: max-height 220ms ease, opacity 180ms ease;
}

.panelClosed {
  max-height: 0;
  opacity: 0;
  pointer-events: none;
}

.panelOpen {
  max-height: 160px;
  opacity: 1;
  pointer-events: auto;
}

.panelInner {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
  margin-bottom: var(--space-2);
}

@media (prefers-reduced-motion: reduce) {
  .pill,
  .panel {
    transition: none;
  }
}
```

- [ ] **Step 2: Create `PlannerToolbar.tsx`**

```tsx
import React, { useState } from 'react';
import clsx from 'clsx';
import type { PlannerConfig, PlannerParamKey } from './Planner';
import { formatTime } from './plannerUtils';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Select } from '../../atoms/Select';
import { Input } from '../../atoms/Input';
import styles from './PlannerToolbar.module.css';

export interface PlannerToolbarProps {
  config: PlannerConfig;
  columnCount: number;
  onApply: (config: PlannerConfig, columnCount: number) => void;
  visibleParams: PlannerParamKey[];
  minStartHour: number;
  maxEndHour: number;
  maxColumns: number;
}

export const PlannerToolbar: React.FC<PlannerToolbarProps> = ({
  config,
  columnCount,
  onApply,
  visibleParams,
  minStartHour,
  maxEndHour,
  maxColumns,
}) => {
  const [activeParam, setActiveParam] = useState<PlannerParamKey | null>(null);
  const [draftConfig, setDraftConfig] = useState<PlannerConfig>(config);
  const [draftCols, setDraftCols] = useState<number>(columnCount);

  if (!visibleParams || visibleParams.length === 0) return null;

  const togglePill = (param: PlannerParamKey) => {
    if (activeParam === param) {
      setActiveParam(null);
    } else {
      setActiveParam(param);
      setDraftConfig(config);
      setDraftCols(columnCount);
    }
  };

  const handleApplyClick = () => {
    onApply(draftConfig, draftCols);
    setActiveParam(null);
  };

  // Generate options for selects
  const startHourOptions = Array.from({ length: draftConfig.endHour - minStartHour }, (_, i) => {
    const h = minStartHour + i;
    return { value: String(h), label: formatTime(h, 0) };
  });

  const endHourOptions = Array.from({ length: maxEndHour - draftConfig.startHour }, (_, i) => {
    const h = draftConfig.startHour + 1 + i;
    return { value: String(h), label: formatTime(h, 0) };
  });

  return (
    <div className={styles.toolbarRoot}>
      <div className={styles.pillsWrapper}>
        {visibleParams.includes('startHour') && (
          <button
            type="button"
            className={clsx(styles.pill, activeParam === 'startHour' && styles.pillActive)}
            onClick={() => togglePill('startHour')}
            aria-expanded={activeParam === 'startHour'}
          >
            <Icon name="clock" size="sm" />
            <span>Inicio: {formatTime(config.startHour, 0)}</span>
          </button>
        )}

        {visibleParams.includes('endHour') && (
          <button
            type="button"
            className={clsx(styles.pill, activeParam === 'endHour' && styles.pillActive)}
            onClick={() => togglePill('endHour')}
            aria-expanded={activeParam === 'endHour'}
          >
            <Icon name="clock" size="sm" />
            <span>Fin: {formatTime(config.endHour, 0)}</span>
          </button>
        )}

        {visibleParams.includes('granularity') && (
          <button
            type="button"
            className={clsx(styles.pill, activeParam === 'granularity' && styles.pillActive)}
            onClick={() => togglePill('granularity')}
            aria-expanded={activeParam === 'granularity'}
          >
            <Icon name="adjustments-horizontal" size="sm" />
            <span>{config.granularity} min</span>
          </button>
        )}

        {visibleParams.includes('columns') && (
          <button
            type="button"
            className={clsx(styles.pill, activeParam === 'columns' && styles.pillActive)}
            onClick={() => togglePill('columns')}
            aria-expanded={activeParam === 'columns'}
          >
            <Icon name="layout-columns" size="sm" />
            <span>Cols: {columnCount}</span>
          </button>
        )}
      </div>

      <div className={clsx(styles.panel, activeParam ? styles.panelOpen : styles.panelClosed)}>
        <div className={styles.panelInner}>
          {activeParam === 'startHour' && (
            <Select
              label="Hora de Inicio"
              options={startHourOptions}
              value={String(draftConfig.startHour)}
              onChange={(val) => setDraftConfig({ ...draftConfig, startHour: Number(val) })}
            />
          )}

          {activeParam === 'endHour' && (
            <Select
              label="Hora de Fin"
              options={endHourOptions}
              value={String(draftConfig.endHour)}
              onChange={(val) => setDraftConfig({ ...draftConfig, endHour: Number(val) })}
            />
          )}

          {activeParam === 'granularity' && (
            <Select
              label="Granularidad"
              options={[
                { value: '15', label: '15 min' },
                { value: '30', label: '30 min' },
                { value: '60', label: '60 min' },
              ]}
              value={String(draftConfig.granularity)}
              onChange={(val) => setDraftConfig({ ...draftConfig, granularity: Number(val) as 15 | 30 | 60 })}
            />
          )}

          {activeParam === 'columns' && (
            <Input
              type="number"
              label="Número de Columnas"
              min={1}
              max={maxColumns}
              value={String(draftCols)}
              onChange={(e) => setDraftCols(Math.max(1, Math.min(maxColumns, Number(e.target.value))))}
            />
          )}

          <Button variant="primary" size="sm" onClick={handleApplyClick}>
            Aplicar
          </Button>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Create `PlannerGrid.module.css`**

```css
.gridWrapper {
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-bg);
}

.headerRow {
  display: flex;
  border-bottom: 1px solid var(--color-border-strong);
  background: var(--color-bg-subtle);
  position: sticky;
  top: 0;
  z-index: 10;
}

.cornerCell {
  width: 64px;
  flex-shrink: 0;
  height: 52px;
  border-right: 1px solid var(--color-border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.headerCell {
  flex: 1;
  height: 52px;
  border-right: 1px solid var(--color-border);
  overflow: hidden;
}

.headerCell:last-child {
  border-right: none;
}

.body {
  display: flex;
  overflow-y: auto;
  max-height: 520px;
}

.columnsArea {
  display: flex;
  flex: 1;
}
```

- [ ] **Step 4: Create `PlannerGrid.tsx`**

```tsx
import React from 'react';
import type { PlannerColumn as IPlannerColumn, PlannerConfig, PlannerEvent } from './Planner';
import { PlannerTimeline } from './PlannerTimeline';
import { PlannerColumn } from './PlannerColumn';
import styles from './PlannerGrid.module.css';

export interface PlannerGridProps<TCol = unknown, TEvent = unknown> {
  columns: IPlannerColumn<TCol>[];
  events: PlannerEvent<TEvent>[];
  config: PlannerConfig;
  slotHeight: number;
  renderColumnHeader: (col: IPlannerColumn<TCol>, index: number) => React.ReactNode;
  renderEventCard: (event: PlannerEvent<TEvent>) => React.ReactNode;
  onEventClick?: (event: PlannerEvent<TEvent>) => void;
  onSlotClick?: (columnId: string, startMin: number) => void;
}

export function PlannerGrid<TCol = unknown, TEvent = unknown>({
  columns,
  events,
  config,
  slotHeight,
  renderColumnHeader,
  renderEventCard,
  onEventClick,
  onSlotClick,
}: PlannerGridProps<TCol, TEvent>) {
  return (
    <div className={styles.gridWrapper}>
      <div className={styles.headerRow}>
        <div className={styles.cornerCell}>Hora</div>
        {columns.map((col, idx) => (
          <div key={col.id} className={styles.headerCell}>
            {renderColumnHeader(col, idx)}
          </div>
        ))}
      </div>

      <div className={styles.body}>
        <PlannerTimeline config={config} slotHeight={slotHeight} />
        <div className={styles.columnsArea}>
          {columns.map((col, idx) => {
            const colEvents = events.filter((e) => e.columnId === col.id);
            return (
              <PlannerColumn
                key={col.id}
                column={col}
                events={colEvents}
                config={config}
                slotHeight={slotHeight}
                renderColumnHeader={renderColumnHeader}
                renderEventCard={renderEventCard}
                index={idx}
                onEventClick={onEventClick}
                onSlotClick={onSlotClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit Task 3**

```bash
git add src/organisms/Planner/PlannerToolbar.tsx src/organisms/Planner/PlannerToolbar.module.css src/organisms/Planner/PlannerGrid.tsx src/organisms/Planner/PlannerGrid.module.css
git commit -m "feat: add PlannerToolbar and PlannerGrid sub-components"
```

---

### Task 4: Root Component & Barrels (`Planner.tsx`, `index.ts`, `src/index.ts`)

**Files:**
- Create: `src/organisms/Planner/Planner.tsx`
- Create: `src/organisms/Planner/Planner.module.css`
- Create: `src/organisms/Planner/index.ts`
- Modify: `src/index.ts`

**Interfaces:**
- Consumes: All `Planner` sub-components, `src/atoms/Spinner`
- Produces: Public exported `Planner` component and public types

- [ ] **Step 1: Create `Planner.module.css`**

```css
.root {
  display: flex;
  flex-direction: column;
}

.loadingOverlay {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
}
```

- [ ] **Step 2: Create `Planner.tsx`**

```tsx
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Spinner } from '../../atoms/Spinner';
import { PlannerToolbar } from './PlannerToolbar';
import { PlannerGrid } from './PlannerGrid';
import styles from './Planner.module.css';

export type PlannerGranularity = 15 | 30 | 60;

export interface PlannerConfig {
  startHour: number;
  endHour: number;
  granularity: PlannerGranularity;
  slotHeight?: number;
}

export type PlannerParamKey = 'startHour' | 'endHour' | 'granularity' | 'columns';

export interface PlannerColumn<TMeta = unknown> {
  id: string;
  meta: TMeta;
}

export interface PlannerEvent<TMeta = unknown> {
  id: string;
  columnId: string;
  startMin: number;
  durationMin: number;
  color?: string;
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
  minStartHour?: number;
  maxEndHour?: number;
  maxColumns?: number;
  onEventClick?: (event: PlannerEvent<TEvent>) => void;
  onSlotClick?: (columnId: string, startMin: number) => void;
  onEventMove?: (id: string, newColumnId: string, newStartMin: number) => void;
  onEventResize?: (id: string, newDurationMin: number) => void;
  loading?: boolean;
  className?: string;
}

export function Planner<TCol = unknown, TEvent = unknown>({
  config: configProp,
  onConfigChange,
  columns,
  events,
  renderColumnHeader,
  renderEventCard,
  visibleParams = ['startHour', 'endHour', 'granularity', 'columns'],
  minStartHour = 0,
  maxEndHour = 23,
  maxColumns = 10,
  onEventClick,
  onSlotClick,
  loading = false,
  className,
}: PlannerProps<TCol, TEvent>) {
  const [config, setConfig] = useState<PlannerConfig>(configProp);
  const [colCount, setColCount] = useState<number>(columns.length);

  useEffect(() => {
    setConfig(configProp);
  }, [configProp]);

  const handleApply = (newConfig: PlannerConfig, newColCount: number) => {
    setConfig(newConfig);
    setColCount(newColCount);
    onConfigChange?.(newConfig);
  };

  const slotHeight = config.slotHeight ?? 48;
  const visibleColumns = columns.slice(0, colCount);

  return (
    <div className={clsx(styles.root, className)}>
      {visibleParams.length > 0 && (
        <PlannerToolbar
          config={config}
          columnCount={colCount}
          onApply={handleApply}
          visibleParams={visibleParams}
          minStartHour={minStartHour}
          maxEndHour={maxEndHour}
          maxColumns={maxColumns}
        />
      )}

      {loading ? (
        <div className={styles.loadingOverlay}>
          <Spinner size="lg" label="Cargando planner..." />
        </div>
      ) : (
        <PlannerGrid
          columns={visibleColumns}
          events={events}
          config={config}
          slotHeight={slotHeight}
          renderColumnHeader={renderColumnHeader}
          renderEventCard={renderEventCard}
          onEventClick={onEventClick}
          onSlotClick={onSlotClick}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/organisms/Planner/index.ts`**

```ts
export { Planner } from './Planner';
export type {
  PlannerProps,
  PlannerConfig,
  PlannerColumn,
  PlannerEvent,
  PlannerGranularity,
  PlannerParamKey,
} from './Planner';
export {
  calcSlotCount,
  calcEventPosition,
  pxToMinutes,
  formatTime,
  formatEventRange,
  eventsOverlap,
  groupOverlappingEvents,
} from './plannerUtils';
```

- [ ] **Step 4: Update main barrel `src/index.ts`**
Add `export * from './organisms/Planner';` under the organisms section.

- [ ] **Step 5: Commit Task 4**

```bash
git add src/organisms/Planner/Planner.tsx src/organisms/Planner/Planner.module.css src/organisms/Planner/index.ts src/index.ts
git commit -m "feat: implement root Planner component and export barrel"
```

---

### Task 5: Storybook Stories & Verification

**Files:**
- Create: `src/organisms/Planner/Planner.stories.tsx`

- [ ] **Step 1: Create `src/organisms/Planner/Planner.stories.tsx`**

```tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Planner } from './Planner';
import type { PlannerColumn, PlannerEvent } from './Planner';
import { Badge } from '../../atoms/Badge';
import { Typography } from '../../atoms/Typography';

type SalaMeta = { nombre: string; piso: string; capacidad: number };
type EventMeta = { titulo: string; responsable: string; tipo: 'reunión' | 'taller' | 'capacitación' };

const meta: Meta<typeof Planner> = {
  title: 'Organisms/Planner',
  component: Planner,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '16px', background: 'var(--color-bg-subtle)', minHeight: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Planner<SalaMeta, EventMeta>>;

const mockColumns: PlannerColumn<SalaMeta>[] = [
  { id: 'sala-a', meta: { nombre: 'Sala A', piso: 'Piso 3', capacidad: 20 } },
  { id: 'sala-b', meta: { nombre: 'Sala B', piso: 'Piso 1', capacidad: 8 } },
  { id: 'sala-c', meta: { nombre: 'Sala C', piso: 'Piso 2', capacidad: 30 } },
  { id: 'sala-d', meta: { nombre: 'Sala D', piso: 'Piso 4', capacidad: 12 } },
];

const mockEvents: PlannerEvent<EventMeta>[] = [
  {
    id: 'e1',
    columnId: 'sala-a',
    startMin: 60,
    durationMin: 90,
    color: '#B5D4F4',
    meta: { titulo: 'Kick-off Q3', responsable: 'Ana Torres', tipo: 'reunión' },
  },
  {
    id: 'e2',
    columnId: 'sala-a',
    startMin: 180,
    durationMin: 60,
    color: '#B5D4F4',
    meta: { titulo: 'Demo cliente', responsable: 'Carlos Ruiz', tipo: 'reunión' },
  },
  {
    id: 'e3',
    columnId: 'sala-b',
    startMin: 30,
    durationMin: 120,
    color: '#CECBF6',
    meta: { titulo: 'Sprint planning', responsable: 'Equipo Dev', tipo: 'reunión' },
  },
  {
    id: 'e4',
    columnId: 'sala-b',
    startMin: 210,
    durationMin: 60,
    color: '#CECBF6',
    meta: { titulo: '1:1 CTO', responsable: 'Luis Mendoza', tipo: 'reunión' },
  },
  {
    id: 'e5',
    columnId: 'sala-c',
    startMin: 0,
    durationMin: 150,
    color: '#9FE1CB',
    meta: { titulo: 'Onboarding nuevos', responsable: 'RRHH', tipo: 'capacitación' },
  },
  {
    id: 'e6',
    columnId: 'sala-c',
    startMin: 210,
    durationMin: 45,
    color: '#9FE1CB',
    meta: { titulo: 'Retrospectiva', responsable: 'Scrum Master', tipo: 'reunión' },
  },
  {
    id: 'e7',
    columnId: 'sala-a',
    startMin: 90,
    durationMin: 60,
    color: '#F5C4B3',
    meta: { titulo: 'Overlap test', responsable: 'QA Team', tipo: 'reunión' },
  },
  {
    id: 'e8',
    columnId: 'sala-d',
    startMin: 60,
    durationMin: 180,
    color: '#FAC775',
    meta: { titulo: 'Workshop diseño', responsable: 'UX Team', tipo: 'taller' },
  },
];

const renderHeader = (col: PlannerColumn<SalaMeta>) => (
  <div style={{ padding: '6px 10px' }}>
    <Badge variant="primary" size="sm">{col.meta.nombre}</Badge>
    <Typography variant="body-sm" style={{ marginTop: 2 }}>{col.meta.piso}</Typography>
    <Typography variant="caption" color="secondary">Cap. {col.meta.capacidad}</Typography>
  </div>
);

const renderEvent = (ev: PlannerEvent<EventMeta>) => (
  <div style={{ padding: '5px 8px', height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Typography variant="body-sm" truncate style={{ fontWeight: 500 }}>
      {ev.meta.titulo}
    </Typography>
    <Typography variant="caption" color="secondary">{ev.meta.responsable}</Typography>
    <Badge variant={ev.meta.tipo === 'taller' ? 'warning' : ev.meta.tipo === 'capacitación' ? 'success' : 'primary'} size="sm">
      {ev.meta.tipo}
    </Badge>
  </div>
);

export const Default: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const AllParams: Story = {
  args: {
    config: { startHour: 8, endHour: 17, granularity: 15 },
    columns: mockColumns,
    events: mockEvents,
    maxColumns: 4,
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const HiddenParams: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    visibleParams: [],
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const PartialParams: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    visibleParams: ['granularity', 'columns'],
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const Granularity15min: Story = {
  args: {
    config: { startHour: 9, endHour: 12, granularity: 15 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const Granularity60min: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 60 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const OverlappingEvents: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: [mockColumns[0]],
    events: [mockEvents[0], mockEvents[6]],
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const Loading: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: mockColumns.slice(0, 3),
    events: mockEvents,
    loading: true,
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};

export const SingleColumn: Story = {
  args: {
    config: { startHour: 7, endHour: 18, granularity: 30 },
    columns: [mockColumns[0]],
    events: mockEvents.filter((e) => e.columnId === 'sala-a'),
    renderColumnHeader: renderHeader,
    renderEventCard: renderEvent,
  },
};
```

- [ ] **Step 2: Run TypeScript type check and build verification**

Run: `npx tsc --noEmit && npm run build`  
Expected: 0 TypeScript errors and successful Vite build output.

- [ ] **Step 3: Commit Task 5**

```bash
git add src/organisms/Planner/Planner.stories.tsx
git commit -m "feat: add Storybook stories and verify build for Planner organism"
```
