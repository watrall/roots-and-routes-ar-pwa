import React from 'react';
import { StackGap } from './Stack';

const GAP_MAP: Record<StackGap, string> = {
  none: '0',
  xs: 'var(--space-1)',
  sm: 'var(--space-2)',
  md: 'var(--space-3)',
  lg: 'var(--space-4)'
};

export type HStackProps = {
  /**
   * Controls horizontal spacing between items.
   */
  gap?: StackGap;
  /**
   * Vertical alignment of children.
   */
  align?: React.CSSProperties['alignItems'];
  /**
   * Horizontal justification of children.
   */
  justify?: React.CSSProperties['justifyContent'];
  /**
   * Optional element tag.
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Enables wrapping for responsive layouts.
   */
  wrap?: boolean;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Content nodes.
   */
  children: React.ReactNode;
};

/**
 * Horizontal flex stack that respects spacing tokens and supports wrapping.
 */
const HStack: React.FC<HStackProps> = ({
  gap = 'md',
  align = 'center',
  justify,
  wrap = false,
  as: Component = 'div',
  className,
  children
}) => {
  return (
    <Component
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: align,
        justifyContent: justify,
        gap: GAP_MAP[gap],
        flexWrap: wrap ? 'wrap' : 'nowrap'
      }}
    >
      {children}
    </Component>
  );
};

export default HStack;
