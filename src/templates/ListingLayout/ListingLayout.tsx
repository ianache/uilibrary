import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Spinner } from '../../atoms/Spinner';
import styles from './ListingLayout.module.css';

export interface ListingLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  header: React.ReactNode;
  sidebar?: React.ReactNode;
  filterBar?: React.ReactNode;
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  loading?: boolean;
  contentLayout?: 'table' | 'grid' | 'list';
  gridColumns?: 2 | 3 | 4;
}

export const ListingLayout = forwardRef<HTMLDivElement, ListingLayoutProps>(({
  header,
  sidebar,
  filterBar,
  children,
  breadcrumb,
  title,
  actions,
  loading = false,
  contentLayout = 'table',
  gridColumns = 3,
  className,
  style,
  ...restProps
}, ref) => {
  const customStyle: React.CSSProperties = {
    '--grid-cols': gridColumns,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={clsx(styles.root, className)}
      style={customStyle}
      {...restProps}
    >
      <header className={styles.header}>
        {header}
      </header>

      <div className={styles.body}>
        {sidebar && (
          <aside className={styles.sidebar}>
            {sidebar}
          </aside>
        )}

        <main className={styles.main}>
          <div className={styles.controlsRegion}>
            {breadcrumb && (
              <div className={styles.breadcrumbWrapper}>
                {breadcrumb}
              </div>
            )}

            {(title || actions) && (
              <div className={styles.titleActionsRow}>
                {title && <div className={styles.titleWrapper}>{title}</div>}
                {actions && <div className={styles.actionsWrapper}>{actions}</div>}
              </div>
            )}

            {filterBar && (
              <div className={styles.filterBarWrapper}>
                {filterBar}
              </div>
            )}
          </div>

          <div
            className={clsx(
              styles.contentWrapper,
              styles[contentLayout],
              loading && styles.isLoading
            )}
          >
            {loading ? (
              <div className={styles.loadingOverlay}>
                <Spinner size="lg" />
              </div>
            ) : null}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
});

ListingLayout.displayName = 'ListingLayout';
