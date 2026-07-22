import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { SearchBar, SearchBarProps } from '../../molecules/SearchBar';
import { Avatar } from '../../atoms/Avatar';
import { Icon, IconName } from '../../atoms/Icon';
import { Badge } from '../../atoms/Badge';
import { Typography } from '../../atoms/Typography';
import styles from './Header.module.css';

export interface HeaderAction {
  icon: IconName;
  label: string;
  onClick: () => void;
  badge?: number | string;
}

export interface HeaderUser {
  name: string;
  role?: string;
  avatarSrc?: string;
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  onLogoClick?: () => void;
  searchProps?: SearchBarProps;
  showSearch?: boolean;
  actions?: HeaderAction[];
  user?: HeaderUser;
  onUserClick?: () => void;
  onMenuClick?: () => void;
  variant?: 'default' | 'transparent' | 'dark';
  sticky?: boolean;
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

export const Header = forwardRef<HTMLElement, HeaderProps>(({
  logo,
  onLogoClick,
  searchProps,
  showSearch = true,
  actions = [],
  user,
  onUserClick,
  onMenuClick,
  variant = 'default',
  sticky = true,
  className,
  children,
  ...restProps
}, ref) => {
  return (
    <header
      ref={ref}
      className={clsx(
        styles.header,
        styles[variant],
        sticky && styles.sticky,
        className
      )}
      {...restProps}
    >
      <div className={styles.left}>
        {onMenuClick && (
          <button
            type="button"
            className={styles.menuButton}
            onClick={onMenuClick}
            aria-label="Abrir menú de navegación"
          >
            <Icon name="menu" size="md" />
          </button>
        )}
        {logo && (
          onLogoClick ? (
            <button
              type="button"
              className={styles.logoButton}
              onClick={onLogoClick}
              aria-label="Logotipo"
            >
              {logo}
            </button>
          ) : (
            <div className={styles.logoWrapper}>{logo}</div>
          )
        )}
      </div>

      {showSearch && (
        <div className={styles.center}>
          <SearchBar
            placeholder="Buscar..."
            {...searchProps}
            className={clsx(styles.searchBar, searchProps?.className)}
          />
        </div>
      )}

      <div className={styles.right}>
        {children}
        {actions.map((action, index) => (
          <button
            key={`${action.label}-${index}`}
            type="button"
            className={styles.actionButton}
            onClick={action.onClick}
            title={action.label}
            aria-label={action.label}
          >
            <span className={styles.iconContainer}>
              <Icon name={action.icon} size="md" />
              {action.badge !== undefined && (
                <span className={styles.badgeOverlay}>
                  <Badge variant="danger" size="sm">
                    {action.badge}
                  </Badge>
                </span>
              )}
            </span>
            <span className={styles.actionLabel}>{action.label}</span>
          </button>
        ))}

        {user && (
          <button
            type="button"
            className={styles.userButton}
            onClick={onUserClick}
            aria-label={`Menú de usuario para ${user.name}`}
          >
            <Avatar
              src={user.avatarSrc}
              initials={getInitials(user.name)}
              size="sm"
              alt={user.name}
            />
            <Typography variant="body-sm" color="inherit" className={styles.userName}>
              {user.name}
            </Typography>
            <Icon name="chevron-down" size="sm" className={styles.userChevron} />
          </button>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';
