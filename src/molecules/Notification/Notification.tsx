import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Icon, IconName } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import styles from './Notification.module.css';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';

export interface NotificationAction {
  label: string;
  onClick: () => void;
}

export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: NotificationVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: NotificationAction;
  icon?: boolean;
}

const variantIconMap: Record<NotificationVariant, IconName> = {
  info: 'info',
  success: 'check-circle',
  warning: 'warning',
  error: 'x-circle',
};

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(({
  variant = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
  action,
  icon = true,
  className,
  role,
  ...restProps
}, ref) => {
  const defaultRole = (variant === 'error' || variant === 'warning') ? 'alert' : 'status';
  const computedRole = role ?? defaultRole;
  const iconName = variantIconMap[variant];

  return (
    <div
      ref={ref}
      role={computedRole}
      className={clsx(
        styles.notification,
        styles[variant],
        className
      )}
      {...restProps}
    >
      {icon && (
        <div className={styles.iconContainer}>
          <Icon name={iconName} size="md" className={styles.icon} />
        </div>
      )}
      <div className={styles.content}>
        {title && (
          <Typography variant="body" className={styles.title}>
            {title}
          </Typography>
        )}
        <Typography variant="body-sm" className={styles.message}>
          {message}
        </Typography>
        {action && (
          <div className={styles.actionContainer}>
            <Button
              variant="ghost"
              size="sm"
              onClick={action.onClick}
              className={styles.actionButton}
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Cerrar notificación"
          className={styles.dismissButton}
        >
          <Icon name="close" size="sm" />
        </button>
      )}
    </div>
  );
});

Notification.displayName = 'Notification';
