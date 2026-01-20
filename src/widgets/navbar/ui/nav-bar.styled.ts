import { Box, styled } from '@mui/material';
import Switch from '@mui/material/Switch';

export const StyledNavBar = styled(Box)(({ theme }) => ({
  display: 'none',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    height: '48px',
  },
}));

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 30,
  padding: 0,

  '& .MuiSwitch-switchBase': {
    marginTop: 1,
    padding: 0,
    color: theme.palette.primary.main,
    transform: 'translateX(2px)',
    '&.Mui-checked': {
      transform: 'translateX(11px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },

  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 30,
  },
}));

export const StyledSwitchThumb = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  backgroundColor: theme.palette.common.white,
  width: 27,
  height: 27,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
