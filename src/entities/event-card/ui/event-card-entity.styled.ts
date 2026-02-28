import { Box, styled } from '@mui/material';

const CardBox = styled(Box)(() => ({
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
}));

export const Styled = {
  CardBox,
};
