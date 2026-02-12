import { styled } from 'styled-components';

import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Tabs,
  TabsProps,
  Typography,
  TypographyProps,
} from '@mui/material';

import { EventStatus } from '@shared/lib';

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

const EventIcon = styled(Box)<EventImageProps>(({ $status }) => ({
  filter:
    $status === EventStatus.COMPLETED || $status === EventStatus.CANCELLED
      ? 'grayscale(100%)'
      : 'none',
}));

const EventTypography = styled(Typography)<TypographyProps>(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  lineHeight: '1.5em',
  minHeight: '3em',
  verticalAlign: 'top',
}));

const AddressTypography = styled(Typography)<TypographyProps>(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
  overflow: 'hidden',
}));

const ScrollContainer = styled(Box)<BoxProps>(() => ({
  scrollbarGutter: 'stable',
}));

const MobileEventsContainer = styled(Box)<BoxProps>(() => ({
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const StyledTabs = styled(Tabs)<TabsProps>(() => ({
  '& .MuiTab-root': {
    fontWeight: 700,
    fontSize: '10px',
    lineHeight: '24px',
    minHeight: 'auto',
  },
}));

const StyledButton = styled(Button)<ButtonProps>(() => ({
  minHeight: '40px',
}));

export const Styled = {
  EventImage,
  EventTypography,
  ScrollContainer,
  MobileEventsContainer,
  StyledTabs,
  StyledButton,
  EventIcon,
  AddressTypography,
};
