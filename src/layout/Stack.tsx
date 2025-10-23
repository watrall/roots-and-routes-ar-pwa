import React from 'react';

export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg';

const GAP_MAP: Record<StackGap, string> = {
  none: '0',
  xs: 'var(--space-1)',
  sm: 'var(--space-2)',
  md: 'var(--space-3)',
  lg: 'var(--space-4)'
};

export type StackProps = {
  /**
   * Controls vertical spacing between items.
   */
  gap?: StackGap;
  /**
   * Horizontal alignment of children.
   */
  align?: React.CSSProperties['alignItems'];
  /**
   * Vertical justification of children.
   */
  justify?: React.CSSProperties['justifyContent'];
  /**
   * Optional HTML element tag.
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Additional class names for styling hooks.
   */
  className?: string;
  /**
   * Stack content.
   */
  children: React.ReactNode;
};

/**
 * Vertical flex stack component governed by spacing tokens.
 */
const Stack: React.FC<StackProps> = ({
  gap = 'md',
  align,
  justify,
  as: Component = 'div',
  className,
  children
}) => {
  return (
    <Component
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align,
        justifyContent: justify,
        gap: GAP_MAP[gap]
      }}
    >
      {children}
    </Component>
  );
};

export default Stack;
