import React from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import HStack from '../../layout/HStack';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import { AccessibilitySettings, Screen as ScreenType } from '../../lib/types';

const TEXT_SIZE_OPTIONS: AccessibilitySettings['textSize'][] = ['normal', 'large', 'xl'];

export type AccessibilitySetupProps = {
  /**
   * Current accessibility preferences.
   */
  accessibility: AccessibilitySettings;
  /**
   * Updates the full accessibility settings object.
   */
  setAccessibility: (settings: AccessibilitySettings) => void;
  /**
   * Partially updates accessibility settings.
   */
  updateAccessibility: (patch: Partial<AccessibilitySettings>) => void;
  /**
   * Navigates to the next onboarding screen.
   */
  go: (screen: ScreenType) => void;
};

/**
 * Collects accessibility preferences including text size and cognitive supports.
 */
const AccessibilitySetup: React.FC<AccessibilitySetupProps> = ({
  accessibility,
  updateAccessibility,
  go,
}) => {
  return (
    <Screen
      title="Choose your accessibility settings"
      description="Tune text size, contrast, motion, and narration to match learner needs. You can adjust these anytime in Settings."
    >
      <Stack gap="lg">
        <Card title="Text size" subtitle="Applies across the experience.">
          <HStack gap="sm" wrap>
            {TEXT_SIZE_OPTIONS.map((size) => {
              const isActive = accessibility.textSize === size;
              return (
                <Button
                  key={size}
                  variant={isActive ? 'primary' : 'secondary'}
                  onClick={() => updateAccessibility({ textSize: size })}
                >
                  {size === 'normal' ? 'Normal' : size === 'large' ? 'Large' : 'Extra Large'}
                </Button>
              );
            })}
          </HStack>
        </Card>

        <Card title="Support options">
          <Stack gap="sm">
            <label style={labelStyle}>
              <input
                type="checkbox"
                checked={accessibility.highContrast}
                onChange={(event) => updateAccessibility({ highContrast: event.target.checked })}
              />
              <span>High contrast colors</span>
            </label>
            <label style={labelStyle}>
              <input
                type="checkbox"
                checked={accessibility.reduceMotion}
                onChange={(event) => updateAccessibility({ reduceMotion: event.target.checked })}
              />
              <span>Reduce motion</span>
            </label>
            <label style={labelStyle}>
              <input
                type="checkbox"
                checked={accessibility.narration}
                onChange={(event) => updateAccessibility({ narration: event.target.checked })}
              />
              <span>Enable narration</span>
            </label>
          </Stack>
        </Card>

        <Button size="lg" fullWidth onClick={() => go('privacy')}>
          Continue
        </Button>
      </Stack>
    </Screen>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  padding: 'var(--space-2)',
  borderRadius: 'var(--radius-base)',
  background: 'var(--color-surface-muted)',
  cursor: 'pointer',
};

export default AccessibilitySetup;
