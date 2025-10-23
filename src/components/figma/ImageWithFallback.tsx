import React, { useState } from 'react';

export type ImageWithFallbackProps = {
  /**
   * Primary image source.
   */
  src: string;
  /**
   * Alternative text describing the image.
   */
  alt: string;
  /**
   * Fallback image used when the primary source fails.
   */
  fallbackSrc: string;
  /**
   * Optional class name for styling hooks.
   */
  className?: string;
  /**
   * Optional aspect ratio styling (`e.g. 16/9`).
   */
  aspectRatio?: string;
};

/**
 * Displays an image with graceful fallback support.
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc,
  className,
  aspectRatio,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <figure
      className={className}
      style={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: 'var(--radius-base)',
        background: 'var(--color-surface-muted)',
        aspectRatio,
      }}
    >
      <img
        src={currentSrc}
        alt={alt}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          }
        }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </figure>
  );
};

export default ImageWithFallback;
