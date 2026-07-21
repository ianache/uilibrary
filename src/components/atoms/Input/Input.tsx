import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  error = false,
  fullWidth = false,
  disabled,
  style,
  ...props
}) => {
  return (
    <input
      disabled={disabled}
      style={{
        padding: '9px 12px',
        fontSize: '14px',
        borderRadius: '6px',
        border: error ? '1px solid #dc3545' : '1px solid #ced4da',
        outline: 'none',
        width: fullWidth ? '100%' : 'auto',
        boxSizing: 'border-box',
        backgroundColor: disabled ? '#e9ecef' : '#ffffff',
        color: '#212529',
        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
        ...style,
      }}
      {...props}
    />
  );
};
