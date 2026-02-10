import styled from 'styled-components';

import { Box } from '@mui/material';

const MarkerWrapper = styled(Box)(() => ({
  filter:
    'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2)) drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.14)) drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.12))',
}));

const Marker = styled(Box)(() => ({
  clipPath:
    'path("M20 0C8.95 0 0 8.95 0 20C0 35 20 57 20 57C20 57 40 35 40 20C40 8.95 31.05 0 20 0Z")',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: '#2563EB',
  },
}));

export const Styled = {
  Marker,
  MarkerWrapper,
};
