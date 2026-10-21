import type {
  PosterFormat,
  PosterSize,
  TemplateDefinition,
} from '../types/campaign';

export const ORGANISATION_NAME = 'Lagos Business School Alumni Association';
export const ORGANISATION_SHORT_NAME = 'LBSAA';
export const ALERT_HEADLINE = 'EBOLA ALERT — ACT NOW';
export const ALERT_LABEL = 'Public health notice';

export const DEFAULT_MESSAGE =
  'Together, we can promote awareness, encourage prevention, and protect our communities.';

export const MAX_MESSAGE_WORDS = 20;
export const MAX_MESSAGE_LENGTH = 200;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export const SYMPTOMS = [
  'Fever & high temperature',
  'Fatigue & weakness',
  'Bleeding (gums, nose)',
];

export const PREVENTION_ACTIONS = [
  'Wash hands with soap or sanitizer',
  'Avoid contact with sick people',
  'Report suspected cases immediately',
];

export const EMERGENCY_CONTACT =
  'Emergency updates: NCDC 6232 · www.ncdc.gov.ng';

export const POSTER_NOTICE =
  'For emergency updates contact NCDC: 6232 | www.ncdc.gov.ng | Lagos Business School Alumni Association';

export const DISCLAIMER =
  'This poster provides general awareness information and does not replace professional medical advice. Follow current guidance from the appropriate public health authorities.';

export const LBSAA_VALUES = [
  'Leadership in crisis',
  'Stay alert, stay safe',
  'Act responsibly',
];

export const LBSAA_MOTTO = 'Once a LBS, Always a LBS';

export const CAMPAIGN_SHARE_MESSAGE =
  'I stand with the Lagos Business School Alumni Association in promoting Ebola awareness. Stay informed, follow verified public health guidance, and help protect our communities.';

export const CAMPAIGN_NOTICE =
  'This campaign promotes awareness, prevention and responsible reporting of suspected cases. It does not replace professional medical advice or guidance from public health authorities.';

export const VERIFIED_NOTICE_GUIDANCE =
  'Only complete this section if the campaign is responding to an officially confirmed public health notice. It is displayed on the poster with its named source and date.';

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'official',
    code: 'A',
    name: 'Modern Minimal',
    description: 'Calm navy and white layout with soft cards and thin line icons.',
    swatches: ['#0B2E5C', '#F5F9FD', '#D62839'],
  },
  {
    id: 'modern',
    code: 'B',
    name: 'Modern Awareness',
    description: 'Deep navy, light-blue geometry and contemporary editorial type.',
    swatches: ['#041E45', '#2C82D9', '#EAF4FF'],
  },
  {
    id: 'minimal',
    code: 'C',
    name: 'Minimal Awareness',
    description: 'A calm white canvas with crisp navy typography and red accents.',
    swatches: ['#FFFFFF', '#17243A', '#C8202F'],
  },
];

export const POSTER_SIZES: Record<PosterFormat, PosterSize> = {
  portrait: {
    width: 1080,
    height: 1350,
    label: 'Portrait',
    shortLabel: 'Portrait',
    dimensions: '1080 × 1350 px',
    description: 'WhatsApp, Instagram feed and LinkedIn',
    fileName: 'lbsaa-ebola-awareness-portrait',
  },
  story: {
    width: 1080,
    height: 1920,
    label: 'Story',
    shortLabel: 'Story',
    dimensions: '1080 × 1920 px',
    description: 'Stories, status and vertical screens',
    fileName: 'lbsaa-ebola-awareness-story',
  },
  landscape: {
    width: 1200,
    height: 630,
    label: 'Landscape',
    shortLabel: 'Landscape',
    dimensions: '1200 × 630 px',
    description: 'LinkedIn and landscape social posts',
    fileName: 'lbsaa-ebola-awareness-landscape',
  },
};

export const PHOTO_RULES = 'JPG, PNG or WEBP · up to 10 MB';
