import { Avatar, styled } from '@mui/material';
import { Box } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';

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
  backgroundImage: $image
    ? `url(${$image})`
    : 'linear-gradient(135deg, #eee, #ccc)',
  [theme.breakpoints.up('md')]: {
    aspectRatio: '21 / 9',
    minHeight: theme.spacing(30),
  },
}));

const CategoryMuiIcon = styled('svg')(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  color: theme.palette.primary.contrastText,
}));

const EventAvatar = styled(Avatar)(() => ({
  width: 32,
  height: 32,
  cursor: 'pointer',
}));

export const Styled = {
  Header,
  CategoryMuiIcon,
  EventAvatar,
  AnimatedModalWrapper,
};
