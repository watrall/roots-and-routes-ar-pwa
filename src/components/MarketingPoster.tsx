import React from 'react';
import HStack from '../layout/HStack';
import Card from '../ui/Card';

const MarketingPoster: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 'var(--space-5)',
        background: 'linear-gradient(135deg, rgba(11,61,50,0.94), rgba(5,40,33,0.94))',
        color: 'var(--color-text-inverse)'
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          background: 'var(--color-surface-elevated)',
          color: 'var(--color-text-primary)',
          borderRadius: 'var(--radius-base)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <header
          style={{
            padding: 'var(--space-5)',
            background: 'linear-gradient(135deg, var(--color-deep-green), var(--color-light-green))',
            color: 'var(--color-text-inverse)'
          }}
        >
          <h1 style={{ margin: 0 }}>Roots & Routes AR</h1>
          <p style={{ marginTop: 'var(--space-2)', maxWidth: '48ch' }}>
            Discover living plant stories through augmented reality. Blend cultural narratives, STEM
            inquiry, and journaling into every field trip.
          </p>
        </header>

        <main style={{ padding: 'var(--space-5)', display: 'grid', gap: 'var(--space-4)' }}>
          <HStack gap="md" wrap>
            <Card title="Immersive AR" subtitle="Identify plants and unlock stories in seconds." />
            <Card title="Culturally responsive" subtitle="Center community knowledge alongside STEM." />
            <Card title="Offline friendly" subtitle="Journal mode works without connectivity." />
          </HStack>

          <section aria-label="Feature grid">
            <h2>Features</h2>
            <ul style={{
              display: 'grid',
              gap: 'var(--space-2)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                'Screen-based navigation ideal for classroom devices.',
                'Teacher dashboard with standards coverage.',
                'Accessible design: adjustable text, contrast, narration.',
                'Climate simulation ties observation to data literacy.',
                'Export journals to CSV for portfolios.',
                'Light/dark themes with responsive layout.'
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-base)',
                    padding: 'var(--space-3)'
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section aria-label="QR code placeholder" style={{ textAlign: 'center' }}>
            <div
              aria-hidden
              style={{
                width: 160,
                height: 160,
                margin: '0 auto var(--space-3)',
                borderRadius: 'var(--radius-base)',
                border: '2px dashed var(--color-border)',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              QR
            </div>
            <p style={{ margin: 0 }}>Scan to install the PWA and start your expedition.</p>
          </section>
        </main>

        <footer
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-surface-muted)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-2)'
          }}
        >
          <span>rootsroutes.ar</span>
          <span>© {new Date().getFullYear()} Roots & Routes Initiative</span>
        </footer>
      </div>
    </div>
  );
};

export default MarketingPoster;
