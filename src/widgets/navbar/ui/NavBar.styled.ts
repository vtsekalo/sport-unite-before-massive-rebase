import { Box, styled } from '@mui/material';

export const StyledIconButton = styled('span')<{ size?: number }>(
  ({ size, theme }) => ({
    fontSize: size ? `${size}px` : '24px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  }),
);

export const StyledNavBar = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    transform: 'translateX(-50%)',
    display: 'flex',
  },
}));
