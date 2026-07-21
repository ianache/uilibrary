import React, { forwardRef, useId, useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  maxLength?: number;
  showCount?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  hint,
  rows = 4,
  resize = 'vertical',
  maxLength,
  showCount = false,
  id,
  disabled,
  className,
  style,
  value,
  defaultValue,
  onChange,
  'aria-describedby': externalDescribedBy,
  ...restProps
}, ref) => {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const errorId = `${textareaId}-error`;
  const hintId = `${textareaId}-hint`;

  const [internalValue, setInternalValue] = useState<string>(() => {
    if (value !== undefined && value !== null) return String(value);
    if (defaultValue !== undefined && defaultValue !== null) return String(defaultValue);
    return '';
  });

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInternalValue(String(value));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const currentLength = (value !== undefined && value !== null ? String(value) : internalValue).length;

  let describedBy = externalDescribedBy;
  if (error) {
    describedBy = externalDescribedBy ? `${externalDescribedBy} ${errorId}` : errorId;
  } else if (hint) {
    describedBy = externalDescribedBy ? `${externalDescribedBy} ${hintId}` : hintId;
  }

  const hasHeader = label || (showCount && maxLength !== undefined);

  return (
    <div className={clsx(styles.container, className)}>
      {hasHeader && (
        <div className={styles.labelHeader}>
          {label ? (
            <label htmlFor={textareaId} className={styles.label}>
              {label}
            </label>
          ) : (
            <span />
          )}

          {showCount && maxLength !== undefined && (
            <span
              className={clsx(
                styles.counter,
                currentLength >= maxLength && styles.counterOver
              )}
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        style={{ resize, ...style }}
        className={clsx(
          styles.textarea,
          error && styles.textareaError,
          disabled && styles.textareaDisabled
        )}
        {...restProps}
      />

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

Textarea.displayName = 'Textarea';
