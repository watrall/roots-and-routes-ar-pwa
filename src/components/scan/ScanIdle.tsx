import React, { useEffect } from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import Icon from '../../ui/Icon';
import { Screen as ScreenType } from '../../lib/types';

export type ScanIdleProps = {
  /**
   * Navigates to the provided screen.
   */
  go: (screen: ScreenType) => void;
  /**
   * Indicates if camera access has been granted.
   */
  cameraGranted: boolean;
};

/**
 * Idle scan state prompting the learner to begin scanning or resolve camera access.
 */
const ScanIdle: React.FC<ScanIdleProps> = ({ go, cameraGranted }) => {
  useEffect(() => {
    if (!cameraGranted) {
      go('error-camera');
    }
  }, [cameraGranted, go]);

  return (
    <Screen
      title="Ready to scan"
      description="Point the camera at a plant within the frame. We will identify it and connect you to cultural and STEM journeys."
    >
      <Stack gap="lg">
        <Card
          title="Camera feed"
          subtitle="Align a leaf or branch with the guide below."
        >
          <div
            aria-label="Camera preview placeholder"
            style={{
              borderRadius: 'var(--radius-base)',
              border: '2px dashed rgba(5, 40, 33, 0.2)',
              height: '320px',
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(22, 139, 95, 0.05)'
            }}
          >
            <Icon name="scan" size={56} aria-hidden />
          </div>
        </Card>

        <Button size="lg" fullWidth onClick={() => go('scan-detecting')}>
          Scan Plant
        </Button>

        <Button variant="secondary" onClick={() => go('home')}>
          Return home
        </Button>
      </Stack>
    </Screen>
  );
};

export default ScanIdle;
