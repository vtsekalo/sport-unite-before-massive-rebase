import { Skeleton, Typography } from '@mui/material';

import { NotificationCard } from '@entities/notification-card';
import { formatToTime } from '@shared/lib';
import { INotification, StatusNotification, UserRole } from '@shared/lib';
import { SportIcon } from '@shared/ui';

export function RowContent({
  isLoading,
  item,
}: {
  isLoading: boolean;
  item?: INotification;
}) {
  if (isLoading || !item) {
    return (
      <NotificationCard
        timeNode={<Skeleton height={14} width={65} />}
        iconNode={<Skeleton variant='circular' height={24} width={24} />}
        eventNameNode={<Skeleton height={18} width={120} />}
        isMyEvent
        isRead={false}
        messageNode={<Skeleton height={18} width={112} />}
      />
    );
  }

  const isRead =
    item.statusNotif === StatusNotification.read ||
    item.statusNotif === StatusNotification.deleted;
  const time = formatToTime(item.createdAtNotif);

  return (
    <NotificationCard
      timeNode={
        <Typography fontWeight={400} color='textDisabled' fontSize='12px'>
          {time}
        </Typography>
      }
      iconNode={<SportIcon type={item.eventType} />}
      eventNameNode={<Typography>{item.eventName}</Typography>}
      isMyEvent={item.userRole === UserRole.organizer}
      isRead={isRead}
      messageNode={
        <Typography fontSize='12px' fontWeight={isRead ? 400 : 700}>
          {item.bodyNotif}
        </Typography>
      }
    />
  );
}
