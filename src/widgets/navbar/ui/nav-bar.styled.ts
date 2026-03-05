import { Box, styled } from '@mui/material';
import Switch from '@mui/material/Switch';

export const StyledNavBar = styled(Box)({
  '& .MuiSvgIcon-root': {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  '& .MuiIconButton-root': {
    width: '100%',
    height: '100%',
  },
});

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 48,
  height: 32,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    top: 2,
    color: theme.palette.primary.main,
    transform: 'translateX(2px)',
    '&.Mui-checked': {
      transform: 'translateX(18px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },

  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 26,
  },
}));
