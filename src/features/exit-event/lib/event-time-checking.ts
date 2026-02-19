import dayjs from 'dayjs';

export const canExitEvent = (eventStartDate: string): boolean => {
  const startDate = dayjs(eventStartDate);
  const now = dayjs();
  return startDate.diff(now, 'hour') > 6;
};
