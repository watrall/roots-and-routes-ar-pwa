import React from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { PlantDetails, Screen as ScreenType } from '../../lib/types';

export type ScanDetectedProps = {
  /**
   * Navigates between screens in the flow.
   */
  go: (screen: ScreenType) => void;
  /**
   * Current plant details to present.
   */
  currentPlant: PlantDetails | null;
};

/**
 * Results view after detecting a plant, providing branching options.
 */
const ScanDetected: React.FC<ScanDetectedProps> = ({ go, currentPlant }) => {
  if (!currentPlant) {
    return (
      <Screen
        title="Plant not available"
        description="We could not load the plant information. Try scanning again."
      >
        <Button size="lg" onClick={() => go('scan-idle')}>
          Try again
        </Button>
      </Screen>
    );
  }

  return (
    <Screen
      title="Plant identified"
      description="Choose a pathway to explore cultural stories or STEM insights."
    >
      <Stack gap="lg">
        <Card
          title={currentPlant.commonName ?? currentPlant.name}
          subtitle={currentPlant.name}
        >
          <Stack gap="sm">
            <p style={{ margin: 0 }}>
              <strong>Family:</strong> {currentPlant.family ?? 'Unknown'}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Origin:</strong> {currentPlant.origin ?? 'Unknown'}
            </p>
          </Stack>
        </Card>

        <Stack gap="md">
          <Button size="lg" onClick={() => go('cultural')}>
            Explore Cultural Story
          </Button>
          <Button variant="secondary" size="lg" onClick={() => go('stem')}>
            Review STEM Insights
          </Button>
          <Button variant="outline" onClick={() => go('scan-idle')}>
            Scan another plant
          </Button>
        </Stack>
      </Stack>
    </Screen>
  );
};

export default ScanDetected;
