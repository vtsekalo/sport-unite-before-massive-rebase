import { Box, BoxProps, Typography, styled } from '@mui/material';

import { EventStatus } from '@shared/lib';

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
  borderRadius: '10px',
  filter:
    $status === EventStatus.COMPLETED || $status === EventStatus.CANCELLED
      ? 'grayscale(100%)'
      : 'none',
}));

const PrevInfoCard = styled(Box)(() => ({
  transition: '0.4s',
  '&:hover': {
    backgroundColor: '#EBF2FF',
    boxShadow: 4,
    cursor: 'pointer',
  },
}));

const ListCardsContainer = styled(Box)(() => ({
  overflowY: 'auto',
  overflowX: 'hidden',
}));

const EventTypography = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  verticalAlign: 'top',
  WebkitLineClamp: 1,
}));
const EventTypographyDescription = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  verticalAlign: 'top',
  WebkitLineClamp: 2,
}));

export const Styled = {
  ListCardsContainer,
  PrevInfoCard,
  EventImage,
  EventTypography,
  EventTypographyDescription,
};
