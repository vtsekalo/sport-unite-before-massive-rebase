import { InputAdornment, InputBase, styled } from '@mui/material';

export const StyledInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  borderRadius: '12px',
  backgroundColor: 'rgba(54, 119, 255, 0.05)',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  height: '48px',

  '& input': {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '16px',
    background: 'transparent',
  },

  '& .MuiInputAdornment-root': {
    color: '#666',
  },
  [theme.breakpoints.down('md')]: {
    height: '40px',
  },
}));

export const StyledInputAdornment = styled(InputAdornment)(() => ({
  cursor: 'pointer',
}));
