import { describe, expect, test } from 'vitest';
import { Screen } from '../lib/types';

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
    'welcome',
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
  poster: ['home', 'scan-idle'],
};

describe('Screen transition map', () => {
  test('every target is a valid screen key', () => {
    const screens = Object.keys(ALLOWED_TRANSITIONS) as Screen[];
    const screenSet = new Set(screens);

    screens.forEach((screen) => {
      ALLOWED_TRANSITIONS[screen].forEach((target) => {
        expect(screenSet.has(target)).toBe(true);
      });
    });
  });
});
