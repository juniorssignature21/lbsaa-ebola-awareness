export type PosterTemplate = 'official' | 'modern' | 'minimal';

export type PosterFormat = 'portrait' | 'story' | 'landscape';

export interface PosterSize {
  width: number;
  height: number;
  label: string;
  shortLabel: string;
  dimensions: string;
  description: string;
  fileName: string;
}

export interface CampaignFields {
  fullName: string;
  title: string;
  company: string;
  programme: string;
  classYear: string;
  location: string;
  message: string;
  email: string;
  phone: string;
  linkedin: string;
  includeContact: boolean;
  verifiedEnabled: boolean;
  verifiedHeadline: string;
  verifiedSource: string;
  verifiedDate: string;
  verifiedConfirmed: boolean;
}

export interface PhotoState {
  src: string;
  name: string;
  width: number;
  height: number;
  positionX: number;
  positionY: number;
}

export interface VerifiedNotice {
  headline: string;
  source: string;
  sourceDate: string;
}

export interface PosterContent {
  fullName: string;
  title: string;
  company: string;
  programme: string;
  classYear: string;
  location: string;
  message: string;
  email: string;
  phone: string;
  linkedin: string;
  showContact: boolean;
  photoSrc: string | null;
  photoAlt: string;
  photoPosition: { x: number; y: number };
  verifiedNotice: VerifiedNotice | null;
}

export interface CampaignErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  message?: string;
  verifiedHeadline?: string;
  verifiedSource?: string;
  verifiedDate?: string;
  verifiedConfirmed?: string;
}

export interface DraftState {
  fields: Partial<CampaignFields>;
  template: PosterTemplate;
}

export interface TemplateDefinition {
  id: PosterTemplate;
  code: string;
  name: string;
  description: string;
  swatches: string[];
}
