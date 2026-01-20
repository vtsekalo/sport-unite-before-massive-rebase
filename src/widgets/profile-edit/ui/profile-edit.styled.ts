import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

export const StyledGridContainer = styled(Box)`
  display: grid;
  grid-template-areas:
    'avatar'
    'mobile-forms'
    'actions';
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  width: 100%;
  max-width: 361px;
  height: 100dvh;
  padding: 10px;
  gap: 16px;

  @media (min-width: 900px) {
    grid-template-areas:
      'avatar main-desktop'
      'actions actions';
    grid-template-columns: 240px 1fr;
    grid-template-rows: 1fr auto;
    max-width: 1191px;
    max-height: 690px;
    height: 100dvh;
    padding: 0px 80px 20px 80px;
    gap: 8px;
  }
`;

export const StyledButtonSettingsConf = styled(Button)`
  text-align: left;
  height: 100dvh;
  max-height: 40px;
  font-size: 12px;
  width: 100%;
  max-width: 329px;

  @media (min-width: 900px) {
    max-width: 240px;
  }
`;

export const StyledDeleteAvatarButton = styled(Button)`
  max-width: 40px;
  min-height: 40px;
  min-width: 40px;
`;

export const StyledAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Styled = {
  StyledGridContainer,
  StyledButtonSettingsConf,
  StyledDeleteAvatarButton,
  StyledAvatarImage,
};
