import React from 'react';
import { Input, InputProps } from '../../atoms/Input';

export interface FormFieldProps extends InputProps {
  label: string;
  errorMessage?: string;
  helperText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  errorMessage,
  helperText,
  id,
  ...inputProps
}) => {
  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: inputProps.fullWidth ? '100%' : '280px' }}>
      <label htmlFor={fieldId} style={{ fontSize: '14px', fontWeight: 600, color: '#333333' }}>
        {label}
      </label>
      <Input id={fieldId} error={!!errorMessage} {...inputProps} />
      {errorMessage ? (
        <span style={{ fontSize: '12px', color: '#dc3545' }}>{errorMessage}</span>
      ) : helperText ? (
        <span style={{ fontSize: '12px', color: '#6c757d' }}>{helperText}</span>
      ) : null}
    </div>
  );
};
