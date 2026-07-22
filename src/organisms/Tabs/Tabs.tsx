import React, { forwardRef, useRef } from 'react';
import clsx from 'clsx';
import { Icon, IconName } from '../../atoms/Icon';
import { Badge } from '../../atoms/Badge';
import styles from './Tabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  icon?: IconName;
  badge?: string | number;
  disabled?: boolean;
  content: React.ReactNode;
}

export type TabsVariant = 'line' | 'pill' | 'card';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: TabsVariant;
  orientation?: TabsOrientation;
  fullWidth?: boolean;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
  tabs,
  activeId,
  onChange,
  variant = 'line',
  orientation = 'horizontal',
  fullWidth = false,
  className,
  ...restProps
}, ref) => {
  const tabRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

  const enabledTabs = tabs.filter(t => !t.disabled);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (enabledTabs.length === 0) return;

    const currentIndex = enabledTabs.findIndex(t => t.id === activeId);

    const isHorizontal = orientation === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    let targetTab: TabItem | null = null;

    if (e.key === nextKey) {
      const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % enabledTabs.length;
      targetTab = enabledTabs[nextIndex];
    } else if (e.key === prevKey) {
      const prevIndex = currentIndex <= 0 ? enabledTabs.length - 1 : currentIndex - 1;
      targetTab = enabledTabs[prevIndex];
    } else if (e.key === 'Home') {
      targetTab = enabledTabs[0];
    } else if (e.key === 'End') {
      targetTab = enabledTabs[enabledTabs.length - 1];
    }

    if (targetTab) {
      e.preventDefault();
      onChange(targetTab.id);
      const buttonNode = tabRefs.current.get(targetTab.id);
      buttonNode?.focus();
    }
  };

  const activeTab = tabs.find(t => t.id === activeId) || tabs[0];

  return (
    <div
      ref={ref}
      className={clsx(
        styles.tabsContainer,
        styles[orientation],
        className
      )}
      style={{ margin: 0 }}
      {...restProps}
    >
      <div
        role="tablist"
        aria-orientation={orientation}
        className={clsx(
          styles.tablist,
          styles[variant],
          styles[orientation],
          fullWidth && styles.fullWidth
        )}
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;

          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current.set(tab.id, node);
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => {
                if (!tab.disabled) {
                  onChange(tab.id);
                }
              }}
              className={clsx(
                styles.tab,
                styles[variant],
                isActive && styles.active,
                tab.disabled && styles.disabled,
                fullWidth && styles.fullWidth
              )}
            >
              {tab.icon && <Icon name={tab.icon} size="sm" className={styles.icon} />}
              <span className={styles.label}>{tab.label}</span>
              {tab.badge !== undefined && (
                <Badge
                  size="sm"
                  variant={isActive ? 'primary' : 'default'}
                  className={styles.badge}
                >
                  {tab.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {activeTab && (
        <div
          role="tabpanel"
          id={`panel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
          tabIndex={0}
          className={styles.tabpanel}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
});

Tabs.displayName = 'Tabs';
