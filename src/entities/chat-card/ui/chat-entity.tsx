import { FC, ReactNode } from 'react';

import { Box } from '@mui/material';

interface ChatEntityProps {
  typeNode: ReactNode;
  titleNode: ReactNode;
  addressNode: ReactNode;
  lastTimeMessageNode: ReactNode;
  eventTimeNode: ReactNode;
  lastMessageNode: ReactNode;
}

export const ChatCardEntity: FC<ChatEntityProps> = ({
  typeNode,
  titleNode,
  addressNode,
  lastTimeMessageNode,
  eventTimeNode,
  lastMessageNode,
}) => {
  return (
    <Box
      display='flex'
      width={'100%'}
      borderRadius='10px'
      boxShadow={`0px 3px 5px -1px #00000033;
              0px 6px 10px 0px #00000024;
              0px 1px 18px 0px #0000001F;`}
      paddingY='8px'
      paddingX='16px'
      gap='8px'
    >
      {typeNode}
      <Box width='100%' display='flex' gap='4px' flexDirection='column'>
        <Box width='100%' justifyContent='space-between' display='flex'>
          {titleNode}
          {lastTimeMessageNode}
        </Box>
        {addressNode}
        {eventTimeNode}
        {lastMessageNode}
      </Box>
    </Box>
  );
};
