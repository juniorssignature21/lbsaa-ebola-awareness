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
  fullName: 'John John',
  title: 'LBSAA Member',
  company: '',
  programme: 'MBA',
  classYear: '2018',
  location: 'Lekki, Lagos',
};

export const SAMPLE_PHOTO_SRC = '/assets/sample-member.jpg';

export const SAMPLE_PHOTO: PhotoState = {
  src: SAMPLE_PHOTO_SRC,
  name: 'sample-member.jpg',
  width: 800,
  height: 1200,
  positionX: 50,
  positionY: 30,
};
