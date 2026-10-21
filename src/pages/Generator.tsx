import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Copy,
  Info,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { CampaignForm } from '../components/CampaignForm';
import { PosterPreview } from '../components/PosterPreview';
import { PageProgress } from '../components/PageProgress';
import { TemplatePicker } from '../components/TemplatePicker';
import { ExportControls } from '../components/ExportControls';
import { ReadyDialog } from '../components/ReadyDialog';
import { ResetDialog } from '../components/ResetDialog';
import { Modal } from '../components/Modal';
import { Toast, type ToastMessage, type ToastTone } from '../components/Toast';
import { PosterCanvas } from '../components/posters/PosterCanvas';
import { BrandLogo } from '../components/BrandLogo';
import {
  CAMPAIGN_SHARE_MESSAGE,
  POSTER_SIZES,
} from '../data/campaignContent';
import { createEmptyFields } from '../data/sampleMember';
import type {
  CampaignErrors,
  CampaignFields,
  DraftState,
  PhotoState,
  PosterFormat,
  PosterTemplate,
} from '../types/campaign';
import { clearDraft, loadDraft, saveDraft } from '../utils/draft';
import {
  downloadPoster,
  renderPosterBlob,
  sharePosterBlob,
} from '../utils/exportPoster';
import { copyText } from '../utils/clipboard';
import { createPosterContent } from '../utils/poster';
import { hasErrors, validateCampaign } from '../utils/validation';

const GENERATION_STEPS = [
  'Preparing your campaign…',
  'Applying LBSAA branding…',
  'Finalizing your poster…',
];

const FIELD_ORDER: Array<keyof CampaignErrors> = [
  'fullName',
  'message',
  'email',
  'phone',
  'linkedin',
  'verifiedHeadline',
  'verifiedSource',
  'verifiedDate',
  'verifiedConfirmed',
];

const FORMATS: PosterFormat[] = ['portrait', 'story', 'landscape'];

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export function Generator() {
  const [initialDraft] = useState<DraftState | null>(() => loadDraft());
  const [fields, setFields] = useState<CampaignFields>(() => ({
    ...createEmptyFields(),
    ...(initialDraft?.fields ?? {}),
  }));
  const [template, setTemplate] = useState<PosterTemplate>(
    initialDraft?.template ?? 'official',
  );
  const [format, setFormat] = useState<PosterFormat>('portrait');
  const [photo, setPhoto] = useState<PhotoState | null>(null);
  const [errors, setErrors] = useState<CampaignErrors>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [readyOpen, setReadyOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(false);
  const [manualCopyOpen, setManualCopyOpen] = useState(false);
  const [busyAction, setBusyAction] = useState<
    'download' | 'share' | 'copy' | null
  >(null);
  const [busyFormat, setBusyFormat] = useState<PosterFormat | null>(null);
  const [shareNotice, setShareNotice] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<PosterFormat>('portrait');
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [draftRestored, setDraftRestored] = useState(
    Boolean(initialDraft?.fields?.fullName),
  );

  const exportRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const toastCounter = useRef(0);

  const posterContent = useMemo(
    () => createPosterContent(fields, photo),
    [fields, photo],
  );

  const showToast = useCallback((tone: ToastTone, message: string) => {
    toastCounter.current += 1;
    setToast({ id: toastCounter.current, tone, message });
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    const timeout = window.setTimeout(() => saveDraft(fields, template), 350);
    return () => window.clearTimeout(timeout);
  }, [fields, template]);

  const handleFieldChange = useCallback(
    <K extends keyof CampaignFields>(key: K, value: CampaignFields[K]) => {
      setFields((current) => ({ ...current, [key]: value }));
      setErrors((current) => {
        if (!(key in current)) return current;
        const next = { ...current };
        delete next[key as keyof CampaignErrors];
        if (key === 'verifiedEnabled' && value === false) {
          delete next.verifiedHeadline;
          delete next.verifiedSource;
          delete next.verifiedDate;
          delete next.verifiedConfirmed;
        }
        return next;
      });
    },
    [],
  );

  const handlePhotoChange = useCallback(
    (nextPhoto: PhotoState | null) => {
      setPhoto(nextPhoto);
      if (nextPhoto) {
        showToast(
          'success',
          'Photograph ready. Drag it or use the position sliders to refine the framing.',
        );
      }
    },
    [showToast],
  );

  const handlePositionChange = useCallback((x: number, y: number) => {
    setPhoto((current) =>
      current ? { ...current, positionX: x, positionY: y } : current,
    );
  }, []);

  const scrollToForm = useCallback(() => {
    setReadyOpen(false);
    setPreviewOpen(false);
    const field = document.getElementById('field-fullName');
    field?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => field?.focus({ preventScroll: true }), 220);
  }, []);

  const scrollToPreview = useCallback(() => {
    const panel = previewRef.current;
    panel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => panel?.focus({ preventScroll: true }), 220);
  }, []);

  const handleGenerate = async () => {
    if (isGenerating) return;

    const validation = validateCampaign(fields);
    if (hasErrors(validation)) {
      setErrors(validation);
      showToast(
        'error',
        'A few details need attention before the poster can be finalized.',
      );
      const firstKey = FIELD_ORDER.find((key) => validation[key]);
      if (firstKey) {
        const field = document.getElementById(`field-${firstKey}`);
        field?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.setTimeout(() => field?.focus({ preventScroll: true }), 250);
      }
      return;
    }

    setErrors({});
    setIsGenerating(true);
    setGenerationStep(0);

    if (window.matchMedia('(max-width: 1100px)').matches) {
      window.setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const durations = reducedMotion ? [180, 220, 220] : [520, 600, 560];

    try {
      for (let step = 0; step < GENERATION_STEPS.length; step += 1) {
        setGenerationStep(step);
        await delay(durations[step]);
      }
      setReadyOpen(true);
    } finally {
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  const prepareExportNode = async (targetFormat: PosterFormat) => {
    flushSync(() => setExportFormat(targetFormat));
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
    const node = exportRef.current;
    if (!node) {
      throw new Error('The poster is not ready to export. Please try again.');
    }
    return node;
  };

  const handleDownload = async (targetFormat: PosterFormat) => {
    if (busyAction) return;
    setBusyAction('download');
    setBusyFormat(targetFormat);

    try {
      const node = await prepareExportNode(targetFormat);
      const blob = await renderPosterBlob(node, targetFormat);
      downloadPoster(blob, targetFormat);
      showToast(
        'success',
        `${POSTER_SIZES[targetFormat].label} poster downloaded (${POSTER_SIZES[targetFormat].dimensions}).`,
      );
    } catch (error) {
      showToast(
        'error',
        error instanceof Error
          ? error.message
          : 'The poster could not be downloaded. Please try again.',
      );
    } finally {
      setBusyAction(null);
      setBusyFormat(null);
    }
  };

  const fallbackToDownload = (blob: Blob, reason: string) => {
    downloadPoster(blob, 'portrait');
    setShareNotice(reason);
    showToast(
      'info',
      'Your poster was downloaded. Copy the campaign message to complete your post.',
    );
  };

  const handleShare = async () => {
    if (busyAction) return;
    setBusyAction('share');
    setShareNotice(null);

    try {
      const node = await prepareExportNode('portrait');
      const blob = await renderPosterBlob(node, 'portrait');
      const result = await sharePosterBlob(
        blob,
        'portrait',
        'LBSAA Ebola Awareness Poster',
        CAMPAIGN_SHARE_MESSAGE,
      );

      if (result === 'shared') {
        showToast('success', 'Your poster was shared successfully.');
      } else if (result === 'cancelled') {
        showToast(
          'info',
          'Sharing was cancelled. Your poster is still ready to download.',
        );
      } else if (result === 'failed') {
        fallbackToDownload(
          blob,
          'The device sharing window could not open. We downloaded the PNG instead. Attach it in your preferred app, then copy the campaign message below.',
        );
      } else {
        fallbackToDownload(
          blob,
          'File sharing is not available in this browser, so we downloaded the PNG instead. Attach the image in WhatsApp, Instagram or LinkedIn, then copy the campaign message below.',
        );
      }
    } catch (error) {
      showToast(
        'error',
        error instanceof Error
          ? error.message
          : 'Sharing could not be completed. Please try downloading the poster instead.',
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handleCopy = async () => {
    if (busyAction) return;
    setBusyAction('copy');
    try {
      const copied = await copyText(CAMPAIGN_SHARE_MESSAGE);
      if (copied) {
        showToast('success', 'Campaign message copied to your clipboard.');
      } else {
        setManualCopyOpen(true);
        showToast(
          'error',
          'Clipboard access is unavailable. The message is shown below so you can copy it manually.',
        );
      }
    } finally {
      setBusyAction(null);
    }
  };

  const handleReset = () => {
    clearDraft();
    setFields(createEmptyFields());
    setPhoto(null);
    setTemplate('official');
    setFormat('portrait');
    setErrors({});
    setShareNotice(null);
    setReadyOpen(false);
    setResetOpen(false);
    setPreviewOpen(false);
    setDraftRestored(false);
    showToast('success', 'Your poster details have been cleared.');
    document.getElementById('campaign-form-anchor')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main-content" className="generator-main">
        <div className="generator-intro">
          <div className="shell">
            <Link to="/" className="back-link">
              <ArrowLeft size={16} aria-hidden="true" />
              Back to campaign
            </Link>
            <div className="generator-intro__row">
              <div className="generator-intro__copy">
                <span className="eyebrow">CAMPAIGN POSTER GENERATOR</span>
                <h1>Put your name behind the facts.</h1>
                <p>
                  Add your details, choose a photograph and shape a poster that
                  carries accurate, calm public health guidance into your
                  community.
                </p>
              </div>
              <PageProgress />
            </div>
          </div>
        </div>

        <div className="shell generator-layout">
          <div className="generator-form-column" id="campaign-form-anchor">
            {draftRestored ? (
              <div className="draft-notice" role="status">
                <ShieldCheck size={18} aria-hidden="true" />
                <p>
                  <strong>Draft details restored.</strong> For your privacy,
                  photographs are never saved between visits.
                </p>
                <button
                  type="button"
                  className="icon-button icon-button--small"
                  onClick={() => setDraftRestored(false)}
                  aria-label="Dismiss restored draft notice"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
            ) : null}

            <CampaignForm
              fields={fields}
              errors={errors}
              photo={photo}
              isGenerating={isGenerating}
              onChange={handleFieldChange}
              onPhotoChange={handlePhotoChange}
              onPhotoPositionChange={handlePositionChange}
              onSubmit={() => void handleGenerate()}
              onReset={() => setResetOpen(true)}
              onPreview={scrollToPreview}
            />
          </div>

          <div className="generator-preview-column">
            <div
              className="preview-panel"
              id="poster-preview"
              ref={previewRef}
              tabIndex={-1}
              aria-label="Live poster preview and export options"
            >
              <div className="preview-panel__header">
                <div>
                  <span className="eyebrow">LIVE POSTER PREVIEW</span>
                  <h2>Your campaign, taking shape.</h2>
                </div>
                <span className="live-pill">
                  <i aria-hidden="true" />
                  Live
                </span>
              </div>

              <div className="preview-panel__selectors">
                <TemplatePicker value={template} onChange={setTemplate} />

                <fieldset className="format-picker">
                  <legend>
                    <span>Format</span>
                    <small>{POSTER_SIZES[format].dimensions}</small>
                  </legend>
                  <div className="format-picker__options">
                    {FORMATS.map((item) => {
                      const size = POSTER_SIZES[item];
                      const selected = item === format;
                      return (
                        <button
                          key={item}
                          type="button"
                          className={`format-option${selected ? ' is-selected' : ''}`}
                          aria-pressed={selected}
                          onClick={() => setFormat(item)}
                          title={`${size.label} · ${size.description}`}
                        >
                          <span
                            className={`format-option__shape format-option__shape--${item}`}
                            aria-hidden="true"
                          />
                          <span>
                            <strong>{size.label}</strong>
                            <small>{size.dimensions}</small>
                          </span>
                          {selected ? (
                            <Check
                              size={14}
                              className="format-option__check"
                              aria-hidden="true"
                            />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>

              <div className="preview-panel__stage">
                <div className="preview-stage-frame">
                  <PosterPreview
                    content={posterContent}
                    template={template}
                    format={format}
                    onExpand={() => {
                      setPreviewZoom(false);
                      setPreviewOpen(true);
                    }}
                  />
                </div>

                {isGenerating ? (
                  <div className="generation-overlay" role="status" aria-live="polite">
                    <div className="generation-orbit" aria-hidden="true">
                      <span className="generation-orbit__ring" />
                      <BrandLogo
                        theme="blue"
                        variant="emblem"
                        alt=""
                        className="generation-orbit__logo"
                      />
                    </div>
                    <strong>{GENERATION_STEPS[generationStep]}</strong>
                    <span className="generation-overlay__hint">
                      Composing your personalized layout.
                    </span>
                    <div className="generation-steps" aria-hidden="true">
                      {GENERATION_STEPS.map((step, index) => (
                        <span
                          key={step}
                          className={index <= generationStep ? 'is-active' : ''}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <p className="preview-panel__tip">
                <Sparkles size={15} aria-hidden="true" />
                Public health content stays fixed and legible. Only your personal
                details and photograph change.
              </p>

              <ExportControls
                format={format}
                busyAction={busyAction}
                busyFormat={busyFormat}
                onDownload={(item) => void handleDownload(item)}
                onShare={() => void handleShare()}
                onCopy={() => void handleCopy()}
                onEdit={scrollToForm}
              />

              {shareNotice ? (
                <div className="share-notice" role="status">
                  <Info size={18} aria-hidden="true" />
                  <div>
                    <strong>Share manually in a few seconds</strong>
                    <p>{shareNotice}</p>
                  </div>
                  <button
                    type="button"
                    className="button button--secondary button--small"
                    onClick={() => void handleCopy()}
                    disabled={busyAction !== null}
                  >
                    <Copy size={14} aria-hidden="true" />
                    Copy message
                  </button>
                </div>
              ) : null}

              <p className="preview-panel__privacy">
                <LockKeyhole size={14} aria-hidden="true" />
                Photographs are processed locally and never uploaded to a server.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />

      <div className="export-stage" aria-hidden="true">
        <PosterCanvas
          ref={exportRef}
          content={posterContent}
          template={template}
          format={exportFormat}
        />
      </div>

      <ReadyDialog
        open={readyOpen}
        busyAction={busyAction}
        onClose={() => setReadyOpen(false)}
        onDownload={() => void handleDownload('portrait')}
        onShare={() => void handleShare()}
        onCopy={() => void handleCopy()}
        onEdit={scrollToForm}
        onCreateAnother={() => {
          setReadyOpen(false);
          setResetOpen(true);
        }}
      />

      <ResetDialog
        open={resetOpen}
        onCancel={() => setResetOpen(false)}
        onConfirm={handleReset}
      />

      <Modal
        open={previewOpen}
        title="Your poster preview"
        eyebrow={`${POSTER_SIZES[format].label} · ${POSTER_SIZES[format].dimensions}`}
        onClose={() => setPreviewOpen(false)}
        className="preview-modal"
      >
        <div className="preview-modal__toolbar">
          <p>Preview only. Download the PNG for full resolution.</p>
          <button
            type="button"
            className="button button--ghost button--small"
            onClick={() => setPreviewZoom((current) => !current)}
          >
            {previewZoom ? (
              <ZoomOut size={15} aria-hidden="true" />
            ) : (
              <ZoomIn size={15} aria-hidden="true" />
            )}
            {previewZoom ? 'Fit to screen' : 'Zoom in'}
          </button>
        </div>
        <div
          className={`preview-modal__scroll${previewZoom ? ' is-zoomed' : ''}`}
        >
          <div className="preview-modal__canvas">
            <PosterPreview
              content={posterContent}
              template={template}
              format={format}
            />
          </div>
        </div>
        <p className="preview-modal__hint">
          <Info size={14} aria-hidden="true" />
          {previewZoom
            ? 'Scroll horizontally and vertically to inspect the full design.'
            : 'Use Zoom in to inspect small print, especially on a phone.'}
        </p>
      </Modal>

      <Modal
        open={manualCopyOpen}
        title="Copy your campaign message"
        eyebrow="Manual copy"
        onClose={() => setManualCopyOpen(false)}
        className="manual-copy-dialog"
      >
        <div className="manual-copy-dialog__notice">
          <AlertCircle size={18} aria-hidden="true" />
          <p>
            Clipboard access is blocked in this browser. Select the message below
            and copy it manually.
          </p>
        </div>
        <label className="field-label" htmlFor="manual-copy-text">
          Campaign message
        </label>
        <textarea
          id="manual-copy-text"
          className="manual-copy-text"
          value={CAMPAIGN_SHARE_MESSAGE}
          readOnly
          rows={5}
          data-autofocus
          onFocus={(event) => event.currentTarget.select()}
        />
        <div className="manual-copy-dialog__actions">
          <button
            type="button"
            className="button button--primary"
            onClick={() => {
              const textarea = document.getElementById(
                'manual-copy-text',
              ) as HTMLTextAreaElement | null;
              textarea?.focus();
              textarea?.select();
            }}
          >
            Select all
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => setManualCopyOpen(false)}
          >
            Done
          </button>
        </div>
      </Modal>

      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  );
}
