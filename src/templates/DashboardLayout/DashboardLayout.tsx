import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './DashboardLayout.module.css';

export interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  sidebarWidth?: number;
  collapsedWidth?: number;
  sidebarCollapsed?: boolean;
  showSidebar?: boolean;
  headerHeight?: number;
  maxContentWidth?: number | 'full';
}

export const DashboardLayout = forwardRef<HTMLDivElement, DashboardLayoutProps>(({
  header,
  sidebar,
  children,
  footer,
  sidebarWidth = 240,
  collapsedWidth = 64,
  sidebarCollapsed = false,
  showSidebar = true,
  headerHeight = 64,
  maxContentWidth = 'full',
  className,
  style,
  ...restProps
}, ref) => {
  const currentSidebarWidth = !showSidebar ? 0 : (sidebarCollapsed ? collapsedWidth : sidebarWidth);

  const customStyle: React.CSSProperties = {
    '--sidebar-width': `${currentSidebarWidth}px`,
    '--header-height': `${headerHeight}px`,
    ...style,
  } as React.CSSProperties;

  const contentContainerStyle: React.CSSProperties = {
    maxWidth: maxContentWidth === 'full' ? '100%' : `${maxContentWidth}px`,
  };

  return (
    <div
      ref={ref}
      className={clsx(
        styles.root,
        !showSidebar && styles.noSidebar,
        sidebarCollapsed && styles.collapsed,
        className
      )}
      style={customStyle}
      {...restProps}
    >
      <header className={styles.header}>
        {header}
      </header>

      {showSidebar && (
        <aside className={styles.sidebar}>
          {sidebar}
        </aside>
      )}

      <main className={styles.main}>
        <div className={styles.contentContainer} style={contentContainerStyle}>
          {children}
        </div>
      </main>

      {footer && (
        <footer className={styles.footer}>
          {footer}
        </footer>
      )}
    </div>
  );
});

DashboardLayout.displayName = 'DashboardLayout';
