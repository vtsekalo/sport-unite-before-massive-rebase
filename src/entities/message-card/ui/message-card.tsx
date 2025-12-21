import { FC, ReactNode } from 'react';

import { Box } from '@mui/material';

interface MessageCardProps {
  messageNode: ReactNode;
  avatarNode: ReactNode;
  timeNode: ReactNode;
  avtorNode?: ReactNode;
  isMyMessage: boolean;
}

export const MessageCard: FC<MessageCardProps> = ({
  avatarNode,
  messageNode,
  avtorNode,
  timeNode,
  isMyMessage,
}) => {
  return (
    <Box
      flexDirection={isMyMessage ? 'row' : 'row-reverse'}
      gap='8px'
      display='flex'
      alignItems='start'
      alignSelf={isMyMessage ? 'end' : 'start'}
      width='270px'
    >
      <Box
        width='224px'
        display='flex'
        flexDirection='column'
        paddingY='8px'
        borderRadius='10px'
        paddingX='16px'
        bgcolor={isMyMessage ? '#C3D7FF' : '#F5F8FF'}
      >
        {!isMyMessage && avtorNode}
        <Box>
          {messageNode}
          <Box width='fit-content' display='flex' justifySelf='end'>
            {timeNode}
          </Box>
        </Box>
      </Box>
      <Box alignSelf='end'>{avatarNode}</Box>
    </Box>
  );
};
