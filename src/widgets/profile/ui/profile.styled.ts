import styled from '@emotion/styled';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import { Typography } from '@mui/material';

const StyledPhotoCameraFrontIcon = styled(PhotoCameraFrontIcon)`
  font-size: 64px;

  @media (min-width: 900px) {
    font-size: 160px;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfileTypography = styled(Typography)`
  overflow-wrap: 'anywhere';
  word-break: 'break-word';
`;

export const Styled = {
  StyledPhotoCameraFrontIcon,
  AvatarImage,
  ProfileTypography,
};
