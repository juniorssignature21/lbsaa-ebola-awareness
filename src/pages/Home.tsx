import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Download,
  FileCheck2,
  ImagePlus,
  LockKeyhole,
  PencilLine,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PosterPreview } from '../components/PosterPreview';
import { TemplatePicker } from '../components/TemplatePicker';
import { BrandMarks } from '../components/BrandLogo';
import {
  ALERT_HEADLINE,
  CAMPAIGN_NOTICE,
  DISCLAIMER,
  ORGANISATION_NAME,
  POSTER_SIZES,
} from '../data/campaignContent';
import { SAMPLE_MEMBER, SAMPLE_PHOTO } from '../data/sampleMember';
import type { PosterTemplate } from '../types/campaign';
import { createPosterContent } from '../utils/poster';

const SAMPLE_CONTENT = createPosterContent(SAMPLE_MEMBER, SAMPLE_PHOTO);

const STEPS = [
  {
    number: '01',
    icon: PencilLine,
    title: 'Add your details',
    body: 'Share your name, professional role and optional LBS programme so the poster feels authentically yours.',
  },
  {
    number: '02',
    icon: ImagePlus,
    title: 'Upload your photograph',
    body: 'Choose a clear portrait, then adjust the framing directly in the tool. Your photo never leaves this browser.',
  },
  {
    number: '03',
    icon: Download,
    title: 'Download and share',
    body: 'Pick a style and format, then export a crisp LBSAA-branded PNG for WhatsApp, Instagram or LinkedIn.',
  },
];

const PRINCIPLES = [
  {
    icon: FileCheck2,
    title: 'Carefully worded guidance',
    body: 'Fixed, reviewed education about symptoms, prevention and when to seek professional medical help.',
  },
  {
    icon: AlertTriangle,
    title: 'No scare tactics',
    body: 'No invented case counts, death tolls or emergency declarations. Clarity, not sensationalism.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified information only',
    body: 'Organiser notices must name an official source and date, and are never added by default.',
  },
];

export function Home() {
  const [sampleTemplate, setSampleTemplate] = useState<PosterTemplate>('official');
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (!state?.scrollTo) return;
    const targetId = state.scrollTo;
    const timeout = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
    return () => window.clearTimeout(timeout);
  }, [location.state]);

  const scrollToSample = () => {
    document.getElementById('sample-poster')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <SiteHeader />

      <main id="main-content">
        <section className="home-hero" aria-labelledby="hero-heading">
          <div className="home-hero__pattern" aria-hidden="true">
            <span className="home-hero__ring home-hero__ring--one" />
            <span className="home-hero__ring home-hero__ring--two" />
            <span className="home-hero__cross" />
            <span className="home-hero__dots" />
          </div>

          <div className="shell home-hero__grid">
            <div className="home-hero__copy">
              <div className="home-hero__eyebrow">
                <span className="home-hero__eyebrow-mark">
                  <ShieldCheck size={16} aria-hidden="true" />
                </span>
                <span>LBSAA COMMUNITY HEALTH INITIATIVE</span>
              </div>

              <h1 id="hero-heading">
                Stand Together
                <br />
                Against <em>Ebola</em>
              </h1>

              <p className="home-hero__lead">
                Create your personalized LBSAA Ebola awareness poster and help
                spread life-saving information across your community.
              </p>

              <div className="home-hero__actions">
                <Link to="/generator" className="button button--alert button--large">
                  Create My Awareness Poster
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  className="button button--ghost-light button--large"
                  onClick={scrollToSample}
                >
                  View Sample Poster
                  <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </div>

              <p className="home-hero__alert">
                <AlertTriangle size={15} aria-hidden="true" />
                {ALERT_HEADLINE}
              </p>

              <ul className="home-hero__trust" aria-label="Campaign tool features">
                <li>
                  <Check size={14} aria-hidden="true" />
                  No sign-in
                </li>
                <li>
                  <Check size={14} aria-hidden="true" />
                  Private by design
                </li>
                <li>
                  <Check size={14} aria-hidden="true" />
                  Ready in under 2 minutes
                </li>
              </ul>
            </div>

            <div className="home-hero__visual">
              <div className="home-hero__visual-backdrop" aria-hidden="true" />
              <div className="home-hero__poster">
                <PosterPreview
                  content={SAMPLE_CONTENT}
                  template="official"
                  format="portrait"
                />
              </div>
              <div className="home-hero__float home-hero__float--top">
                <ShieldCheck size={17} aria-hidden="true" />
                <span>LBSAA branded</span>
              </div>
              <div className="home-hero__float home-hero__float--bottom">
                <span className="home-hero__float-dot" aria-hidden="true" />
                <span>
                  Facts first.
                  <strong>Fear never.</strong>
                </span>
              </div>
              <p className="home-hero__sample-note">
                Sample poster · your details and photo replace this preview
              </p>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Poster formats and privacy">
          <div className="shell trust-strip__inner">
            <span className="trust-strip__label">BUILT FOR REAL CONVERSATIONS</span>
            <span>Portrait 1080 × 1350</span>
            <span>Story 1080 × 1920</span>
            <span>Landscape 1200 × 630</span>
            <span className="trust-strip__privacy">
              <LockKeyhole size={15} aria-hidden="true" />
              100% in-browser
            </span>
          </div>
        </section>

        <section className="home-steps" id="how-it-works" aria-labelledby="steps-heading">
          <div className="shell">
            <div className="section-intro">
              <span className="eyebrow">THREE SIMPLE STEPS</span>
              <h2 id="steps-heading">
                From your details to a poster
                <br />
                your community can use.
              </h2>
              <p>
                No design software. No account. The campaign layout is assembled
                automatically, with clear health information kept exactly where it
                belongs.
              </p>
            </div>

            <ol className="steps-grid">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.number} className="step-card">
                    <div className="step-card__top">
                      <span className="step-card__number">{step.number}</span>
                      <span className="step-card__icon">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                );
              })}
            </ol>

            <div className="steps-grid__cta">
              <Link to="/generator" className="text-link">
                Create your poster now
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <span>Usually completed in less than two minutes.</span>
            </div>
          </div>
        </section>

        <section className="principles-section" aria-labelledby="principles-heading">
          <div className="shell principles-section__grid">
            <div className="principles-section__intro">
              <span className="eyebrow eyebrow--light">A RESPONSIBLE CAMPAIGN</span>
              <h2 id="principles-heading">
                Awareness should be
                <br />
                clear, calm and credible.
              </h2>
              <p>
                The poster format keeps the essential facts visible while giving
                every LBSAA member a voice in sharing them responsibly.
              </p>
              <Link to="/generator" className="button button--ghost-light">
                Make it yours
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="principles-list">
              {PRINCIPLES.map((principle) => {
                const Icon = principle.icon;
                return (
                  <article key={principle.title} className="principle-card">
                    <span className="principle-card__icon">
                      <Icon size={21} aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{principle.title}</h3>
                      <p>{principle.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="sample-poster-section"
          id="sample-poster"
          aria-labelledby="sample-heading"
        >
          <div className="shell sample-poster-section__grid">
            <div className="sample-poster-section__copy">
              <span className="eyebrow">SEE THE CAMPAIGN</span>
              <h2 id="sample-heading">
                One message.
                <br />
                Three distinct styles.
              </h2>
              <p>
                Every style keeps the LBSAA identity, member photograph and
                complete public health guidance intact. Switch between them
                without rebuilding a thing.
              </p>

              <TemplatePicker value={sampleTemplate} onChange={setSampleTemplate} />

              <ul className="sample-poster-section__points">
                <li>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  Your photograph stays prominent.
                </li>
                <li>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  All text remains legible at export size.
                </li>
                <li>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  LBSAA values anchor every design.
                </li>
              </ul>

              <Link to="/generator" className="button button--primary">
                Create My Awareness Poster
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="sample-poster-section__stage">
              <div className="sample-poster-section__stage-inner">
                <PosterPreview
                  content={SAMPLE_CONTENT}
                  template={sampleTemplate}
                  format="portrait"
                />
              </div>
              <div className="sample-poster-section__caption">
                <BrandMarks
                  theme="navy"
                  variant="emblem"
                  className="sample-caption-marks"
                  logoClassName="sample-caption-logo"
                  schoolLogoClassName="sample-caption-logo"
                />
                <span>
                  SAMPLE MEMBER POSTER
                  <small>Name and role from the LBSAA reference campaign.</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="campaign-notice-section"
          id="campaign-notice"
          aria-labelledby="notice-heading"
        >
          <div className="shell campaign-notice-section__grid">
            <div className="campaign-notice-card">
              <span className="campaign-notice-card__icon">
                <ShieldCheck size={24} aria-hidden="true" />
              </span>
              <span className="eyebrow">THE PURPOSE</span>
              <h2 id="notice-heading">Awareness, prevention and responsible reporting.</h2>
              <p>{CAMPAIGN_NOTICE}</p>
              <div className="campaign-notice-card__disclaimer">
                <strong>Important</strong>
                <p>{DISCLAIMER}</p>
              </div>
            </div>

            <div className="format-card">
              <span className="format-card__eyebrow">
                <Sparkles size={15} aria-hidden="true" />
                MADE FOR YOUR CHANNELS
              </span>
              <h3>Download once. Share everywhere.</h3>
              <div className="format-card__list">
                {Object.values(POSTER_SIZES).map((size) => (
                  <div key={size.label} className="format-card__item">
                    <span className="format-card__item-icon" aria-hidden="true">
                      <span className={`ratio-shape ratio-shape--${size.label.toLowerCase()}`} />
                    </span>
                    <span>
                      <strong>{size.label}</strong>
                      <small>{size.dimensions}</small>
                    </span>
                    <span className="format-card__use">{size.description}</span>
                  </div>
                ))}
              </div>
              <p className="format-card__note">
                Exported at exact pixel dimensions with the poster only — no
                interface or form controls.
              </p>
            </div>
          </div>
        </section>

        <section className="closing-cta" aria-labelledby="closing-heading">
          <div className="closing-cta__pattern" aria-hidden="true" />
          <div className="shell closing-cta__inner">
            <div>
              <span className="eyebrow eyebrow--light">YOUR VOICE MATTERS</span>
              <h2 id="closing-heading">
                Help the right information
                <br />
                travel further.
              </h2>
            </div>
            <div className="closing-cta__action">
              <p>
                Add your name and photograph to a campaign built on facts,
                responsibility and community care.
              </p>
              <Link to="/generator" className="button button--alert button--large">
                Create My Awareness Poster
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="closing-cta__foot">
            <div className="shell closing-cta__foot-inner">
              <span>{ORGANISATION_NAME}</span>
              <span>Leadership in crisis · Stay informed · Act responsibly</span>
              <span>Once a LBS, Always a LBS</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
