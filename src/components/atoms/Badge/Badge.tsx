import React from 'react';

export interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'info' | 'danger';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'info' }) => {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: '#d1e7dd', color: '#0f5132' };
      case 'warning':
        return { bg: '#fff3cd', color: '#664d03' };
      case 'danger':
        return { bg: '#f8d7da', color: '#842029' };
      case 'info':
      default:
        return { bg: '#cff4fc', color: '#055160' };
    }
  };

  const { bg, color } = getColors();

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        fontSize: '12px',
        fontWeight: 600,
        borderRadius: '50px',
        backgroundColor: bg,
        color: color,
        lineHeight: 1,
      }}
    >
      {label}
    </span>
  );
};
