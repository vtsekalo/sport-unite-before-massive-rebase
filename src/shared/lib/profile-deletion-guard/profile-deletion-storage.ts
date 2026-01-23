const DELETION_FLAG_KEY = 'profile_deletion_allowed';

export const profileDeletionStorage = {
  set: () => sessionStorage.setItem(DELETION_FLAG_KEY, 'true'),
  get: () => sessionStorage.getItem(DELETION_FLAG_KEY) === 'true',
  clear: () => sessionStorage.removeItem(DELETION_FLAG_KEY),
};
