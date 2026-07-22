import React, { forwardRef, useId, useRef } from 'react';
import clsx from 'clsx';
import styles from './RadioGroup.module.css';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  label?: string;
  direction?: 'vertical' | 'horizontal';
  variant?: 'default' | 'card';
  disabled?: boolean;
  error?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({
  options = [],
  value,
  onChange,
  name,
  label,
  direction = 'vertical',
  variant = 'default',
  disabled = false,
  error,
  className,
  id: customId,
  ...restProps
}, ref) => {
  const generatedId = useId();
  const baseId = customId || generatedId;
  const errorId = `${baseId}-error`;
  const optionRefs = useRef<(HTMLLabelElement | null)[]>([]);

  // Find index of the focusable option for roving tabindex
  const selectedIndex = options.findIndex((opt) => opt.value === value && !opt.disabled && !disabled);
  const firstEnabledIndex = options.findIndex((opt) => !opt.disabled && !disabled);
  const focusableIndex = selectedIndex !== -1 ? selectedIndex : firstEnabledIndex;

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (disabled || options[currentIndex]?.disabled) return;

    const enabledIndices = options
      .map((opt, idx) => (!opt.disabled && !disabled ? idx : -1))
      .filter((idx) => idx !== -1);

    if (enabledIndices.length === 0) return;

    const pos = enabledIndices.indexOf(currentIndex);
    if (pos === -1) return;

    let targetIndex: number | null = null;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextPos = (pos + 1) % enabledIndices.length;
      targetIndex = enabledIndices[nextPos];
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevPos = (pos - 1 + enabledIndices.length) % enabledIndices.length;
      targetIndex = enabledIndices[prevPos];
    }

    if (targetIndex !== null && targetIndex !== undefined) {
      const targetOpt = options[targetIndex];
      if (targetOpt) {
        onChange(targetOpt.value);
        optionRefs.current[targetIndex]?.focus();
      }
    }
  };

  return (
    <fieldset className={styles.fieldset}>
      {label && <legend className={styles.legend}>{label}</legend>}
      <div
        ref={ref}
        role="radiogroup"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={clsx(
          styles.container,
          styles[direction],
          variant === 'card' ? styles.variantCard : styles.variantDefault,
          disabled && styles.disabled,
          error && styles.error,
          className
        )}
        {...restProps}
      >
        {options.map((opt, index) => {
          const isSelected = opt.value === value;
          const isOptDisabled = disabled || Boolean(opt.disabled);
          const isFocusable = index === focusableIndex;
          const optionId = `${baseId}-opt-${index}`;

          return (
            <label
              key={opt.value}
              ref={(el) => { optionRefs.current[index] = el; }}
              htmlFor={optionId}
              tabIndex={isFocusable ? 0 : -1}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={clsx(
                styles.optionItem,
                isSelected && styles.optionSelected,
                isOptDisabled && styles.optionDisabled
              )}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={isOptDisabled}
                onChange={() => {
                  if (!isOptDisabled) {
                    onChange(opt.value);
                  }
                }}
                tabIndex={-1}
                className={styles.radioInput}
              />
              <span className={styles.radioControl} aria-hidden="true">
                {isSelected && <span className={styles.radioDot} />}
              </span>
              <div className={styles.optionContent}>
                <span className={styles.optionLabel}>{opt.label}</span>
                {opt.description && (
                  <span className={styles.optionDescription}>{opt.description}</span>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {error && (
        <p id={errorId} role="alert" className={styles.errorText}>
          {error}
        </p>
      )}
    </fieldset>
  );
});

RadioGroup.displayName = 'RadioGroup';
