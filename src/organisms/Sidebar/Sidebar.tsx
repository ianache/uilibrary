import React, { forwardRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { Icon, IconName } from '../../atoms/Icon';
import { Badge } from '../../atoms/Badge';
import { Tooltip } from '../../molecules/Tooltip';
import { UserCard } from '../../molecules/UserCard';
import { Avatar } from '../../atoms/Avatar';
import styles from './Sidebar.module.css';

export interface NavItem {
  id: string;
  label: string;
  icon?: IconName;
  badge?: number | string;
  disabled?: boolean;
  children?: NavItem[];
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
  activeId: string;
  onItemClick: (id: string) => void;
  collapsed?: boolean;
  onToggle?: () => void;
  user?: {
    name: string;
    role?: string;
    avatarSrc?: string;
  };
  onUserClick?: () => void;
  width?: number;
  collapsedWidth?: number;
}

function getInitials(name: string): string {
  if (!name) return '';
  const trimmed = name.trim();
  if (!trimmed) return '';
  const words = trimmed.split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(({
  items,
  activeId,
  onItemClick,
  collapsed = false,
  onToggle,
  user,
  onUserClick,
  width = 240,
  collapsedWidth = 64,
  className,
  style,
  ...restProps
}, ref) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    items.forEach((item) => {
      if (item.children?.some((child) => child.id === activeId || child.children?.some(c => c.id === activeId))) {
        initial.add(item.id);
      }
    });
    return initial;
  });

  useEffect(() => {
    items.forEach((item) => {
      if (item.children?.some((child) => child.id === activeId || child.children?.some(c => c.id === activeId))) {
        setExpandedIds((prev) => {
          const next = new Set(prev);
          next.add(item.id);
          return next;
        });
      }
    });
  }, [activeId, items]);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleItemClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.disabled) return;
    if (item.children && item.children.length > 0) {
      toggleExpand(item.id, e);
    }
    onItemClick(item.id);
  };

  const currentWidth = collapsed ? collapsedWidth : width;

  const renderNavItem = (item: NavItem, isChild = false) => {
    const isActive = item.id === activeId;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedIds.has(item.id);

    const buttonContent = (
      <button
        type="button"
        disabled={item.disabled}
        onClick={(e) => handleItemClick(item, e)}
        className={clsx(
          styles.itemButton,
          isChild && styles.childItemButton,
          isActive && styles.activeItem,
          item.disabled && styles.disabledItem,
          collapsed && styles.collapsedItem
        )}
      >
        <span className={styles.iconWrapper}>
          {item.icon ? (
            <Icon name={item.icon} size="md" />
          ) : (
            <span className={styles.dotIcon} />
          )}
          {collapsed && item.badge !== undefined && (
            <span className={styles.badgeDot} />
          )}
        </span>

        {!collapsed && (
          <>
            <span className={styles.itemLabel}>{item.label}</span>
            {item.badge !== undefined && (
              <Badge variant="primary" size="sm" className={styles.itemBadge}>
                {item.badge}
              </Badge>
            )}
            {hasChildren && (
              <Icon
                name="chevron-right"
                size="sm"
                className={clsx(styles.chevron, isExpanded && styles.chevronExpanded)}
              />
            )}
          </>
        )}
      </button>
    );

    const itemWithTooltip = collapsed ? (
      <Tooltip content={item.label} placement="right">
        {buttonContent}
      </Tooltip>
    ) : (
      buttonContent
    );

    return (
      <li key={item.id} className={styles.itemLi}>
        {itemWithTooltip}

        {!collapsed && hasChildren && (
          <ul
            className={clsx(
              styles.childrenList,
              isExpanded && styles.childrenExpanded
            )}
          >
            {item.children!.map((child) => renderNavItem(child, true))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside
      ref={ref}
      className={clsx(styles.sidebar, collapsed && styles.collapsed, className)}
      style={{
        width: `${currentWidth}px`,
        ...style,
      }}
      {...restProps}
    >
      {onToggle && (
        <div className={styles.headerToggle}>
          <button
            type="button"
            className={styles.toggleButton}
            onClick={onToggle}
            aria-label={collapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
          >
            <Icon name={collapsed ? 'chevron-right' : 'chevron-left'} size="md" />
          </button>
        </div>
      )}

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {items.map((item) => renderNavItem(item))}
        </ul>
      </nav>

      {user && (
        <div className={styles.userSection}>
          {collapsed ? (
            <Tooltip content={user.name} placement="right">
              <button
                type="button"
                className={styles.collapsedUserButton}
                onClick={onUserClick}
                aria-label={`Usuario ${user.name}`}
              >
                <Avatar
                  src={user.avatarSrc}
                  initials={getInitials(user.name)}
                  size="sm"
                  alt={user.name}
                />
              </button>
            </Tooltip>
          ) : (
            <UserCard
              name={user.name}
              role={user.role}
              avatarSrc={user.avatarSrc}
              onClick={onUserClick}
              size="sm"
              className={styles.userCard}
            />
          )}
        </div>
      )}
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';
