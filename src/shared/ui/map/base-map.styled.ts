import { styled } from '@mui/material';

export const MapContainer = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
});

export const MarkerContainer = styled('div')({
  cursor: 'pointer',
  transform: 'translateZ(0)',
});

export const Styled = {
  MapContainer,
  MarkerContainer,
};
