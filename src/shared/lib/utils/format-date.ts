export const formatDate = (eventStartDate: string): [string, string] => {
  const date = new Date(eventStartDate);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  const calendarDay = `${day}.${month}.${year}`;
  const beginningEvent = `${hour}:${minute}`;

  return [calendarDay, beginningEvent];
};
