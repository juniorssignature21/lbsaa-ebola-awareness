import {
  AlertTriangle,
  Check,
  Shield,
  Thermometer,
} from 'lucide-react';
import {
  ALERT_HEADLINE,
  PREVENTION_ACTIONS,
  SYMPTOMS,
} from '../../data/campaignContent';
import type { PosterContent, PosterFormat } from '../../types/campaign';
import { getDisplayName, getRoleLine } from '../../utils/poster';
import {
  PosterContacts,
  PosterMeta,
  PosterNotice,
  PosterPhoto,
  PosterValues,
  PosterWordmark,
  VerifiedNoticeBanner,
} from './PosterShared';

function nameSize(name: string): string {
  if (name.length > 28) return 'poster-name--long';
  if (name.length > 19) return 'poster-name--medium';
  return '';
}

function ModernPortrait({
  content,
  format,
}: {
  content: PosterContent;
  format: PosterFormat;
}) {
  const name = getDisplayName(content.fullName);
  const longMessage = content.message.length > 155;

  return (
    <article
      className={`poster poster--modern poster--${format}${
        content.verifiedNotice ? ' poster--verified' : ''
      }`}
    >
      <div className="mo-geometry" aria-hidden="true">
        <span className="mo-geometry__disc" />
        <span className="mo-geometry__arc" />
        <span className="mo-geometry__grid" />
        <span className="mo-geometry__cross" />
      </div>

      <header className="mo-header">
        <PosterWordmark theme="light" />
      </header>

      <div className="mo-alert">
        <AlertTriangle aria-hidden="true" />
        <strong>{ALERT_HEADLINE}</strong>
      </div>

      <section className="mo-hero">
        <div className="mo-portrait-block">
          <span className="mo-portrait-block__accent" aria-hidden="true" />
          <div className="mo-portrait-block__frame">
            <PosterPhoto content={content} />
          </div>
        </div>

        <div className="mo-hero__copy">
          <VerifiedNoticeBanner content={content} />
          <h1 className={`poster-name ${nameSize(name)}`}>{name}</h1>
          {getRoleLine(content) ? (
            <p className="mo-role">{getRoleLine(content)}</p>
          ) : null}
          <p className={`mo-quote${longMessage ? ' mo-quote--long' : ''}`}>
            “{content.message}”
          </p>
          <PosterMeta content={content} />
        </div>
      </section>

      <section className="mo-health">
        <div className="mo-health__head">
          <h2>EBOLA: KNOW THE FACTS</h2>
        </div>

        <div className="mo-health__cards">
          <div className="mo-card mo-card--facts">
            <h3>
              <Thermometer aria-hidden="true" />
              SYMPTOMS
            </h3>
            <ul className="mo-symptoms">
              {SYMPTOMS.map((symptom) => (
                <li key={symptom}>
                  <span aria-hidden="true" />
                  {symptom}
                </li>
              ))}
            </ul>
          </div>

          <div className="mo-card mo-card--prevention">
            <h3>
              <Shield aria-hidden="true" />
              PREVENTION
            </h3>
            <ul className="mo-prevention">
              {PREVENTION_ACTIONS.map((action) => (
                <li key={action}>
                  <span aria-hidden="true">
                    <Check />
                  </span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="mo-footer">
        <div className="mo-footer__top">
          <PosterValues theme="light" />
          <PosterContacts content={content} theme="light" compact />
        </div>
        <PosterNotice theme="light" />
      </footer>
    </article>
  );
}

function ModernLandscape({ content }: { content: PosterContent }) {
  const name = getDisplayName(content.fullName);

  return (
    <article
      className={`poster poster--modern poster--landscape${
        content.verifiedNotice ? ' poster--verified' : ''
      }`}
    >
      <div className="mo-l-geometry" aria-hidden="true" />

      <header className="mo-l-header">
        <PosterWordmark theme="light" />
        <div className="mo-l-alert">
          <AlertTriangle aria-hidden="true" />
          <strong>{ALERT_HEADLINE}</strong>
        </div>
      </header>

      <section className="mo-l-hero">
        <div className="mo-l-portrait">
          <PosterPhoto content={content} />
        </div>
        <div className="mo-l-copy">
          <VerifiedNoticeBanner content={content} />
          <h1 className={`poster-name ${nameSize(name)}`}>{name}</h1>
          {getRoleLine(content) ? (
            <p className="mo-l-role">{getRoleLine(content)}</p>
          ) : null}
          <p className="mo-l-quote">“{content.message}”</p>
          <PosterMeta content={content} />
        </div>
      </section>

      <section className="mo-l-health">
        <div className="mo-l-health__head">
          <h2>EBOLA: KNOW THE FACTS</h2>
        </div>
        <div className="mo-l-health__facts">
          <h3>
            <Thermometer aria-hidden="true" />
            SYMPTOMS
          </h3>
          <ul>
            {SYMPTOMS.map((symptom) => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
        </div>
        <div className="mo-l-health__prevent">
          <h3>
            <Shield aria-hidden="true" />
            PREVENTION
          </h3>
          <ul>
            {PREVENTION_ACTIONS.map((action) => (
              <li key={action}>
                <Check aria-hidden="true" />
                {action}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mo-l-footer">
        <PosterValues theme="light" />
        <PosterContacts content={content} theme="light" compact />
        <PosterNotice theme="light" className="mo-l-footer__notice" />
      </footer>
    </article>
  );
}

export function ModernTemplate({
  content,
  format,
}: {
  content: PosterContent;
  format: PosterFormat;
}) {
  if (format === 'landscape') {
    return <ModernLandscape content={content} />;
  }
  return <ModernPortrait content={content} format={format} />;
}
