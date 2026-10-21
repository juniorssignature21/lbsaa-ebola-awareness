import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type PointerEvent,
} from 'react';
import {
  ImagePlus,
  LoaderCircle,
  Move,
  MoveHorizontal,
  MoveVertical,
  RotateCcw,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import { PHOTO_RULES } from '../data/campaignContent';
import { SAMPLE_PHOTO } from '../data/sampleMember';
import type { PhotoState } from '../types/campaign';
import { clampPosition, preparePhoto } from '../utils/image';

interface PhotoUploaderProps {
  photo: PhotoState | null;
  onPhotoChange: (photo: PhotoState | null) => void;
  onPositionChange: (x: number, y: number) => void;
  onUseSample?: () => void;
}

export function PhotoUploader({
  photo,
  onPhotoChange,
  onPositionChange,
  onUseSample,
}: PhotoUploaderProps) {
  const inputId = useId();
  const positionXId = useId();
  const positionYId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    x: number;
    y: number;
    posX: number;
    posY: number;
    width: number;
    height: number;
  } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setProcessing(true);
    try {
      const prepared = await preparePhoto(file);
      onPhotoChange(prepared);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : 'That image could not be prepared. Please try another photo.',
      );
    } finally {
      setProcessing(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    void handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files?.length) {
      void handleFile(event.dataTransfer.files[0]);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!photo || !previewRef.current) return;
    const bounds = previewRef.current.getBoundingClientRect();
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      posX: photo.positionX,
      posY: photo.positionY,
      width: bounds.width,
      height: bounds.height,
    };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const nextX = drag.posX - ((event.clientX - drag.x) / drag.width) * 100;
    const nextY = drag.posY - ((event.clientY - drag.y) / drag.height) * 100;
    onPositionChange(clampPosition(nextX), clampPosition(nextY));
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="photo-uploader">
      <div className="field-label-row">
        <span className="field-label">Photograph</span>
        <span className="field-optional">Optional</span>
      </div>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        className="visually-hidden"
        onChange={handleInput}
        aria-describedby={`${inputId}-help${error ? ` ${inputId}-error` : ''}`}
      />

      {photo ? (
        <div className="photo-editor">
          <div
            ref={previewRef}
            className={`photo-editor__preview${dragging ? ' is-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
          >
            <img
              src={photo.src}
              alt="Your uploaded campaign photograph preview"
              draggable={false}
              style={{
                objectPosition: `${photo.positionX}% ${photo.positionY}%`,
              }}
            />
            <span className="photo-editor__drag-hint">
              <Move size={14} aria-hidden="true" />
              Drag to reposition
            </span>
          </div>

          <div className="photo-editor__toolbar">
            <div className="photo-editor__file">
              <ImagePlus size={15} aria-hidden="true" />
              <span title={photo.name}>{photo.name}</span>
              <small>
                {photo.width} × {photo.height}
              </small>
            </div>
            <div className="photo-editor__buttons">
              <button
                type="button"
                className="button button--ghost button--tiny"
                onClick={() => inputRef.current?.click()}
              >
                <UploadCloud size={14} aria-hidden="true" />
                Replace
              </button>
              <button
                type="button"
                className="button button--ghost button--tiny button--danger-ghost"
                onClick={() => {
                  onPhotoChange(null);
                  setError(null);
                }}
              >
                <Trash2 size={14} aria-hidden="true" />
                Remove
              </button>
            </div>
          </div>

          <div className="position-controls">
            <div className="position-controls__heading">
              <span>Position in poster</span>
              <button
                type="button"
                className="text-button"
                onClick={() => onPositionChange(50, 35)}
              >
                <RotateCcw size={13} aria-hidden="true" />
                Reset position
              </button>
            </div>
            <div className="position-control">
              <label htmlFor={positionXId}>
                <MoveHorizontal size={15} aria-hidden="true" />
                Horizontal
              </label>
              <input
                id={positionXId}
                type="range"
                min="0"
                max="100"
                step="1"
                value={photo.positionX}
                onChange={(event) =>
                  onPositionChange(Number(event.target.value), photo.positionY)
                }
              />
              <output htmlFor={positionXId}>{photo.positionX}%</output>
            </div>
            <div className="position-control">
              <label htmlFor={positionYId}>
                <MoveVertical size={15} aria-hidden="true" />
                Vertical
              </label>
              <input
                id={positionYId}
                type="range"
                min="0"
                max="100"
                step="1"
                value={photo.positionY}
                onChange={(event) =>
                  onPositionChange(photo.positionX, Number(event.target.value))
                }
              />
              <output htmlFor={positionYId}>{photo.positionY}%</output>
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          className={`photo-dropzone${processing ? ' is-busy' : ''}`}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          {processing ? (
            <>
              <span className="photo-dropzone__icon">
                <LoaderCircle size={24} className="spin" aria-hidden="true" />
              </span>
              <strong>Preparing your photo…</strong>
              <span>This stays in your browser.</span>
            </>
          ) : (
            <>
              <span className="photo-dropzone__icon">
                <UploadCloud size={24} aria-hidden="true" />
              </span>
              <strong>Add a professional or campaign photo</strong>
              <span>Drag and drop, or choose a file from your device.</span>
              <span className="button button--secondary button--small photo-dropzone__button">
                Choose photo
              </span>
            </>
          )}
        </label>
      )}

      <div className="photo-uploader__footer">
        <p id={`${inputId}-help`} className="field-help">
          {PHOTO_RULES}. Your photo is never uploaded — it stays in this browser.
        </p>
        {!photo && onUseSample ? (
          <button
            type="button"
            className="text-button"
            onClick={() => {
              setError(null);
              onUseSample();
            }}
          >
            Try the sample photo
            <span className="visually-hidden">
              , from the LBSAA reference campaign poster
            </span>
          </button>
        ) : null}
      </div>

      {error ? (
        <p id={`${inputId}-error`} className="field-error" role="alert">
          {error}
        </p>
      ) : null}

      {photo && photo.src === SAMPLE_PHOTO.src ? (
        <p className="photo-uploader__sample-note">
          Sample photo in use — replace it with your own before sharing.
        </p>
      ) : null}
    </div>
  );
}
