import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  prefix,
  suffix,
  id,
  disabled,
  className,
  'aria-describedby': externalDescribedBy,
  ...restProps
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  let describedBy = externalDescribedBy;
  if (error) {
    describedBy = externalDescribedBy ? `${externalDescribedBy} ${errorId}` : errorId;
  } else if (hint) {
    describedBy = externalDescribedBy ? `${externalDescribedBy} ${hintId}` : hintId;
  }

  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
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
        {prefix && <span className={styles.prefix}>{prefix}</span>}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={styles.input}
          {...restProps}
        />

        {suffix && <span className={styles.suffix}>{suffix}</span>}
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

Input.displayName = 'Input';
