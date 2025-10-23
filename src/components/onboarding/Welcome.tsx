import React, { useId } from 'react';
import Container from '../../layout/Container';
import Stack from '../../layout/Stack';
import Button from '../../ui/Button';
import { Screen } from '../../lib/types';

export type WelcomeProps = {
  /**
   * Navigates to the specified screen in the onboarding flow.
   */
  go: (screen: Screen) => void;
};

const PROGRESS_STEPS = 4;

/**
 * Entry welcome screen introducing the Roots & Routes AR experience.
 */
const Welcome: React.FC<WelcomeProps> = ({ go }) => {
  const mainId = useId();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(11, 61, 50, 0.96), rgba(5, 20, 15, 0.96))',
        color: 'var(--color-text-inverse)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <a className="skip-link" href={`#${mainId}`}>
        Skip to setup
      </a>
      <main
        id={mainId}
        style={{
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container width="md" padding="lg">
          <Stack gap="lg">
            <div
              style={{
                width: '96px',
                height: '96px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(242, 183, 5, 0.2)',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 'var(--space-3)',
              }}
              aria-hidden
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-accent-gold)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--color-dark-green)',
                  fontWeight: 'var(--font-weight-bold)',
                  fontSize: '1.5rem',
                }}
              >
                🌿
              </div>
            </div>

            <Stack gap="sm">
              <h1 data-screen-heading tabIndex={-1} style={{ color: 'var(--color-text-inverse)' }}>
                Roots & Routes AR
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.82)', maxWidth: '32ch' }}>
                Discover living cultural stories and STEM insights by exploring the plants around
                you.
              </p>
            </Stack>

            <div
              aria-hidden
              style={{
                display: 'flex',
                gap: 'var(--space-2)',
              }}
            >
              {Array.from({ length: PROGRESS_STEPS }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 'var(--radius-full)',
                    background: index === 0 ? 'var(--color-accent-gold)' : 'rgba(255,255,255,0.28)',
                    display: 'inline-block',
                  }}
                />
              ))}
            </div>

            <Button variant="primary" size="lg" onClick={() => go('permissions')}>
              Start Setup
            </Button>
          </Stack>
        </Container>
      </main>
    </div>
  );
};

export default Welcome;
