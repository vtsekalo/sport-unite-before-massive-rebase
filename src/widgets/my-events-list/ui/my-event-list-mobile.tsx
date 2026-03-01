import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Tab, Typography } from '@mui/material';

import { MyEventListCardEntity } from '@entities/my-event-list-card';
import { Crown } from '@shared/assets';
import { EventStatus, IEvent, ROUTES, dayjs } from '@shared/lib';
import { ImageWrapper } from '@shared/ui/image-wrapper';
import { SportIcon } from '@shared/ui/sport-icons';

import { groupEventsByStatus } from '../lib/group-events-by-status';
import { MyEventListSkeleton } from './my-event-list-skeleton';
import { Styled } from './my-event-list.style';

interface EventsListProps {
  loading?: boolean;
  events?: IEvent[];
}

export const MyEventListMobile: FC<EventsListProps> = ({ events, loading }) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const grouped = useMemo(() => groupEventsByStatus(events), [events]);

  const handleOpenCard = (eventId: string) => {
    navigate(ROUTES.EVENT.DETAIL(eventId));
  };

  const handleChange = (_event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const eventsTab = useMemo(() => {
    switch (value) {
      case 0:
        return grouped.active;
      case 1:
        return grouped.completed;
      case 2:
        return grouped.cancelled;
      default:
        return [];
    }
  }, [value, grouped]);

  return (
    <>
      <Styled.StyledTabs
        value={value}
        onChange={handleChange}
        variant='scrollable'
        allowScrollButtonsMobile
        scrollButtons='auto'
      >
        <Tab label='Активные' />
        <Tab label='Завершённые' />
        <Tab label='Отменённые' />
      </Styled.StyledTabs>

      <Styled.MobileEventsContainer
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap='8px'
        overflow='auto'
        p='2px'
        m='-2px'
      >
        {loading ? (
          <MyEventListSkeleton isMobile count={5} />
        ) : eventsTab.length === 0 ? (
          <Box mt={2}>
            <Typography fontSize={14} fontWeight={400} color='#B5B5B5'>
              У вас пока нет событий с этим статусом
            </Typography>
          </Box>
        ) : (
          eventsTab.map((event) => (
            <MyEventListCardEntity
              key={event.eventId}
              eventStatus={event.eventStatus}
              userRole={event.users?.[0]?.userRole}
              typeNode={
                <Styled.EventIcon $status={event.eventStatus}>
                  <SportIcon type={event.eventType} />
                </Styled.EventIcon>
              }
              roleNode={<img width={24} height={24} src={Crown} alt='icon' />}
              titleNode={
                <Styled.EventTypography
                  fontWeight={600}
                  fontSize='14px'
                  lineHeight={1}
                >
                  {event.eventName}
                </Styled.EventTypography>
              }
              addressNode={
                <Styled.AddressTypography
                  fontSize='12px'
                  fontWeight={400}
                  lineHeight={1.5}
                  color='#B5B5B5'
                >
                  {event.eventLocation}
                </Styled.AddressTypography>
              }
              eventTimeNode={
                <Typography
                  color={
                    event.eventStatus === EventStatus.COMPLETED
                      ? '#BDBDBD'
                      : '#3677FF'
                  }
                  fontWeight={400}
                  fontSize='12px'
                  lineHeight={1.5}
                >
                  {event.eventStartDate
                    ? dayjs
                        .utc(event.eventStartDate)
                        .local()
                        .format('DD.MM.YYYY [в] HH:mm')
                    : ''}
                </Typography>
              }
              avatarEventNode={
                <ImageWrapper height={56} width={80} src={event.eventPhoto}>
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
                <Styled.EventTypography
                  fontSize='14px'
                  lineHeight={1.5}
                  fontWeight={400}
                  color='#000000'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  height={42}
                >
                  {event.eventDescription}
                </Styled.EventTypography>
              }
              buttonNode={
                <Styled.StyledButton
                  variant='contained'
                  color='primary'
                  onClick={() => handleOpenCard(event.eventId)}
                >
                  Подробнее
                </Styled.StyledButton>
              }
            />
          ))
        )}
      </Styled.MobileEventsContainer>
    </>
  );
};
