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

function MinimalPortrait({
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
      className={`poster poster--minimal poster--${format}${
        content.verifiedNotice ? ' poster--verified' : ''
      }`}
    >
      <div className="mn-rule" aria-hidden="true" />

      <header className="mn-header">
        <PosterWordmark theme="dark" />
      </header>

      <div className="mn-alert">
        <AlertTriangle aria-hidden="true" />
        <strong>{ALERT_HEADLINE}</strong>
      </div>

      <section className="mn-hero">
        <div className="mn-hero__copy">
          <VerifiedNoticeBanner content={content} theme="dark" />
          <h1 className={`poster-name ${nameSize(name)}`}>{name}</h1>
          {getRoleLine(content) ? (
            <p className="mn-role">{getRoleLine(content)}</p>
          ) : null}
          <p className={`mn-quote${longMessage ? ' mn-quote--long' : ''}`}>
            “{content.message}”
          </p>
          <PosterMeta content={content} theme="dark" />
        </div>

        <div className="mn-portrait">
          <span className="mn-portrait__accent" aria-hidden="true" />
          <div className="mn-portrait__frame">
            <PosterPhoto content={content} theme="dark" />
          </div>
        </div>
      </section>

      <section className="mn-health">
        <div className="mn-health__head">
          <h2>EBOLA: KNOW THE FACTS</h2>
        </div>

        <div className="mn-health__columns">
          <div className="mn-facts">
            <h3>
              <Thermometer aria-hidden="true" />
              SYMPTOMS
            </h3>
            <ul className="mn-symptoms">
              {SYMPTOMS.map((symptom) => (
                <li key={symptom}>
                  <span aria-hidden="true" />
                  {symptom}
                </li>
              ))}
            </ul>
          </div>

          <div className="mn-prevention">
            <h3>
              <Shield aria-hidden="true" />
              PREVENTION
            </h3>
            <ul className="mn-prevention__list">
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

      <footer className="mn-footer">
        <div className="mn-footer__top">
          <PosterValues theme="dark" />
          <PosterContacts content={content} theme="dark" compact />
        </div>
        <PosterNotice theme="dark" />
      </footer>
    </article>
  );
}

function MinimalLandscape({ content }: { content: PosterContent }) {
  const name = getDisplayName(content.fullName);

  return (
    <article
      className={`poster poster--minimal poster--landscape${
        content.verifiedNotice ? ' poster--verified' : ''
      }`}
    >
      <div className="mn-l-rule" aria-hidden="true" />
      <header className="mn-l-header">
        <PosterWordmark theme="dark" />
        <div className="mn-l-alert">
          <AlertTriangle aria-hidden="true" />
          <strong>{ALERT_HEADLINE}</strong>
        </div>
      </header>

      <section className="mn-l-hero">
        <div className="mn-l-copy">
          <VerifiedNoticeBanner content={content} theme="dark" />
          <h1 className={`poster-name ${nameSize(name)}`}>{name}</h1>
          {getRoleLine(content) ? (
            <p className="mn-l-role">{getRoleLine(content)}</p>
          ) : null}
          <p className="mn-l-quote">“{content.message}”</p>
          <PosterMeta content={content} theme="dark" />
        </div>
        <div className="mn-l-portrait">
          <PosterPhoto content={content} theme="dark" />
        </div>
      </section>

      <section className="mn-l-health">
        <div className="mn-l-health__head">
          <h2>EBOLA: KNOW THE FACTS</h2>
        </div>
        <div className="mn-l-health__facts">
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
        <div className="mn-l-health__prevent">
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

      <footer className="mn-l-footer">
        <PosterValues theme="dark" />
        <PosterContacts content={content} theme="dark" compact />
        <PosterNotice theme="dark" className="mn-l-footer__notice" />
      </footer>
    </article>
  );
}

export function MinimalTemplate({
  content,
  format,
}: {
  content: PosterContent;
  format: PosterFormat;
}) {
  if (format === 'landscape') {
    return <MinimalLandscape content={content} />;
  }
  return <MinimalPortrait content={content} format={format} />;
}
