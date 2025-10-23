import React from 'react';

export type IconName =
  | 'leaf'
  | 'camera'
  | 'journal'
  | 'settings'
  | 'educator'
  | 'home'
  | 'scan'
  | 'warning';

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  leaf: (
    <path
      d="M20 4c-6 0-12 5-12 12 0 5 4 8 7 8 4 0 9-5 9-11 0-4-2-7-4-9zM9 16c0-4 4-8 8-8 2 2 3 4 3 6 0 4-3 7-5 7-2 0-6-2-6-5z"
      fill="currentColor"
    />
  ),
  camera: (
    <path
      d="M21 7h-3.2l-1.2-1.8c-.3-.5-.9-.8-1.5-.8h-5c-.6 0-1.2.3-1.5.8L6.4 7H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-9 12c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"
      fill="currentColor"
    />
  ),
  journal: (
    <path
      d="M18 3H7a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h11a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-1 14H8a1 1 0 1 1 0-2h9v2zm0-4H8a1 1 0 1 1 0-2h9v2zm0-4H8a1 1 0 1 1 0-2h9v2z"
      fill="currentColor"
    />
  ),
  settings: (
    <path
      d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm9.4 3.3-1.6-.4a7.6 7.6 0 0 0-.6-1.6l.9-1.3a1 1 0 0 0-.1-1.2l-1.6-1.6a1 1 0 0 0-1.2-.1l-1.3.9a7.6 7.6 0 0 0-1.6-.6l-.4-1.6A1 1 0 0 0 12 3h-2a1 1 0 0 0-1 .7l-.4 1.6a7.6 7.6 0 0 0-1.6.6l-1.3-.9a1 1 0 0 0-1.2.1L3 6.1a1 1 0 0 0-.1 1.2l.9 1.3c-.3.5-.5 1-.6 1.6l-1.6.4A1 1 0 0 0 1 12v2c0 .5.3.9.7 1l1.6.4c.1.6.3 1.1.6 1.6l-.9 1.3a1 1 0 0 0 .1 1.2l1.6 1.6c.3.3.8.4 1.2.1l1.3-.9c.5.3 1 .5 1.6.6l.4 1.6c.1.4.5.7 1 .7h2c.5 0 .9-.3 1-.7l.4-1.6c.6-.1 1.1-.3 1.6-.6l1.3.9c.4.3.9.2 1.2-.1l1.6-1.6c.3-.3.4-.8.1-1.2l-.9-1.3c.3-.5.5-1 .6-1.6l1.6-.4c.4-.1.7-.5.7-1v-2c0-.5-.3-.9-.6-1z"
      fill="currentColor"
    />
  ),
  educator: (
    <path
      d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-7 8v-1c0-2.2 2.7-4 7-4s7 1.8 7 4v1z"
      fill="currentColor"
    />
  ),
  home: (
    <path
      d="M20 19h-4v-5h-4v5H8a1 1 0 0 1-1-1v-7H5l7-6 7 6h-2v7a1 1 0 0 1-1 1z"
      fill="currentColor"
    />
  ),
  scan: (
    <path
      d="M7 5h3V3H6a2 2 0 0 0-2 2v4h2zm10-2h-4v2h3v4h2V5a2 2 0 0 0-2-2zm0 16h-3v2h4a2 2 0 0 0 2-2v-4h-2zm-10 2v-2H5v-4H3v4a2 2 0 0 0 2 2z"
      fill="currentColor"
    />
  ),
  warning: (
    <path
      d="M11 5.1 3.5 18a1 1 0 0 0 .9 1.5h13.2a1 1 0 0 0 .9-1.5L11 5.1zm1 11.9h-2v-2h2zm0-4h-2V11h2z"
      fill="currentColor"
    />
  )
};

export type IconProps = {
  /**
   * Name of the icon to render.
   */
  name: IconName;
  /**
   * Accessible label announced to screen readers.
   */
  label?: string;
  /**
   * Optional visual size (default 24px).
   */
  size?: number;
  /**
   * Additional class name for styling hooks.
   */
  className?: string;
};

/**
 * Inline SVG icon wrapper that maps semantic names to vector paths.
 */
const Icon: React.FC<IconProps> = ({ name, label, size = 24, className }) => {
  const path = ICON_PATHS[name];

  return (
    <svg
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ color: 'currentColor', flexShrink: 0 }}
    >
      {path}
    </svg>
  );
};

export default Icon;
