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
