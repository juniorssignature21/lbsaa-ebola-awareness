import { ArrowUpRight, LockKeyhole, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { DISCLAIMER, ORGANISATION_NAME } from '../data/campaignContent';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__top">
        <div className="site-footer__brand">
          <div className="site-footer__marks">
            <BrandLogo theme="white" className="site-footer__logo" />
            <img
              src="/assets/lbs-school-logo.png"
              alt="Lagos Business School, Pan-Atlantic University"
              className="site-footer__school-logo"
            />
          </div>
          <p>
            A community health initiative from the Lagos Business School Alumni
            Association.
          </p>
          <Link to="/generator" className="text-link text-link--light">
            Create your awareness poster
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="site-footer__column">
          <p className="site-footer__label">CAMPAIGN TOOL</p>
          <Link to="/">Home</Link>
          <Link to="/generator">Poster generator</Link>
          <Link to="/" state={{ scrollTo: 'campaign-notice' }}>
            Public health notice
          </Link>
        </div>

        <div className="site-footer__column site-footer__column--wide">
          <p className="site-footer__label">OUR COMMITMENT</p>
          <p>
            Accurate, calm and useful information. No photographs or personal
            details are uploaded to a server — your poster is created in your
            browser.
          </p>
          <p className="site-footer__privacy">
            <LockKeyhole size={15} aria-hidden="true" />
            Private by design
          </p>
        </div>
      </div>

      <div className="shell site-footer__disclaimer">
        <p>{DISCLAIMER}</p>
        <p className="site-footer__referral">
          <Mail size={14} aria-hidden="true" />
          For official campaign enquiries, contact your LBSAA chapter
          representative.
        </p>
      </div>

      <div className="shell site-footer__bottom">
        <p>© {new Date().getFullYear()} {ORGANISATION_NAME}.</p>
        <p>Once a LBS, Always a LBS.</p>
      </div>
    </footer>
  );
}
