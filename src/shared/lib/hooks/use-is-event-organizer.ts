import { useMemo } from 'react';

import {
  IEventWithoutCoordinates,
  IUserParticipant,
  UserRole,
} from '@shared/lib';

export const useIsEventOrganizer = (
  event?: IEventWithoutCoordinates | undefined,
  currentUserId?: string,
): [boolean, IUserParticipant | undefined] =>
  useMemo(() => {
    if (!event?.users || !currentUserId) return [false, undefined];

    const organizer = event.users.find(
      (u) => u.userRole === UserRole.organizer,
    );

    const isCurrentUserOrganizer = event.users.some(
      (u) => u.userId === currentUserId && u.userRole === UserRole.organizer,
    );

    return [isCurrentUserOrganizer, organizer];
  }, [event?.users, currentUserId]);
