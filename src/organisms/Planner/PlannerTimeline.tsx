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
