import { forwardRef } from 'react';
import { POSTER_SIZES } from '../../data/campaignContent';
import type {
  PosterContent,
  PosterFormat,
  PosterTemplate,
} from '../../types/campaign';
import { OfficialTemplate } from './OfficialTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';

interface PosterCanvasProps {
  content: PosterContent;
  template: PosterTemplate;
  format: PosterFormat;
}

export const PosterCanvas = forwardRef<HTMLDivElement, PosterCanvasProps>(
  function PosterCanvas({ content, template, format }, ref) {
    const size = POSTER_SIZES[format];

    return (
      <div
        ref={ref}
        className="poster-canvas"
        style={{ width: size.width, height: size.height }}
        data-template={template}
        data-format={format}
        aria-label={`LBSAA Ebola awareness poster, ${size.label} format`}
      >
        {template === 'official' ? (
          <OfficialTemplate content={content} format={format} />
        ) : null}
        {template === 'modern' ? (
          <ModernTemplate content={content} format={format} />
        ) : null}
        {template === 'minimal' ? (
          <MinimalTemplate content={content} format={format} />
        ) : null}
      </div>
    );
  },
);
