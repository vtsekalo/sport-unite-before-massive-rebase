import { FC, ReactNode } from 'react';

import { Box } from '@mui/material';

import { crown } from '@shared/assets';
import { defaultBoxShadow } from '@shared/lib';

interface NotificationCardProps {
  iconNode: ReactNode;
  eventNameNode: ReactNode;
  messageNode: ReactNode;
  timeNode: ReactNode;
  isRead: boolean;
  isMyEvent: boolean;
}

export const NotificationCard: FC<NotificationCardProps> = ({
  isMyEvent,
  iconNode,
  eventNameNode,
  messageNode,
  timeNode,
  isRead,
}) => {
  return (
    <Box
      borderRadius={'10px'}
      paddingY='8px'
      paddingX='16px'
      boxShadow={defaultBoxShadow}
      bgcolor={isRead ? '' : '#EBF2FF'}
      justifyContent='space-between'
      display='flex'
      alignItems='start'
    >
      <Box alignItems='start' display='flex' gap='8px'>
        <Box
          justifyContent='center'
          alignItems='center'
          display='flex'
          flexDirection='column'
          gap='10px'
        >
          {iconNode}
          {isMyEvent && (
            <img width={20} height={18} alt='my event' src={crown} />
          )}
        </Box>
        <Box display='flex' gap='4px' flexDirection='column'>
          {eventNameNode}
          {messageNode}
        </Box>
      </Box>
      {timeNode}
    </Box>
  );
};
