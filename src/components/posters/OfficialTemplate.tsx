import {
  AlertTriangle,
  BatteryLow,
  Droplets,
  Hand,
  HandHeart,
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
import { getDisplayName, getMemberMeta, getRoleLine } from '../../utils/poster';
import {
  PosterContacts,
  PosterPhoto,
  PosterValues,
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
        <div className="em-card__heading-copy">
          <h2 className="em-card__title">
            {symptoms ? 'Know the Facts' : 'Prevention'}
          </h2>
          <p className="em-card__subtitle">
            {symptoms ? 'Symptoms' : 'Protect Our Community'}
          </p>
        </div>
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
      <div className="em-footer__top">
        <p className="em-footer__emergency">{EMERGENCY_CONTACT}</p>
        <div className="em-footer__right">
          <span className="em-footer__org">{ORGANISATION_NAME}</span>
          {content.showContact ? (
            <PosterContacts content={content} theme="dark" compact />
          ) : null}
        </div>
      </div>
      <p className="em-footer__initiative">INITIATIVE OF LBSAA SS/SE ZONE</p>
    </footer>
  );
}

function CampaignBanner() {
  return (
    <section className="em-campaign-banner" aria-label="Campaign message">
      <HandHeart aria-hidden="true" />
      <div>
        <h2>Together We Can Stop Ebola</h2>
        <p>Awareness saves lives.</p>
      </div>
    </section>
  );
}

function MemberPhoto({ content }: { content: PosterContent }) {
  const name = getDisplayName(content.fullName);
  const role = getRoleLine(content);
  const memberMeta = getMemberMeta(content).join(' · ');

  return (
    <aside className="em-profile">
      <div className="em-photo">
        <PosterPhoto content={content} />
      </div>
      <div className="em-profile__copy">
        <p className="em-caption">LBSAA Alumni</p>
        <h2 className="em-name">{name}</h2>
        {role ? <p className="em-role">{role}</p> : null}
        {memberMeta ? <p className="em-member-meta">{memberMeta}</p> : null}
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
          <div className="em-alert">
            <AlertTriangle aria-hidden="true" />
            <strong>EBOLA ALERT — ACT NOW</strong>
          </div>
          <VerifiedNoticeBanner content={content} />
          <h1 className="em-headline">
            Ebola: Know the Facts
          </h1>
          <p className="em-subhead">
            Stay informed. Stay safe. Protect yourself, your family and your community.
          </p>
        </div>

        <MemberPhoto content={content} />
      </section>

      <section className="em-cards">
        <FactsCard kind="symptoms" />
        <FactsCard kind="prevention" />
      </section>

      {format === 'portrait' ? <CampaignBanner /> : <PosterValues theme="light" />}
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
          <div className="em-alert">
            <AlertTriangle aria-hidden="true" />
            <strong>EBOLA ALERT — ACT NOW</strong>
          </div>
          <VerifiedNoticeBanner content={content} />
          <h1 className="em-l-headline">
            Ebola: Know the Facts
          </h1>
          <p className="em-l-subhead">
            Stay informed. Stay safe. Protect yourself, your family and your community.
          </p>

          <div className="em-l-cards">
            <FactsCard kind="symptoms" />
            <FactsCard kind="prevention" />
          </div>
        </div>

        <MemberPhoto content={content} />
      </section>

      <PosterValues theme="light" />
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
