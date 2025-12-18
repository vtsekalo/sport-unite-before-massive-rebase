import dayjs from 'dayjs';

export function formatDateOrTime(iso: string) {
  const d = dayjs(iso);

  return d.isSame(dayjs(), 'day') ? d.format('HH:mm') : d.format('DD.MM.YYYY');
}
