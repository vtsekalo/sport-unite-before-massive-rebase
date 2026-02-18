import { useMediaQuery, useTheme } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';
import { useGetFilteredEventsQuery } from '@shared/api';
import { IEventWithoutCoordinates, useEventSearch } from '@shared/lib';
import {
  CommonEventsListDesktop,
  CommonEventsListMobile,
} from '@widgets/common-events-list';

export const CommonEventListPage = () => {
  const { filters } = useEventSearch();
  const { data, isLoading } = useGetFilteredEventsQuery(filters);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const events: IEventWithoutCoordinates[] = (data ?? []).map((event) => {
    return {
      eventId: event.eventId,
      eventName: event.eventName,
      eventType: event.eventType,
      eventStartDate: event.eventStartDate,
      eventEndDate: event.eventEndDate,
      eventDescription: event.eventDescription,
      eventPhoto: event.eventPhoto,
      eventLocation: event.eventLocation,
      eventStatus: event.eventStatus,
      countUsers: event.countUsers,
      users: event.users,
    };
  });

  const noEvents = !isLoading && events.length === 0;

  if (noEvents) {
    return null;
  }

  return (
    <ModalWrapper>
      {isMobile ? (
        <CommonEventsListMobile events={events} isLoading={isLoading} />
      ) : (
        <CommonEventsListDesktop events={events} isLoading={isLoading} />
      )}
    </ModalWrapper>
  );
};
