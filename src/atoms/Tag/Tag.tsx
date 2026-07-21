import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Tag.module.css';

export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  removable?: boolean;
  onRemove?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(({
  variant = 'default',
  removable = false,
  onRemove,
  disabled = false,
  children,
  className,
  ...restProps
}, ref) => {
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!disabled && onRemove) {
      onRemove();
    }
  };

  return (
    <span
      ref={ref}
      className={clsx(
        styles.tag,
        styles[variant],
        disabled && styles.disabled,
        className
      )}
      {...restProps}
    >
      <span className={styles.content}>{children}</span>
      {removable && (
        <button
          type="button"
          aria-label="Eliminar etiqueta"
          className={styles.removeButton}
          onClick={handleRemove}
          disabled={disabled}
        >
          &times;
        </button>
      )}
    </span>
  );
});

Tag.displayName = 'Tag';
