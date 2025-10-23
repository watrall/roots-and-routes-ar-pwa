import React, { useMemo, useState } from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import HStack from '../../layout/HStack';
import { PlantDetails, Screen as ScreenType } from '../../lib/types';

const STANDARDS = [
  'NGSS: MS-LS2-2',
  'NGSS: HS-LS4-3',
  'NGSS: HS-LS4-5',
  'NGSS: MS-PS1-2',
  'NGSS: HS-ESS3-1',
  'C3: D2.Geo/D2.His'
] as const;

export type JournalEntryProps = {
  /**
   * Latest scanned plant to prefill context.
   */
  plant: PlantDetails | null;
  /**
   * Persists a journal entry.
   */
  addJournalEntry: (entry: {
    id: string;
    plantName: string;
    route: 'cultural' | 'stem';
    notes: string;
    standards?: string[];
  }) => void;
  /**
   * Navigation callback.
   */
  go: (screen: ScreenType) => void;
};

const downloadCsv = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const JournalEntry: React.FC<JournalEntryProps> = ({ plant, addJournalEntry, go }) => {
  const [plantName, setPlantName] = useState<string>(plant?.commonName ?? plant?.name ?? '');
  const [route, setRoute] = useState<'cultural' | 'stem'>('cultural');
  const [notes, setNotes] = useState('');
  const [standards, setStandards] = useState<string[]>([]);

  const canSave = notes.trim().length > 0 && plantName.trim().length > 0;

  const csvContent = useMemo(() => {
    const header = ['Plant Name', 'Route', 'Notes', 'Standards'].join(',');
    const row = [
      `"${plantName.replace(/"/g, '""')}"`,
      route,
      `"${notes.replace(/"/g, '""')}"`,
      `"${standards.join('; ').replace(/"/g, '""')}"`
    ].join(',');
    return `${header}\n${row}`;
  }, [notes, plantName, route, standards]);

  const handleToggleStandard = (standard: string) => {
    setStandards((prev) =>
      prev.includes(standard) ? prev.filter((item) => item !== standard) : [...prev, standard]
    );
  };

  const handleSave = () => {
    if (!canSave) {
      return;
    }

    addJournalEntry({
      id: crypto.randomUUID(),
      plantName: plantName.trim(),
      route,
      notes: notes.trim(),
      standards: standards.length > 0 ? standards : undefined
    });
    go('journal-list');
  };

  const handleCsvExport = () => {
    if (!canSave) {
      return;
    }

    downloadCsv(csvContent, `${plantName || 'journal-entry'}.csv`);
  };

  return (
    <Screen
      title="Journal Entry"
      description="Document your observations, voice notes, and evidence of learning."
    >
      <Stack gap="lg">
        <Card title="Plant details">
          <Stack gap="sm">
            <label style={labelStyle}>
              <span>Plant name</span>
              <input
                type="text"
                value={plantName}
                onChange={(event) => setPlantName(event.target.value)}
                placeholder="e.g., Coffea arabica"
                style={inputStyle}
              />
            </label>

            <fieldset style={fieldsetStyle}>
              <legend>Route</legend>
              <HStack gap="sm" wrap>
                {(['cultural', 'stem'] as const).map((option) => (
                  <label key={option} style={chipLabelStyle(route === option)}>
                    <input
                      type="radio"
                      name="route"
                      value={option}
                      checked={route === option}
                      onChange={() => setRoute(option)}
                      style={{ display: 'none' }}
                    />
                    {option === 'cultural' ? 'Cultural' : 'STEM'}
                  </label>
                ))}
              </HStack>
            </fieldset>
          </Stack>
        </Card>

        <Card title="Notes" subtitle="Summarize what you observed, measured, or reflected upon.">
          <Stack gap="sm">
            <textarea
              rows={6}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Record observations, hypotheses, or learner reflections."
              style={{
                ...inputStyle,
                minHeight: '160px',
                resize: 'vertical'
              }}
            />
            <HStack gap="sm">
              <Button variant="outline">Voice Input (coming soon)</Button>
              <Button variant="outline">Add Photo</Button>
            </HStack>
          </Stack>
        </Card>

        <Card title="Standards alignment">
          <Stack gap="sm">
            {STANDARDS.map((standard) => {
              const active = standards.includes(standard);
              return (
                <label key={standard} style={chipLabelStyle(active)}>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => handleToggleStandard(standard)}
                    style={{ display: 'none' }}
                  />
                  {standard}
                </label>
              );
            })}
          </Stack>
        </Card>

        <HStack gap="sm">
          <Button variant="outline" onClick={() => go('journal-list')}>
            Cancel
          </Button>
          <Button variant="secondary" disabled={!canSave} onClick={handleCsvExport}>
            Export CSV
          </Button>
          <Button size="lg" disabled={!canSave} onClick={handleSave}>
            Save Entry
          </Button>
        </HStack>
      </Stack>
    </Screen>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-1)',
  fontWeight: 'var(--font-weight-medium)'
};

const fieldsetStyle: React.CSSProperties = {
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-base)',
  padding: 'var(--space-2)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-2)'
};

const chipLabelStyle = (active: boolean): React.CSSProperties => ({
  padding: 'var(--space-1) var(--space-2)',
  borderRadius: 'var(--radius-full)',
  border: active ? '1px solid var(--color-light-green)' : '1px solid var(--color-border)',
  background: active ? 'rgba(22, 139, 95, 0.12)' : 'transparent',
  color: active ? 'var(--color-light-green)' : 'var(--color-text-primary)',
  cursor: 'pointer'
});

const inputStyle: React.CSSProperties = {
  padding: 'var(--space-2)',
  borderRadius: 'var(--radius-base)',
  border: '1px solid var(--color-border)',
  font: 'inherit'
};

export default JournalEntry;
