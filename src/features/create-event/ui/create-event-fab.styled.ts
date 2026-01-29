import { Fab } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));
