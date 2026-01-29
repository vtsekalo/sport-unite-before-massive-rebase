import { FC, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Cross from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Skeleton,
  Typography,
} from '@mui/material';

import { EventInfo, Styled } from '@entities/event-card';
import { ModalWrapper } from '@entities/modal-wrapper';
import { QueryInfo } from '@entities/query-info';
import { CancelEventButton } from '@features/cancel-event';
import { useGetEventByIdQuery } from '@shared/api';
import { Run } from '@shared/assets';
import {
  EventStatus,
  IEventResponse,
  IUserParticipant,
  ROUTES,
  useProfile,
} from '@shared/lib';
import { formatDate } from '@shared/lib';
import { UserRole } from '@shared/lib/types';

import { Styled2 } from './event-edit-modal.styled';

type EventEditModalProps = {
  onClose?: () => void;
};

export const EventEditModal: FC<EventEditModalProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const { eventId } = useParams<{ eventId: string }>();
  const {
    data: eventData,
    isLoading,
    isError,
  } = useGetEventByIdQuery(eventId || '', {
    skip: !eventId,
    refetchOnMountOrArgChange: true,
  });

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
      eventStatus: EventStatus.PLANNED,
      eventStartDateTime: startDateTime,
      eventStartDate: startDateTime,
      eventEndDate: endDate.toISOString(),
      countUsers: eventData.countUsers,
      eventDescription: eventData.eventDescription,
      eventPhoto: eventData.eventPhoto,
      eventLocation: eventData.eventLocation,
      userRole: eventData.userRole ?? false,
      coordinates: eventData.coordinates,
      users: eventData.users,
    };
  }, [eventData]);

  const isCreator = useMemo(() => {
    if (!isAuthenticated || !profile || !event?.users) return false;

    const organizer = event.users.find(
      (user) => user.userRole === UserRole.organizer,
    );
    return organizer?.userId === profile.id;
  }, [isAuthenticated, profile, event?.users]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
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
        <Styled.EventHeader>
          <Styled.AbsoluteSkeleton
            variant='rectangular'
            width='100%'
            height='100%'
          />
        </Styled.EventHeader>
      );

      const titleNode = (
        <>
          <Skeleton variant='circular' width={48} height={48} />
          <Box flex={1} alignSelf='center'>
            <Skeleton height={20} />
          </Box>
          <Styled.ButtonSkeleton variant='rectangular' width={40} height={40} />
        </>
      );

      const dateNode = (
        <>
          <Skeleton height={20} width={120} />
          <Skeleton height={20} width={140} />
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

      const participantsNode = (
        <>
          <Typography variant='body2' color='text.disabled' fontSize='12px'>
            <Skeleton height={20} width={120} />
          </Typography>
          <AvatarGroup max={3}>
            {[1, 2, 3].map((i) => (
              <Avatar key={i}>
                <Skeleton variant='circular' width={40} height={40} />
              </Avatar>
            ))}
          </AvatarGroup>
        </>
      );

      const footerActionsNode = (
        <>
          <Styled.ButtonSkeleton variant='rectangular' width={40} height={40} />
          <Styled.RoundedSkeleton variant='rounded' height={40} width='60%' />
          <Styled.ButtonSkeleton variant='rectangular' width={40} height={40} />
        </>
      );

      return {
        headerNode,
        titleNode,
        dateNode,
        locationNode,
        descriptionNode,
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
    const maxUsers = event.countUsers || 0;
    const hasFreeSlots = maxUsers > usersCount;

    const isParticipant =
      isAuthenticated &&
      profile &&
      event.users?.some((user) => user.userId === profile.id);

    const eventPhoto =
      typeof event?.eventPhoto === 'string' ? event.eventPhoto : undefined;

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
      <Styled.EventHeader {...(eventPhoto ? { $image: eventPhoto } : {})}>
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
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
        )}
        {headerContent}
      </Styled.EventHeader>
    );

    const titleNode = (
      <>
        <Styled.CategoryIconOuter>
          <Styled.CategoryIconInner>
            <Styled.CategoryIconImage src={Run} alt={event.eventType} />
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

        {isCreator && (
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

    const participantsNode = (
      <>
        <Typography variant='body2' color='text.disabled' fontSize='12px'>
          Участники: ({usersCount}/{maxUsers})
        </Typography>
        <AvatarGroup max={event.countUsers}>
          {(event.users || []).map((user: IUserParticipant) => (
            <Styled2.UserAvatar
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

    const footerActionsNode = (
      <>
        {isCreator && (
          <Button variant='classicWidthAction'>
            <Styled.CategoryMuiIcon as={ContentCopyIcon} />
          </Button>
        )}

        {isCreator ? (
          <CancelEventButton
            eventId={eventId}
            onCanceled={() => navigate('/')}
          />
        ) : isParticipant ? (
          <Button variant='fullWidthAction'>
            <Styled.CategoryMuiIcon as={LogoutIcon} />
            <Styled.ButtonLabel>Покинуть событие</Styled.ButtonLabel>
          </Button>
        ) : (
          <Button variant='fullWidthAction' disabled={!hasFreeSlots}>
            <Styled.CategoryMuiIcon as={PlayCircleOutlineIcon} />
            <Styled.ButtonLabel>Участвовать</Styled.ButtonLabel>
          </Button>
        )}

        {(isCreator || isParticipant) && (
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
      participantsNode,
      footerActionsNode,
    };
  };

  const content = renderContent();

  if (!content) {
    return <QueryInfo type='error' title='Ошибка загрузки события' />;
  }

  return (
    <ModalWrapper width='auto'>
      <EventInfo
        headerNode={content.headerNode}
        titleNode={content.titleNode}
        dateNode={content.dateNode}
        locationNode={content.locationNode}
        descriptionNode={content.descriptionNode}
        participantsNode={content.participantsNode}
        footerActionsNode={content.footerActionsNode}
      />
    </ModalWrapper>
  );
};
