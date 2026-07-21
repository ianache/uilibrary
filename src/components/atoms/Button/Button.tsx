import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: '#6c757d', color: '#ffffff', border: '1px solid transparent' };
      case 'outline':
        return { backgroundColor: 'transparent', color: '#0d6efd', border: '1px solid #0d6efd' };
      case 'danger':
        return { backgroundColor: '#dc3545', color: '#ffffff', border: '1px solid transparent' };
      case 'primary':
      default:
        return { backgroundColor: '#0d6efd', color: '#ffffff', border: '1px solid transparent' };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '6px 12px', fontSize: '12px' };
      case 'large':
        return { padding: '12px 24px', fontSize: '16px' };
      case 'medium':
      default:
        return { padding: '9px 18px', fontSize: '14px' };
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        borderRadius: '6px',
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled || isLoading ? 0.65 : 1,
        transition: 'all 0.2s ease-in-out',
        outline: 'none',
        ...getVariantStyles(),
        ...getSizeStyles(),
        ...style,
      }}
      {...props}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
};
