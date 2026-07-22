import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: 'chevron' | 'slash';
  maxItems?: number;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(({
  items,
  separator = 'chevron',
  maxItems,
  className,
  ...restProps
}, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!items || items.length === 0) {
    return null;
  }

  const shouldCollapse = maxItems !== undefined && maxItems > 0 && items.length > maxItems && !isExpanded;

  interface RenderItem {
    type: 'item' | 'ellipsis';
    item?: BreadcrumbItem;
    originalIndex?: number;
  }

  let renderList: RenderItem[] = [];

  if (shouldCollapse) {
    const trailingCount = Math.max(1, maxItems - 1);
    const firstItem: RenderItem = { type: 'item', item: items[0], originalIndex: 0 };
    const ellipsisItem: RenderItem = { type: 'ellipsis' };
    const trailingItems: RenderItem[] = items.slice(items.length - trailingCount).map((item, idx) => ({
      type: 'item',
      item,
      originalIndex: items.length - trailingCount + idx,
    }));

    renderList = [firstItem, ellipsisItem, ...trailingItems];
  } else {
    renderList = items.map((item, index) => ({
      type: 'item',
      item,
      originalIndex: index,
    }));
  }

  const renderSeparator = () => {
    if (separator === 'slash') {
      return <span className={styles.separatorText} aria-hidden="true">/</span>;
    }
    return <Icon name="chevron-right" size="xs" aria-hidden="true" className={styles.separatorIcon} />;
  };

  return (
    <nav ref={ref} aria-label="Migas de pan" className={clsx(styles.breadcrumb, className)} {...restProps}>
      <ol className={styles.list}>
        {renderList.map((entry, idx) => {
          const isLast = idx === renderList.length - 1;

          if (entry.type === 'ellipsis') {
            return (
              <li key="ellipsis" className={styles.item}>
                <button
                  type="button"
                  className={styles.ellipsis}
                  onClick={() => setIsExpanded(true)}
                  aria-label="Mostrar todas las páginas"
                  aria-expanded={isExpanded}
                >
                  ...
                </button>
                {!isLast && <span className={styles.separator}>{renderSeparator()}</span>}
              </li>
            );
          }

          const { item, originalIndex } = entry;
          if (!item || originalIndex === undefined) return null;

          const isCurrentPage = originalIndex === items.length - 1;

          return (
            <li key={originalIndex} className={styles.item}>
              {isCurrentPage ? (
                <Typography
                  variant="body-sm"
                  color="primary"
                  aria-current="page"
                  className={styles.current}
                >
                  {item.label}
                </Typography>
              ) : item.href ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className={styles.link}
                >
                  <Typography variant="body-sm" color="inherit">
                    {item.label}
                  </Typography>
                </a>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className={styles.linkButton}
                >
                  <Typography variant="body-sm" color="inherit">
                    {item.label}
                  </Typography>
                </button>
              ) : (
                <span className={styles.linkText}>
                  <Typography variant="body-sm" color="inherit">
                    {item.label}
                  </Typography>
                </span>
              )}

              {!isLast && <span className={styles.separator}>{renderSeparator()}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
