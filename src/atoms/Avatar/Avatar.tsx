import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  initials?: string;
  size?: AvatarSize;
  alt?: string;
}

export const Avatar = forwardRef<HTMLElement, AvatarProps>(({
  src,
  initials = '',
  size = 'md',
  alt = '',
  className,
  ...restProps
}, ref) => {
  const formattedInitials = initials ? initials.slice(0, 2).toUpperCase() : '';

  if (src) {
    return (
      <img
        ref={ref as React.Ref<HTMLImageElement>}
        src={src}
        alt={alt}
        className={clsx(styles.avatar, styles[size], className)}
        {...restProps}
      />
    );
  }

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={clsx(styles.avatar, styles.fallback, styles[size], className)}
      {...restProps}
    >
      {formattedInitials}
    </span>
  );
});

Avatar.displayName = 'Avatar';
