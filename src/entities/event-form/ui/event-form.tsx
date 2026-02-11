import { FC, ReactNode } from 'react';

import { Box, useMediaQuery, useTheme, Typography } from '@mui/material';

interface EventFormEntityProps {
  title: string;
  headerNode: ReactNode;
  photoNode: ReactNode;
  formFieldsNode: ReactNode;
  actionsNode: ReactNode;
}

export const EventFormEntity: FC<EventFormEntityProps> = ({
  title,
  headerNode,
  photoNode,
  formFieldsNode,
  actionsNode,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      display='flex'
      flexDirection='column'
      width='100%'
      maxWidth={1200}
      margin='0 auto'
      padding={isMobile ? theme.spacing(2) : theme.spacing(3)}
      gap={isMobile ? theme.spacing(2) : theme.spacing(3)}
    >
      
      <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Typography
        variant='h5'
        fontFamily='Roboto'
        fontWeight={700}
        fontSize='20px'
        textAlign='center'
        color='textSecondary'
        flex={1}
      >
        {title}
      </Typography>
      {headerNode}
    </Box>
      {photoNode}
      {formFieldsNode}
      {actionsNode}
    </Box>
  );
};
