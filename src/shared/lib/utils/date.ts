import dayjs from 'dayjs';

export function formatDateOrTime(iso: string) {
  if (typeof iso !== 'string') {
    return '';
  }

  const d = dayjs(iso);

  return d.isSame(dayjs(), 'day') ? d.format('HH:mm') : d.format('DD.MM.YYYY');
}

export const formatToTime = (iso: string) => {
  if (typeof iso !== 'string') {
    return '';
  }

  const d = dayjs(iso);

  return d.format('HH:mm');
};
