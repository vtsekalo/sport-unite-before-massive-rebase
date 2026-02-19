import dayjs from 'dayjs';
import { FC, Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Divider, Icon, Tooltip, Typography } from '@mui/material';

import { MyEventListCardEntity } from '@entities/my-event-list-card';
import { Crown } from '@shared/assets';
import { EventStatus, IEvent, ROUTES, UserRole } from '@shared/lib';
import { ImageWrapper } from '@shared/ui/image-wrapper';
import { SportIcon } from '@shared/ui/sport-icons';

import { groupEventsByStatus } from '../lib/group-events-by-status';
import { MyEventListSkeleton } from './my-event-list-skeleton';
import { Styled } from './my-event-list.style';

interface EventsListProps {
  loading?: boolean;
  events?: IEvent[];
}

export const MyEventListDesktop: FC<EventsListProps> = ({
  events,
  loading,
}) => {
  const grouped = useMemo(() => groupEventsByStatus(events), [events]);
  const navigate = useNavigate();

  const handleOpenCard = (eventId: string) => {
    navigate(ROUTES.EVENT.DETAIL(eventId));
  };

  const titles = [
    { title: 'Активные', data: grouped.active },
    { title: 'Завершённые', data: grouped.completed },
    { title: 'Отменённые', data: grouped.cancelled },
  ];

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      width='100%'
      gap='18px'
      overflow='hidden'
    >
      {titles.map((column, index) => (
        <Fragment key={column.title}>
          <Box
            flex={1}
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap='36px'
            pr={2}
            height='100%'
          >
            <Box
              height='40px'
              width='180px'
              display='flex'
              alignItems='center'
              justifyContent='center'
              bgcolor='#3677FF1A'
              borderRadius='10px'
              flexShrink={0}
            >
              <Typography variant='h3' fontWeight={700} fontSize={20}>
                {column.title}
              </Typography>
            </Box>

            <Styled.ScrollContainer
              width='100%'
              display='flex'
              flexDirection='column'
              alignItems='center'
              flexGrow={1}
              overflow='auto'
              gap='8px'
              py='2px'
              pl={2}
              pr='23px'
            >
              {!loading ? (
                <MyEventListSkeleton count={3} />
              ) : column.data.length > 0 ? (
                column.data.map((event) => (
                  <MyEventListCardEntity
                    key={event.eventId}
                    eventStatus={event.eventStatus}
                    userRole={
                      event.users?.[0]?.userRole || UserRole.participant
                    }
                    typeNode={
                      <Styled.EventIcon $status={event.eventStatus}>
                        <SportIcon type={event.eventType} />
                      </Styled.EventIcon>
                    }
                    roleNode={
                      <Icon>
                        <img width={24} height={24} src={Crown} alt='role' />
                      </Icon>
                    }
                    titleNode={
                      <Tooltip title={event.eventName} placement='top-start'>
                        <Styled.EventTypography
                          fontWeight={600}
                          fontSize='14px'
                        >
                          {event.eventName}
                        </Styled.EventTypography>
                      </Tooltip>
                    }
                    addressNode={
                      <Tooltip
                        title={event.eventLocation}
                        placement='top-start'
                      >
                        <Styled.AddressTypography
                          fontSize='12px'
                          color='#B5B5B5'
                        >
                          {event.eventLocation}
                        </Styled.AddressTypography>
                      </Tooltip>
                    }
                    eventTimeNode={
                      <Typography
                        color={
                          event.eventStatus === EventStatus.COMPLETED
                            ? '#BDBDBD'
                            : '#3677FF'
                        }
                        fontSize='12px'
                      >
                        {event.eventStartDate
                          ? dayjs(event.eventStartDate).format(
                              'DD.MM.YYYY [в] HH:mm',
                            )
                          : ''}
                      </Typography>
                    }
                    avatarEventNode={
                      <ImageWrapper
                        height={56}
                        width={80}
                        src={event.eventPhoto}
                      >
                        <Styled.EventImage
                          height={56}
                          width={80}
                          $status={event.eventStatus}
                          src={event.eventPhoto}
                          alt={event.eventName}
                        />
                      </ImageWrapper>
                    }
                    textNode={
                      <Tooltip
                        title={event.eventDescription}
                        placement='top-start'
                      >
                        <Styled.EventTypography fontSize='14px' color='#000000'>
                          {event.eventDescription}
                        </Styled.EventTypography>
                      </Tooltip>
                    }
                    buttonNode={
                      <Styled.StyledButton
                        variant='contained'
                        fullWidth
                        size='small'
                        onClick={() => handleOpenCard(event.eventId)}
                      >
                        Подробнее
                      </Styled.StyledButton>
                    }
                  />
                ))
              ) : (
                <Typography
                  fontSize={14}
                  fontWeight={400}
                  color='#B5B5B5'
                  marginTop={2}
                >
                  У вас пока нет событий с этим статусом
                </Typography>
              )}
            </Styled.ScrollContainer>
          </Box>
          {index < titles.length - 1 && (
            <Divider orientation='vertical' variant='middle' flexItem />
          )}
        </Fragment>
      ))}
    </Box>
  );
};
