import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerLabelAlign = 'start' | 'center' | 'end';

export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  label?: string;
  labelAlign?: DividerLabelAlign;
}

export const Divider = forwardRef<HTMLElement, DividerProps>(({
  orientation = 'horizontal',
  variant = 'solid',
  label,
  labelAlign = 'center',
  className,
  ...restProps
}, ref) => {
  if (label && orientation === 'horizontal') {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="horizontal"
        className={clsx(
          styles.dividerWithLabel,
          styles[variant],
          className
        )}
        {...restProps}
      >
        {labelAlign !== 'start' && (
          <span className={clsx(styles.line, styles[variant])} />
        )}
        <span
          className={clsx(
            styles.label,
            styles[`label-${labelAlign}`]
          )}
        >
          {label}
        </span>
        {labelAlign !== 'end' && (
          <span className={clsx(styles.line, styles[variant])} />
        )}
      </div>
    );
  }

  if (orientation === 'vertical') {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        role="separator"
        aria-orientation="vertical"
        className={clsx(
          styles.divider,
          styles.vertical,
          styles[variant],
          className
        )}
        {...restProps}
      />
    );
  }

  return (
    <hr
      ref={ref as React.Ref<HTMLHRElement>}
      role="separator"
      className={clsx(
        styles.divider,
        styles.horizontal,
        styles[variant],
        className
      )}
      {...restProps}
    />
  );
});

Divider.displayName = 'Divider';
