import React, { useState, useEffect, forwardRef } from 'react';
import clsx from 'clsx';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';
import styles from './SearchBar.module.css';

export interface SearchBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  onChange?: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
  showButton?: boolean;
  buttonLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(({
  placeholder = 'Buscar...',
  value,
  defaultValue = '',
  onSearch,
  onChange,
  loading = false,
  disabled = false,
  showButton = true,
  buttonLabel = 'Buscar',
  size = 'md',
  className,
  'aria-label': ariaLabel = 'Barra de búsqueda',
  ...restProps
}, ref) => {
  const [internalValue, setInternalValue] = useState<string>(() => {
    if (value !== undefined) return value;
    return defaultValue;
  });

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const isControlled = value !== undefined;
  const queryValue = isControlled ? value : internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!disabled && !loading) {
        onSearch?.(queryValue);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (!disabled && !loading) {
        if (!isControlled) {
          setInternalValue('');
        }
        onChange?.('');
      }
    }
  };

  const handleButtonClick = () => {
    if (!disabled && !loading) {
      onSearch?.(queryValue);
    }
  };

  return (
    <div
      ref={ref}
      role="search"
      aria-label={ariaLabel}
      className={clsx(styles.searchBar, styles[size], className)}
      {...restProps}
    >
      <Input
        value={queryValue}
        placeholder={placeholder}
        disabled={disabled || loading}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        prefix={<Icon name="search" size={size} />}
        className={styles.inputContainer}
      />
      {showButton && (
        <Button
          size={size}
          loading={loading}
          disabled={disabled || loading}
          onClick={handleButtonClick}
          className={styles.button}
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
