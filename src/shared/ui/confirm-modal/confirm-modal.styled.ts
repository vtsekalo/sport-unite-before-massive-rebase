import { Dialog, styled } from '@mui/material';

const ConfirmModal = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: '#0000000D',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
  },

  '& .MuiDialog-paper': {
    borderRadius: '10px',
    boxShadow: theme.shadows[16],
  },
}));

export const Styled = {
  ConfirmModal,
};
