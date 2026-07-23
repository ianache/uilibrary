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
  const totalTracks = Math.max(1, ...Array.from(trackMap.values()).map((t) => t + 1));

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
