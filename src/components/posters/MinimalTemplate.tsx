import {
  AlertTriangle,
  Check,
  Info,
  ShieldCheck,
  Thermometer,
} from 'lucide-react';
import {
  ALERT_HEADLINE,
  EMERGENCY_CALLOUT,
  HEALTH_INTRO,
  PREVENTION_ACTIONS,
  SYMPTOMS,
  SYMPTOM_CAUTION,
} from '../../data/campaignContent';
import type { PosterContent, PosterFormat } from '../../types/campaign';
import { getDisplayName, getRoleLine } from '../../utils/poster';
import {
  PosterContacts,
  PosterDisclaimer,
  PosterMeta,
  PosterMotto,
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
        <div className="mn-header__right">
          <span>ALUMNI PUBLIC HEALTH SERIES</span>
          <strong>EBOLA AWARENESS / 01</strong>
        </div>
      </header>

      <div className="mn-alert">
        <AlertTriangle aria-hidden="true" />
        <strong>{ALERT_HEADLINE}</strong>
        <span>ACT RESPONSIBLY</span>
      </div>

      <section className="mn-hero">
        <div className="mn-hero__copy">
          <VerifiedNoticeBanner content={content} theme="dark" />
          <span className="mn-eyebrow">VOICES FOR A HEALTHIER COMMUNITY</span>
          <h1 className={`poster-name ${nameSize(name)}`}>{name}</h1>
          {getRoleLine(content) ? (
            <p className="mn-role">{getRoleLine(content)}</p>
          ) : null}
          <p className={`mn-quote${longMessage ? ' mn-quote--long' : ''}`}>
            “{content.message}”
          </p>
          <PosterMeta content={content} theme="dark" />
          <div className="mn-hero__rule" aria-hidden="true" />
          <span className="mn-hero__signature">
            <ShieldCheck aria-hidden="true" />
            LBSAA MEMBER · CAMPAIGN VOICE
          </span>
        </div>

        <div className="mn-portrait">
          <span className="mn-portrait__accent" aria-hidden="true" />
          <div className="mn-portrait__frame">
            <PosterPhoto content={content} theme="dark" />
          </div>
          <span className="mn-portrait__caption">
            PREVENTION STARTS WITH
            <strong>INFORMED ACTION</strong>
          </span>
        </div>
      </section>

      <section className="mn-health">
        <div className="mn-health__head">
          <span className="mn-health__eyebrow">PUBLIC HEALTH GUIDANCE</span>
          <h2>EBOLA: KNOW THE FACTS</h2>
          <p>Clear information. Calm, responsible action.</p>
        </div>

        <div className="mn-health__columns">
          <div className="mn-facts">
            <p className="mn-intro">{HEALTH_INTRO}</p>
            <h3>
              <span>01</span>
              SYMPTOMS TO WATCH FOR
            </h3>
            <ul className="mn-symptoms">
              {SYMPTOMS.map((symptom) => (
                <li key={symptom}>
                  <span aria-hidden="true" />
                  {symptom}
                </li>
              ))}
            </ul>
            <p className="mn-caution">
              <Info aria-hidden="true" />
              {SYMPTOM_CAUTION}
            </p>
          </div>

          <div className="mn-prevention">
            <h3>
              <span>02</span>
              PROTECT YOURSELF AND YOUR COMMUNITY
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

        <div className="mn-callout">
          <span>
            <AlertTriangle aria-hidden="true" />
          </span>
          <p>{EMERGENCY_CALLOUT}</p>
          <Thermometer aria-hidden="true" className="mn-callout__icon" />
        </div>
      </section>

      <footer className="mn-footer">
        <div className="mn-footer__top">
          <PosterValues theme="dark" />
          <PosterMotto className="mn-footer__motto" />
        </div>
        <PosterContacts content={content} theme="dark" compact />
        <div className="mn-footer__bottom">
          <PosterDisclaimer className="mn-footer__disclaimer" />
          <span>LBSAA · COMMUNITY HEALTH</span>
        </div>
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
        <span className="mn-l-header__series">ALUMNI PUBLIC HEALTH SERIES</span>
      </header>

      <section className="mn-l-hero">
        <div className="mn-l-copy">
          <VerifiedNoticeBanner content={content} theme="dark" />
          <span className="mn-l-eyebrow">VOICES FOR A HEALTHIER COMMUNITY</span>
          <h1 className={`poster-name ${nameSize(name)}`}>{name}</h1>
          {getRoleLine(content) ? (
            <p className="mn-l-role">{getRoleLine(content)}</p>
          ) : null}
          <p className="mn-l-quote">“{content.message}”</p>
          <PosterMeta content={content} theme="dark" />
        </div>
        <div className="mn-l-portrait">
          <PosterPhoto content={content} theme="dark" />
          <span className="mn-l-portrait__caption">LBSAA MEMBER</span>
        </div>
      </section>

      <section className="mn-l-health">
        <div className="mn-l-health__head">
          <span>PUBLIC HEALTH GUIDANCE</span>
          <h2>EBOLA: KNOW THE FACTS</h2>
          <p>{HEALTH_INTRO}</p>
        </div>
        <div className="mn-l-health__facts">
          <h3>
            <span>01</span>
            SYMPTOMS TO WATCH FOR
          </h3>
          <ul>
            {SYMPTOMS.map((symptom) => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
          <p className="mn-l-caution">
            <Info aria-hidden="true" />
            {SYMPTOM_CAUTION}
          </p>
        </div>
        <div className="mn-l-health__prevent">
          <h3>
            <span>02</span>
            PROTECT YOURSELF AND YOUR COMMUNITY
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
        <div className="mn-l-callout">
          <AlertTriangle aria-hidden="true" />
          {EMERGENCY_CALLOUT}
        </div>
      </section>

      <footer className="mn-l-footer">
        <PosterValues theme="dark" />
        <PosterMotto className="mn-l-footer__motto" />
        <PosterContacts content={content} theme="dark" compact />
        <PosterDisclaimer className="mn-l-footer__disclaimer" />
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
