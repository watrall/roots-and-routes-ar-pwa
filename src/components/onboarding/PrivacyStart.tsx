import React from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import HStack from '../../layout/HStack';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import Icon from '../../ui/Icon';
import { Screen as ScreenType } from '../../lib/types';

const PRIVACY_POINTS = [
  'No photos or location data leave your device.',
  'Journal entries save to your device for offline learning.',
  'Optional analytics will always be opt-in when available.'
];

export type PrivacyStartProps = {
  /**
   * Moves the learner into the home screen to start exploring.
   */
  go: (screen: ScreenType) => void;
};

/**
 * Introduces privacy expectations and transitions learners into the app.
 */
const PrivacyStart: React.FC<PrivacyStartProps> = ({ go }) => {
  return (
    <Screen
      title="You're all set"
      description="Roots & Routes AR keeps learning data on your device first. Explore with confidence."
    >
      <Stack gap="lg">
        <Card tone="info">
          <Stack gap="sm">
            {PRIVACY_POINTS.map((point) => (
              <HStack key={point} align="flex-start" gap="sm">
                <span
                  aria-hidden
                  style={{
                    display: 'inline-flex',
                    width: 28,
                    height: 28,
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(22, 139, 95, 0.12)',
                    color: 'var(--color-light-green)',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Icon name="leaf" size={16} />
                </span>
                <p style={{ margin: 0 }}>{point}</p>
              </HStack>
            ))}
          </Stack>
        </Card>

        <Button size="lg" onClick={() => go('home')}>
          Start Exploring
        </Button>
      </Stack>
    </Screen>
  );
};

export default PrivacyStart;
