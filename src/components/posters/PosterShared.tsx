import { useEffect, useState } from 'react';
import {
  BadgeCheck,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { BrandMarks } from '../BrandLogo';
import {
  LBSAA_VALUES,
  POSTER_NOTICE,
} from '../../data/campaignContent';
import type { PosterContent } from '../../types/campaign';
import {
  formatSourceDate,
  getInitials,
  getWebsiteContact,
  stripProtocol,
} from '../../utils/poster';

export function PosterWordmark({
  theme = 'light',
}: {
  theme?: 'light' | 'dark';
}) {
  return (
    <div className={`poster-wordmark poster-wordmark--${theme}`}>
      <BrandMarks
        theme={theme === 'light' ? 'white' : 'navy'}
        variant="emblem"
        className="poster-wordmark__marks"
        logoClassName="poster-wordmark__mark"
        schoolLogoClassName="poster-wordmark__mark poster-wordmark__mark--school"
        divider
      />
      <div className="poster-wordmark__copy">
        <span>LAGOS BUSINESS SCHOOL</span>
        <strong>ALUMNI ASSOCIATION</strong>
      </div>
    </div>
  );
}

export function PosterPhoto({
  content,
  theme = 'light',
}: {
  content: PosterContent;
  theme?: 'light' | 'dark';
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [content.photoSrc]);

  return (
    <div className={`poster-photo poster-photo--${theme}`}>
      {content.photoSrc && !failed ? (
        <img
          src={content.photoSrc}
          alt={content.photoAlt}
          draggable={false}
          style={{
            objectPosition: `${content.photoPosition.x}% ${content.photoPosition.y}%`,
          }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="poster-photo__placeholder" aria-label="No photograph uploaded">
          <span className="poster-photo__initials">{getInitials(content.fullName)}</span>
          <span className="poster-photo__placeholder-label">YOUR PHOTO</span>
        </div>
      )}
    </div>
  );
}

export function PosterContacts({
  content,
  theme = 'light',
  compact = false,
}: {
  content: PosterContent;
  theme?: 'light' | 'dark';
  compact?: boolean;
}) {
  const contacts = getWebsiteContact(content);
  if (!contacts.length) return null;

  return (
    <div
      className={`poster-contacts poster-contacts--${theme}${
        compact ? ' poster-contacts--compact' : ''
      }`}
    >
      {content.email ? (
        <span>
          <Mail aria-hidden="true" />
          {content.email}
        </span>
      ) : null}
      {content.phone ? (
        <span>
          <Phone aria-hidden="true" />
          {content.phone}
        </span>
      ) : null}
      {content.linkedin ? (
        <span>
          <BadgeCheck aria-hidden="true" />
          {stripProtocol(content.linkedin)}
        </span>
      ) : null}
    </div>
  );
}

export function VerifiedNoticeBanner({
  content,
  theme = 'light',
}: {
  content: PosterContent;
  theme?: 'light' | 'dark';
}) {
  if (!content.verifiedNotice) return null;
  const notice = content.verifiedNotice;

  return (
    <div className={`poster-verified poster-verified--${theme}`}>
      <ShieldCheck aria-hidden="true" />
      <div>
        <span className="poster-verified__label">VERIFIED PUBLIC HEALTH NOTICE</span>
        <strong>{notice.headline}</strong>
        <span className="poster-verified__source">
          Source: {notice.source} · {formatSourceDate(notice.sourceDate)}
        </span>
      </div>
    </div>
  );
}

export function PosterValues({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  return (
    <div className={`poster-values poster-values--${theme}`}>
      <span className="poster-values__label">LBSAA VALUES</span>
      <span className="poster-values__list">
        {LBSAA_VALUES.map((value, index) => (
          <span key={value}>
            {index > 0 ? <i aria-hidden="true">|</i> : null}
            {value.toUpperCase()}
          </span>
        ))}
      </span>
    </div>
  );
}

export function PosterNotice({
  theme = 'light',
  className = '',
}: {
  theme?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <p className={`poster-notice poster-notice--${theme} ${className}`.trim()}>
      {POSTER_NOTICE}
    </p>
  );
}

export function PosterMeta({
  content,
  theme = 'light',
}: {
  content: PosterContent;
  theme?: 'light' | 'dark';
}) {
  const items = [
    content.location ? { icon: MapPin, value: content.location } : null,
    content.programme
      ? {
          icon: ShieldCheck,
          value: content.classYear
            ? `${content.programme} · Class of ${content.classYear}`
            : content.programme,
        }
      : content.classYear
        ? { icon: ShieldCheck, value: `Class of ${content.classYear}` }
        : null,
  ].filter(Boolean) as Array<{ icon: typeof MapPin; value: string }>;

  if (!items.length) return null;

  return (
    <div className={`poster-meta poster-meta--${theme}`}>
      {items.map(({ icon: Icon, value }) => (
        <span key={value}>
          <Icon aria-hidden="true" />
          {value}
        </span>
      ))}
    </div>
  );
}
