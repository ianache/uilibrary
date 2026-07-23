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
            <Icon name="calendar" size="sm" />
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
            <Icon name="calendar" size="sm" />
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
            <Icon name="filter" size="sm" />
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
            <Icon name="menu" size="sm" />
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
