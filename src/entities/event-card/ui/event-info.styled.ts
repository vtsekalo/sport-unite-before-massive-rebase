import { Paper, styled } from '@mui/material';

const EventCardContainer = styled(Paper)(({ theme }) => ({
  padding: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  height: '100%',
  width: '100%',
  [theme.breakpoints.up('xs')]: {
    maxWidth: 361,
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: 440,
  },
  boxShadow: 'none',
}));

export const Styled = {
  EventCardContainer,
};
