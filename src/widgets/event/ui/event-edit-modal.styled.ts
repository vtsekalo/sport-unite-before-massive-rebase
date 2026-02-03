import { Avatar, styled } from '@mui/material';
import { Box, Button, Skeleton } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';

const UserAvatar = styled(Avatar)`
  cursor: pointer;
`;

const AnimatedModalWrapper = styled(ModalWrapper)`
  animation: zoomSoft 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @keyframes zoomSoft {
    from {
      opacity: 0;
      transform: scale(0.94) translateY(10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

/**
 * @prop $image - Картинка события.
 * Нельзя через пропсы Box из-за кастомного пропа $image
 */
type HeaderProps = {
  $image?: string;
};
const Header = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$image',
})<HeaderProps>(({ theme, $image }) => ({
  position: 'relative',
  aspectRatio: '16 / 9',
  backgroundColor: $image ? 'transparent' : theme.palette.text.disabled,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: $image ? `url(${$image})` : 'none',
  [theme.breakpoints.up('md')]: {
    aspectRatio: '21 / 9',
    minHeight: theme.spacing(30),
  },
}));

const FavoriteButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
}));

const CloseButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

const CategoryIconOuter = styled(Box)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  boxSizing: 'border-box',
}));

const CategoryIconInner = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: theme.spacing(5.25),
  height: theme.spacing(5.25),
  borderRadius: '50%',
  backgroundColor: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
}));

const CategoryIconImage = styled('img')(({ theme }) => ({
  display: 'block',
  width: theme.spacing(3),
  height: theme.spacing(3),
  flexShrink: 0,
}));

const CategoryMuiIcon = styled('svg')(({ theme }) => ({
  width: theme.spacing(3),
  height: theme.spacing(3),
  color: theme.palette.primary.contrastText,
}));

const ButtonLabel = styled('span')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  fontWeight: 600,
}));

const AbsoluteSkeleton = styled(Skeleton)({
  position: 'absolute',
  inset: 0,
});

const RoundedSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

const ButtonSkeleton = styled(Skeleton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

const EventAvatar = styled(Avatar)(() => ({
  width: 32,
  height: 32,
}));

export const Styled = {
  Header,
  FavoriteButton,
  CloseButton,
  CategoryIconOuter,
  CategoryIconInner,
  CategoryIconImage,
  CategoryMuiIcon,
  ButtonLabel,
  AbsoluteSkeleton,
  RoundedSkeleton,
  ButtonSkeleton,
  EventAvatar,
  UserAvatar,
  AnimatedModalWrapper,
};
