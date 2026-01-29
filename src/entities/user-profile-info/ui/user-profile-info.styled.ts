import { Avatar, styled } from '@mui/material';

const AvatarUser = styled(Avatar)(({ theme }) => ({
  backgroundColor: '#EBF2FF',
  aspectRatio: '1 / 1',
  height: 'auto',
  flexShrink: 1,
  width: '100%',
  maxWidth: 80,

  [theme.breakpoints.up('md')]: {
    width: '100%',
    maxWidth: 400,
  },

  '& > *': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

export const Styled = {
  AvatarUser,
};
