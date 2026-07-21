import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children?: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...restProps
}, ref) => {
  return (
    <span
      ref={ref}
      className={clsx(
        styles.badge,
        styles[variant],
        styles[size],
        className
      )}
      {...restProps}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
