import styled from '@emotion/styled';
import { Box, MenuItem } from '@mui/material';

export const StyledGridContainer = styled(Box)`
  display: grid;
  grid-template-areas:
    'profile personal'
    'rating rating'
    'buttons buttons'
    'logout logout';
  grid-template-columns: 160px 1fr;
  grid-template-rows: auto auto auto auto;
  width: 100%;
  height: 100dvh;
  max-width: 329px;
  max-height: 716px;
  padding: 0px;
  border-radius: 10px;
  font-family: '"Roboto", sans-serif';
  overflow-y: auto;

  @media (min-width: 900px) {
    grid-template-areas:
      'avatar rightColumn'
      'personal rightColumn'
      'rating logout';
    grid-template-columns: 400px 1fr;
    grid-template-rows: 1fr auto auto;
    overflow-y: hidden;
    max-width: 1191px;
    max-height: 702px;
    gap: 8px;
    padding: 0px 80px 40px 80px;
  }
`;

export const StyledRenderMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 40px;
  padding: 8px};

  @media (min-width: 900px) {
    min-height: 48px;
  }
`;

export const Styled = {
  GridContainer: StyledGridContainer,
  RenderMenuItem: StyledRenderMenuItem,
};
