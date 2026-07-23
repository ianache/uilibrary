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
