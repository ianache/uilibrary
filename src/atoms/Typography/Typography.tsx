import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Typography.module.css';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'overline'
  | 'code';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'disabled'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'inherit';

const defaultTagMap: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  overline: 'span',
  code: 'code',
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  color?: TypographyColor;
  as?: React.ElementType;
  truncate?: boolean;
  children?: React.ReactNode;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(({
  variant = 'body',
  color = 'primary',
  as,
  truncate = false,
  children,
  className,
  ...restProps
}, ref) => {
  const Component = as || defaultTagMap[variant] || 'p';

  return (
    <Component
      ref={ref}
      className={clsx(
        styles.typography,
        styles[variant],
        styles[color],
        truncate && styles.truncate,
        className
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
});

Typography.displayName = 'Typography';
