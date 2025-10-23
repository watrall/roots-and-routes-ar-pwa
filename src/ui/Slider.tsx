import React, { useId } from 'react';

export type SliderProps = {
  /**
   * Visible label describing the slider's purpose.
   */
  label: string;
  /**
   * Current slider value (controlled).
   */
  value: number;
  /**
   * Minimum value in the range.
   */
  min: number;
  /**
   * Maximum value in the range.
   */
  max: number;
  /**
   * Step increment for adjustments.
   */
  step?: number;
  /**
   * Called when the slider value changes.
   */
  onChange: (value: number) => void;
  /**
   * Optional descriptive helper text.
   */
  description?: string;
  /**
   * Displayed alongside the current value.
   */
  valueFormatter?: (value: number) => string;
};

/**
 * Accessible slider input honoring the 44px touch target requirement.
 */
const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  description,
  valueFormatter,
}) => {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <label htmlFor={id} style={{ display: 'block' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-2)',
        }}
      >
        <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{label}</span>
        <span style={{ color: 'var(--color-text-secondary)' }}>
          {valueFormatter ? valueFormatter(value) : value}
        </span>
      </div>
      {description && (
        <p id={descriptionId} style={{ marginBottom: 'var(--space-2)' }}>
          {description}
        </p>
      )}
      <input
        id={id}
        type="range"
        role="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-describedby={descriptionId}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          width: '100%',
          accentColor: 'var(--color-light-green)',
          height: '44px',
        }}
      />
    </label>
  );
};

export default Slider;
