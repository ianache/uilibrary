import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Icon.module.css';

export type IconName =
  | 'home'
  | 'menu'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-right'
  | 'chevron-left'
  | 'arrow-right'
  | 'arrow-left'
  | 'external-link'
  | 'search'
  | 'plus'
  | 'minus'
  | 'edit'
  | 'trash'
  | 'copy'
  | 'download'
  | 'upload'
  | 'filter'
  | 'log-out'
  | 'check'
  | 'close'
  | 'info'
  | 'warning'
  | 'check-circle'
  | 'x-circle'
  | 'loader'
  | 'user'
  | 'settings'
  | 'mail'
  | 'bell'
  | 'lock'
  | 'calendar'
  | 'eye'
  | 'eye-off'
  | 'star'
  | 'heart';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const iconPaths: Record<string, string | string[]> = {
  // Navigation
  home: [
    'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    'M9 22V12h6v10',
  ],
  menu: ['M3 12h18', 'M3 6h18', 'M3 18h18'],
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-up': 'M18 15l-6-6-6 6',
  'chevron-right': 'M9 18l6-6-6-6',
  'chevron-left': 'M15 18l-6-6 6-6',
  'arrow-right': ['M5 12h14', 'M12 5l7 7-7 7'],
  'arrow-left': ['M19 12H5', 'M12 19l-7-7 7-7'],
  'external-link': [
    'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
    'M15 3h6v6',
    'M10 14L21 3',
  ],
  // Actions
  search: [
    'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
    'M21 21l-4.35-4.35',
  ],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: 'M5 12h14',
  edit: [
    'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7',
    'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  ],
  trash: [
    'M3 6h18',
    'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
  ],
  copy: [
    'M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2',
    'M16 8h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2z',
  ],
  download: [
    'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
    'M7 10l5 5 5-5',
    'M12 15V3',
  ],
  upload: [
    'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4',
    'M17 8l-5-5-5 5',
    'M12 3v12',
  ],
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  'log-out': [
    'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4',
    'M16 17l5-5-5-5',
    'M21 12H9',
  ],
  // Status
  check: 'M20 6L9 17l-5-5',
  close: ['M18 6L6 18', 'M6 6l12 12'],
  info: [
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    'M12 16v-4',
    'M12 8h.01',
  ],
  warning: [
    'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
    'M12 9v4',
    'M12 17h.01',
  ],
  'check-circle': [
    'M22 11.08V12a10 10 0 1 1-5.93-9.14',
    'M22 4L12 14.01l-3-3',
  ],
  'x-circle': [
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z',
    'M15 9l-6 6',
    'M9 9l6 6',
  ],
  loader: [
    'M12 2v4',
    'M12 18v4',
    'M4.93 4.93l2.83 2.83',
    'M16.24 16.24l2.83 2.83',
    'M2 12h4',
    'M18 12h4',
    'M4.93 19.07l2.83-2.83',
    'M16.24 7.76l2.83-2.83',
  ],
  // UI
  user: [
    'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
    'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  ],
  settings: [
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
    'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z',
  ],
  mail: [
    'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z',
    'M22 6l-10 7L2 6',
  ],
  bell: [
    'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9',
    'M13.73 21a2 2 0 0 1-3.46 0',
  ],
  lock: [
    'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z',
    'M7 11V7a5 5 0 0 1 10 0v4',
  ],
  calendar: [
    'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z',
    'M16 2v4',
    'M8 2v4',
    'M3 10h18',
  ],
  eye: [
    'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z',
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  ],
  'eye-off': [
    'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24',
    'M1 1l22 22',
  ],
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  heart:
    'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
};

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name' | 'size'> {
  name: IconName;
  size?: IconSize;
  label?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({
  name,
  size = 'md',
  label,
  className,
  ...restProps
}, ref) => {
  const pathData = iconPaths[name];

  if (!pathData) {
    return null;
  }

  const accessibilityProps = label
    ? { 'aria-label': label, role: 'img' }
    : { 'aria-hidden': true as const };

  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx(styles.icon, styles[size], className)}
      {...accessibilityProps}
      {...restProps}
    >
      {Array.isArray(pathData) ? (
        pathData.map((d, index) => <path key={index} d={d} />)
      ) : (
        <path d={pathData} />
      )}
    </svg>
  );
});

Icon.displayName = 'Icon';
