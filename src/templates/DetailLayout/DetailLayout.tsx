import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './DetailLayout.module.css';

export interface DetailLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  header: React.ReactNode;
  breadcrumb?: React.ReactNode;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  metaPanel?: React.ReactNode;
  metaPanelWidth?: number;
  metaPanelPosition?: 'right' | 'left';
  maxWidth?: number | 'full';
}

export const DetailLayout = forwardRef<HTMLDivElement, DetailLayoutProps>(({
  header,
  breadcrumb,
  title,
  actions,
  children,
  metaPanel,
  metaPanelWidth = 320,
  metaPanelPosition = 'right',
  maxWidth = 960,
  className,
  style,
  ...restProps
}, ref) => {
  const customStyle: React.CSSProperties = {
    '--meta-width': `${metaPanelWidth}px`,
    ...style,
  } as React.CSSProperties;

  const wrapperStyle: React.CSSProperties = {
    maxWidth: maxWidth === 'full' ? '100%' : `${maxWidth}px`,
  };

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

      <main className={styles.main}>
        <div className={styles.wrapper} style={wrapperStyle}>
          {(breadcrumb || title || actions) && (
            <div className={styles.headerRegion}>
              {breadcrumb && (
                <div className={styles.breadcrumbWrapper}>{breadcrumb}</div>
              )}
              {(title || actions) && (
                <div className={styles.titleActionsRow}>
                  {title && <div className={styles.titleWrapper}>{title}</div>}
                  {actions && <div className={styles.actionsWrapper}>{actions}</div>}
                </div>
              )}
            </div>
          )}

          <div
            className={clsx(
              styles.contentGrid,
              metaPanel && styles.hasMetaPanel,
              styles[`meta-${metaPanelPosition}`]
            )}
          >
            <div className={styles.primaryContent}>
              {children}
            </div>

            {metaPanel && (
              <aside className={styles.metaPanel}>
                {metaPanel}
              </aside>
            )}
          </div>
        </div>
      </main>
    </div>
  );
});

DetailLayout.displayName = 'DetailLayout';
