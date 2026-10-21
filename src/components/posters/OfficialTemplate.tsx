import {
  BatteryLow,
  Droplets,
  Hand,
  PhoneCall,
  ShieldCheck,
  Thermometer,
  UserX,
} from 'lucide-react';
import { BrandMarks } from '../BrandLogo';
import {
  EMERGENCY_CONTACT,
  ORGANISATION_NAME,
  PREVENTION_ACTIONS,
  SYMPTOMS,
} from '../../data/campaignContent';
import type { PosterContent, PosterFormat } from '../../types/campaign';
import { getDisplayName } from '../../utils/poster';
import {
  PosterContacts,
  PosterPhoto,
  VerifiedNoticeBanner,
} from './PosterShared';

const SYMPTOM_ICONS = [Thermometer, BatteryLow, Droplets];
const PREVENTION_ICONS = [Hand, UserX, PhoneCall];

type FactKind = 'symptoms' | 'prevention';

function FactsCard({ kind }: { kind: FactKind }) {
  const symptoms = kind === 'symptoms';
  const items = symptoms ? SYMPTOMS : PREVENTION_ACTIONS;
  const icons = symptoms ? SYMPTOM_ICONS : PREVENTION_ICONS;

  return (
    <section className={`em-card em-card--${kind}`}>
      <div className="em-card__head">
        <span className="em-card__badge" aria-hidden="true">
          {symptoms ? <Thermometer /> : <ShieldCheck />}
        </span>
        <h2 className="em-card__title">
          {symptoms ? 'Symptoms' : 'Prevention'}
        </h2>
      </div>

      <ul className="em-card__list">
        {items.map((item, index) => {
          const Icon = icons[index] ?? Thermometer;
          return (
            <li key={item}>
              <span className="em-card__item-icon" aria-hidden="true">
                <Icon />
              </span>
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function SlimHeader() {
  return (
    <header className="em-header">
      <BrandMarks
        theme="navy"
        className="em-marks"
        logoClassName="em-marks__lbsaa"
        schoolLogoClassName="em-marks__school"
        divider
      />
      <span className="em-accent" aria-hidden="true" />
    </header>
  );
}

function SlimFooter({ content }: { content: PosterContent }) {
  return (
    <footer className="em-footer">
      <p className="em-footer__emergency">{EMERGENCY_CONTACT}</p>
      <div className="em-footer__right">
        <span className="em-footer__org">{ORGANISATION_NAME}</span>
        {content.showContact ? (
          <PosterContacts content={content} theme="dark" compact />
        ) : null}
      </div>
    </footer>
  );
}

function MemberPhoto({ content }: { content: PosterContent }) {
  const name = getDisplayName(content.fullName);

  return (
    <aside className="em-profile">
      <div className="em-photo">
        <PosterPhoto content={content} />
      </div>
      <div className="em-profile__copy">
        <p className="em-caption">A message from an LBSAA member</p>
        <h2 className="em-name">{name}</h2>
        <p className="em-quote">“{content.message}”</p>
      </div>
    </aside>
  );
}

function OfficialPortrait({
  content,
  format,
}: {
  content: PosterContent;
  format: PosterFormat;
}) {
  return (
    <article
      className={`poster poster--official em-poster poster--${format}`}
    >
      <SlimHeader />

      <section className="em-hero">
        <div className="em-hero__copy">
          <VerifiedNoticeBanner content={content} />
          <h1 className="em-headline">
            Ebola:
            <br />
            Know the Facts
          </h1>
          <p className="em-subhead">
            Stay alert. Stay safe. Act responsibly.
          </p>
        </div>

        <MemberPhoto content={content} />
      </section>

      <section className="em-cards">
        <FactsCard kind="symptoms" />
        <FactsCard kind="prevention" />
      </section>

      <SlimFooter content={content} />
    </article>
  );
}

function OfficialLandscape({ content }: { content: PosterContent }) {
  return (
    <article className="poster poster--official em-poster poster--landscape">
      <SlimHeader />

      <section className="em-l-body">
        <div className="em-l-copy">
          <VerifiedNoticeBanner content={content} />
          <h1 className="em-l-headline">
            Ebola: Know the Facts
          </h1>
          <p className="em-l-subhead">
            Stay alert. Stay safe. Act responsibly.
          </p>

          <div className="em-l-cards">
            <FactsCard kind="symptoms" />
            <FactsCard kind="prevention" />
          </div>
        </div>

        <MemberPhoto content={content} />
      </section>

      <SlimFooter content={content} />
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
