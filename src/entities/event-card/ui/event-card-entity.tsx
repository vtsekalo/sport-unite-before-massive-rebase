import React from 'react';

import { Box, Typography, useTheme } from '@mui/material';

type EventInfoProps = {
  headerNode: React.ReactNode;
  titleNode: React.ReactNode;
  dateNode: React.ReactNode;
  locationNode: React.ReactNode;
  descriptionNode: React.ReactNode;
  organizerNode: React.ReactNode;
  participantsNode: React.ReactNode;
  footerActionsNode: React.ReactNode;
};

export const EventCardEntity: React.FC<EventInfoProps> = ({
  headerNode,
  titleNode,
  dateNode,
  locationNode,
  descriptionNode,
  organizerNode,
  participantsNode,
  footerActionsNode,
}) => {
  const theme = useTheme();
  return (
    <Box
      padding={0}
      left={0}
      display={'flex'}
      flexDirection={'column'}
      gap={{ xs: theme.spacing(2), md: theme.spacing(3) }}
      height={'100%'}
      width={'100%'}
      maxWidth={{ xs: 361, md: 440 }}
    >
      {headerNode}
      <Box
        paddingLeft={{ xs: 2, md: 4 }}
        paddingRight={{ xs: 2, md: 4 }}
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

        <Box display='flex' flexDirection='column' alignItems='start' gap={2}>
          <Box display='flex' alignItems='center' gap={2}>
            {organizerNode}
          </Box>

          <Box display='flex' alignItems='center' gap={2}>
            {participantsNode}
          </Box>
        </Box>

        <Box
          mt={{ xs: 'auto', md: 0 }}
          pb={3}
          display='flex'
          justifyContent='center'
          gap={1.2}
        >
          {footerActionsNode}
        </Box>
      </Box>
    </Box>
  );
};
