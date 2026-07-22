import React, { forwardRef, useEffect, useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { Icon } from '../../atoms/Icon';
import { Spinner } from '../../atoms/Spinner';
import styles from './Modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: ModalSize;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  loading?: boolean;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  closeOnOverlay = true,
  closeOnEsc = true,
  loading = false,
  className,
  ...restProps
}, ref) => {
  const generatedId = useId();
  const titleId = title ? `modal-title-${generatedId}` : undefined;
  const descriptionId = description ? `modal-desc-${generatedId}` : undefined;

  const previousFocusRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const setRef = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      if (containerRef.current) {
        const focusables = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          focusables[0].focus();
        } else {
          containerRef.current.focus();
        }
      }
    }, 0);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && closeOnEsc) {
      e.stopPropagation();
      onClose();
      return;
    }

    if (e.key === 'Tab' && containerRef.current) {
      const focusables = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => el.offsetParent !== null || el === document.activeElement);

      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !containerRef.current.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !containerRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlay) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={clsx(styles.overlay, className)}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      style={{ margin: 0 }}
    >
      <div
        ref={setRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={clsx(styles.modal, styles[size])}
        {...restProps}
      >
        {(title || description || closeOnEsc || closeOnOverlay) && (
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              {title && (
                <h2 id={titleId} className={styles.title}>
                  {title}
                </h2>
              )}
              {loading && (
                <Spinner size="sm" variant="primary" className={styles.spinner} />
              )}
            </div>
            {description && (
              <p id={descriptionId} className={styles.description}>
                {description}
              </p>
            )}
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              <Icon name="close" size="sm" />
            </button>
          </div>
        )}
        <div className={styles.body}>{children}</div>
        {footer && (
          <div className={clsx(styles.footer, loading && styles.footerDisabled)}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
});

Modal.displayName = 'Modal';
