import React from 'react';

import { Box, alpha, useTheme } from '@mui/material';

interface PageModalProps {
  open: boolean;
  children: React.ReactNode;
  maxWidth?: number | { xs?: number; md?: number };
}

export const PageModal: React.FC<PageModalProps> = ({
  open,
  children,
  maxWidth = { xs: 361, md: 1351 },
}) => {
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
    >
      <Box
        width='100%'
        maxWidth={maxWidth}
        height={{ xs: 'calc(100dvh - 120px)', md: 'calc(100dvh - 80px)' }}
        maxHeight={{ xs: 'calc(100dvh - 200px)', md: 'calc(90dvh - 150px)' }}
        bgcolor='background.paper'
        borderRadius='10px'
        boxShadow={8}
        display='flex'
        flexDirection='column'
        overflow='auto'
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Box>
    </Box>
  );
};
