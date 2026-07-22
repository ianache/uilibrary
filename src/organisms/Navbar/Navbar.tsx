import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Breadcrumb, BreadcrumbProps } from '../../molecules/Breadcrumb';
import styles from './Navbar.module.css';

export interface NavbarItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavbarItem[];
  variant?: 'default' | 'pills' | 'underline';
  actions?: React.ReactNode;
  breadcrumb?: BreadcrumbProps;
  bordered?: boolean;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(({
  items = [],
  variant = 'underline',
  actions,
  breadcrumb,
  bordered = false,
  className,
  children,
  ...restProps
}, ref) => {
  return (
    <nav
      ref={ref}
      className={clsx(
        styles.navbar,
        styles[variant],
        bordered && styles.bordered,
        className
      )}
      {...restProps}
    >
      <div className={styles.content}>
        {breadcrumb ? (
          <div className={styles.breadcrumbWrapper}>
            <Breadcrumb {...breadcrumb} />
          </div>
        ) : (
          <div className={styles.scrollContainer}>
            <ul className={styles.itemList}>
              {items.map((item) => {
                const isActive = Boolean(item.active);

                const itemContent = (
                  <span className={styles.label}>{item.label}</span>
                );

                return (
                  <li key={item.id} className={styles.itemLi}>
                    {item.href ? (
                      <a
                        href={item.href}
                        onClick={item.disabled ? (e) => e.preventDefault() : item.onClick}
                        aria-current={isActive ? 'page' : undefined}
                        className={clsx(
                          styles.itemLink,
                          isActive && styles.activeItem,
                          item.disabled && styles.disabledItem
                        )}
                      >
                        {itemContent}
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled={item.disabled}
                        onClick={item.onClick}
                        aria-current={isActive ? 'page' : undefined}
                        className={clsx(
                          styles.itemButton,
                          isActive && styles.activeItem,
                          item.disabled && styles.disabledItem
                        )}
                      >
                        {itemContent}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {children}

        {actions && <div className={styles.actionsContainer}>{actions}</div>}
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
