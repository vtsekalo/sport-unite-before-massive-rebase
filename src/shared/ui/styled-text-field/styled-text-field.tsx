import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)({
  width: '329px',
  height: '40px',

  '& .MuiOutlinedInput-root': {
    height: '40px',
    '& fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
  },

  '& .MuiInputBase-input': {
    color: 'rgba(0, 0, 0, 0.6)',
    height: '40px',
    padding: '0 14px',
    boxSizing: 'border-box',
  },

  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(0, 0, 0, 0.38)',
    opacity: 1,
  },

  '&.MuiTextField-root .MuiInputBase-inputMultiline': {
    padding: '8px 14px',
  },
});
