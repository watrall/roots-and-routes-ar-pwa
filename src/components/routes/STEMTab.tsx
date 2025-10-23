import React from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import HStack from '../../layout/HStack';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Tabs from '../../ui/Tabs';
import Slider from '../../ui/Slider';
import { PlantDetails, Screen as ScreenType } from '../../lib/types';

const STEM_TABS = [
  { id: 'cultural' as const, label: 'Cultural Journey', description: 'Stories & routes' },
  { id: 'stem' as const, label: 'STEM Insights', description: 'Science & systems' },
];

export type STEMTabProps = {
  /**
   * Current plant data.
   */
  plant: PlantDetails;
  /**
   * Navigation callback.
   */
  go: (screen: ScreenType) => void;
};

/**
 * STEM-focused plant exploration highlighting biology and systems thinking.
 */
const STEMTab: React.FC<STEMTabProps> = ({ plant, go }) => {
  return (
    <Screen
      title={`${plant.commonName ?? plant.name} · STEM`}
      description="Investigate the plant’s chemistry, ecological relationships, and growth conditions."
      header={
        <header
          style={{
            background: 'var(--color-dark-green)',
            color: 'var(--color-text-inverse)',
            paddingInline: 'var(--space-3)',
            paddingBlock: 'var(--space-4)',
          }}
        >
          <Stack gap="sm">
            <span style={{ opacity: 0.8 }}>STEM Route</span>
            <h2 style={{ margin: 0, color: 'var(--color-text-inverse)' }}>{plant.name}</h2>
            <p style={{ margin: 0 }}>
              Family: {plant.family ?? 'Unknown'} | Origin: {plant.origin ?? 'Unknown'}
            </p>
          </Stack>
        </header>
      }
    >
      <Stack gap="lg">
        <Tabs tabs={STEM_TABS} activeId="stem" onChange={(id) => go(id)} renderPanel={() => null} />

        <Card title="Chemical composition" subtitle="Key compounds supporting plant function.">
          <Stack gap="sm">
            <p style={{ margin: 0 }}>
              Example profile: <strong>C₈H₁₀N₄O₂</strong> (caffeine) synthesized in leaves to deter
              herbivores and support pollinator activity.
            </p>
            <p style={{ margin: 0 }}>
              Additional compounds: chlorogenic acids, diterpenes, and flavonoids influencing flavor
              and ecological interactions.
            </p>
          </Stack>
        </Card>

        <Card title="Ecological web">
          <Stack gap="sm">
            {[
              'Pollinators: bees, butterflies attracted to flowers.',
              'Soil partners: mycorrhizal fungi aiding nutrient uptake.',
              'Human impact: cultivation practices influencing biodiversity.',
            ].map((item) => (
              <div
                key={item}
                style={{
                  padding: 'var(--space-2)',
                  borderRadius: 'var(--radius-base)',
                  background: 'rgba(22, 139, 95, 0.08)',
                }}
              >
                {item}
              </div>
            ))}
          </Stack>
        </Card>

        <Card title="Growth conditions">
          <Stack gap="md">
            <Slider
              label="Ideal temperature"
              value={22}
              min={10}
              max={30}
              onChange={(value) => {
                void value;
              }}
              description="Preferred daytime temperature range (°C)."
              valueFormatter={(value) => `${value}°C`}
            />
            <Slider
              label="Rainfall needs"
              value={65}
              min={20}
              max={120}
              onChange={(value) => {
                void value;
              }}
              description="Annual rainfall requirement (inches)."
              valueFormatter={(value) => `${value} in`}
            />
          </Stack>
        </Card>

        <Card title="Simulation prep">
          <Stack gap="sm">
            <p style={{ margin: 0 }}>
              Adjust climate variables to forecast crop yield and resilience under different
              scenarios.
            </p>
            <Button size="lg" onClick={() => go('simulation')}>
              Open Climate Simulation
            </Button>
          </Stack>
        </Card>

        <HStack justify="space-between">
          <Button variant="secondary" onClick={() => go('cultural')}>
            Back to cultural story
          </Button>
          <Button variant="outline" onClick={() => go('home')}>
            Return home
          </Button>
        </HStack>
      </Stack>
    </Screen>
  );
};

export default STEMTab;
