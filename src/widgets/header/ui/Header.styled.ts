import { Box, styled } from '@mui/material';

export const StyledHeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 20,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  top: '24px',
  borderRadius: '10px',
  minWidth: '360px',
  maxWidth: '95%',
  boxShadow: `0px 3px 5px -1px #00000033;
              0px 6px 10px 0px #00000024;
              0px 1px 18px 0px #0000001F;`,
  backgroundColor: 'rgba(255, 255, 255, 1)',

  [theme.breakpoints.down('md')]: {
    height: 56,
    top: 16,
  },
}));
