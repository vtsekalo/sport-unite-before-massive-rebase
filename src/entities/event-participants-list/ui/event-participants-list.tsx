import { FC, MouseEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Cross from '@mui/icons-material/Close';
import { Box, Button, Collapse, List, Typography } from '@mui/material';

import {
  IEvent,
  IUserParticipant,
  ROUTES,
  useEventParticipantData,
} from '@shared/lib';

import { Styled } from './event-participants-list.styled';

type EventInfoProps = {
  eventData: IEvent;
  usersCount: number;
  maxUsers: number;
  profileId?: string;
};

export const EventParticipantsList: FC<EventInfoProps> = ({
  usersCount,
  maxUsers,
  eventData,
  profileId,
}) => {
  const navigate = useNavigate();
  const { usersParticipant } = useEventParticipantData(eventData, profileId);
  const [open, setOpen] = useState(false);
  const { eventId } = eventData;

  const location = useLocation();
  const isEditEvent = location.pathname === '/';

  const isExpandable = usersCount <= 1;

  const handleClick = () => {
    if (isExpandable) return;
    setOpen(!open);
  };

  const handleNavigateToProfile = (userId: string) => (e: MouseEvent) => {
    e.stopPropagation();
    navigate(ROUTES.PROFILE.DETAIL(userId));
  };

  useEffect(() => {
    setOpen(false);
  }, [eventId]);

  const renderAvatar = () => {
    if (!open) {
      return (
        <Styled.UserGroup max={5}>
          {usersParticipant.map((user: IUserParticipant) => (
            <Styled.EventAvatar
              key={user.userId}
              alt={user.nickName}
              src={user.urlUserPhoto}
              onClick={handleNavigateToProfile(user.userId)}
            />
          ))}
        </Styled.UserGroup>
      );
    }
    if (isExpandable) {
      return (
        <Typography fontSize={12}>
          Пока никто не присоединился к событию.
        </Typography>
      );
    }
  };
  return (
    <Box display={'flex'} flexDirection={'column'} gap={2} overflow={'hidden'}>
      <List component='nav' disablePadding>
        <Styled.EventListItemButton
          isExpandable={isExpandable}
          onClick={handleClick}
        >
          <Box
            display='flex'
            alignItems='center'
            gap={1}
            flex={1}
            overflow={'hidden'}
            height={44}
          >
            <Typography
              variant='body2'
              color='text.disabled'
              fontSize='12px'
              mr={1}
            >
              Участники ({usersCount}/{maxUsers}):
            </Typography>
            {renderAvatar()}
          </Box>
          {usersCount > 1 && (
            <Box
              display={'flex'}
              alignItems={'center'}
              alignContent={'center'}
              pr={0.75}
              color={'text.disabled'}
            >
              <Styled.ArrowDownIcon open={open} />
            </Box>
          )}
        </Styled.EventListItemButton>

        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <Box
              display='flex'
              flexDirection='column'
              overflow={'auto'}
              maxHeight={{ xs: 'auto', md: 156 }}
              gap={1}
            >
              {usersParticipant.map((user: IUserParticipant) => (
                <Box display={'flex'} alignItems={'center'} key={user.userId}>
                  <Styled.ParticipantListItem
                    display='flex'
                    alignItems='center'
                    width='100%'
                    onClick={handleNavigateToProfile(user.userId)}
                  >
                    <Box
                      display='flex'
                      alignItems='center'
                      gap={2}
                      flex={1}
                      height={44}
                    >
                      <Box>
                        <Styled.EventAvatar
                          alt={user.nickName}
                          src={user.urlUserPhoto}
                        />
                      </Box>

                      <Typography>{user.nickName}</Typography>
                    </Box>
                  </Styled.ParticipantListItem>
                  {isEditEvent && (
                    <Button variant='contained' size='littleSquare'>
                      <Cross />
                    </Button>
                  )}
                </Box>
              ))}
            </Box>
          </List>
        </Collapse>
      </List>
    </Box>
  );
};
