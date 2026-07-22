import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Avatar, AvatarSize } from '../../atoms/Avatar';
import styles from './AvatarGroup.module.css';

export interface AvatarUser {
  id: string;
  name: string;
  avatarSrc?: string;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  users: AvatarUser[];
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

function getInitials(name: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(({
  users = [],
  max = 4,
  size = 'sm',
  onClick,
  className,
  'aria-label': ariaLabel,
  ...restProps
}, ref) => {
  const visibleUsers = users.slice(0, max);
  const extraCount = users.length > max ? users.length - max : 0;
  const defaultAriaLabel = `${users.length} miembros del equipo`;

  // Render order for row-reverse layout:
  // Render overflow badge first (far right), then visible users in reverse order
  const reversedVisibleUsers = [...visibleUsers].reverse();

  return (
    <div
      ref={ref}
      className={clsx(
        styles.avatarGroup,
        styles[size],
        onClick && styles.interactive,
        className
      )}
      aria-label={ariaLabel || defaultAriaLabel}
      onClick={onClick}
      {...restProps}
    >
      {extraCount > 0 && (
        <div
          className={clsx(styles.avatarItem, styles.overflowBadge)}
          title={`+${extraCount} más`}
          aria-label={`y ${extraCount} más`}
        >
          +{extraCount}
        </div>
      )}

      {reversedVisibleUsers.map((user) => (
        <div key={user.id} className={styles.avatarItem} title={user.name}>
          <Avatar
            src={user.avatarSrc}
            initials={getInitials(user.name)}
            alt={user.name}
            size={size as AvatarSize}
            className={styles.avatarInner}
          />
        </div>
      ))}
    </div>
  );
});

AvatarGroup.displayName = 'AvatarGroup';
