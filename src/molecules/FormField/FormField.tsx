import React, { useId, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './FormField.module.css';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactElement;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  children,
  className,
  ...restProps
}, ref) => {
  const generatedId = useId();
  const child = React.Children.only(children) as React.ReactElement<Record<string, any>>;
  const fieldId = htmlFor || child.props.id || generatedId;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;

  let describedBy: string | undefined = child.props['aria-describedby'];
  if (error) {
    describedBy = describedBy ? `${describedBy} ${errorId}` : errorId;
  } else if (hint) {
    describedBy = describedBy ? `${describedBy} ${hintId}` : hintId;
  }

  const isNativeElement = typeof child.type === 'string';

  const childProps: Record<string, any> = {
    id: fieldId,
    'aria-describedby': describedBy,
  };

  if (error !== undefined) {
    childProps['aria-invalid'] = true;
    if (!isNativeElement) {
      childProps.error = error;
    }
  }

  const clonedChild = React.cloneElement(child, childProps);

  return (
    <div ref={ref} className={clsx(styles.formField, className)} {...restProps}>
      <label htmlFor={fieldId} className={styles.label}>
        {label}
        {required && (
          <span className={styles.requiredAsterisk} aria-hidden="true">
            *
          </span>
        )}
      </label>

      {clonedChild}

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

FormField.displayName = 'FormField';
