import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Cross from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { AvatarGroup, Box, Button, Typography, useTheme } from '@mui/material';

import { EventCardEntity } from '@entities/event-card';
import { ModalWrapper } from '@entities/modal-wrapper';
import { CancelEventButton } from '@features/cancel-event';
import { useGetEventByIdQuery, useGetJoinInEventsMutation } from '@shared/api';
import {
  EventStatus,
  IEvent,
  IUserParticipant,
  ROUTES,
  useEventParticipantData,
  useIsEventOrganizer,
  useProfile,
} from '@shared/lib';
import { SportIcon } from '@shared/ui/sport-icons';
import { EventCardSkeleton } from '@widgets/event-card/ui/event-card-skeleton';

import { Styled } from './event-card.styled';

enum FooterMode {
  IN_PROGRESS = 'IN_PROGRESS',
  ORGANIZER = 'ORGANIZER',
  PARTICIPANT = 'PARTICIPANT',
  GUEST = 'GUEST',
}

export const EventCard: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { eventId } = useParams<{ eventId: string }>();
  const [joinEvent, { isLoading: isLoadingJoin }] =
    useGetJoinInEventsMutation();

  const { profile } = useProfile({
    __meta: { toast: false },
  });

  const {
    data: eventData,
    isLoading,
    isError,
  } = useGetEventByIdQuery(eventId || '', {
    skip: !eventId || !profile,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isError) {
      navigate(ROUTES.HOME);
    }
  }, [isError, navigate]);

  const event: IEvent | null = eventData
    ? {
        eventId: eventData.eventId,
        eventName: eventData.eventName,
        eventType: eventData.eventType,
        eventStatus: eventData.eventStatus,
        eventStartDate: eventData.eventStartDate,
        eventEndDate:
          eventData.eventEndDate &&
          dayjs(eventData.eventEndDate).format('HH:mm'),
        countUsers: eventData.countUsers,
        eventDescription: eventData.eventDescription,
        eventPhoto: eventData.eventPhoto,
        eventLocation: eventData.eventLocation,
        coordinates: eventData.coordinates,
        users: eventData.users,
      }
    : null;

  const isEventPlanned = event?.eventStatus === EventStatus.PLANNED;
  const [isOrganizer, organizer] = useIsEventOrganizer(event, profile?.id);
  const { isParticipant, usersParticipant } = useEventParticipantData(
    event,
    profile?.id,
  );

  const handleClose = () => {
    if (location.state?.from === 'list') {
      navigate(-1);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  const [isWaitingForParticipant, setIsWaitingForParticipant] = useState(false);

  const handleJoinEvent = async () => {
    if (!eventId || isWaitingForParticipant) return;

    setIsWaitingForParticipant(true);
    await joinEvent(eventId);
  };

  useEffect(() => {
    setIsWaitingForParticipant(false);
  }, [eventId]);

  useEffect(() => {
    if (isParticipant || isError) {
      setIsWaitingForParticipant(false);
    }
  }, [isParticipant, isError]);

  if (isLoading || !event) return <EventCardSkeleton />;

  const usersCount = event.users?.length || 0;
  const maxUsers = event.countUsers;
  const hasFreeSlots = maxUsers > usersCount;

  const getFooterMode = (params: {
    isEventPlanned: boolean;
    isOrganizer: boolean;
    isParticipant: boolean;
  }): FooterMode => {
    if (!params.isEventPlanned) return FooterMode.IN_PROGRESS;
    if (params.isOrganizer) return FooterMode.ORGANIZER;
    if (params.isParticipant) return FooterMode.PARTICIPANT;
    return FooterMode.GUEST;
  };
  const footerMode = getFooterMode({
    isEventPlanned,
    isOrganizer,
    isParticipant,
  });

  const renderMainAction = () => {
    switch (footerMode) {
      case FooterMode.IN_PROGRESS:
        return (
          <Box
            flex={1}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography>Событие уже идет</Typography>
          </Box>
        );

      case FooterMode.ORGANIZER:
        return (
          <CancelEventButton
            eventId={eventId}
            onCanceled={() => navigate(ROUTES.HOME)}
          />
        );

      case FooterMode.PARTICIPANT:
        return (
          <Button variant='contained' fullWidth size='fullWidthAction'>
            <LogoutIcon />
            Покинуть событие
          </Button>
        );

      case FooterMode.GUEST:
        return (
          <Button
            variant='contained'
            fullWidth
            size='fullWidthAction'
            disabled={!hasFreeSlots || isLoadingJoin || isWaitingForParticipant}
            onClick={handleJoinEvent}
            loading={isLoadingJoin}
          >
            <PlayCircleOutlineIcon />
            Присоединиться
          </Button>
        );

      default:
        return null;
    }
  };

  return (
    <ModalWrapper maxWidth={{ xs: '361px', md: '440px' }}>
      <EventCardEntity
        headerNode={
          <Styled.Header
            {...(event.eventPhoto ? { $image: event.eventPhoto } : {})}
          >
            {!event.eventPhoto && (
              <Box
                width='100%'
                height='100%'
                position='absolute'
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                <Styled.CategoryMuiIcon as={NoPhotographyIcon} />
              </Box>
            )}
            <>
              <Box
                position={'absolute'}
                top={theme.spacing(2)}
                right={theme.spacing(2)}
              >
                <Button
                  variant='contained'
                  size='classicWidthAction'
                  onClick={handleClose}
                >
                  <Cross />
                </Button>
              </Box>
            </>
          </Styled.Header>
        }
        titleNode={
          <>
            <SportIcon
              bgcolor='#FFFF'
              width={48}
              height={48}
              border={3}
              borderColor='#2269FF'
              type={event.eventType}
              widthIcon='26px'
              heightIcon='26px'
              filter={false}
            />

            <Typography
              variant='h6'
              flex={1}
              fontSize='18px'
              fontWeight={600}
              alignSelf='center'
            >
              {event.eventName}
            </Typography>

            {isOrganizer && (
              <Button variant='contained' size='classicWidthAction'>
                <CreateIcon />
              </Button>
            )}
          </>
        }
        dateNode={
          <>
            <Typography variant='body2' color='primary'>
              {dayjs(event.eventStartDate).format('DD.MM.YYYY')}
            </Typography>
            <Typography variant='body2' color='primary'>
              {`${dayjs(event.eventStartDate).format('HH:mm')} - ${event.eventEndDate}`}
            </Typography>
          </>
        }
        locationNode={<>Место: {event.eventLocation}</>}
        descriptionNode={
          <>
            Описание события.
            <Typography variant='body2' fontSize='14px' color='text.primary'>
              {event.eventDescription}
            </Typography>
          </>
        }
        organizerNode={
          <>
            <Typography
              variant='body2'
              color='text.disabled'
              fontSize='12px'
              minWidth={96}
            >
              Организатор:
            </Typography>
            <AvatarGroup max={1}>
              {organizer?.userId && (
                <Styled.EventAvatar
                  alt={organizer.nickName || ''}
                  src={organizer.urlUserPhoto || ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(ROUTES.PROFILE.DETAIL(organizer.userId));
                  }}
                />
              )}
            </AvatarGroup>
          </>
        }
        participantsNode={
          <>
            <Typography
              variant='body2'
              color='text.disabled'
              fontSize='12px'
              minWidth={96}
            >
              Участники: ({usersCount}/{maxUsers})
            </Typography>
            <AvatarGroup max={4}>
              {usersParticipant.map((user: IUserParticipant) => (
                <Styled.EventAvatar
                  key={user.userId}
                  alt={user.nickName}
                  src={user.urlUserPhoto || undefined}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(ROUTES.PROFILE.DETAIL(user.userId));
                  }}
                />
              ))}
            </AvatarGroup>
          </>
        }
        footerActionsNode={
          <>
            {isOrganizer && (
              <Button variant='contained' size='classicWidthAction'>
                <ContentCopyIcon />
              </Button>
            )}

            {renderMainAction()}

            {(isOrganizer || isParticipant) && (
              <Button variant='contained' size='classicWidthAction'>
                <MailIcon />
              </Button>
            )}
          </>
        }
      />
    </ModalWrapper>
  );
};
