import React, { useId } from 'react';
import Container from './Container';

export type ScreenProps = {
  /**
   * Accessible page title for the main heading.
   */
  title: string;
  /**
   * Optional descriptive text for the page heading.
   */
  description?: string;
  /**
   * Slot for top-aligned content such as app bars.
   */
  header?: React.ReactNode;
  /**
   * Primary screen content.
   */
  children: React.ReactNode;
  /**
   * Optional persistent bottom navigation region.
   */
  bottomNav?: React.ReactNode;
  /**
   * Label for the skip-link. Defaults to "Skip to content".
   */
  skipLinkLabel?: string;
};

const DEFAULT_SKIP_TARGET = 'main-content';

/**
 * Responsive app screen shell with skip-link, heading, and optional navigation regions.
 */
const Screen: React.FC<ScreenProps> = ({
  title,
  description,
  header,
  children,
  bottomNav,
  skipLinkLabel = 'Skip to content',
}) => {
  const headingId = useId();
  const mainUniqueId = useId();
  const mainId = `${DEFAULT_SKIP_TARGET}-${mainUniqueId}`;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-surface)',
      }}
    >
      <a className="skip-link" href={`#${mainId}`}>
        {skipLinkLabel}
      </a>

      {header}

      <main
        id={mainId}
        aria-labelledby={headingId}
        style={{
          flex: '1 1 auto',
          paddingInline: 'var(--space-3)',
          paddingBlock: 'var(--space-4)',
        }}
      >
        <Container width="md" padding="none">
          <h1
            id={headingId}
            data-screen-heading
            tabIndex={-1}
            style={{ marginBottom: 'var(--space-3)' }}
          >
            {title}
          </h1>
          {description && <p style={{ marginBottom: 'var(--space-4)' }}>{description}</p>}
          {children}
        </Container>
      </main>

      {bottomNav && (
        <nav
          aria-label="Primary navigation"
          style={{
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-surface-elevated)',
            paddingInline: 'var(--space-3)',
            paddingBlock: 'calc(var(--space-2) + 2px)',
          }}
        >
          <Container width="md" padding="none">
            {bottomNav}
          </Container>
        </nav>
      )}
    </div>
  );
};

export default Screen;
