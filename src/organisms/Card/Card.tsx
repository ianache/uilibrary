import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

export interface CardMedia {
  src: string;
  alt: string;
  aspect?: '16/9' | '4/3' | '1/1';
}

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  media?: CardMedia;
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  selected?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  title,
  subtitle,
  headerAction,
  footer,
  media,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  selected = false,
  loading = false,
  onClick,
  children,
  className,
  onKeyDown,
  ...restProps
}, ref) => {
  const isInteractive = Boolean(onClick);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  const aspectClass = media?.aspect ? styles[`aspect-${media.aspect.replace('/', '-')}`] : styles['aspect-16-9'];

  return (
    <div
      ref={ref}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        styles.card,
        styles[variant],
        styles[`padding-${padding}`],
        hoverable && styles.hoverable,
        selected && styles.selected,
        isInteractive && styles.interactive,
        loading && styles.loading,
        className
      )}
      style={{ margin: 0 }}
      {...restProps}
    >
      {loading ? (
        <div className={styles.skeletonContainer}>
          {media && <div className={clsx(styles.skeletonMedia, aspectClass)} />}
          <div className={styles.skeletonBody}>
            <div className={clsx(styles.skeletonLine, styles.skeletonTitle)} />
            <div className={clsx(styles.skeletonLine, styles.skeletonSubtitle)} />
            <div className={clsx(styles.skeletonLine, styles.skeletonText1)} />
            <div className={clsx(styles.skeletonLine, styles.skeletonText2)} />
          </div>
        </div>
      ) : (
        <>
          {media && (
            <div className={clsx(styles.mediaWrapper, aspectClass)}>
              <img src={media.src} alt={media.alt} className={styles.mediaImage} />
            </div>
          )}
          {(title || subtitle || headerAction) && (
            <div className={styles.header}>
              <div className={styles.headerTitles}>
                {title && <h3 className={styles.title}>{title}</h3>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              </div>
              {headerAction && <div className={styles.headerAction}>{headerAction}</div>}
            </div>
          )}
          {children && <div className={styles.body}>{children}</div>}
          {footer && <div className={styles.footer}>{footer}</div>}
        </>
      )}
    </div>
  );
});

Card.displayName = 'Card';
