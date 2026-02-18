import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ModalContent = styled(Box)(({ theme }) => ({
  width: 399,
  height: 224,
  backgroundColor: theme.palette.background.paper,
  boxShadow:
    '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14)',
  borderRadius: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  padding: 44,

  '&:focus-visible': {
    outline: 'none',
  },

  [theme.breakpoints.down('md')]: {
    width: 361,
    height: 152,
    gap: 8,
    padding: 16,
  },
}));

export const IconWrapper = styled(Box)({
  borderRadius: '50%',
  display: 'flex',
});

const ResetButton = styled(Button)({
  width: 220,
});

export const Styled = {
  ModalContent,
  IconWrapper,
  ResetButton,
};
