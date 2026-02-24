import { Avatar, BoxProps, styled } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';
import { EventStatus } from '@shared/lib';

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
 * @prop src - Картинка события.
 */
type EventImageProps = BoxProps & {
  $status: EventStatus;
  src?: string;
  alt?: string;
};

const EventImage = styled('img')<EventImageProps>(({ $status }) => ({
  objectFit: 'cover',
  filter:
    $status === EventStatus.COMPLETED || $status === EventStatus.CANCELLED
      ? 'grayscale(100%)'
      : 'none',
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
  EventImage,
  CategoryMuiIcon,
  EventAvatar,
  AnimatedModalWrapper,
};
