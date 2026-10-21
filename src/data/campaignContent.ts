import type {
  PosterFormat,
  PosterSize,
  TemplateDefinition,
} from '../types/campaign';

export const ORGANISATION_NAME = 'Lagos Business School Alumni Association';
export const ORGANISATION_SHORT_NAME = 'LBSAA';
export const ALERT_HEADLINE = 'EBOLA AWARENESS — ACT RESPONSIBLY';
export const ALERT_LABEL = 'Public health notice';

export const DEFAULT_MESSAGE =
  'Together, we can promote awareness, encourage prevention, and protect our communities through responsible action.';

export const MAX_MESSAGE_WORDS = 30;
export const MAX_MESSAGE_LENGTH = 240;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export const HEALTH_INTRO =
  'Ebola virus disease is a serious illness that can spread through direct contact with the blood or other body fluids of a person who is sick with or has died from the disease, or contaminated materials.';

export const SYMPTOMS = [
  'Fever.',
  'Fatigue and weakness.',
  'Headache and muscle pain.',
  'Vomiting or diarrhoea.',
  'Unexplained bleeding may occur in some cases.',
];

export const SYMPTOM_CAUTION =
  'These symptoms can also occur in other illnesses and require professional assessment.';

export const PREVENTION_ACTIONS = [
  'Avoid direct contact with the blood and body fluids of people who are sick.',
  'Wash hands regularly with soap and water.',
  'Avoid handling potentially contaminated materials.',
  'Do not touch the body of someone who has died from suspected Ebola.',
  'Seek medical attention promptly if symptoms develop after a possible exposure.',
  'Follow instructions from qualified public health authorities.',
];

export const EMERGENCY_CALLOUT =
  'IF YOU SUSPECT EBOLA, SEEK PROFESSIONAL MEDICAL HELP AND CONTACT THE APPROPRIATE PUBLIC HEALTH AUTHORITIES PROMPTLY.';

export const DISCLAIMER =
  'This poster provides general awareness information and does not replace professional medical advice. Follow current guidance from the appropriate public health authorities.';

export const LBSAA_VALUES = [
  'Leadership in crisis',
  'Stay informed',
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
    name: 'Official Campaign',
    description: 'Classic LBSAA blue, white facts panel and red alert treatment.',
    swatches: ['#0755A5', '#063A78', '#C8202F'],
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
