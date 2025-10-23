import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type TabOption = {
  /**
   * Unique identifier for the tab.
   */
  id: 'cultural' | 'stem';
  /**
   * Display label for the tab.
   */
  label: string;
  /**
   * Optional helper text rendered below the label.
   */
  description?: string;
};

export type TabsProps = {
  /**
   * Available tabs rendered in the list.
   */
  tabs: TabOption[];
  /**
   * Currently selected tab id.
   */
  activeId: TabOption['id'];
  /**
   * Change handler fired when a new tab is selected.
   */
  onChange: (id: TabOption['id']) => void;
  /**
   * Renderer for the active tab panel content.
   */
  renderPanel?: (id: TabOption['id']) => React.ReactNode;
};

/**
 * Accessible tabs component tuned for the Cultural / STEM route selector.
 */
const Tabs: React.FC<TabsProps> = ({ tabs, activeId, onChange, renderPanel }) => {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [focusId, setFocusId] = useState<TabOption['id']>(activeId);

  useEffect(() => {
    setFocusId(activeId);
  }, [activeId]);

  const focusTab = useCallback((id: TabOption['id']) => {
    const ref = tabRefs.current[id];
    if (ref) {
      ref.focus();
      setFocusId(id);
    }
  }, []);

  const orderedTabs = useMemo(() => tabs, [tabs]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
        return;
      }

      event.preventDefault();
      const currentIndex = orderedTabs.findIndex((tab) => tab.id === focusId);
      if (currentIndex === -1) {
        return;
      }

      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (currentIndex + direction + orderedTabs.length) % orderedTabs.length;
      const nextTab = orderedTabs[nextIndex];
      focusTab(nextTab.id);
    },
    [focusId, orderedTabs, focusTab],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Learning route"
        onKeyDown={handleKeyDown}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${orderedTabs.length}, 1fr)`,
          gap: 'var(--space-2)',
          padding: 'var(--space-2)',
          background: 'var(--color-surface-muted)',
          borderRadius: 'calc(var(--radius-base) + 4px)',
        }}
      >
        {orderedTabs.map((tab) => {
          const isActive = tab.id === activeId;
          const isFocused = tab.id === focusId;

          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[tab.id] = node;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isFocused ? 0 : -1}
              onClick={() => onChange(tab.id)}
              style={{
                borderRadius: 'var(--radius-base)',
                border: isActive ? '2px solid var(--color-light-green)' : '1px solid transparent',
                background: isActive ? 'var(--color-surface-elevated)' : 'transparent',
                padding: 'var(--space-3) var(--space-2)',
                minHeight: '56px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
                alignItems: 'flex-start',
                justifyContent: 'center',
                fontWeight: isActive ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                color: 'var(--color-text-primary)',
                boxShadow: isActive ? 'var(--shadow-soft)' : 'none',
                transition: `background var(--transition-duration-fast) var(--transition-ease)`,
              }}
            >
              <span>{tab.label}</span>
              {tab.description && (
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  {tab.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {orderedTabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`tabpanel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeId}
          style={{ marginTop: 'var(--space-4)' }}
        >
          {tab.id === activeId && renderPanel?.(tab.id)}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
