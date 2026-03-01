import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MapWrapper = styled(Box)(() => ({
  overflow: 'visible',
}));

export const PopupWrapper = styled('div')<{ $isMobile?: boolean }>(
  ({ $isMobile }) => ({
    position: 'absolute',
    zIndex: 100,
    top: $isMobile ? 88 : 136,
    left: $isMobile ? '50%' : 80,
    transform: $isMobile ? 'translateX(-50%)' : 'none',
  }),
);

export const Styled = {
  MapWrapper,
  PopupWrapper,
};
