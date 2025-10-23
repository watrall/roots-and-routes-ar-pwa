import React from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { Screen as ScreenType } from '../../lib/types';

export type OfflineProps = {
  go: (screen: ScreenType) => void;
  retry: () => void;
};

const Offline: React.FC<OfflineProps> = ({ go, retry }) => {
  return (
    <Screen
      title="You are offline"
      description="Roots & Routes AR works offline for journaling and review. Some scans require a connection."
    >
      <Stack gap="lg">
        <Card title="Offline tips">
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            <li>Journal entries save locally and sync when you reconnect.</li>
            <li>Use cultural and STEM routes with previously scanned plants.</li>
            <li>Reconnect before launching new AR scans.</li>
          </ul>
        </Card>
        <Stack gap="sm">
          <Button size="lg" onClick={retry}>
            Retry Connection
          </Button>
          <Button variant="secondary" onClick={() => go('journal-entry')}>
            Capture an offline entry
          </Button>
        </Stack>
      </Stack>
    </Screen>
  );
};

export default Offline;
