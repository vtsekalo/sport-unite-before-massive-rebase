import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MapWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  [theme.breakpoints.down('md')]: {
    top: '48px', // отступ для navbar на мобильных
  },
}));

export const PopupWrapper = styled('div')({
  position: 'absolute',
  zIndex: 1000,
});
