/**
 * Available screens within the Roots & Routes AR experience.
 */
export type Screen =
  | 'welcome'
  | 'permissions'
  | 'accessibility'
  | 'privacy'
  | 'home'
  | 'scan-idle'
  | 'scan-detecting'
  | 'scan-detected'
  | 'cultural'
  | 'stem'
  | 'simulation'
  | 'journal-list'
  | 'journal-entry'
  | 'settings'
  | 'educator'
  | 'error-camera'
  | 'offline'
  | 'no-plant'
  | 'poster';

/**
 * Accessibility controls that tailor the experience to learner needs.
 */
export type AccessibilitySettings = {
  textSize: 'normal' | 'large' | 'xl';
  highContrast: boolean;
  reduceMotion: boolean;
  narration: boolean;
};

/**
 * Structured journal entry captured after plant exploration.
 */
export type JournalEntryType = {
  id: string;
  plantName: string;
  date: string;
  route: 'cultural' | 'stem';
  notes: string;
  photos?: string[];
  standards?: string[];
};
