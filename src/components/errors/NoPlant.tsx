import React from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Screen as ScreenType } from '../../lib/types';

export type NoPlantProps = {
  go: (screen: ScreenType) => void;
};

const NoPlant: React.FC<NoPlantProps> = ({ go }) => {
  return (
    <Screen
      title="No plant detected"
      description="We could not identify a plant in view. Try adjusting lighting or focus."
    >
      <Stack gap="lg">
        <Card title="Try these tips">
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            <li>Move closer so the plant fills most of the frame.</li>
            <li>Ensure good lighting and avoid backlighting.</li>
            <li>Hold still for a second while the reticle aligns.</li>
          </ul>
        </Card>
        <Stack gap="sm">
          <Button size="lg" onClick={() => go('scan-idle')}>
            Try Again
          </Button>
          <Button variant="secondary" onClick={() => go('poster')}>
            Learn More
          </Button>
        </Stack>
      </Stack>
    </Screen>
  );
};

export default NoPlant;
