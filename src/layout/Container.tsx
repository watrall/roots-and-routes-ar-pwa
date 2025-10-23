import React from 'react';

export type ContainerWidth = 'sm' | 'md' | 'lg' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

const WIDTH_MAP: Record<ContainerWidth, string> = {
  sm: 'min(100%, 480px)',
  md: 'min(100%, 720px)',
  lg: 'min(100%, 960px)',
  full: '100%'
};

const PADDING_MAP: Record<ContainerPadding, string> = {
  none: '0',
  sm: 'var(--space-3)',
  md: 'var(--space-4)',
  lg: 'var(--space-5)'
};

export type ContainerProps = {
  /**
   * Constrains the maximum width based on predefined breakpoints.
   */
  width?: ContainerWidth;
  /**
   * Applies internal padding using spacing tokens.
   */
  padding?: ContainerPadding;
  /**
   * Additional class name for custom styling.
   */
  className?: string;
  /**
   * Child content to render inside the container.
   */
  children: React.ReactNode;
};

/**
 * Centers content horizontally and constrains width to the design breakpoints.
 */
const Container: React.FC<ContainerProps> = ({
  width = 'md',
  padding = 'md',
  className,
  children
}) => {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: WIDTH_MAP[width],
        paddingInline: PADDING_MAP[padding],
        marginInline: 'auto'
      }}
    >
      {children}
    </div>
  );
};

export default Container;
