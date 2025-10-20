import { Box, styled } from '@mui/material';

export const StyledHeaderWrapper = styled(Box)(({ theme }) => ({
  transform: 'translateX(-50%)',
  zIndex: 6,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    height: 56,
    top: 16,
  },
}));
