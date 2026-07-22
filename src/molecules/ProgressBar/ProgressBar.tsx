import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Typography } from '../../atoms/Typography';
import styles from './ProgressBar.module.css';

export type ProgressBarVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  label?: string;
  showValue?: boolean;
  animated?: boolean;
  striped?: boolean;
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  label,
  showValue = false,
  animated = false,
  striped = false,
  className,
  ...restProps
}, ref) => {
  const safeMax = max > 0 ? max : 100;
  const clampedValue = Math.min(Math.max(0, value), safeMax);
  const percentage = (clampedValue / safeMax) * 100;

  return (
    <div
      ref={ref}
      className={clsx(styles.root, className)}
      {...restProps}
    >
      {(label || showValue) && (
        <div className={styles.header}>
          {label && (
            <Typography variant="body-sm" className={styles.label}>
              {label}
            </Typography>
          )}
          {showValue && (
            <Typography variant="body-sm" className={styles.valueText}>
              {`${Math.round(percentage)}%`}
            </Typography>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-label={label}
        className={clsx(styles.track, styles[size])}
      >
        <div
          className={clsx(
            styles.fill,
            styles[variant],
            striped && styles.striped,
            striped && animated && styles.animated
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';
