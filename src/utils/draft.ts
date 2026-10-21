import type {
  CampaignFields,
  DraftState,
  PosterTemplate,
} from '../types/campaign';

const DRAFT_KEY = 'lbsaa-ebola-campaign-draft-v1';
const TEMPLATES: PosterTemplate[] = ['official', 'modern', 'minimal'];

const SAFE_FIELDS: Array<keyof CampaignFields> = [
  'fullName',
  'title',
  'company',
  'programme',
  'classYear',
  'location',
  'message',
  'includeContact',
];

export function loadDraft(): DraftState | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<DraftState>;
    if (!parsed || typeof parsed !== 'object' || !parsed.fields) return null;

    const fields: Partial<CampaignFields> = {};
    SAFE_FIELDS.forEach((key) => {
      const value = parsed.fields?.[key];
      if (key === 'includeContact') {
        if (typeof value === 'boolean') fields.includeContact = value;
      } else if (typeof value === 'string') {
        fields[key] = value as never;
      }
    });

    const template = TEMPLATES.includes(parsed.template as PosterTemplate)
      ? (parsed.template as PosterTemplate)
      : 'official';

    return { fields, template };
  } catch {
    return null;
  }
}

export function saveDraft(fields: CampaignFields, template: PosterTemplate): void {
  try {
    const safeFields: Partial<CampaignFields> = {};
    SAFE_FIELDS.forEach((key) => {
      if (key === 'includeContact') {
        safeFields.includeContact = fields.includeContact;
      } else {
        safeFields[key] = fields[key] as never;
      }
    });
    window.localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ fields: safeFields, template }),
    );
  } catch {
    // A full or disabled localStorage should never stop the campaign tool.
  }
}

export function clearDraft(): void {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Ignore storage access failures.
  }
}
