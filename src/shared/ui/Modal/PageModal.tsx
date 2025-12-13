import React from 'react';

import { Box, alpha, useTheme } from '@mui/material';

interface PageModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export const PageModal: React.FC<PageModalProps> = ({ open, children }) => {
  const theme = useTheme();

  if (!open) return null;

  return (
    <Box
      position='absolute'
      top={0}
      left={0}
      width='100%'
      height='100%'
      zIndex={10}
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor={alpha(theme.palette.primary.main, 0.6)}
      pt={{
        xs: '88px',
        md: '136px',
      }}
      pb={{
        xs: '88px',
        md: '32px',
      }}
      px='10px'
    >
      <Box
        width='100%'
        maxWidth={{ xs: 361, md: 1351 }}
        height='100%'
        maxHeight={{
          xs: 'calc(100dvh - 176px)',
          md: 'calc(100dvh - 184px)',
        }}
        bgcolor='background.paper'
        borderRadius='10px'
        boxShadow={8}
        display='flex'
        flexDirection='column'
        flex='1'
        overflow='auto'
      >
        {children}
      </Box>
    </Box>
  );
};
