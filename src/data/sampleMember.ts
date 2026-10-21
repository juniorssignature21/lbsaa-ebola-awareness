import { DEFAULT_MESSAGE } from './campaignContent';
import type { CampaignFields, PhotoState } from '../types/campaign';

export const createEmptyFields = (): CampaignFields => ({
  fullName: '',
  title: '',
  company: '',
  programme: '',
  classYear: '',
  location: '',
  message: DEFAULT_MESSAGE,
  email: '',
  phone: '',
  linkedin: '',
  includeContact: false,
  verifiedEnabled: false,
  verifiedHeadline: '',
  verifiedSource: '',
  verifiedDate: '',
  verifiedConfirmed: false,
});

export const SAMPLE_MEMBER: CampaignFields = {
  ...createEmptyFields(),
  fullName: 'John Chibuzor John',
  title: 'Developer & Technology Consultant',
  company: 'Codesignature Tech',
  programme: 'Executive MBA',
  classYear: '2009',
  location: 'Port Harcourt, Nigeria',
};

export const SAMPLE_PHOTO_SRC = '/assets/sample-member.jpg';

export const SAMPLE_PHOTO: PhotoState = {
  src: SAMPLE_PHOTO_SRC,
  name: 'sample-member.jpg',
  width: 360,
  height: 560,
  positionX: 50,
  positionY: 26,
};
