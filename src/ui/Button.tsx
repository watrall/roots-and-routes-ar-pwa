import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'destructive';
export type ButtonSize = 'md' | 'lg';

const VARIANT_MAP: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--color-light-green)',
    color: 'var(--color-text-inverse)',
  },
  secondary: {
    background: 'var(--color-surface-muted)',
    color: 'var(--color-text-primary)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--color-text-primary)',
    border: '1px solid var(--color-border)',
  },
  destructive: {
    background: 'var(--color-error)',
    color: 'var(--color-text-inverse)',
  },
};

const SIZE_MAP: Record<ButtonSize, React.CSSProperties> = {
  md: {
    paddingInline: 'var(--space-3)',
    paddingBlock: 'var(--space-2)',
    minHeight: '44px',
  },
  lg: {
    paddingInline: 'var(--space-4)',
    paddingBlock: 'var(--space-3)',
    minHeight: '56px',
  },
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Controls primary, secondary, outline, or destructive styling.
   */
  variant?: ButtonVariant;
  /**
   * Adjusts vertical sizing to meet touch targets.
   */
  size?: ButtonSize;
  /**
   * Optional icon rendered before button text.
   */
  leadingIcon?: React.ReactNode;
  /**
   * Optional icon rendered after button text.
   */
  trailingIcon?: React.ReactNode;
  /**
   * Expands the button to fill the available horizontal space.
   */
  fullWidth?: boolean;
};

/**
 * Token-driven button component with accessible focus and touch-target sizing.
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  type = 'button',
  children,
  style,
  disabled,
  fullWidth = false,
  ...rest
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    borderRadius: 'var(--radius-base)',
    border: 'none',
    fontWeight: 'var(--font-weight-medium)',
    transition: `transform var(--transition-duration-fast) var(--transition-ease)`,
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const variantStyle = VARIANT_MAP[variant];
  const sizeStyle = SIZE_MAP[size];

  return (
    <button
      type={type}
      style={{
        ...baseStyle,
        ...sizeStyle,
        ...variantStyle,
        ...style,
      }}
      disabled={disabled}
      {...rest}
    >
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
};

export default Button;
