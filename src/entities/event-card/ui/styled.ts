import { Box, Button, Paper, Skeleton, styled } from '@mui/material';

const EventCardContainer = styled(Paper)(({ theme }) => ({
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 600,
  },
  boxShadow: 'none',
}));

/**
 * @prop $image - Картинка события.
 * Нельзя через пропсы Box из-за кастомного пропа $image
 */
type HeaderProps = {
  $image?: string;
};
const EventHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$image',
})<HeaderProps>(({ theme, $image }) => ({
  position: 'relative',
  width: '100%',
  height: theme.spacing(20),
  aspectRatio: '16 / 9',
  minHeight: theme.spacing(22.5),
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

export const Styled = {
  EventCardContainer,
  EventHeader,
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
};
