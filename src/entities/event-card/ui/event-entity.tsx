import { FC, ReactNode } from 'react';

import { Box } from '@mui/material';

import { EventStatus, UserRole } from '@shared/lib';

import { bgColors } from '../lib/constans';

interface EventEntityProps {
  typeNode: ReactNode;
  roleNode: ReactNode;
  titleNode: ReactNode;
  addressNode: ReactNode;
  eventTimeNode: ReactNode;
  avatarEventNode: ReactNode;
  textNode: ReactNode;
  buttonNode: ReactNode;
  eventStatus: EventStatus;
  userRole: UserRole;
}

export const EventCardEntity: FC<EventEntityProps> = ({
  typeNode,
  roleNode,
  titleNode,
  addressNode,
  eventTimeNode,
  avatarEventNode,
  textNode,
  buttonNode,
  eventStatus,
  userRole,
}) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      width='100%'
      borderRadius='10px'
      boxShadow={2}
      p={2}
      gap={1}
      justifyContent='space-between'
      bgcolor={eventStatus && bgColors[eventStatus]}
      overflow='visible'
    >
      <Box
        width='100%'
        display='flex'
        justifyContent='space-between'
        gap={1}
        flexDirection='row'
      >
        <Box
          display='flex'
          gap={1}
          justifyContent='space-between'
          flexDirection='column'
        >
          {typeNode}
          {userRole === UserRole.ORGANIZER && roleNode}
        </Box>
        <Box
          width='100%'
          display='flex'
          flexDirection='column'
          justifyContent='space-between'
          alignItems='flex-start'
          gap='4px'
          overflow='hidden'
        >
          {titleNode}
          {addressNode}
          {eventTimeNode}
        </Box>
        <Box height={56}>{avatarEventNode}</Box>
      </Box>
      {textNode}
      {buttonNode}
    </Box>
  );
};
