import React, { forwardRef, useId, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  description,
  error,
  indeterminate = false,
  id,
  disabled,
  className,
  'aria-describedby': externalDescribedBy,
  ...restProps
}, ref) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;
  const errorId = `${checkboxId}-error`;
  const descriptionId = `${checkboxId}-description`;

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const setRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (node) {
      node.indeterminate = indeterminate;
    }
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
    }
  };

  let describedBy = externalDescribedBy;
  if (error) {
    describedBy = externalDescribedBy ? `${externalDescribedBy} ${errorId}` : errorId;
  } else if (description) {
    describedBy = externalDescribedBy ? `${externalDescribedBy} ${descriptionId}` : descriptionId;
  }

  return (
    <div className={clsx(styles.container, className)}>
      <label
        htmlFor={checkboxId}
        className={clsx(styles.labelContainer, disabled && styles.disabled)}
      >
        <div className={styles.checkboxWrapper}>
          <input
            ref={setRef}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={styles.nativeCheckbox}
            {...restProps}
          />
          <div
            className={clsx(
              styles.control,
              error && styles.controlError,
              disabled && styles.controlDisabled
            )}
            aria-hidden="true"
          >
            <svg
              className={styles.icon}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {indeterminate ? (
                <line x1="3.5" y1="8" x2="12.5" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3.5 8L6.5 11L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </div>
        </div>

        {(label || description) && (
          <div className={styles.textContainer}>
            {label && <span className={styles.labelText}>{label}</span>}
            {description && (
              <span id={descriptionId} className={styles.descriptionText}>
                {description}
              </span>
            )}
          </div>
        )}
      </label>

      {error && (
        <p id={errorId} role="alert" className={styles.errorText}>
          {error}
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
