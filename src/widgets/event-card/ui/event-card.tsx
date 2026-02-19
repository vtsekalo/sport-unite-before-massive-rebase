import dayjs from 'dayjs';
import { FC, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Cross from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import { AvatarGroup, Box, Button, Typography, useTheme } from '@mui/material';

import { EventCardEntity } from '@entities/event-card';
import { useGetEventByIdQuery } from '@shared/api';
import {
  IEvent,
  IUserParticipant,
  ROUTES,
  useEventParticipantData,
  useIsEventOrganizer,
  useProfile,
} from '@shared/lib';
import { ImageWrapper } from '@shared/ui';
import { SportIcon } from '@shared/ui/sport-icons';
import {
  EventCardFooter,
  EventCardSkeleton,
  Styled,
} from '@widgets/event-card';

export const EventCard: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { eventId } = useParams<{ eventId: string }>();

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

  const [isOrganizer, organizer] = useIsEventOrganizer(eventData, profile?.id);

  const { isParticipant, usersParticipant } = useEventParticipantData(
    eventData,
    profile?.id,
  );

  useEffect(() => {
    if (!profile) {
      navigate(ROUTES.AUTH);
    }
  }, [profile, navigate]);

  useEffect(() => {
    if (isError) {
      navigate(ROUTES.HOME);
    }
  }, [isError, navigate]);

  const renderEventContent = () => {
    if (!eventData) return null;

    const event: IEvent = {
      eventId: eventData.eventId,
      eventName: eventData.eventName,
      eventType: eventData.eventType,
      eventStatus: eventData.eventStatus,
      eventStartDate: eventData.eventStartDate,
      eventEndDate: dayjs(eventData.eventEndDate).format('HH:mm'),
      countUsers: eventData.countUsers,
      eventDescription: eventData.eventDescription,
      eventPhoto: eventData.eventPhoto,
      eventLocation: eventData.eventLocation,
      coordinates: eventData.coordinates,
      users: eventData.users,
    };

    const handleClose = () => {
      if (location.state?.from === 'list') {
        navigate(-1);
      } else {
        navigate(ROUTES.HOME);
      }
    };

    const usersCount = event.users?.length || 0;
    const maxUsers = event.countUsers;

    return (
      <EventCardEntity
        headerNode={
          <Box
            width={{ xs: '361px', md: '440px' }}
            height={{ xs: '160px', md: '240px' }}
            position={'relative'}
            overflow={'hidden'}
            flexShrink={0}
          >
            <ImageWrapper
              key={event.eventId}
              src={event.eventPhoto}
              borderRadius={0}
              fontSize={100}
              width={{ xs: '361px', md: '440px' }}
              height={{ xs: '160px', md: '240px' }}
            >
              <Styled.EventImage
                width='100%'
                height='100%'
                $status={event.eventStatus}
                src={event.eventPhoto}
                alt={event.eventName}
              />
            </ImageWrapper>
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
          </Box>
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
            <Typography
              variant='body2'
              fontSize='14px'
              color='text.primary'
              overflow='hidden'
              sx={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
            >
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
                  alt={organizer.nickName}
                  src={`${organizer.urlUserPhoto}?v=${Math.random()}`}
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
            <AvatarGroup>
              {usersParticipant.slice(0, 4).map((user: IUserParticipant) => (
                <Styled.EventAvatar
                  key={user.userId}
                  alt={user.nickName}
                  src={`${user.urlUserPhoto}?v=${Math.random()}`}
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
          <EventCardFooter
            isOrganizer={isOrganizer}
            eventStartDate={event.eventStartDate}
            eventStatus={event.eventStatus}
            eventId={event.eventId}
            hasFreeSlots={maxUsers > usersCount}
            onCanceled={() => navigate(ROUTES.HOME)}
            isParticipant={isParticipant}
            isError={isError}
          />
        }
      />
    );
  };

  return (
    <Styled.AnimatedModalWrapper
      key={eventId}
      maxWidth={{ xs: '361px', md: '440px' }}
    >
      {isLoading || !eventData || isError ? (
        <EventCardSkeleton />
      ) : (
        renderEventContent()
      )}
    </Styled.AnimatedModalWrapper>
  );
};
