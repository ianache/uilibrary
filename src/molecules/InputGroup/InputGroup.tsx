import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';
import { Input, InputProps } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { Icon, IconName } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import styles from './InputGroup.module.css';

export interface InputGroupButton {
  label: string;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: IconName;
}

export interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix'> {
  inputProps: InputProps;
  addonLeft?: string | React.ReactNode;
  addonRight?: string | React.ReactNode;
  buttonLeft?: InputGroupButton;
  buttonRight?: InputGroupButton;
  size?: 'sm' | 'md' | 'lg';
}

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(({
  inputProps,
  addonLeft,
  addonRight,
  buttonLeft,
  buttonRight,
  size = 'md',
  className,
  ...restProps
}, ref) => {
  const defaultId = useId();
  const { label, error, hint, disabled, id: customId, 'aria-describedby': externalDescribedBy, ...restInputProps } = inputProps;
  const inputId = customId || defaultId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  let describedBy = externalDescribedBy;
  if (error) {
    describedBy = externalDescribedBy ? `${externalDescribedBy} ${errorId}` : errorId;
  } else if (hint) {
    describedBy = externalDescribedBy ? `${externalDescribedBy} ${hintId}` : hintId;
  }

  return (
    <div ref={ref} className={clsx(styles.groupContainer, className)} {...restProps}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div
        className={clsx(
          styles.wrapper,
          styles[size],
          error && styles.wrapperError,
          disabled && styles.wrapperDisabled
        )}
      >
        {buttonLeft && (
          <Button
            variant="secondary"
            size={size}
            disabled={disabled}
            onClick={buttonLeft.onClick}
            className={clsx(styles.groupButton, styles.buttonLeft)}
          >
            {buttonLeft.icon && <Icon name={buttonLeft.icon} size={size === 'lg' ? 'md' : 'sm'} />}
            {buttonLeft.label && <span>{buttonLeft.label}</span>}
          </Button>
        )}

        {addonLeft && (
          <div className={clsx(styles.addon, styles.addonLeft, styles[`addon-${size}`])}>
            {typeof addonLeft === 'string' ? (
              <Typography variant={size === 'sm' ? 'caption' : 'body-sm'} color="secondary">
                {addonLeft}
              </Typography>
            ) : (
              addonLeft
            )}
          </div>
        )}

        <Input
          {...restInputProps}
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={styles.innerInput}
        />

        {addonRight && (
          <div className={clsx(styles.addon, styles.addonRight, styles[`addon-${size}`])}>
            {typeof addonRight === 'string' ? (
              <Typography variant={size === 'sm' ? 'caption' : 'body-sm'} color="secondary">
                {addonRight}
              </Typography>
            ) : (
              addonRight
            )}
          </div>
        )}

        {buttonRight && (
          <Button
            variant="secondary"
            size={size}
            disabled={disabled}
            onClick={buttonRight.onClick}
            className={clsx(styles.groupButton, styles.buttonRight)}
          >
            {buttonRight.icon && <Icon name={buttonRight.icon} size={size === 'lg' ? 'md' : 'sm'} />}
            {buttonRight.label && <span>{buttonRight.label}</span>}
          </Button>
        )}
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

InputGroup.displayName = 'InputGroup';
