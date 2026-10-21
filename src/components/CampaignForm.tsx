import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Eye,
  GraduationCap,
  Link2,
  LoaderCircle,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  UserRound,
} from 'lucide-react';
import {
  DEFAULT_MESSAGE,
  MAX_MESSAGE_LENGTH,
  MAX_MESSAGE_WORDS,
  VERIFIED_NOTICE_GUIDANCE,
} from '../data/campaignContent';
import type {
  CampaignErrors,
  CampaignFields,
  PhotoState,
} from '../types/campaign';
import { SAMPLE_PHOTO } from '../data/sampleMember';
import { countWords } from '../utils/wordCount';
import { PhotoUploader } from './PhotoUploader';

interface CampaignFormProps {
  fields: CampaignFields;
  errors: CampaignErrors;
  photo: PhotoState | null;
  isGenerating: boolean;
  onChange: <K extends keyof CampaignFields>(field: K, value: CampaignFields[K]) => void;
  onPhotoChange: (photo: PhotoState | null) => void;
  onPhotoPositionChange: (x: number, y: number) => void;
  onSubmit: () => void;
  onReset: () => void;
  onPreview: () => void;
}

interface FieldErrorProps {
  id: string;
  message?: string;
}

function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null;
  return (
    <p id={id} className="field-error" role="alert">
      {message}
    </p>
  );
}

export function CampaignForm({
  fields,
  errors,
  photo,
  isGenerating,
  onChange,
  onPhotoChange,
  onPhotoPositionChange,
  onSubmit,
  onReset,
  onPreview,
}: CampaignFormProps) {
  const wordCount = countWords(fields.message);
  const overLimit = wordCount > MAX_MESSAGE_WORDS;
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form
      className="campaign-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      aria-busy={isGenerating}
    >
      {errorCount > 0 ? (
        <div className="form-error-summary" role="alert">
          <strong>Please check {errorCount === 1 ? 'one field' : `${errorCount} fields`}.</strong>
          <span>We’ll keep your poster preview exactly as it is.</span>
        </div>
      ) : null}

      <section className="form-section" aria-labelledby="personal-details-heading">
        <div className="form-section__heading">
          <span className="form-section__number">01</span>
          <div>
            <h2 id="personal-details-heading">Your details</h2>
            <p>These appear on your personalized awareness poster.</p>
          </div>
        </div>

        <div className="field">
          <div className="field-label-row">
            <label htmlFor="field-fullName" className="field-label">
              Full name
            </label>
            <span className="field-required">Required</span>
          </div>
          <div className="input-shell">
            <UserRound size={18} aria-hidden="true" />
            <input
              id="field-fullName"
              name="fullName"
              type="text"
              value={fields.fullName}
              onChange={(event) => onChange('fullName', event.target.value)}
              placeholder="e.g. Adaeze Okafor"
              autoComplete="name"
              maxLength={80}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'field-fullName-error' : undefined}
            />
          </div>
          <FieldError id="field-fullName-error" message={errors.fullName} />
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="field-title" className="field-label">
              Professional title
              <span className="field-optional">Optional</span>
            </label>
            <div className="input-shell">
              <BriefcaseBusiness size={18} aria-hidden="true" />
              <input
                id="field-title"
                name="title"
                type="text"
                value={fields.title}
                onChange={(event) => onChange('title', event.target.value)}
                placeholder="e.g. Strategy Consultant"
                autoComplete="organization-title"
                maxLength={80}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="field-company" className="field-label">
              Company or organization
              <span className="field-optional">Optional</span>
            </label>
            <div className="input-shell">
              <Building2 size={18} aria-hidden="true" />
              <input
                id="field-company"
                name="company"
                type="text"
                value={fields.company}
                onChange={(event) => onChange('company', event.target.value)}
                placeholder="e.g. Safeguard Advisory"
                autoComplete="organization"
                maxLength={80}
              />
            </div>
          </div>
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="field-programme" className="field-label">
              LBS programme
              <span className="field-optional">Optional</span>
            </label>
            <div className="input-shell">
              <GraduationCap size={18} aria-hidden="true" />
              <input
                id="field-programme"
                name="programme"
                type="text"
                value={fields.programme}
                onChange={(event) => onChange('programme', event.target.value)}
                placeholder="e.g. Executive MBA"
                maxLength={70}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="field-classYear" className="field-label">
              Alumni class year
              <span className="field-optional">Optional</span>
            </label>
            <div className="input-shell">
              <span className="input-shell__text" aria-hidden="true">
                CLASS
              </span>
              <input
                id="field-classYear"
                name="classYear"
                type="text"
                value={fields.classYear}
                onChange={(event) => onChange('classYear', event.target.value)}
                placeholder="e.g. 2015"
                inputMode="numeric"
                maxLength={10}
              />
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="field-location" className="field-label">
            Location
            <span className="field-optional">Optional</span>
          </label>
          <div className="input-shell">
            <MapPin size={18} aria-hidden="true" />
            <input
              id="field-location"
              name="location"
              type="text"
              value={fields.location}
              onChange={(event) => onChange('location', event.target.value)}
              placeholder="e.g. Lagos, Nigeria"
              autoComplete="address-level2"
              maxLength={80}
            />
          </div>
        </div>
      </section>

      <section className="form-section" aria-labelledby="campaign-message-heading">
        <div className="form-section__heading">
          <span className="form-section__number">02</span>
          <div>
            <h2 id="campaign-message-heading">Your campaign message</h2>
            <p>A short, personal note adds a human voice to the facts.</p>
          </div>
        </div>

        <div className="field">
          <div className="field-label-row">
            <label htmlFor="field-message" className="field-label">
              Personal message
            </label>
            <span className={`word-counter${overLimit ? ' is-over' : ''}`}>
              {wordCount} / {MAX_MESSAGE_WORDS} words
            </span>
          </div>
          <textarea
            id="field-message"
            name="message"
            rows={4}
            value={fields.message}
            onChange={(event) => onChange('message', event.target.value)}
            maxLength={MAX_MESSAGE_LENGTH}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={`field-message-help${errors.message ? ' field-message-error' : ''}`}
          />
          <div className="field-help-row">
            <p id="field-message-help" className="field-help">
              Up to {MAX_MESSAGE_WORDS} words. The suggested message is a safe,
              factual starting point.
            </p>
            {fields.message.trim() !== DEFAULT_MESSAGE ? (
              <button
                type="button"
                className="text-button"
                onClick={() => onChange('message', DEFAULT_MESSAGE)}
              >
                Use suggested message
              </button>
            ) : null}
          </div>
          <FieldError id="field-message-error" message={errors.message} />
        </div>
      </section>

      <section className="form-section" aria-labelledby="contact-details-heading">
        <div className="form-section__heading">
          <span className="form-section__number">03</span>
          <div>
            <h2 id="contact-details-heading">Contact details</h2>
            <p>Optional. Add them only if you want people to reach you.</p>
          </div>
        </div>

        <div className="field-grid">
          <div className="field">
            <label htmlFor="field-email" className="field-label">
              Email
              <span className="field-optional">Optional</span>
            </label>
            <div className="input-shell">
              <Mail size={18} aria-hidden="true" />
              <input
                id="field-email"
                name="email"
                type="email"
                value={fields.email}
                onChange={(event) => onChange('email', event.target.value)}
                placeholder="name@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'field-email-error' : undefined}
              />
            </div>
            <FieldError id="field-email-error" message={errors.email} />
          </div>

          <div className="field">
            <label htmlFor="field-phone" className="field-label">
              Phone
              <span className="field-optional">Optional</span>
            </label>
            <div className="input-shell">
              <Phone size={18} aria-hidden="true" />
              <input
                id="field-phone"
                name="phone"
                type="tel"
                value={fields.phone}
                onChange={(event) => onChange('phone', event.target.value)}
                placeholder="+234 000 000 0000"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'field-phone-error' : undefined}
              />
            </div>
            <FieldError id="field-phone-error" message={errors.phone} />
          </div>
        </div>

        <div className="field">
          <label htmlFor="field-linkedin" className="field-label">
            LinkedIn profile
            <span className="field-optional">Optional</span>
          </label>
          <div className="input-shell">
            <Link2 size={18} aria-hidden="true" />
            <input
              id="field-linkedin"
              name="linkedin"
              type="text"
              value={fields.linkedin}
              onChange={(event) => onChange('linkedin', event.target.value)}
              placeholder="linkedin.com/in/your-name"
              autoComplete="url"
              aria-invalid={Boolean(errors.linkedin)}
              aria-describedby={
                errors.linkedin ? 'field-linkedin-error' : undefined
              }
            />
          </div>
          <FieldError id="field-linkedin-error" message={errors.linkedin} />
        </div>

        <label className="switch-field">
          <input
            type="checkbox"
            checked={fields.includeContact}
            onChange={(event) =>
              onChange('includeContact', event.target.checked)
            }
          />
          <span className="switch-field__track" aria-hidden="true">
            <span />
          </span>
          <span className="switch-field__copy">
            <strong>Show my contact details on the poster</strong>
            <small>Only the details you provide will appear.</small>
          </span>
        </label>
      </section>

      <section className="form-section" aria-labelledby="photo-heading">
        <div className="form-section__heading">
          <span className="form-section__number">04</span>
          <div>
            <h2 id="photo-heading">Your photograph</h2>
            <p>A clear, well-lit portrait helps your message stand out.</p>
          </div>
        </div>
        <PhotoUploader
          photo={photo}
          onPhotoChange={onPhotoChange}
          onPositionChange={onPhotoPositionChange}
          onUseSample={() => onPhotoChange(SAMPLE_PHOTO)}
        />
      </section>

      <details className="organiser-section">
        <summary>
          <span className="organiser-section__icon">
            <BadgeCheck size={18} aria-hidden="true" />
          </span>
          <span>
            <strong>Campaign organiser notice</strong>
            <small>Only for an officially verified public health notice.</small>
          </span>
          <ChevronDown size={18} className="organiser-section__chevron" aria-hidden="true" />
        </summary>

        <div className="organiser-section__body">
          <p className="organiser-section__guidance">{VERIFIED_NOTICE_GUIDANCE}</p>

          <label className="check-field">
            <input
              type="checkbox"
              checked={fields.verifiedEnabled}
              onChange={(event) =>
                onChange('verifiedEnabled', event.target.checked)
              }
            />
            <span aria-hidden="true" />
            <span>Add a verified campaign notice to my poster</span>
          </label>

          {fields.verifiedEnabled ? (
            <div className="organiser-fields">
              <div className="field">
                <label htmlFor="field-verifiedHeadline" className="field-label">
                  Verified headline
                </label>
                <input
                  id="field-verifiedHeadline"
                  type="text"
                  value={fields.verifiedHeadline}
                  onChange={(event) =>
                    onChange('verifiedHeadline', event.target.value)
                  }
                  placeholder="e.g. Official public health notice from the Nigeria Centre for Disease Control"
                  maxLength={120}
                  aria-invalid={Boolean(errors.verifiedHeadline)}
                  aria-describedby={
                    errors.verifiedHeadline
                      ? 'field-verifiedHeadline-error'
                      : undefined
                  }
                />
                <FieldError
                  id="field-verifiedHeadline-error"
                  message={errors.verifiedHeadline}
                />
              </div>

              <div className="field-grid">
                <div className="field">
                  <label htmlFor="field-verifiedSource" className="field-label">
                    Official source
                  </label>
                  <input
                    id="field-verifiedSource"
                    type="text"
                    value={fields.verifiedSource}
                    onChange={(event) =>
                      onChange('verifiedSource', event.target.value)
                    }
                    placeholder="Name of public health authority"
                    maxLength={80}
                    aria-invalid={Boolean(errors.verifiedSource)}
                    aria-describedby={
                      errors.verifiedSource
                        ? 'field-verifiedSource-error'
                        : undefined
                    }
                  />
                  <FieldError
                    id="field-verifiedSource-error"
                    message={errors.verifiedSource}
                  />
                </div>

                <div className="field">
                  <label htmlFor="field-verifiedDate" className="field-label">
                    Date of notice
                  </label>
                  <input
                    id="field-verifiedDate"
                    type="date"
                    value={fields.verifiedDate}
                    onChange={(event) =>
                      onChange('verifiedDate', event.target.value)
                    }
                    aria-invalid={Boolean(errors.verifiedDate)}
                    aria-describedby={
                      errors.verifiedDate ? 'field-verifiedDate-error' : undefined
                    }
                  />
                  <FieldError
                    id="field-verifiedDate-error"
                    message={errors.verifiedDate}
                  />
                </div>
              </div>

              <label className="check-field check-field--confirm">
                <input
                  type="checkbox"
                  checked={fields.verifiedConfirmed}
                  onChange={(event) =>
                    onChange('verifiedConfirmed', event.target.checked)
                  }
                  aria-invalid={Boolean(errors.verifiedConfirmed)}
                  aria-describedby={
                    errors.verifiedConfirmed
                      ? 'field-verifiedConfirmed-error'
                      : undefined
                  }
                />
                <span aria-hidden="true" />
                <span>
                  I confirm this information comes directly from the named
                  official public health source and is current for the date shown.
                </span>
              </label>
              <FieldError
                id="field-verifiedConfirmed-error"
                message={errors.verifiedConfirmed}
              />
            </div>
          ) : null}
        </div>
      </details>

      <section className="form-section form-section--photo-cta">
        <div className="form-section__heading">
          <span className="form-section__number">05</span>
          <div>
            <h2>Create your poster</h2>
            <p>We’ll check your details, then assemble the final layout.</p>
          </div>
        </div>

        <div className="campaign-form__actions">
          <button
            type="submit"
            className="button button--primary button--large"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <LoaderCircle size={18} className="spin" aria-hidden="true" />
            ) : (
              <Sparkles size={18} aria-hidden="true" />
            )}
            {isGenerating ? 'Generating…' : 'Generate Poster'}
          </button>
          <button
            type="button"
            className="button button--secondary button--large"
            onClick={onPreview}
          >
            <Eye size={18} aria-hidden="true" />
            Preview Poster
          </button>
          <button type="button" className="button button--text" onClick={onReset}>
            Reset Form
          </button>
        </div>

        <p className="form-privacy">
          <LockKeyhole size={14} aria-hidden="true" />
          No account needed. Your details and photo are processed only in your
          browser.
        </p>
      </section>
    </form>
  );
}
