import React, { useEffect } from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import Card from '../../ui/Card';
import { PlantDetails, Screen as ScreenType } from '../../lib/types';

const DETECTION_DELAY = 2000;

export type ScanDetectingProps = {
  /**
   * Navigates to the provided screen.
   */
  go: (screen: ScreenType) => void;
  /**
   * Sets the current plant details once identified.
   */
  setCurrentPlant: (plant: PlantDetails) => void;
};

/**
 * Shows interim detecting state while mock plant information is loading.
 */
const ScanDetecting: React.FC<ScanDetectingProps> = ({ go, setCurrentPlant }) => {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const mockPlant: PlantDetails = {
        id: '1',
        name: 'Coffea arabica',
        commonName: 'Coffee Plant',
        family: 'Rubiaceae',
        origin: 'Ethiopia, East Africa',
        thumbnail: '/images/coffee-plant.png',
        culturalStory:
          'Coffee cultivation spread through trade routes, shaping cultural rituals from Ethiopia to the Arabian Peninsula and beyond.',
        stemInfo:
          'Leaves contain chlorogenic acids; berries house seeds rich in caffeine, supporting pollinators and human economies.',
      };

      setCurrentPlant(mockPlant);
      go('scan-detected');
    }, DETECTION_DELAY);

    return () => window.clearTimeout(timeout);
  }, [go, setCurrentPlant]);

  return (
    <Screen
      title="Scanning..."
      description="Hold steady while we analyze the plant. This usually takes just a moment."
    >
      <Card>
        <Stack gap="md" align="center">
          <div
            aria-hidden
            style={{
              width: 120,
              height: 120,
              borderRadius: 'var(--radius-full)',
              border: '6px solid rgba(242, 183, 5, 0.2)',
              borderTopColor: 'var(--color-accent-gold)',
              animation: 'spin 1.2s linear infinite',
            }}
          />
          <p style={{ margin: 0 }}>Analyzing leaf structure, color, and venation patterns…</p>
        </Stack>
      </Card>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Screen>
  );
};

export default ScanDetecting;
