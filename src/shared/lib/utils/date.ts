import { dayjs } from './dayjs';

export function formatDateOrTime(iso: string) {
  if (typeof iso !== 'string') {
    return '';
  }

  const date = dayjs.utc(iso).local();

  const isToday = date.isSame(dayjs(), 'day');

  return isToday ? date.format('HH:mm') : date.format('DD.MM.YYYY');
}

export const formatToTime = (iso: string) => {
  if (typeof iso !== 'string') {
    return '';
  }

  return dayjs.utc(iso).local().format('HH:mm');
};
