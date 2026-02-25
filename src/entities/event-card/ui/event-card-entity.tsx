import { FC, ReactNode } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

type EventInfoProps = {
  headerNode: ReactNode;
  titleNode: ReactNode;
  dateNode: ReactNode;
  locationNode: ReactNode;
  descriptionNode: ReactNode;
  organizerNode: ReactNode;
  participantsNode: ReactNode;
  footerActionsNode: ReactNode;
};

export const EventCardEntity: FC<EventInfoProps> = ({
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
      maxHeight={{
        md: `calc(100vh - ${theme.spacing(17)} - ${theme.spacing(11)})`,
      }}
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
          display='flex'
          justifyContent='center'
          pb={2}
        >
          {footerActionsNode}
        </Box>
      </Box>
    </Box>
  );
};
