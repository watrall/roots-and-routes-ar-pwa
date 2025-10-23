import React from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';
import { Screen as ScreenType } from '../../lib/types';

export type PermissionsProps = {
  /**
   * Navigates to the next screen in the onboarding flow.
   */
  go: (screen: ScreenType) => void;
  /**
   * Updates the camera permission flag.
   */
  setCameraGranted: (granted: boolean) => void;
};

/**
 * Camera permission request with clear actions to continue through onboarding.
 */
const Permissions: React.FC<PermissionsProps> = ({ go, setCameraGranted }) => {
  const handleContinue = () => {
    setCameraGranted(true);
    go('accessibility');
  };

  const handleSkip = () => {
    setCameraGranted(false);
    go('accessibility');
  };

  return (
    <Screen
      title="Allow camera access"
      description="Roots & Routes AR uses your camera to recognize plants and unlock cultural and STEM journeys."
      header={
        <div
          style={{
            background: 'var(--color-clay-neutral)',
            paddingInline: 'var(--space-3)',
            paddingBlock: 'var(--space-4)',
          }}
        >
          <Stack gap="md" align="center">
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 'var(--radius-full)',
                background: 'rgba(11, 61, 50, 0.12)',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Icon name="camera" size={48} />
            </div>
            <p
              style={{
                maxWidth: '36ch',
                textAlign: 'center',
                color: 'var(--color-text-secondary)',
              }}
            >
              We only use your camera when you begin a scan. No images are stored or shared.
            </p>
          </Stack>
        </div>
      }
    >
      <Stack gap="md">
        <Button size="lg" onClick={handleContinue}>
          Allow Camera
        </Button>
        <Button variant="secondary" size="lg" onClick={handleSkip}>
          Skip for now
        </Button>
      </Stack>
    </Screen>
  );
};

export default Permissions;
