import { FC } from 'react';

import { Skeleton } from '@mui/material';

import { EventCardEntity } from '@entities/event-card';
import { EventStatus, UserRole } from '@shared/lib';

interface EventListSkeletonProps {
  count?: number;
  isMobile?: boolean;
}

export const EventListSkeleton: FC<EventListSkeletonProps> = ({
  count = 5,
  isMobile,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <EventCardEntity
          key={index}
          eventStatus={EventStatus.PLANNED}
          userRole={UserRole.organizer}
          typeNode={
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant='rectangular'
              height={24}
              width={24}
            />
          }
          roleNode={
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant='rectangular'
              height={24}
              width={24}
            />
          }
          titleNode={
            <Skeleton height={42} width={isMobile ? '150px' : '184px'} />
          }
          addressNode={
            <Skeleton height={18} width={isMobile ? '150px' : '184px'} />
          }
          eventTimeNode={
            <Skeleton height={16} width={isMobile ? '150px' : '110px'} />
          }
          avatarEventNode={
            <Skeleton
              sx={{ borderRadius: '10px' }}
              variant='rectangular'
              height={56}
              width={isMobile ? 64 : 80}
            />
          }
          textNode={
            <Skeleton height={42} width={isMobile ? '100%' : '304px'} />
          }
          buttonNode={
            <Skeleton height={40} width={isMobile ? '100%' : '304px'} />
          }
        />
      ))}
    </>
  );
};
