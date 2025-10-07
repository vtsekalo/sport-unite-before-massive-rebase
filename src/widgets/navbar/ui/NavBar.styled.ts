import { styled } from '@mui/material';

export const CustomIconButton = styled('span')<{ size?: number }>(
  ({ size, theme }) => ({
    fontSize: size ? `${size}px` : '24px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  }),
);
