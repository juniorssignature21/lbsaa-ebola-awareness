import {
  Check,
  Copy,
  Download,
  LoaderCircle,
  PencilLine,
  Plus,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import { POSTER_SIZES } from '../data/campaignContent';
import { BrandMarks } from './BrandLogo';
import { Modal } from './Modal';

interface ReadyDialogProps {
  open: boolean;
  busyAction: 'download' | 'share' | 'copy' | null;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
  onCopy: () => void;
  onEdit: () => void;
  onCreateAnother: () => void;
}

export function ReadyDialog({
  open,
  busyAction,
  onClose,
  onDownload,
  onShare,
  onCopy,
  onEdit,
  onCreateAnother,
}: ReadyDialogProps) {
  const busy = busyAction !== null;

  return (
    <Modal
      open={open}
      title="Your Ebola Awareness Poster Is Ready"
      eyebrow="Campaign poster complete"
      onClose={onClose}
      className="ready-dialog"
    >
      <div className="ready-dialog__art" aria-hidden="true">
        <span className="ready-dialog__halo" />
        <BrandMarks
          theme="blue"
          variant="emblem"
          className="ready-dialog__marks"
          logoClassName="ready-dialog__emblem"
          schoolLogoClassName="ready-dialog__emblem"
        />
        <span className="ready-dialog__check">
          <Check size={30} strokeWidth={3} />
        </span>
      </div>

      <p className="ready-dialog__lead">
        Your details, photograph and the reviewed public health guidance have
        been composed into a shareable LBSAA campaign poster.
      </p>

      <div className="ready-dialog__meta">
        <ShieldCheck size={16} aria-hidden="true" />
        <span>Complete poster · {POSTER_SIZES.portrait.dimensions} · PNG</span>
      </div>

      <div className="ready-dialog__actions">
        <button
          type="button"
          className="button button--primary button--large"
          onClick={onDownload}
          disabled={busy}
          data-autofocus
        >
          {busyAction === 'download' ? (
            <LoaderCircle size={18} className="spin" aria-hidden="true" />
          ) : (
            <Download size={18} aria-hidden="true" />
          )}
          {busyAction === 'download' ? 'Preparing PNG…' : 'Download PNG'}
        </button>
        <button
          type="button"
          className="button button--secondary button--large"
          onClick={onShare}
          disabled={busy}
        >
          {busyAction === 'share' ? (
            <LoaderCircle size={18} className="spin" aria-hidden="true" />
          ) : (
            <Share2 size={18} aria-hidden="true" />
          )}
          Share Poster
        </button>
        <button
          type="button"
          className="button button--ghost button--large"
          onClick={onCopy}
          disabled={busy}
        >
          {busyAction === 'copy' ? (
            <LoaderCircle size={18} className="spin" aria-hidden="true" />
          ) : (
            <Copy size={18} aria-hidden="true" />
          )}
          Copy Campaign Message
        </button>
      </div>

      <div className="ready-dialog__footer">
        <button type="button" className="text-button" onClick={onEdit}>
          <PencilLine size={15} aria-hidden="true" />
          Edit Poster
        </button>
        <span aria-hidden="true">·</span>
        <button type="button" className="text-button" onClick={onCreateAnother}>
          <Plus size={15} aria-hidden="true" />
          Create Another
        </button>
      </div>

      <p className="ready-dialog__note">
        Need a story or landscape version? Choose a format beside your poster
        preview, then download again.
      </p>
    </Modal>
  );
}
