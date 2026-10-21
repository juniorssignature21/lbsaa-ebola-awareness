import {
  Activity,
  AlertTriangle,
  Check,
  Info,
  ShieldCheck,
  Sparkles,
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
        <div className="mo-header__series">
          <span>CAMPAIGN SERIES</span>
          <strong>01 / COMMUNITY HEALTH</strong>
        </div>
      </header>

      <div className="mo-alert">
        <AlertTriangle aria-hidden="true" />
        <strong>{ALERT_HEADLINE}</strong>
        <span>STAY INFORMED</span>
      </div>

      <section className="mo-hero">
        <div className="mo-portrait-block">
          <span className="mo-portrait-block__accent" aria-hidden="true" />
          <div className="mo-portrait-block__frame">
            <PosterPhoto content={content} />
          </div>
          <span className="mo-portrait-block__tag">
            <ShieldCheck aria-hidden="true" />
            LBSAA / CARE IN ACTION
          </span>
        </div>

        <div className="mo-hero__copy">
          <VerifiedNoticeBanner content={content} />
          <span className="mo-eyebrow">
            <Sparkles aria-hidden="true" />
            A MESSAGE FROM AN LBSAA MEMBER
          </span>
          <h1 className={`poster-name ${nameSize(name)}`}>{name}</h1>
          {getRoleLine(content) ? (
            <p className="mo-role">{getRoleLine(content)}</p>
          ) : null}
          <p className={`mo-quote${longMessage ? ' mo-quote--long' : ''}`}>
            “{content.message}”
          </p>
          <PosterMeta content={content} />
          <div className="mo-member-strip">
            <span>LEADERSHIP IN CRISIS</span>
            <i aria-hidden="true" />
            <span>ACT RESPONSIBLY</span>
          </div>
        </div>
      </section>

      <section className="mo-health">
        <div className="mo-health__head">
          <div>
            <span className="mo-health__eyebrow">
              <Activity aria-hidden="true" />
              PUBLIC HEALTH GUIDANCE
            </span>
            <h2>EBOLA: KNOW THE FACTS</h2>
          </div>
          <span className="mo-health__stamp">SYMPTOMS / ACTIONS</span>
        </div>

        <div className="mo-health__cards">
          <div className="mo-card mo-card--facts">
            <p className="mo-card__intro">{HEALTH_INTRO}</p>
            <h3>
              <Thermometer aria-hidden="true" />
              SYMPTOMS TO WATCH FOR
            </h3>
            <ul className="mo-symptoms">
              {SYMPTOMS.map((symptom) => (
                <li key={symptom}>
                  <span aria-hidden="true" />
                  {symptom}
                </li>
              ))}
            </ul>
            <p className="mo-caution">
              <Info aria-hidden="true" />
              {SYMPTOM_CAUTION}
            </p>
          </div>

          <div className="mo-card mo-card--prevention">
            <h3>PROTECT YOURSELF AND YOUR COMMUNITY</h3>
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

        <div className="mo-callout">
          <span className="mo-callout__icon">
            <AlertTriangle aria-hidden="true" />
          </span>
          <p>{EMERGENCY_CALLOUT}</p>
        </div>
      </section>

      <footer className="mo-footer">
        <div className="mo-footer__top">
          <PosterValues theme="light" />
          <PosterMotto className="mo-footer__motto" />
        </div>
        <PosterContacts content={content} theme="light" compact />
        <div className="mo-footer__bottom">
          <PosterDisclaimer className="mo-footer__disclaimer" />
          <span>LBSAA · EBOLA AWARENESS</span>
        </div>
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
        <span className="mo-l-series">CAMPAIGN SERIES · 01</span>
      </header>

      <section className="mo-l-hero">
        <div className="mo-l-portrait">
          <PosterPhoto content={content} />
          <span className="mo-l-portrait__tag">LBSAA MEMBER</span>
        </div>
        <div className="mo-l-copy">
          <VerifiedNoticeBanner content={content} />
          <span className="mo-l-eyebrow">A MESSAGE FROM AN LBSAA MEMBER</span>
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
          <span>
            <Activity aria-hidden="true" />
            PUBLIC HEALTH GUIDANCE
          </span>
          <h2>EBOLA: KNOW THE FACTS</h2>
        </div>
        <div className="mo-l-health__facts">
          <p>{HEALTH_INTRO}</p>
          <h3>
            <Thermometer aria-hidden="true" />
            SYMPTOMS TO WATCH FOR
          </h3>
          <ul>
            {SYMPTOMS.map((symptom) => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
          <p className="mo-l-caution">
            <Info aria-hidden="true" />
            {SYMPTOM_CAUTION}
          </p>
        </div>
        <div className="mo-l-health__prevent">
          <h3>PROTECT YOURSELF AND YOUR COMMUNITY</h3>
          <ul>
            {PREVENTION_ACTIONS.map((action) => (
              <li key={action}>
                <Check aria-hidden="true" />
                {action}
              </li>
            ))}
          </ul>
        </div>
        <div className="mo-l-callout">
          <AlertTriangle aria-hidden="true" />
          {EMERGENCY_CALLOUT}
        </div>
      </section>

      <footer className="mo-l-footer">
        <PosterValues theme="light" />
        <PosterMotto className="mo-l-footer__motto" />
        <PosterContacts content={content} theme="light" compact />
        <PosterDisclaimer className="mo-l-footer__disclaimer" />
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
