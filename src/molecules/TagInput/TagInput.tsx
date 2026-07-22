import React, { forwardRef, useState, useRef, useId } from 'react';
import clsx from 'clsx';
import { Tag, TagVariant } from '../../atoms/Tag';
import styles from './TagInput.module.css';

export interface TagInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'onChange'> {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  error?: string;
  label?: string;
  tagVariant?: TagVariant;
  allowDuplicates?: boolean;
}

export const TagInput = forwardRef<HTMLDivElement, TagInputProps>(({
  value = [],
  onChange,
  placeholder = 'Añadir etiqueta...',
  maxTags,
  disabled = false,
  error,
  label,
  tagVariant = 'primary',
  allowDuplicates = false,
  className,
  id: customId,
  ...restProps
}, ref) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const inputId = customId || generatedId;
  const errorId = `${inputId}-error`;

  const isAtMax = maxTags !== undefined && value.length >= maxTags;
  const isInputDisabled = disabled || isAtMax;

  const handleAddTag = (tagText: string) => {
    const trimmed = tagText.trim();
    if (!trimmed) return;

    if (!allowDuplicates && value.includes(trimmed)) {
      setInputValue('');
      return;
    }

    if (maxTags !== undefined && value.length >= maxTags) {
      setInputValue('');
      return;
    }

    onChange([...value, trimmed]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0 && !disabled) {
      onChange(value.slice(0, -1));
    }
  };

  const handleRemoveTag = (indexToRemove: number) => {
    if (disabled) return;
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== inputRef.current) {
      inputRef.current?.focus();
    }
  };

  return (
    <div ref={ref} className={clsx(styles.container, className)} {...restProps}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div
        className={clsx(
          styles.wrapper,
          disabled && styles.disabled,
          error && styles.error
        )}
        onClick={handleContainerClick}
      >
        {value.map((tag, index) => (
          <Tag
            key={`${tag}-${index}`}
            variant={tagVariant}
            removable={!disabled}
            disabled={disabled}
            onRemove={() => handleRemoveTag(index)}
          >
            {tag}
          </Tag>
        ))}

        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isAtMax ? '' : placeholder}
          disabled={isInputDisabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={styles.input}
        />
      </div>

      {error && (
        <p id={errorId} role="alert" className={styles.errorText}>
          {error}
        </p>
      )}
    </div>
  );
});

TagInput.displayName = 'TagInput';
