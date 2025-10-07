import { Box, styled } from '@mui/material';

export const StyledHeaderWrapper = styled(Box)(({ theme }) => ({
  transform: 'translateX(-50%)',
  [theme.breakpoints.down('sm')]: {
    height: 56,
    top: 16,
  },
}));

export const StyledFooterMobile = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    transform: 'translateX(-50%)',
    display: 'flex',
  },
}));
