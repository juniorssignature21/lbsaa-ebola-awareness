import { useLayoutEffect, useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { POSTER_SIZES } from '../data/campaignContent';
import type {
  PosterContent,
  PosterFormat,
  PosterTemplate,
} from '../types/campaign';
import { PosterCanvas } from './posters/PosterCanvas';

interface PosterPreviewProps {
  content: PosterContent;
  template: PosterTemplate;
  format: PosterFormat;
  onExpand?: () => void;
  className?: string;
}

export function PosterPreview({
  content,
  template,
  format,
  onExpand,
  className = '',
}: PosterPreviewProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.32);
  const size = POSTER_SIZES[format];

  useLayoutEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const updateScale = () => {
      const width = element.getBoundingClientRect().width;
      if (width > 0) setScale(width / size.width);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(element);
    return () => observer.disconnect();
  }, [size.width]);

  return (
    <div className={`poster-preview ${className}`.trim()}>
      <div
        ref={viewportRef}
        className="poster-preview__viewport"
        style={{ aspectRatio: `${size.width} / ${size.height}` }}
      >
        <div
          className="poster-preview__scaler"
          style={{
            width: size.width,
            height: size.height,
            transform: `scale(${scale})`,
          }}
        >
          <PosterCanvas content={content} template={template} format={format} />
        </div>
      </div>
      <div className="poster-preview__meta">
        <span>{POSTER_SIZES[format].dimensions}</span>
        <span className="poster-preview__ratio">
          {format === 'portrait' ? '4:5' : format === 'story' ? '9:16' : '40:21'}
        </span>
        {onExpand ? (
          <button type="button" className="poster-preview__expand" onClick={onExpand}>
            <Maximize2 size={14} aria-hidden="true" />
            Expand preview
          </button>
        ) : null}
      </div>
    </div>
  );
}
