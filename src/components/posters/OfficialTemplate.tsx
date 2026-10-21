import {
  Activity,
  AlertTriangle,
  Check,
  Info,
  Shield,
  ShieldCheck,
  Thermometer,
} from 'lucide-react';
import {
  ALERT_HEADLINE,
  ALERT_LABEL,
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

function OfficialHealth() {
  return (
    <section className="op-health">
      <div className="op-health__header">
        <div>
          <span className="op-health__eyebrow">
            <Activity aria-hidden="true" />
            PUBLIC HEALTH GUIDANCE
          </span>
          <h2>EBOLA: KNOW THE FACTS</h2>
        </div>
        <span className="op-health__side">CLEAR FACTS · RESPONSIBLE ACTION</span>
      </div>

      <div className="op-health__grid">
        <div className="op-facts">
          <p className="op-facts__intro">{HEALTH_INTRO}</p>
          <h3>
            <Thermometer aria-hidden="true" />
            SYMPTOMS TO WATCH FOR
          </h3>
          <ul className="op-symptoms">
            {SYMPTOMS.map((symptom) => (
              <li key={symptom}>
                <span className="op-symptoms__dot" aria-hidden="true" />
                {symptom}
              </li>
            ))}
          </ul>
          <p className="op-caution">
            <Info aria-hidden="true" />
            {SYMPTOM_CAUTION}
          </p>
        </div>

        <div className="op-prevention">
          <h3>
            <Shield aria-hidden="true" />
            PROTECT YOURSELF AND YOUR COMMUNITY
          </h3>
          <ul className="op-prevention__list">
            {PREVENTION_ACTIONS.map((action) => (
              <li key={action}>
                <span className="op-check" aria-hidden="true">
                  <Check />
                </span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="op-callout">
        <AlertTriangle aria-hidden="true" />
        <p>{EMERGENCY_CALLOUT}</p>
        <ShieldCheck aria-hidden="true" className="op-callout__shield" />
      </div>
    </section>
  );
}

function OfficialPortrait({
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
      className={`poster poster--official poster--${format}${
        content.verifiedNotice ? ' poster--verified' : ''
      }`}
    >
      <div className="op-pattern" aria-hidden="true">
        <span className="op-pattern__ring op-pattern__ring--one" />
        <span className="op-pattern__ring op-pattern__ring--two" />
        <span className="op-pattern__dots" />
      </div>

      <header className="op-header">
        <PosterWordmark theme="light" />
        <div className="op-header__right">
          <span className="op-header__campaign">EBOLA AWARENESS CAMPAIGN</span>
          <span className="op-header__sub">COMMUNITY HEALTH INITIATIVE</span>
        </div>
      </header>

      <div className="op-alert">
        <span className="op-alert__icon">
          <AlertTriangle aria-hidden="true" />
        </span>
        <strong>{ALERT_HEADLINE}</strong>
        <span className="op-alert__tag">{ALERT_LABEL.toUpperCase()}</span>
      </div>

      <section className="op-hero">
        <div className="op-hero__copy">
          <VerifiedNoticeBanner content={content} />
          <span className="op-hero__eyebrow">A MESSAGE FROM AN LBSAA MEMBER</span>
          <h1 className={`poster-name ${nameSize(name)}`}>{name}</h1>
          {getRoleLine(content) ? (
            <p className="op-hero__role">{getRoleLine(content)}</p>
          ) : null}
          <span className="op-hero__rule" aria-hidden="true" />
          <p className={`op-hero__quote${longMessage ? ' op-hero__quote--long' : ''}`}>
            “{content.message}”
          </p>
          <PosterMeta content={content} />
        </div>

        <div className="op-portrait">
          <span className="op-portrait__halo" aria-hidden="true" />
          <div className="op-portrait__frame">
            <PosterPhoto content={content} />
          </div>
          <div className="op-portrait__badge">
            <ShieldCheck aria-hidden="true" />
            <span>
              TOGETHER
              <br />
              FOR HEALTH
            </span>
          </div>
          <div className="op-portrait__label">LBSAA MEMBER · COMMUNITY VOICE</div>
        </div>
      </section>

      <OfficialHealth />

      <footer className="op-footer">
        <div className="op-footer__top">
          <PosterValues theme="light" />
          <PosterMotto className="op-footer__motto" />
        </div>
        <PosterContacts content={content} compact />
        <div className="op-footer__bottom">
          <PosterDisclaimer className="op-footer__disclaimer" />
          <span className="op-footer__signoff">LBSAA · EBOLA AWARENESS</span>
        </div>
      </footer>
    </article>
  );
}

function OfficialLandscape({ content }: { content: PosterContent }) {
  const name = getDisplayName(content.fullName);

  return (
    <article
      className={`poster poster--official poster--landscape${
        content.verifiedNotice ? ' poster--verified' : ''
      }`}
    >
      <header className="op-l-header">
        <PosterWordmark theme="light" />
        <div className="op-l-alert">
          <AlertTriangle aria-hidden="true" />
          <strong>{ALERT_HEADLINE}</strong>
        </div>
        <span className="op-l-header__tag">PUBLIC HEALTH NOTICE</span>
      </header>

      <section className="op-l-hero">
        <div className="op-l-hero__copy">
          <VerifiedNoticeBanner content={content} />
          <span className="op-l-eyebrow">A MESSAGE FROM AN LBSAA MEMBER</span>
          <h1 className={`poster-name ${nameSize(name)}`}>{name}</h1>
          {getRoleLine(content) ? (
            <p className="op-l-role">{getRoleLine(content)}</p>
          ) : null}
          <p className="op-l-quote">“{content.message}”</p>
          <PosterMeta content={content} />
        </div>
        <div className="op-l-portrait">
          <PosterPhoto content={content} />
          <span className="op-l-portrait__badge">
            <ShieldCheck aria-hidden="true" />
            LBSAA MEMBER
          </span>
        </div>
      </section>

      <section className="op-l-health">
        <div className="op-l-health__head">
          <span>
            <Activity aria-hidden="true" />
            PUBLIC HEALTH GUIDANCE
          </span>
          <h2>EBOLA: KNOW THE FACTS</h2>
          <p>{HEALTH_INTRO}</p>
        </div>
        <div className="op-l-health__col">
          <h3>
            <Thermometer aria-hidden="true" />
            SYMPTOMS TO WATCH FOR
          </h3>
          <ul className="op-l-symptoms">
            {SYMPTOMS.map((symptom) => (
              <li key={symptom}>
                <span aria-hidden="true" />
                {symptom}
              </li>
            ))}
          </ul>
          <p className="op-l-caution">
            <Info aria-hidden="true" />
            {SYMPTOM_CAUTION}
          </p>
        </div>
        <div className="op-l-health__col op-l-health__col--prevention">
          <h3>
            <Shield aria-hidden="true" />
            PROTECT YOURSELF AND YOUR COMMUNITY
          </h3>
          <ul className="op-l-prevention">
            {PREVENTION_ACTIONS.map((action) => (
              <li key={action}>
                <Check aria-hidden="true" />
                {action}
              </li>
            ))}
          </ul>
        </div>
        <div className="op-l-callout">
          <AlertTriangle aria-hidden="true" />
          {EMERGENCY_CALLOUT}
        </div>
      </section>

      <footer className="op-l-footer">
        <PosterValues theme="light" />
        <PosterMotto className="op-l-footer__motto" />
        <PosterDisclaimer className="op-l-footer__disclaimer" />
        <PosterContacts content={content} theme="light" compact />
      </footer>
    </article>
  );
}

export function OfficialTemplate({
  content,
  format,
}: {
  content: PosterContent;
  format: PosterFormat;
}) {
  if (format === 'landscape') {
    return <OfficialLandscape content={content} />;
  }
  return <OfficialPortrait content={content} format={format} />;
}
