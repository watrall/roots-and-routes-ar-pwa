import React, { Dispatch, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AccessibilitySettings,
  JournalEntryType,
  Screen
} from './lib/types';
import {
  enableDarkMode,
  setTextScale,
  toggleHighContrast
} from './lib/theme';
import Welcome from './components/onboarding/Welcome';
import Permissions from './components/onboarding/Permissions';
import AccessibilitySetup from './components/onboarding/AccessibilitySetup';
import PrivacyStart from './components/onboarding/PrivacyStart';
import Home from './components/Home';
import ScreenLayout from './layout/Screen';
import Stack from './layout/Stack';
import Button from './ui/Button';

type ThemeMode = 'light' | 'dark';

type PlantDetails = {
  id: string;
  name: string;
  commonName?: string;
  family?: string;
  origin?: string;
  thumbnail?: string;
  culturalStory?: string;
  stemInfo?: string;
};

type ScreenContext = {
  go: (screen: Screen) => void;
  accessibility: AccessibilitySettings;
  setAccessibility: (settings: AccessibilitySettings) => void;
  updateAccessibility: (updates: Partial<AccessibilitySettings>) => void;
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  cameraGranted: boolean;
  setCameraGranted: (granted: boolean) => void;
  journal: JournalEntryType[];
  setJournal: Dispatch<React.SetStateAction<JournalEntryType[]>>;
  currentPlant: PlantDetails | null;
  setCurrentPlant: Dispatch<React.SetStateAction<PlantDetails | null>>;
};

type ScreenPlaceholderProps = {
  screen: Screen;
  description?: string;
  context: ScreenContext;
};

const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  textSize: 'normal',
  highContrast: false,
  reduceMotion: false,
  narration: false
};

const STORAGE_KEYS = {
  accessibility: 'rr_accessibility',
  theme: 'rr_theme',
  camera: 'rr_camera',
  journal: 'rr_journal'
} as const;

const ALLOWED_TRANSITIONS: Record<Screen, Screen[]> = {
  welcome: ['permissions', 'home'],
  permissions: ['accessibility', 'welcome', 'home', 'error-camera'],
  accessibility: ['privacy', 'home'],
  privacy: ['home'],
  home: [
    'scan-idle',
    'scan-detecting',
    'scan-detected',
    'cultural',
    'stem',
    'simulation',
    'journal-list',
    'journal-entry',
    'settings',
    'educator',
    'error-camera',
    'offline',
    'no-plant',
    'poster',
    'welcome'
  ],
  'scan-idle': ['scan-detecting', 'home', 'error-camera', 'no-plant'],
  'scan-detecting': ['scan-detected', 'scan-idle', 'home'],
  'scan-detected': ['cultural', 'stem', 'scan-idle', 'home'],
  cultural: ['stem', 'simulation', 'home', 'journal-entry', 'journal-list', 'scan-idle'],
  stem: ['cultural', 'simulation', 'home', 'journal-entry', 'journal-list', 'scan-idle'],
  simulation: ['home', 'journal-entry', 'journal-list', 'stem', 'cultural'],
  'journal-list': ['journal-entry', 'home'],
  'journal-entry': ['journal-list', 'home'],
  settings: ['home', 'welcome'],
  educator: ['home'],
  'error-camera': ['settings', 'home', 'permissions'],
  offline: ['home', 'journal-list', 'journal-entry'],
  'no-plant': ['scan-idle', 'home'],
  poster: ['home', 'scan-idle']
};

const SCREEN_HEADINGS: Record<Screen, string> = {
  welcome: 'Welcome',
  permissions: 'Camera Permissions',
  accessibility: 'Accessibility Setup',
  privacy: 'Privacy Overview',
  home: 'Home',
  'scan-idle': 'Ready to Scan',
  'scan-detecting': 'Scanning Plant',
  'scan-detected': 'Plant Identified',
  cultural: 'Cultural Route',
  stem: 'STEM Route',
  simulation: 'Climate Simulation',
  'journal-list': 'Journal Entries',
  'journal-entry': 'Journal Entry',
  settings: 'Settings',
  educator: 'Educator Dashboard',
  'error-camera': 'Camera Access Required',
  offline: 'Offline Mode',
  'no-plant': 'No Plant Detected',
  poster: 'Roots & Routes Poster'
};

const isAccessibilitySettings = (value: unknown): value is AccessibilitySettings => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<AccessibilitySettings>;
  const textSizes: AccessibilitySettings['textSize'][] = ['normal', 'large', 'xl'];

  return (
    textSizes.includes(candidate.textSize as AccessibilitySettings['textSize']) &&
    typeof candidate.highContrast === 'boolean' &&
    typeof candidate.reduceMotion === 'boolean' &&
    typeof candidate.narration === 'boolean'
  );
};

const isJournalEntry = (value: unknown): value is JournalEntryType => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<JournalEntryType>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.plantName === 'string' &&
    typeof candidate.date === 'string' &&
    (candidate.route === 'cultural' || candidate.route === 'stem') &&
    typeof candidate.notes === 'string'
  );
};

const isJournalEntryArray = (value: unknown): value is JournalEntryType[] =>
  Array.isArray(value) && value.every(isJournalEntry);

const ScreenPlaceholder: React.FC<ScreenPlaceholderProps> = ({ screen, description, context }) => {
  const allowedTargets = useMemo(() => ALLOWED_TRANSITIONS[screen] ?? [], [screen]);

  return (
    <ScreenLayout
      title={SCREEN_HEADINGS[screen]}
      description={
        description ??
        'This screen is under construction. Use the navigation buttons below to move through the flow.'
      }
    >
      <Stack gap="md">
        {allowedTargets.length > 0 && (
          <Stack gap="sm">
            <p style={{ margin: 0 }}>Available routes from this screen:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {allowedTargets.map((target) => (
                <Button
                  key={target}
                  variant="secondary"
                  onClick={() => context.go(target)}
                >
                  Go to {SCREEN_HEADINGS[target]}
                </Button>
              ))}
            </div>
          </Stack>
        )}
      </Stack>
    </ScreenLayout>
  );
};

/**
 * Root application component controlling navigation, persistence, and accessibility state.
 */
const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(
    DEFAULT_ACCESSIBILITY
  );
  const [cameraGranted, setCameraGranted] = useState<boolean>(false);
  const [journal, setJournal] = useState<JournalEntryType[]>([]);
  const [currentPlant, setCurrentPlant] = useState<PlantDetails | null>(null);
  const [theme, setTheme] = useState<ThemeMode>('light');

  const setAccessibilityState = useCallback((settings: AccessibilitySettings) => {
    setAccessibility(settings);
  }, []);

  const updateAccessibility = useCallback((updates: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => ({
      ...prev,
      ...updates
    }));
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setTheme(mode);
  }, []);

  const setCameraPermission = useCallback((granted: boolean) => {
    setCameraGranted(granted);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const storedAccessibility = localStorage.getItem(STORAGE_KEYS.accessibility);
      if (storedAccessibility) {
        const parsed = JSON.parse(storedAccessibility);
        if (isAccessibilitySettings(parsed)) {
          setAccessibility(parsed);
        }
      }

      const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);
      if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
      }

      const storedCamera = localStorage.getItem(STORAGE_KEYS.camera);
      if (storedCamera === 'true' || storedCamera === 'false') {
        setCameraGranted(storedCamera === 'true');
      }

      const storedJournal = localStorage.getItem(STORAGE_KEYS.journal);
      if (storedJournal) {
        const parsedJournal = JSON.parse(storedJournal);
        if (isJournalEntryArray(parsedJournal)) {
          setJournal(parsedJournal);
        }
      }
    } catch (error) {
      console.error('Failed to restore persisted state', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.accessibility, JSON.stringify(accessibility));
    } catch (error) {
      console.error('Failed to persist accessibility settings', error);
    }
  }, [accessibility]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch (error) {
      console.error('Failed to persist theme selection', error);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.camera, cameraGranted ? 'true' : 'false');
    } catch (error) {
      console.error('Failed to persist camera permission state', error);
    }
  }, [cameraGranted]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.journal, JSON.stringify(journal));
    } catch (error) {
      console.error('Failed to persist journal entries', error);
    }
  }, [journal]);

  useEffect(() => {
    setTextScale(accessibility.textSize);
  }, [accessibility.textSize]);

  useEffect(() => {
    toggleHighContrast(accessibility.highContrast);
  }, [accessibility.highContrast]);

  useEffect(() => {
    enableDarkMode(theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const heading = document.querySelector('[data-screen-heading]') as HTMLElement | null;
      heading?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentScreen]);

  const go = useCallback(
    (to: Screen): void => {
      setCurrentScreen((prev) => {
        if (prev === to) {
          return prev;
        }

        const allowed = ALLOWED_TRANSITIONS[prev] ?? [];
        if (allowed.includes(to)) {
          return to;
        }

        console.error(`Navigation from ${prev} to ${to} is not permitted.`);
        return prev;
      });
    },
    []
  );

  const screenContext = useMemo<ScreenContext>(
    () => ({
      go,
      accessibility,
      setAccessibility: setAccessibilityState,
      updateAccessibility,
      theme,
      setTheme: setThemeMode,
      cameraGranted,
      setCameraGranted: setCameraPermission,
      journal,
      setJournal,
      currentPlant,
      setCurrentPlant
    }),
    [
      go,
      accessibility,
      setAccessibilityState,
      updateAccessibility,
      theme,
      setThemeMode,
      cameraGranted,
      setCameraPermission,
      journal,
      setJournal,
      currentPlant,
      setCurrentPlant
    ]
  );

  const renderScreen = useCallback(
    (screen: Screen): React.ReactNode => {
      switch (screen) {
        case 'welcome':
          return <Welcome go={go} />;
        case 'permissions':
          return (
            <Permissions
              go={go}
              setCameraGranted={setCameraPermission}
            />
          );
        case 'accessibility':
          return (
            <AccessibilitySetup
              accessibility={accessibility}
              setAccessibility={setAccessibilityState}
              updateAccessibility={updateAccessibility}
              go={go}
            />
          );
        case 'privacy':
          return <PrivacyStart go={go} />;
        case 'home':
          return (
            <Home
              go={go}
              accessibility={accessibility}
              updateAccessibility={updateAccessibility}
              theme={theme}
              setTheme={setThemeMode}
            />
          );
        default:
          return (
            <ScreenPlaceholder
              screen={screen}
              context={screenContext}
            />
          );
      }
    },
    [
      accessibility,
      go,
      theme,
      screenContext,
      setAccessibilityState,
      updateAccessibility,
      setCameraPermission,
      setThemeMode
    ]
  );

  const currentView = renderScreen(currentScreen);

  return (
    <>
      {currentView}
      {import.meta.env.DEV && (
        <aside
          style={{
            position: 'fixed',
            right: 'var(--space-3)',
            bottom: 'var(--space-3)',
            width: 'min(360px, 90vw)',
            background: 'var(--color-surface-elevated)',
            borderRadius: 'var(--radius-base)',
            boxShadow: 'var(--shadow-card)',
            padding: 'var(--space-3)',
            fontSize: '0.85rem',
            maxHeight: '50vh',
            overflow: 'auto',
            border: '1px solid var(--color-border)'
          }}
        >
          <strong>Debug State</strong>
          <pre
            style={{
              margin: 'var(--space-2) 0 0',
              whiteSpace: 'pre-wrap'
            }}
          >
            {JSON.stringify(
              {
                currentScreen,
                accessibility,
                cameraGranted,
                theme,
                journalCount: journal.length,
                hasCurrentPlant: Boolean(currentPlant)
              },
              null,
              2
            )}
          </pre>
        </aside>
      )}
    </>
  );
};

export default App;
