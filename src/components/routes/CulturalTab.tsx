import React from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import HStack from '../../layout/HStack';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Tabs from '../../ui/Tabs';
import Icon from '../../ui/Icon';
import { PlantDetails, Screen as ScreenType } from '../../lib/types';

const CULTURAL_TABS = [
  { id: 'cultural' as const, label: 'Cultural Journey', description: 'Stories & routes' },
  { id: 'stem' as const, label: 'STEM Insights', description: 'Science & systems' },
];

export type CulturalTabProps = {
  /**
   * Current plant context.
   */
  plant: PlantDetails;
  /**
   * Navigation callback.
   */
  go: (screen: ScreenType) => void;
};

/**
 * Cultural exploration view featuring narratives and media for the selected plant.
 */
const CulturalTab: React.FC<CulturalTabProps> = ({ plant, go }) => {
  return (
    <Screen
      title={plant.commonName ?? plant.name}
      description="Explore the cultural routes this plant has taken across communities and time."
      header={
        <header
          style={{
            background: 'var(--color-deep-green)',
            color: 'var(--color-text-inverse)',
            paddingInline: 'var(--space-3)',
            paddingBlock: 'var(--space-4)',
          }}
        >
          <Stack gap="sm">
            <span style={{ opacity: 0.8 }}>Cultural Route</span>
            <h2 style={{ margin: 0, color: 'var(--color-text-inverse)' }}>{plant.name}</h2>
            <p style={{ margin: 0 }}>
              Origin: {plant.origin ?? 'Unknown'} · Family: {plant.family ?? 'Unknown'}
            </p>
          </Stack>
        </header>
      }
    >
      <Stack gap="lg">
        <Tabs
          tabs={CULTURAL_TABS}
          activeId="cultural"
          onChange={(id) => go(id)}
          renderPanel={() => null}
        />

        <Card title="Cultural significance" subtitle="How communities interact with this plant.">
          <Stack gap="sm">
            <p style={{ margin: 0 }}>
              {plant.culturalStory ??
                'We are curating stories from community partners to highlight cultural relationships with this plant.'}
            </p>
            <Button variant="secondary" onClick={() => go('journal-entry')}>
              Record a journal reflection
            </Button>
          </Stack>
        </Card>

        <Card title="Trade & migration routes">
          <Stack gap="sm">
            <p style={{ margin: 0 }}>
              Follow the paths this plant took across continents, shaping culinary, medicinal, and
              ceremonial practices.
            </p>
            <HStack gap="sm" wrap>
              {['Horn of Africa', 'Arabian Peninsula', 'Global Coffeehouses'].map((route) => (
                <span
                  key={route}
                  style={{
                    padding: 'var(--space-1) var(--space-2)',
                    borderRadius: 'var(--radius-base)',
                    background: 'rgba(242, 183, 5, 0.18)',
                    color: 'var(--color-dark-green)',
                  }}
                >
                  {route}
                </span>
              ))}
            </HStack>
          </Stack>
        </Card>

        <Card title="Photo memories">
          <Stack gap="sm">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 'var(--space-2)',
              }}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: 'var(--radius-base)',
                    background: 'rgba(11, 61, 50, 0.08)',
                    aspectRatio: '4 / 3',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Icon name="leaf" />
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={() => go('journal-entry')}>
              Add a photo memory
            </Button>
          </Stack>
        </Card>

        <Card title="Historical timeline">
          <Stack gap="sm">
            {[
              { era: '9th century', detail: 'Legend of Kaldi discovering invigorating berries.' },
              {
                era: '15th century',
                detail: 'Monks cultivate coffee for extended prayer sessions.',
              },
              { era: '17th century', detail: 'Coffeehouses emerge as hubs for debate and ideas.' },
            ].map((event) => (
              <div
                key={event.era}
                style={{
                  padding: 'var(--space-2)',
                  borderLeft: '3px solid var(--color-accent-gold)',
                }}
              >
                <strong>{event.era}</strong>
                <p style={{ margin: 'var(--space-1) 0 0' }}>{event.detail}</p>
              </div>
            ))}
          </Stack>
        </Card>

        <Button size="lg" onClick={() => go('stem')}>
          Switch to STEM insights
        </Button>
      </Stack>
    </Screen>
  );
};

export default CulturalTab;
