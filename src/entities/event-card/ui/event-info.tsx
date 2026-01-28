import { FC, ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

import { Styled } from './styled';

type EventInfoProps = {
  headerNode: ReactNode;
  titleNode: ReactNode;
  dateNode: ReactNode;
  locationNode: ReactNode;
  descriptionNode: ReactNode;
  participantsNode: ReactNode;
  footerActionsNode: ReactNode;
};

export const EventInfo: FC<EventInfoProps> = ({
  headerNode,
  titleNode,
  dateNode,
  locationNode,
  descriptionNode,
  participantsNode,
  footerActionsNode,
}) => {
  return (
    <Styled.EventCardContainer>
      {headerNode}
      <Box
        paddingLeft={2}
        paddingRight={2}
        display='flex'
        flexDirection='column'
        gap={2}
        flex={1}
        minHeight={0}
      >
        <Box display='flex' justifyContent='space-between' gap={2}>
          {titleNode}
        </Box>

        <Box display='flex' alignItems='center' gap={{ xs: 2, md: 4 }}>
          {dateNode}
        </Box>

        <Typography variant='body2' color='text.disabled'>
          {locationNode}
        </Typography>

        <Box fontSize='14px'>{descriptionNode}</Box>

        <Box display='flex' alignItems='center' gap={2}>
          {participantsNode}
        </Box>

        <Box
          marginTop='auto'
          paddingBottom={3}
          display='flex'
          justifyContent='center'
          gap={{ xs: 1.2, md: 1.2 }}
        >
          {footerActionsNode}
        </Box>
      </Box>
    </Styled.EventCardContainer>
  );
};
