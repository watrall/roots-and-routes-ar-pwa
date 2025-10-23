import React from 'react';
import Stack from '../layout/Stack';

export type CardTone = 'default' | 'info' | 'warning';

const TONE_MAP: Record<CardTone, React.CSSProperties> = {
  default: {
    background: 'var(--color-surface-elevated)',
    border: `1px solid rgba(5, 40, 33, 0.08)`
  },
  info: {
    background: 'linear-gradient(135deg, rgba(22, 139, 95, 0.12), rgba(11, 61, 50, 0.08))',
    border: `1px solid rgba(22, 139, 95, 0.24)`
  },
  warning: {
    background: 'linear-gradient(135deg, rgba(242, 183, 5, 0.16), rgba(242, 183, 5, 0.08))',
    border: `1px solid rgba(242, 183, 5, 0.24)`
  }
};

export type CardProps = {
  /**
   * Title displayed at the top of the card.
   */
  title?: string;
  /**
   * Optional supporting text shown beneath the title.
   */
  subtitle?: string;
  /**
   * Additional content rendered inside the card.
   */
  children?: React.ReactNode;
  /**
   * Optional action area rendered in the footer.
   */
  actions?: React.ReactNode;
  /**
   * Adjusts background styling for contextual messaging.
   */
  tone?: CardTone;
  /**
   * Accessible label when the card is interactive.
   */
  ariaLabel?: string;
};

/**
 * Flexible surface component backed by design tokens for elevation and radii.
 */
const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  actions,
  tone = 'default',
  ariaLabel
}) => {
  const toneStyle = TONE_MAP[tone];

  return (
    <section
      aria-label={ariaLabel}
      style={{
        borderRadius: 'var(--radius-base)',
        boxShadow: 'var(--shadow-card)',
        padding: 'var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        ...toneStyle
      }}
    >
      {(title || subtitle) && (
        <header>
          {title && (
            <h2
              style={{
                margin: 0,
                fontSize: '1.125rem',
                color: 'var(--color-text-primary)'
              }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ margin: 'var(--space-1) 0 0', color: 'var(--color-text-secondary)' }}>
              {subtitle}
            </p>
          )}
        </header>
      )}

      {children && (
        <Stack gap="sm">
          {children}
        </Stack>
      )}

      {actions && (
        <footer
          style={{
            marginTop: 'var(--space-2)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)'
          }}
        >
          {actions}
        </footer>
      )}
    </section>
  );
};

export default Card;
