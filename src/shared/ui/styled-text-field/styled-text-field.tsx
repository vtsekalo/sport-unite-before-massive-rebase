import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)({
  width: '329px',

  '& .MuiOutlinedInput-root': {

    '&:not(.MuiInputBase-multiline)': {
      minHeight: '40px',
    },
    '&.MuiInputBase-multiline': {
      height: '214px',
    },
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
    padding: '10px 14px',
    boxSizing: 'border-box',
  },

  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },

  '& .MuiInputBase-input::placeholder': {
    color: 'rgba(0, 0, 0, 0.38)',
    opacity: 1,
  },

  '&.MuiTextField-root .MuiInputBase-inputMultiline': {
    padding: '8px 14px',
  },
});