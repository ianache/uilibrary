import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './AuthLayout.module.css';

export interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  brandPanel?: React.ReactNode;
  logo?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'centered' | 'split';
  bgPattern?: boolean;
}

export const AuthLayout = forwardRef<HTMLDivElement, AuthLayoutProps>(({
  children,
  brandPanel,
  logo,
  footer,
  variant = 'centered',
  bgPattern = false,
  className,
  ...restProps
}, ref) => {
  const isSplit = variant === 'split';

  return (
    <div
      ref={ref}
      className={clsx(
        styles.root,
        isSplit ? styles.split : styles.centered,
        bgPattern && styles.withBgPattern,
        className
      )}
      {...restProps}
    >
      {isSplit && brandPanel && (
        <div className={styles.brandPanel}>
          <div className={styles.brandContent}>
            {brandPanel}
          </div>
        </div>
      )}

      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          {logo && <div className={styles.logoWrapper}>{logo}</div>}
          <div className={styles.mainContent}>{children}</div>
          {footer && <div className={styles.footerWrapper}>{footer}</div>}
        </div>
      </div>
    </div>
  );
});

AuthLayout.displayName = 'AuthLayout';
