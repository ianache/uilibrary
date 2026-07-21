import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  label,
  placeholder,
  error,
  hint,
  id,
  disabled,
  className,
  value,
  defaultValue,
  'aria-describedby': externalDescribedBy,
  ...restProps
}, ref) => {
  const generatedId = useId();
  const selectId = id || generatedId;
  const errorId = `${selectId}-error`;
  const hintId = `${selectId}-hint`;

  let describedBy = externalDescribedBy;
  if (error) {
    describedBy = externalDescribedBy ? `${externalDescribedBy} ${errorId}` : errorId;
  } else if (hint) {
    describedBy = externalDescribedBy ? `${externalDescribedBy} ${hintId}` : hintId;
  }

  const selectProps: React.SelectHTMLAttributes<HTMLSelectElement> = { ...restProps };
  if (value !== undefined) {
    selectProps.value = value;
  } else if (defaultValue !== undefined) {
    selectProps.defaultValue = defaultValue;
  } else if (placeholder) {
    selectProps.defaultValue = '';
  }

  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}

      <div
        className={clsx(
          styles.wrapper,
          error && styles.wrapperError,
          disabled && styles.wrapperDisabled
        )}
      >
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={styles.select}
          {...selectProps}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <svg
          className={styles.chevron}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {error ? (
        <p id={errorId} role="alert" className={styles.errorText}>
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className={styles.hintText}>
          {hint}
        </p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
