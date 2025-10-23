import React, { useMemo, useState } from 'react';
import Screen from '../layout/Screen';
import Stack from '../layout/Stack';
import Card from '../ui/Card';
import Slider from '../ui/Slider';
import Button from '../ui/Button';
import HStack from '../layout/HStack';
import { PlantDetails, Screen as ScreenType } from '../lib/types';

const formatTemperature = (value: number): string =>
  `${value >= 0 ? '+' : ''}${value.toFixed(1)}°C`;
const formatRainfall = (value: number): string => `${value >= 0 ? '+' : ''}${value.toFixed(0)}%`;

export type TimeShiftSimulationProps = {
  /**
   * Current plant context for journal prefill.
   */
  plant: PlantDetails | null;
  /**
   * Navigation helper.
   */
  go: (screen: ScreenType) => void;
  /**
   * Appends a journal entry and persists it.
   */
  addJournalEntry: (entry: {
    id: string;
    plantName: string;
    route: 'cultural' | 'stem';
    notes: string;
    standards?: string[];
  }) => void;
};

const determineGaugeColor = (yieldScore: number): string => {
  if (yieldScore >= 75) return 'var(--color-light-green)';
  if (yieldScore >= 50) return 'var(--color-accent-gold)';
  return 'var(--color-error)';
};

/**
 * Climate time-shift simulation allowing learners to adjust environmental variables.
 */
const TimeShiftSimulation: React.FC<TimeShiftSimulationProps> = ({
  plant,
  go,
  addJournalEntry,
}) => {
  const [temperature, setTemperature] = useState(0);
  const [rainfall, setRainfall] = useState(0);
  const [observation, setObservation] = useState('');

  const yieldEstimate = useMemo(() => {
    const tempScore = 100 - Math.abs(temperature) * 8;
    const rainScore = 100 - Math.abs(rainfall) * 1.5;
    return Math.max(0, Math.min(100, (tempScore + rainScore) / 2));
  }, [temperature, rainfall]);

  const gaugeColor = determineGaugeColor(yieldEstimate);

  const handleReset = () => {
    setTemperature(0);
    setRainfall(0);
    setObservation('');
  };

  const handleRecordObservation = () => {
    if (!plant) {
      go('journal-entry');
      return;
    }

    addJournalEntry({
      id: crypto.randomUUID(),
      plantName: plant.commonName ?? plant.name,
      route: 'stem',
      notes: observation.trim() || `Yield estimate: ${yieldEstimate.toFixed(0)}%.`,
      standards: ['MS-LS2-2', 'HS-LS4-3'],
    });
    go('journal-entry');
  };

  return (
    <Screen
      title="Climate Simulation"
      description="Adjust temperature and rainfall to see how projected yield responds. Capture observations for your journal."
    >
      <Stack gap="lg">
        <Card subtitle={`Current yield estimate: ${yieldEstimate.toFixed(0)}%`}>
          <div style={{ display: 'grid', placeItems: 'center', padding: 'var(--space-4)' }}>
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              role="img"
              aria-label={`Yield estimate ${yieldEstimate.toFixed(0)} percent`}
            >
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="transparent"
                stroke="rgba(5, 40, 33, 0.1)"
                strokeWidth="16"
              />
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="transparent"
                stroke={gaugeColor}
                strokeWidth="16"
                strokeDasharray={`${yieldEstimate * 5.53} 1000`}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              />
              <text
                x="100"
                y="108"
                textAnchor="middle"
                fontSize="32"
                fontWeight="700"
                fill="var(--color-text-primary)"
              >
                {yieldEstimate.toFixed(0)}%
              </text>
              <text
                x="100"
                y="138"
                textAnchor="middle"
                fontSize="14"
                fill="var(--color-text-secondary)"
              >
                projected yield
              </text>
            </svg>
          </div>
        </Card>

        <Card title="Climate controls">
          <Stack gap="md">
            <Slider
              label="Temperature shift"
              value={temperature}
              min={-5}
              max={5}
              step={0.5}
              onChange={setTemperature}
              description="Adjust temperature relative to current average."
              valueFormatter={formatTemperature}
            />
            <Slider
              label="Rainfall change"
              value={rainfall}
              min={-50}
              max={50}
              step={5}
              onChange={setRainfall}
              description="Adjust rainfall as a percentage of current average."
              valueFormatter={formatRainfall}
            />
          </Stack>
        </Card>

        <Card title="Observation">
          <Stack gap="sm">
            <textarea
              value={observation}
              onChange={(event) => setObservation(event.target.value)}
              rows={4}
              placeholder="Describe how the plant responds to the new climate conditions."
              style={{
                width: '100%',
                minHeight: '120px',
                padding: 'var(--space-2)',
                borderRadius: 'var(--radius-base)',
                border: '1px solid var(--color-border)',
                resize: 'vertical',
              }}
            />
            <HStack gap="sm" wrap>
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button size="lg" disabled={!observation.trim()} onClick={handleRecordObservation}>
                Record Observation
              </Button>
            </HStack>
          </Stack>
        </Card>
      </Stack>
    </Screen>
  );
};

export default TimeShiftSimulation;
