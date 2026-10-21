import {
  MAX_MESSAGE_WORDS,
  SYMPTOMS,
  VERIFIED_NOTICE_GUIDANCE,
} from '../data/campaignContent';
import type { CampaignErrors, CampaignFields } from '../types/campaign';
import { countWords } from './wordCount';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LINKEDIN_PATTERN =
  /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9_%\-/]+\/?$/i;

export function validateEmail(email: string): string | undefined {
  const value = email.trim();
  if (!value) return undefined;
  return EMAIL_PATTERN.test(value)
    ? undefined
    : 'Enter a valid email address, such as name@example.com.';
}

export function validatePhone(phone: string): string | undefined {
  const value = phone.trim();
  if (!value) return undefined;
  if (!/^[+()\d\s\-.]{7,}$/.test(value) || value.replace(/\D/g, '').length < 7) {
    return 'Enter a valid phone number, or leave this field blank.';
  }
  return undefined;
}

export function validateLinkedin(linkedin: string): string | undefined {
  const value = linkedin.trim();
  if (!value) return undefined;
  return LINKEDIN_PATTERN.test(value)
    ? undefined
    : 'Use a LinkedIn profile URL, such as linkedin.com/in/your-name.';
}

export function validateCampaign(
  fields: CampaignFields,
): CampaignErrors {
  const errors: CampaignErrors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = 'Please add your full name to personalize the poster.';
  }

  const emailError = validateEmail(fields.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(fields.phone);
  if (phoneError) errors.phone = phoneError;

  const linkedinError = validateLinkedin(fields.linkedin);
  if (linkedinError) errors.linkedin = linkedinError;

  const words = countWords(fields.message);
  if (words > MAX_MESSAGE_WORDS) {
    errors.message = `Your message is ${words - MAX_MESSAGE_WORDS} word${
      words - MAX_MESSAGE_WORDS === 1 ? '' : 's'
    } over the ${MAX_MESSAGE_WORDS}-word limit.`;
  }

  if (fields.verifiedEnabled) {
    if (!fields.verifiedHeadline.trim()) {
      errors.verifiedHeadline = 'Add the verified campaign headline.';
    }
    if (!fields.verifiedSource.trim()) {
      errors.verifiedSource =
        'Name the official public health source for this notice.';
    }
    if (!fields.verifiedDate) {
      errors.verifiedDate = 'Add the date of the official notice.';
    }
    if (!fields.verifiedConfirmed) {
      errors.verifiedConfirmed =
        'Please confirm that this notice comes from an official source.';
    }
  }

  return errors;
}

export function hasErrors(errors: CampaignErrors): boolean {
  return Object.values(errors).some(Boolean);
}

export function getMedicalContentSummary(): string {
  return `${SYMPTOMS.length} symptoms to watch for. ${VERIFIED_NOTICE_GUIDANCE}`;
}
