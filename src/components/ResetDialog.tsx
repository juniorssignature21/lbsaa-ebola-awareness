import { RotateCcw } from 'lucide-react';
import { Modal } from './Modal';

interface ResetDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ResetDialog({ open, onCancel, onConfirm }: ResetDialogProps) {
  return (
    <Modal
      open={open}
      title="Clear this poster?"
      eyebrow="Start fresh"
      onClose={onCancel}
      className="confirm-dialog"
    >
      <div className="confirm-dialog__body">
        <span className="confirm-dialog__icon" aria-hidden="true">
          <RotateCcw size={24} />
        </span>
        <p>
          This will clear your details, contact information and photograph, and
          reset the poster style. Your saved draft will also be removed. This
          cannot be undone.
        </p>
      </div>
      <div className="confirm-dialog__actions">
        <button
          type="button"
          className="button button--secondary"
          onClick={onCancel}
          data-autofocus
        >
          Keep my details
        </button>
        <button
          type="button"
          className="button button--danger"
          onClick={onConfirm}
        >
          <RotateCcw size={16} aria-hidden="true" />
          Clear and start over
        </button>
      </div>
    </Modal>
  );
}
