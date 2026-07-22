import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import clsx from 'clsx';
import { Icon, IconName } from '../../atoms/Icon';
import { Divider } from '../../atoms/Divider';
import { Typography } from '../../atoms/Typography';
import { UserCard } from '../../molecules/UserCard';
import styles from './UserMenu.module.css';

export interface MenuItem {
  id: string;
  label: string;
  icon?: IconName;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}

export interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    name: string;
    email: string;
    role?: string;
    avatarSrc?: string;
  };
  items: MenuSection[];
  onClose: () => void;
  isOpen: boolean;
  anchorRef?: React.RefObject<HTMLElement | null>;
}

export const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(({
  user,
  items,
  onClose,
  isOpen,
  anchorRef,
  className,
  ...restProps
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => containerRef.current!);

  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // Flatten all enabled items for roving focus indexing
  const flatItems: MenuItem[] = [];
  items.forEach((section) => {
    section.items.forEach((item) => {
      if (!item.disabled) {
        flatItems.push(item);
      }
    });
  });

  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  itemRefs.current = [];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        (!anchorRef?.current || !anchorRef.current.contains(target))
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, anchorRef]);

  useEffect(() => {
    if (isOpen && flatItems.length > 0) {
      setFocusedIndex(0);
      const timer = setTimeout(() => {
        itemRefs.current[0]?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleItemKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    flatIndex: number,
    item: MenuItem
  ) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (flatIndex + 1) % flatItems.length;
      setFocusedIndex(nextIndex);
      itemRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (flatIndex - 1 + flatItems.length) % flatItems.length;
      setFocusedIndex(prevIndex);
      itemRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setFocusedIndex(0);
      itemRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const lastIndex = flatItems.length - 1;
      setFocusedIndex(lastIndex);
      itemRefs.current[lastIndex]?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.onClick?.();
      onClose();
    }
  };

  let globalFlatIndexCounter = 0;

  return (
    <div
      ref={containerRef}
      role="menu"
      aria-label={`Menú de ${user.name}`}
      className={clsx(styles.userMenu, className)}
      {...restProps}
    >
      <div className={styles.userHeader}>
        <UserCard
          name={user.name}
          email={user.email}
          role={user.role}
          avatarSrc={user.avatarSrc}
          size="sm"
          className={styles.userCardInfo}
        />
      </div>

      <Divider />

      <div className={styles.sectionsContainer}>
        {items.map((section, sectionIdx) => (
          <React.Fragment key={sectionIdx}>
            {sectionIdx > 0 && <Divider />}
            {section.title && (
              <div className={styles.sectionTitle}>
                <Typography variant="caption" color="muted">
                  {section.title}
                </Typography>
              </div>
            )}

            <div className={styles.sectionItems}>
              {section.items.map((item) => {
                const isEnabled = !item.disabled;
                const currentFlatIndex = isEnabled ? globalFlatIndexCounter++ : -1;

                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      if (isEnabled && currentFlatIndex !== -1) {
                        itemRefs.current[currentFlatIndex] = el;
                      }
                    }}
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    tabIndex={isEnabled && currentFlatIndex === focusedIndex ? 0 : -1}
                    onClick={() => {
                      if (isEnabled) {
                        item.onClick?.();
                        onClose();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (isEnabled && currentFlatIndex !== -1) {
                        handleItemKeyDown(e, currentFlatIndex, item);
                      }
                    }}
                    className={clsx(
                      styles.menuItem,
                      item.danger && styles.dangerItem,
                      item.disabled && styles.disabledItem
                    )}
                  >
                    {item.icon && (
                      <Icon
                        name={item.icon}
                        size="sm"
                        className={clsx(
                          styles.itemIcon,
                          item.danger && styles.dangerIcon
                        )}
                      />
                    )}
                    <span className={styles.itemLabel}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

UserMenu.displayName = 'UserMenu';
