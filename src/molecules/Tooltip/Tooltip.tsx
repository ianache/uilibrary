import React, { useId } from 'react';
import clsx from 'clsx';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: string;
  placement?: TooltipPlacement;
  children: React.ReactNode;
  delay?: number;
  id?: string;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  children,
  delay = 200,
  id: customId,
  className,
}) => {
  const generatedId = useId();
  const tooltipId = customId || `tooltip-${generatedId}`;

  let trigger: React.ReactNode;

  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      'aria-describedby'?: string;
      tabIndex?: number;
      className?: string;
    }>;
    const existingDescribedBy = child.props['aria-describedby'];
    const combinedDescribedBy = existingDescribedBy
      ? `${existingDescribedBy} ${tooltipId}`
      : tooltipId;

    trigger = React.cloneElement(child, {
      'aria-describedby': combinedDescribedBy,
      tabIndex: child.props.tabIndex ?? 0,
    });
  } else {
    trigger = (
      <span
        tabIndex={0}
        aria-describedby={tooltipId}
        className={styles.triggerWrapper}
      >
        {children}
      </span>
    );
  }

  return (
    <div
      className={clsx(styles.container, className)}
      style={{ '--tooltip-delay': `${delay}ms` } as React.CSSProperties}
    >
      {trigger}
      <div
        id={tooltipId}
        role="tooltip"
        className={clsx(styles.tooltip, styles[placement])}
      >
        {content}
      </div>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
