const TEXT_SCALE_MAP: Record<'normal' | 'large' | 'xl', string> = {
  normal: '1',
  large: '1.15',
  xl: '1.3',
};

const DEFAULT_TEXT_SCALE = 'normal';

const resolveRoot = (root?: HTMLElement): HTMLElement | null => {
  if (root) {
    return root;
  }

  if (typeof document !== 'undefined') {
    return document.documentElement;
  }

  return null;
};

/**
 * Applies the base (light) theme tokens to the provided root element.
 * @param root Optional root element; defaults to `document.documentElement` when available.
 */
export const applyTheme = (root?: HTMLElement): void => {
  const target = resolveRoot(root);

  if (!target) {
    return;
  }

  target.classList.remove('dark');
  target.classList.remove('hc');
  target.style.setProperty('--text-scale', TEXT_SCALE_MAP[DEFAULT_TEXT_SCALE]);
};

/**
 * Enables or disables dark mode by toggling the `.dark` class on the root element.
 * @param enabled When true, dark mode styles are activated.
 * @param root Optional root element; defaults to `document.documentElement` when available.
 */
export const enableDarkMode = (enabled: boolean, root?: HTMLElement): void => {
  const target = resolveRoot(root);

  if (!target) {
    return;
  }

  target.classList.toggle('dark', enabled);
};

/**
 * Adjusts the root font-size multiplier to support accessibility text scaling.
 * @param size Desired text size scale.
 * @param root Optional root element; defaults to `document.documentElement` when available.
 */
export const setTextScale = (size: 'normal' | 'large' | 'xl', root?: HTMLElement): void => {
  const target = resolveRoot(root);

  if (!target) {
    return;
  }

  const scale = TEXT_SCALE_MAP[size] ?? TEXT_SCALE_MAP.normal;
  target.style.setProperty('--text-scale', scale);
};

/**
 * Toggles the high-contrast mode to enhance contrast-sensitive UI regions.
 * @param enabled When true, adds the `.hc` class to the root element.
 * @param root Optional root element; defaults to `document.documentElement` when available.
 */
export const toggleHighContrast = (enabled: boolean, root?: HTMLElement): void => {
  const target = resolveRoot(root);

  if (!target) {
    return;
  }

  target.classList.toggle('hc', enabled);
};
