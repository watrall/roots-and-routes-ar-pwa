import React from 'react';
import Screen from '../layout/Screen';
import Stack from '../layout/Stack';
import HStack from '../layout/HStack';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { JournalEntryType, Screen as ScreenType } from '../lib/types';

export type EducatorDashboardProps = {
  journal: JournalEntryType[];
  go: (screen: ScreenType) => void;
};

const EducatorDashboard: React.FC<EducatorDashboardProps> = ({ journal, go }) => {
  return (
    <Screen
      title="Educator Dashboard"
      description="Monitor class progress, review journal entries, and export reports."
    >
      <Stack gap="lg">
        <HStack gap="md" wrap>
          <Card title="Active Learners" subtitle="Based on device sessions">
            <strong style={{ fontSize: '2rem' }}>{Math.max(1, journal.length)}</strong>
          </Card>
          <Card title="Entries this week" subtitle="Across cultural & STEM routes">
            <strong style={{ fontSize: '2rem' }}>{journal.length}</strong>
          </Card>
          <Card title="Standards touched" subtitle="Unique codes">
            <strong style={{ fontSize: '2rem' }}>{countStandards(journal)}</strong>
          </Card>
        </HStack>

        <Card title="Engagement heatmap">
          <div style={heatmapStyle} aria-hidden>
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} style={{ ...heatmapCellStyle, opacity: 0.3 + (index % 4) * 0.2 }} />
            ))}
          </div>
          <p style={{ marginTop: 'var(--space-2)' }}>
            Heatmap shows relative journal activity by week. Export detailed analytics to CSV or PDF
            for further analysis.
          </p>
          <HStack gap="sm">
            <Button variant="secondary">Export CSV</Button>
            <Button variant="secondary">Export PDF</Button>
          </HStack>
        </Card>

        <Card title="Recent entries">
          <Stack gap="sm">
            {journal
              .slice(-5)
              .reverse()
              .map((entry) => (
                <div key={entry.id} style={recentRowStyle}>
                  <div>
                    <strong>{entry.plantName}</strong>
                    <p style={{ margin: 0 }}>{new Date(entry.date).toLocaleString()}</p>
                  </div>
                  <Button variant="outline" onClick={() => go('journal-entry')}>
                    View
                  </Button>
                </div>
              ))}

            {journal.length === 0 && (
              <p>No entries yet. Encourage learners to capture their findings.</p>
            )}
          </Stack>
        </Card>
      </Stack>
    </Screen>
  );
};

const heatmapStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 40px)',
  gap: 'var(--space-2)',
};

const heatmapCellStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 'var(--radius-base)',
  background: 'var(--color-light-green)',
};

const recentRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 'var(--space-2)',
  borderRadius: 'var(--radius-base)',
  background: 'rgba(11, 61, 50, 0.08)',
};

const countStandards = (entries: JournalEntryType[]): number => {
  const set = new Set<string>();
  entries.forEach((entry) => entry.standards?.forEach((s) => set.add(s)));
  return set.size;
};

export default EducatorDashboard;
