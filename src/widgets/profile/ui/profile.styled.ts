import styled from '@emotion/styled';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import { Menu, Typography } from '@mui/material';

const StyledPhotoCameraFrontIcon = styled(PhotoCameraFrontIcon)`
  font-size: 64px;

  @media (min-width: 900px) {
    font-size: 160px;
  }
`;

const StyledMenu = styled(Menu)`
  .MuiMenuItem-root {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 300px;
`;

const TypographyBiography = styled(Typography)`
  word-break: 'break-word';
`;

export const Styled = {
  StyledPhotoCameraFrontIcon,
  StyledMenu,
  AvatarImage,
  TypographyBiography,
};
