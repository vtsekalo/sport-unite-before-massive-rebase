import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Skeleton, Typography } from '@mui/material';

import { ChatCardEntity } from '@entities/chat-card';
import { IChat } from '@shared/lib';
import { formatDateOrTime } from '@shared/lib';
import { SportIcon } from '@shared/ui/sport-icons';

import { CardWrapper } from './chat-list.styled';

interface ChatsListProps {
  loading?: boolean;
  chats?: IChat[];
}

export const ChatsList: FC<ChatsListProps> = ({ chats, loading }) => {
  const navigate = useNavigate();

  if (!loading && !chats?.length) {
    return (
      <Box>
        <Typography fontSize={14} fontWeight={400} color='#B5B5B5'>
          У вас пока нет чатов
        </Typography>
      </Box>
    );
  }

  const mappedChats =
    chats?.map(
      (chat): IChat => ({
        ...chat,
        lastMessage:
          chat?.lastMessage && chat?.lastMessage?.length > 40
            ? `${chat.lastMessage.slice(0, 40)}...`
            : chat.lastMessage,
        lastMessageDateTime:
          chat.lastMessageDateTime &&
          formatDateOrTime(chat.lastMessageDateTime),
        eventStartDate:
          chat.eventStartDate &&
          dayjs(chat.eventStartDate).format('DD.MM.YYYY [в] HH:mm'),
      }),
    ) ?? [];

  return (
    <Box width='100%' display='flex' flexDirection='column' gap='8px'>
      {loading &&
        [1, 2, 3].map((skeleton) => (
          <ChatCardEntity
            key={skeleton}
            typeNode={
              <Skeleton
                sx={{ borderRadius: '10px' }}
                variant='rectangular'
                height='24px'
                width='24px'
              />
            }
            titleNode={<Skeleton height='16px' width='160px' />}
            addressNode={<Skeleton height='16px' width='130px' />}
            lastTimeMessageNode={<Skeleton height='16px' width='60px' />}
            eventTimeNode={<Skeleton height='16px' width='110px' />}
            lastMessageNode={<Skeleton height='16px' width='170px' />}
          />
        ))}
      {!loading &&
        mappedChats.map((chat) => (
          <CardWrapper
            key={chat.id}
            onClick={() => navigate(`/chats/${chat.eventId}`)}
          >
            <ChatCardEntity
              typeNode={<SportIcon type={chat.eventType} />}
              titleNode={
                <Typography fontWeight={500} fontSize='14px'>
                  {chat.title}
                </Typography>
              }
              addressNode={
                <Typography fontSize='12px' fontWeight={400} color='#B5B5B5'>
                  {chat.eventLocation}
                </Typography>
              }
              lastTimeMessageNode={
                chat.lastMessageDateTime && (
                  <Typography color='#B5B5B5' fontWeight={400} fontSize='12px'>
                    {chat.lastMessageDateTime}
                  </Typography>
                )
              }
              eventTimeNode={
                <Typography color='#3677FF' fontWeight={400} fontSize='12px'>
                  {chat.eventStartDate}
                </Typography>
              }
              lastMessageNode={
                <Typography fontWeight={400} fontSize='12px'>
                  {chat.lastMessage}
                </Typography>
              }
            />
          </CardWrapper>
        ))}
    </Box>
  );
};
