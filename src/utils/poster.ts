import { DEFAULT_MESSAGE } from '../data/campaignContent';
import type {
  CampaignFields,
  PhotoState,
  PosterContent,
} from '../types/campaign';

export function createPosterContent(
  fields: CampaignFields,
  photo: PhotoState | null,
): PosterContent {
  const verifiedNotice =
    fields.verifiedEnabled &&
    fields.verifiedConfirmed &&
    fields.verifiedHeadline.trim() &&
    fields.verifiedSource.trim() &&
    fields.verifiedDate
      ? {
          headline: fields.verifiedHeadline.trim(),
          source: fields.verifiedSource.trim(),
          sourceDate: fields.verifiedDate,
        }
      : null;

  return {
    fullName: fields.fullName.trim(),
    title: fields.title.trim(),
    company: fields.company.trim(),
    programme: fields.programme.trim(),
    classYear: fields.classYear.trim(),
    location: fields.location.trim(),
    message: fields.message.trim() || DEFAULT_MESSAGE,
    email: fields.email.trim(),
    phone: fields.phone.trim(),
    linkedin: fields.linkedin.trim(),
    showContact: fields.includeContact,
    photoSrc: photo?.src ?? null,
    photoAlt: fields.fullName.trim()
      ? `Campaign portrait of ${fields.fullName.trim()}`
      : 'LBSAA member campaign portrait',
    photoPosition: {
      x: photo?.positionX ?? 50,
      y: photo?.positionY ?? 35,
    },
    verifiedNotice,
  };
}

export function getDisplayName(fullName: string): string {
  const name = fullName.trim();
  return name || 'Your Name';
}

export function getInitials(fullName: string): string {
  const words = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) return 'LBS';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export function getRoleLine(content: PosterContent): string {
  return [content.title, content.company].filter(Boolean).join(' · ');
}

export function getMemberMeta(content: PosterContent): string[] {
  const items: string[] = [];
  if (content.programme) {
    items.push(
      content.classYear
        ? `${content.programme} · Class of ${content.classYear}`
        : content.programme,
    );
  } else if (content.classYear) {
    items.push(`Class of ${content.classYear}`);
  }
  if (content.location) items.push(content.location);
  return items;
}

export function getWebsiteContact(content: PosterContent): string[] {
  if (!content.showContact) return [];
  return [content.email, content.phone, content.linkedin].filter(Boolean);
}

export function stripProtocol(value: string): string {
  return value.replace(/^https?:\/\//i, '').replace(/\/$/, '');
}

export function formatSourceDate(value: string): string {
  if (!value) return '';
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}
