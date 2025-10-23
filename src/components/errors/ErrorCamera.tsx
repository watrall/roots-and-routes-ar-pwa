import React from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Icon from '../../ui/Icon';
import { Screen as ScreenType } from '../../lib/types';

export type ErrorCameraProps = {
  go: (screen: ScreenType) => void;
};

const ErrorCamera: React.FC<ErrorCameraProps> = ({ go }) => {
  return (
    <Screen
      title="Camera access required"
      description="To scan plants, enable camera permissions in your device settings."
    >
      <Stack gap="lg">
        <Card>
          <Stack gap="md" align="center">
            <div
              aria-hidden
              style={{
                width: 96,
                height: 96,
                borderRadius: 'var(--radius-full)',
                background: 'rgba(242, 183, 5, 0.16)',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              <Icon name="camera" size={48} />
            </div>
            <p style={{ margin: 0, textAlign: 'center' }}>
              Camera access powers AR scanning. You can continue exploring cultural and STEM stories
              without scanning.
            </p>
            <Stack gap="sm" style={{ width: '100%' }}>
              <Button size="lg" onClick={() => go('settings')}>
                Enable in Settings
              </Button>
              <Button variant="secondary" onClick={() => go('home')}>
                Go Back
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Screen>
  );
};

export default ErrorCamera;
