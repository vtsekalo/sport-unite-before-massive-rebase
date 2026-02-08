import { FC, ReactNode } from 'react';

import { Box, useMediaQuery, useTheme } from '@mui/material';

interface EventFormEntityProps {
  headerNode: ReactNode;
  photoNode: ReactNode;
  formFieldsNode: ReactNode;
  actionsNode: ReactNode;
}

export const EventFormEntity: FC<EventFormEntityProps> = ({
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
      {headerNode}
      {photoNode}
      {formFieldsNode}
      {actionsNode}
    </Box>
  );
};