import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Cross from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { AvatarGroup, Box, Button, Skeleton, Typography } from '@mui/material';

import { EventInfo } from '@entities/event-card';
import { QueryInfo } from '@entities/query-info';
import { CancelEventButton } from '@features/cancel-event';
import { useGetEventByIdQuery, useGetJoinInEventsMutation } from '@shared/api';
import {
  EventStatus,
  IEventResponse,
  IUserParticipant,
  ROUTES,
  useEventParticipantData,
  useIsEventOrganizer,
  useProfile,
} from '@shared/lib';
import { formatDate } from '@shared/lib';
import { SportIcon } from '@shared/ui/sport-icons';

import { Styled } from './event-edit-modal.styled';

type EventEditModalProps = {
  onClose?: () => void;
};

export const EventEditModal: FC<EventEditModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(false);
  const { eventId } = useParams<{ eventId: string }>();
  const {
    data: eventData,
    isLoading,
    isError,
  } = useGetEventByIdQuery(eventId || '', {
    skip: !eventId,
    refetchOnMountOrArgChange: true,
  });

  const [joinEvent, { isLoading: isLoadingJoin }] =
    useGetJoinInEventsMutation();
  const { profile, isLoading: isProfileLoading } = useProfile();
  const isAuthenticated = !!profile;

  useEffect(() => {
    if (!isProfileLoading && !isAuthenticated) {
      navigate(ROUTES.PROFILE.INDEX);
    }
  }, [isAuthenticated, isProfileLoading, navigate]);

  const event: IEventResponse | null = useMemo(() => {
    if (!eventData) return null;

    const startDateTime = eventData.eventStartDate;
    const startDate = new Date(startDateTime);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2);

    return {
      eventId: eventData.eventId,
      userId: eventData.userId || '',
      eventName: eventData.eventName,
      eventType: eventData.eventType,
      eventStatus: eventData.eventStatus,
      eventStartDateTime: startDateTime,
      eventStartDate: startDateTime,
      eventEndDate: endDate.toISOString(),
      countUsers: eventData.countUsers,
      eventDescription: eventData.eventDescription,
      eventPhoto: eventData.eventPhoto,
      eventLocation: eventData.eventLocation,
      coordinates: eventData.coordinates,
      users: eventData.users,
    };
  }, [eventData]);

  const isEventPlanned = event?.eventStatus === EventStatus.PLANNED;
  const [isOrganizer, organizer] = useIsEventOrganizer(event, profile?.id);
  const { isParticipant, usersParticipant } = useEventParticipantData(
    event,
    profile?.id,
  );
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(ROUTES.HOME);
    }
  };

  useEffect(() => {
    if (isParticipant) {
      setIsJoining(false);
    }
  }, [isParticipant]);

  const handleJoinEvent = async () => {
    if (!eventId || isJoining) return;

    setIsJoining(true);
    try {
      await joinEvent(eventId).unwrap();
    } catch {
      setIsJoining(false);
    }
  };

  if (isError) {
    return (
      <Box
        position='relative'
        display='flex'
        flex={1}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <QueryInfo type='error' title='Ошибка загрузки события' />
        <Styled.CloseButton onClick={handleClose} variant='classicWidthAction'>
          <Styled.CategoryMuiIcon as={Cross} />
        </Styled.CloseButton>
      </Box>
    );
  }

  const renderContent = () => {
    if (isLoading) {
      const headerNode = (
        <Styled.Header>
          <Styled.AbsoluteSkeleton
            variant='rectangular'
            width='100%'
            height='100%'
          />
        </Styled.Header>
      );

      const titleNode = (
        <>
          <Skeleton variant='circular' width={48} height={48} />
          <Box flex={1} alignSelf='center' pr={4}>
            <Skeleton height={20} />
          </Box>
        </>
      );

      const dateNode = (
        <>
          <Skeleton height={20} width={70} />
          <Skeleton height={20} width={90} />
        </>
      );

      const locationNode = (
        <>
          <Skeleton height={20} width={200} />
        </>
      );

      const descriptionNode = (
        <>
          <Skeleton height={20} width='90%' />
          <Skeleton height={20} width='80%' />
          <Skeleton height={20} width='75%' />
        </>
      );

      const organizerNode = (
        <>
          <Typography variant='body2' color='text.disabled' fontSize='12px'>
            <Skeleton height={20} width={100} />
          </Typography>
          <Skeleton variant='circular' width={32} height={32} />
        </>
      );

      const participantsNode = (
        <>
          <Typography variant='body2' color='text.disabled' fontSize='12px'>
            <Skeleton height={20} width={120} />
          </Typography>
          <AvatarGroup max={4}>
            {[1, 2, 3, 4].map((i) => (
              <Styled.EventAvatar key={i}>
                <Skeleton variant='circular' />
              </Styled.EventAvatar>
            ))}
          </AvatarGroup>
        </>
      );

      const footerActionsNode = (
        <>
          <Box width={40} height={40}>
            <Skeleton variant='button' width='100%' height='100%' />
          </Box>

          <Box flex={1} height={40}>
            <Skeleton variant='button' width='100%' height='100%' />
          </Box>

          <Box width={40} height={40}>
            <Skeleton variant='button' width='100%' height='100%' />
          </Box>
        </>
      );

      return {
        headerNode,
        titleNode,
        dateNode,
        locationNode,
        descriptionNode,
        organizerNode,
        participantsNode,
        footerActionsNode,
      };
    }

    if (!event) {
      return null;
    }

    const eventStartDate = formatDate(event.eventStartDate);
    const eventEndDate = event.eventEndDate
      ? formatDate(event.eventEndDate)
      : ['', ''];
    const usersCount = event.users?.length || 0;
    const maxUsers = event.countUsers;
    const hasFreeSlots = maxUsers > usersCount;

    const eventPhoto = event.eventPhoto || undefined;

    const headerContent = (
      <>
        <Styled.FavoriteButton variant='classicWidthAction'>
          <Styled.CategoryMuiIcon as={StarBorderIcon} />
        </Styled.FavoriteButton>

        <Styled.CloseButton onClick={handleClose} variant='classicWidthAction'>
          <Styled.CategoryMuiIcon as={Cross} />
        </Styled.CloseButton>
      </>
    );

    const headerNode = (
      <Styled.Header {...(eventPhoto ? { $image: eventPhoto } : {})}>
        {!eventPhoto && (
          <Box
            width='100%'
            height='100%'
            position='absolute'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Styled.CategoryMuiIcon
              as={NoPhotographyIcon}
              sx={{
                width: '60%',
                height: '60%',
              }}
            />
          </Box>
        )}
        {headerContent}
      </Styled.Header>
    );

    const titleNode = (
      <>
        <Styled.CategoryIconOuter>
          <Styled.CategoryIconInner>
            <SportIcon
              type={event.eventType}
              sizeBox={0}
              sizeIcon={26}
              invert={false}
            />
          </Styled.CategoryIconInner>
        </Styled.CategoryIconOuter>

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
          <Button variant='classicWidthAction'>
            <Styled.CategoryMuiIcon as={CreateIcon} />
          </Button>
        )}
      </>
    );

    const dateNode = (
      <>
        <Typography variant='body2' color='primary'>
          {eventStartDate[0]}
        </Typography>
        <Typography variant='body2' color='primary'>
          {`${eventStartDate[1]} - ${eventEndDate[1]}`}
        </Typography>
      </>
    );

    const locationNode = (
      <>Место: {event.eventLocation || 'Место уточняется'}</>
    );

    const descriptionNode = (
      <>
        Описание события.
        <Typography variant='body2' fontSize='14px' color='text.primary'>
          {event.eventDescription}
        </Typography>
      </>
    );

    const organizerNode = (
      <>
        <Typography
          variant='body2'
          color='text.disabled'
          fontSize='12px'
          minWidth={96}
        >
          Организатор:
        </Typography>
        <AvatarGroup max={3}>
          <Styled.EventAvatar
            alt={organizer?.nickName}
            src={organizer?.urlUserPhoto || ''}
          />
        </AvatarGroup>
      </>
    );
    const participantsNode = (
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
    );

    const renderActionButton = () => {
      if (!isEventPlanned) {
        return <Box flex={1} />;
      }

      if (isOrganizer) {
        return (
          <CancelEventButton
            eventId={eventId}
            onCanceled={() => navigate('/')}
          />
        );
      }

      if (isParticipant) {
        return (
          <Button variant='fullWidthAction'>
            <Styled.CategoryMuiIcon as={LogoutIcon} />
            <Styled.ButtonLabel>Покинуть событие</Styled.ButtonLabel>
          </Button>
        );
      }

      return (
        <Button
          variant='fullWidthAction'
          disabled={!hasFreeSlots || isJoining || isLoadingJoin}
          onClick={handleJoinEvent}
          loading={isLoadingJoin}
        >
          <Styled.CategoryMuiIcon as={PlayCircleOutlineIcon} />
          <Styled.ButtonLabel>Присоединиться</Styled.ButtonLabel>
        </Button>
      );
    };

    const footerActionsNode = (
      <>
        {isOrganizer && (
          <Button variant='classicWidthAction'>
            <Styled.CategoryMuiIcon as={ContentCopyIcon} />
          </Button>
        )}

        {renderActionButton()}

        {(isOrganizer || isParticipant) && (
          <Button variant='classicWidthAction'>
            <Styled.CategoryMuiIcon as={MailIcon} />
          </Button>
        )}
      </>
    );

    return {
      headerNode,
      titleNode,
      dateNode,
      locationNode,
      descriptionNode,
      organizerNode,
      participantsNode,
      footerActionsNode,
    };
  };

  const content = renderContent();

  if (!content) {
    return <QueryInfo type='error' title='Ошибка загрузки события' />;
  }

  return (
    <Styled.AnimatedModalWrapper
      maxWidth={{ xs: '361px', md: '440px' }}
      maxHeight={{ xs: '100%', md: '714px' }}
    >
      <EventInfo
        headerNode={content.headerNode}
        titleNode={content.titleNode}
        dateNode={content.dateNode}
        locationNode={content.locationNode}
        descriptionNode={content.descriptionNode}
        organizerNode={content.organizerNode}
        participantsNode={content.participantsNode}
        footerActionsNode={content.footerActionsNode}
      />
    </Styled.AnimatedModalWrapper>
  );
};
