import {
  Copy,
  Download,
  ImageDown,
  LoaderCircle,
  PencilLine,
  Share2,
} from 'lucide-react';
import { POSTER_SIZES } from '../data/campaignContent';
import type { PosterFormat } from '../types/campaign';

type BusyAction = 'download' | 'share' | 'copy' | null;

interface ExportControlsProps {
  format: PosterFormat;
  busyAction: BusyAction;
  busyFormat?: PosterFormat | null;
  onDownload: (format: PosterFormat) => void;
  onShare: () => void;
  onCopy: () => void;
  onEdit: () => void;
}

export function ExportControls({
  format,
  busyAction,
  busyFormat,
  onDownload,
  onShare,
  onCopy,
  onEdit,
}: ExportControlsProps) {
  const currentSize = POSTER_SIZES[format];
  const busy = busyAction !== null;
  const downloadingCurrent =
    busyAction === 'download' && busyFormat === format;

  return (
    <div className="export-controls">
      <div className="export-controls__heading">
        <div>
          <h2>Download &amp; share</h2>
          <p>High-resolution PNG, generated in your browser.</p>
        </div>
        <button type="button" className="text-button" onClick={onEdit}>
          <PencilLine size={14} aria-hidden="true" />
          Edit Details
        </button>
      </div>

      <div className="export-controls__primary">
        <button
          type="button"
          className="button button--primary"
          onClick={() => onDownload(format)}
          disabled={busy}
          aria-label={`Download Poster (PNG), ${currentSize.label}, ${currentSize.dimensions}`}
        >
          {downloadingCurrent ? (
            <LoaderCircle size={17} className="spin" aria-hidden="true" />
          ) : (
            <Download size={17} aria-hidden="true" />
          )}
          {downloadingCurrent ? 'Preparing PNG…' : 'Download Poster (PNG)'}
        </button>
        <button
          type="button"
          className="button button--secondary"
          onClick={onShare}
          disabled={busy}
        >
          {busyAction === 'share' ? (
            <LoaderCircle size={17} className="spin" aria-hidden="true" />
          ) : (
            <Share2 size={17} aria-hidden="true" />
          )}
          {busyAction === 'share' ? 'Opening share…' : 'Share Poster'}
        </button>
        <button
          type="button"
          className="button button--ghost"
          onClick={onCopy}
          disabled={busy}
        >
          {busyAction === 'copy' ? (
            <LoaderCircle size={17} className="spin" aria-hidden="true" />
          ) : (
            <Copy size={17} aria-hidden="true" />
          )}
          {busyAction === 'copy' ? 'Copying…' : 'Copy Campaign Message'}
        </button>
      </div>

      <div className="export-controls__formats">
        <span className="export-controls__formats-label">Other formats</span>
        <button
          type="button"
          className="format-download"
          onClick={() => onDownload('story')}
          disabled={busy}
          aria-label={`Download Story Version (PNG), ${POSTER_SIZES.story.dimensions}`}
        >
          {busyAction === 'download' && busyFormat === 'story' ? (
            <LoaderCircle size={15} className="spin" aria-hidden="true" />
          ) : (
            <ImageDown size={15} aria-hidden="true" />
          )}
          <span>
            <strong>Download Story Version</strong>
            <small>{POSTER_SIZES.story.dimensions}</small>
          </span>
        </button>
        <button
          type="button"
          className="format-download"
          onClick={() => onDownload('landscape')}
          disabled={busy}
          aria-label={`Download Landscape Version (PNG), ${POSTER_SIZES.landscape.dimensions}`}
        >
          {busyAction === 'download' && busyFormat === 'landscape' ? (
            <LoaderCircle size={15} className="spin" aria-hidden="true" />
          ) : (
            <ImageDown size={15} aria-hidden="true" />
          )}
          <span>
            <strong>Download Landscape Version</strong>
            <small>{POSTER_SIZES.landscape.dimensions}</small>
          </span>
        </button>
      </div>

      <p className="export-controls__note">
        {currentSize.label} PNG · {currentSize.dimensions} · optimized for{' '}
        {currentSize.description}. Exports include the complete poster only.
      </p>
    </div>
  );
}
