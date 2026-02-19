import { useMemo } from 'react';

import { IEvent, IUserParticipant, UserRole } from '@shared/lib';

export const useEventParticipantData = (
  event: IEvent | undefined,
  currentUserId?: string,
) =>
  useMemo(() => {
    const users = event?.users ?? [];

    const isParticipant = currentUserId
      ? users.some(
          (u: IUserParticipant) =>
            u.userId === currentUserId && u.userRole === UserRole.participant,
        )
      : false;

    const roleOrder: Record<UserRole, number> = {
      [UserRole.organizer]: 0,
      [UserRole.participant]: 1,
    };

    const usersParticipant = [...users]
      .sort((a, b) => {
        const byRole = roleOrder[a.userRole] - roleOrder[b.userRole];
        if (byRole !== 0) return byRole;
        return a.nickName.localeCompare(b.nickName);
      })
      .slice(0);

    return { isParticipant, usersParticipant };
  }, [event?.users, currentUserId]);
