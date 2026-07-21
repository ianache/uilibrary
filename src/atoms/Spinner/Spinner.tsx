import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Spinner.module.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'secondary' | 'white';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(({
  size = 'md',
  variant = 'primary',
  label = 'Cargando...',
  className,
  ...restProps
}, ref) => {
  return (
    <div
      ref={ref}
      role="status"
      aria-label={label}
      className={clsx(
        styles.spinner,
        styles[size],
        styles[variant],
        className
      )}
      {...restProps}
    >
      <span className={styles['sr-only']}>{label}</span>
    </div>
  );
});

Spinner.displayName = 'Spinner';
