import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Avatar, AvatarSize } from '../../atoms/Avatar';
import { Typography, TypographyVariant } from '../../atoms/Typography';
import { Badge, BadgeSize, BadgeVariant } from '../../atoms/Badge';
import styles from './UserCard.module.css';

export type UserCardStatus = 'online' | 'offline' | 'away' | 'busy';
export type UserCardSize = 'sm' | 'md' | 'lg';

export interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role?: string;
  email?: string;
  avatarSrc?: string;
  status?: UserCardStatus;
  size?: UserCardSize;
  onClick?: () => void;
  selected?: boolean;
}

export function getInitials(name: string): string {
  if (!name) return '';
  const trimmed = name.trim();
  if (!trimmed) return '';
  const words = trimmed.split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

const statusMap: Record<UserCardStatus, { variant: BadgeVariant; label: string }> = {
  online: { variant: 'success', label: 'En línea' },
  offline: { variant: 'default', label: 'Desconectado' },
  away: { variant: 'warning', label: 'Ausente' },
  busy: { variant: 'danger', label: 'Ocupado' },
};

const sizeConfig: Record<
  UserCardSize,
  {
    avatarSize: AvatarSize;
    nameVariant: TypographyVariant;
    subtextVariant: TypographyVariant;
    badgeSize: BadgeSize;
  }
> = {
  sm: {
    avatarSize: 'xs',
    nameVariant: 'body-sm',
    subtextVariant: 'caption',
    badgeSize: 'sm',
  },
  md: {
    avatarSize: 'sm',
    nameVariant: 'body',
    subtextVariant: 'body-sm',
    badgeSize: 'sm',
  },
  lg: {
    avatarSize: 'md',
    nameVariant: 'body-lg',
    subtextVariant: 'body',
    badgeSize: 'md',
  },
};

export const UserCard = forwardRef<HTMLDivElement, UserCardProps>(({
  name,
  role,
  email,
  avatarSrc,
  status,
  size = 'md',
  onClick,
  selected = false,
  className,
  onKeyDown,
  tabIndex,
  ...restProps
}, ref) => {
  const isInteractive = Boolean(onClick);
  const config = sizeConfig[size] || sizeConfig.md;
  const initials = getInitials(name);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
    onKeyDown?.(e);
  };

  const statusInfo = status ? statusMap[status] : null;

  return (
    <div
      ref={ref}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? (tabIndex ?? 0) : tabIndex}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        styles.userCard,
        styles[size],
        isInteractive && styles.interactive,
        selected && styles.selected,
        className
      )}
      {...restProps}
    >
      <div className={styles.avatarContainer}>
        <Avatar
          src={avatarSrc}
          initials={initials}
          size={config.avatarSize}
          alt={name}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Typography
            variant={config.nameVariant}
            color="primary"
            className={styles.name}
            truncate
          >
            {name}
          </Typography>
          {statusInfo && (
            <Badge variant={statusInfo.variant} size={config.badgeSize}>
              {statusInfo.label}
            </Badge>
          )}
        </div>
        {role && (
          <Typography
            variant={config.subtextVariant}
            color="secondary"
            className={styles.subtext}
            truncate
          >
            {role}
          </Typography>
        )}
        {email && (
          <Typography
            variant={config.subtextVariant}
            color="muted"
            className={styles.subtext}
            truncate
          >
            {email}
          </Typography>
        )}
      </div>
    </div>
  );
});

UserCard.displayName = 'UserCard';
