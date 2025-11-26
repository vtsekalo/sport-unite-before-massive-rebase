export const FORM_LIMITS = {
  NICKNAME: 30,
  INTERESTS: 100,
  BIOGRAPHY: 50,
  CITY: 50,
} as const;

export const PROFILE_PICTURE_VALIDATION = {
  MAX_SIZE: 5 * 1024 * 1024,
  ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/jpg'] as const,
} as const;

export type AvatarFileType =
  (typeof PROFILE_PICTURE_VALIDATION.ACCEPTED_TYPES)[number];
