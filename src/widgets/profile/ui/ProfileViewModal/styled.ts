import styled from '@emotion/styled';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import { Menu } from '@mui/material';

export const StyledPhotoCameraFrontIcon = styled(PhotoCameraFrontIcon)`
  font-size: 64px;
  /*   color: 'primary.light'; */

  @media (min-width: 900px) {
    font-size: 160px;
  }
`;

export const StyledMenu = styled(Menu)`
  .MuiMenuItem-root {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const Styled = {
  PhotoCameraFrontIcon: StyledPhotoCameraFrontIcon,
  StyledMenu,
};
