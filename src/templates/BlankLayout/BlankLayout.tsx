import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './BlankLayout.module.css';

export interface BlankLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  centered?: boolean;
  maxWidth?: number | 'full';
  bgColor?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const BlankLayout = forwardRef<HTMLDivElement, BlankLayoutProps>(({
  children,
  centered = true,
  maxWidth = 'full',
  bgColor,
  padding = 'md',
  className,
  style,
  ...restProps
}, ref) => {
  const customStyle: React.CSSProperties = {
    ...(bgColor ? { backgroundColor: bgColor } : {}),
    ...style,
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: maxWidth === 'full' ? '100%' : `${maxWidth}px`,
  };

  return (
    <div
      ref={ref}
      className={clsx(
        styles.root,
        centered && styles.centered,
        styles[`padding-${padding}`],
        className
      )}
      style={customStyle}
      {...restProps}
    >
      <div className={styles.container} style={containerStyle}>
        {children}
      </div>
    </div>
  );
});

BlankLayout.displayName = 'BlankLayout';
