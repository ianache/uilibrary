import './tokens.css';

export const tokens = {
  colors: {
    bg: 'var(--color-bg)',
    bgMuted: 'var(--color-bg-muted)',
    border: 'var(--color-border)',
    borderStrong: 'var(--color-border-strong)',
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    textMuted: 'var(--color-text-muted)',
    textDisabled: 'var(--color-text-disabled)',
    primary100: 'var(--color-primary-100)',
    primary200: 'var(--color-primary-200)',
    primary600: 'var(--color-primary-600)',
    primary700: 'var(--color-primary-700)',
    success100: 'var(--color-success-100)',
    success600: 'var(--color-success-600)',
    warning100: 'var(--color-warning-100)',
    warning600: 'var(--color-warning-600)',
    danger100: 'var(--color-danger-100)',
    danger600: 'var(--color-danger-600)',
  },
  spacing: {
    1: 'var(--space-1)',
    2: 'var(--space-2)',
    3: 'var(--space-3)',
    4: 'var(--space-4)',
    6: 'var(--space-6)',
    8: 'var(--space-8)',
  },
  radii: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    full: 'var(--radius-full)',
  },
  fonts: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
  },
  transitions: {
    fast: 'var(--transition-fast)',
    base: 'var(--transition-base)',
  },
} as const;
