import { InputAdornment, InputBase, styled } from '@mui/material';

export const StyledInput = styled(InputBase)(() => ({
  width: '100%',
  borderRadius: '12px',
  backgroundColor: 'rgba(54, 119, 255, 0.05)',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  height: '40px',

  '& input': {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '16px',
    background: 'transparent',

    '&::placeholder': {
      color: '#3677FF80',
      opacity: 1,
    },
  },

  '& .MuiInputAdornment-root': {
    color: '#3677FF80',
  },
}));

export const StyledInputAdornment = styled(InputAdornment)(() => ({
  cursor: 'pointer',
}));
