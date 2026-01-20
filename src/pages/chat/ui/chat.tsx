import dayjs from 'dayjs';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import SendIcon from '@mui/icons-material/Send';
import { Skeleton, Typography, useMediaQuery, useTheme } from '@mui/material';

import { MessageCard } from '@entities/message-card';
import { ModalWrapper } from '@entities/modal-wrapper';
import {
  selectChatById,
  useGetChatMessagesQuery,
  useGetMyProfileQuery,
  useGetUserChatsQuery,
} from '@shared/api';
import { useAppSelector } from '@shared/lib';
import { InputSearch } from '@shared/ui/input';

// import { ChatMessages } from '@widgets/chat-messages';

import { ChatEntity } from './chat-entity';
import iconSrc from './sports_and_outdoors.svg';

export const Chat: FC = () => {
  // TODO - нужно вытаскивать не useGetUserChatsQuery
  const { isLoading: isLoadingChats } = useGetUserChatsQuery();
  const { isLoading: isLoadingProfile } = useGetMyProfileQuery({});

  const { id: eventId } = useParams();
  const { data: messages, isLoading: isLoadingMessages } =
    useGetChatMessagesQuery(eventId, {
      skip: !eventId,
    });
  const chat = useAppSelector((state) => selectChatById(state, eventId));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  console.log({ chat, messages });
  if (isLoadingChats || isLoadingMessages || isLoadingProfile) {
    return (
      <ModalWrapper>
        <ChatEntity
          dateNode={<Skeleton width='80px' height='22px' />}
          chatTitleNode={
            <>
              <img src={iconSrc} />
              <Skeleton height='18px' width='120px' />
            </>
          }
          inputNode={
            <Skeleton
              width={isMobile ? '297px' : '500px'}
              height={isMobile ? '40px' : '56px'}
            />
          }
        >
          <MessageCard
            timeNode={<Skeleton width={80} height={24} />}
            messageNode={<Skeleton width={150} height={60} />}
            isMyMessage={false}
            avtorNode={<Skeleton width={150} height={24} />}
            avatarNode={<Skeleton width={40} height={40} variant='circular' />}
          />
          <MessageCard
            timeNode={<Skeleton width={80} height={24} />}
            messageNode={<Skeleton width={150} height={60} />}
            isMyMessage={true}
            avatarNode={<Skeleton width={40} height={40} variant='circular' />}
          />
          <MessageCard
            timeNode={<Skeleton width={80} height={24} />}
            messageNode={<Skeleton width={150} height={60} />}
            isMyMessage={false}
            avtorNode={<Skeleton width={150} height={24} />}
            avatarNode={<Skeleton width={40} height={40} variant='circular' />}
          />
          <MessageCard
            timeNode={<Skeleton width={80} height={24} />}
            messageNode={<Skeleton width={150} height={60} />}
            isMyMessage={true}
            avatarNode={<Skeleton width={40} height={40} variant='circular' />}
          />
          <MessageCard
            timeNode={<Skeleton width={80} height={24} />}
            messageNode={<Skeleton width={150} height={60} />}
            isMyMessage={false}
            avtorNode={<Skeleton width={150} height={24} />}
            avatarNode={<Skeleton width={40} height={40} variant='circular' />}
          />
        </ChatEntity>
      </ModalWrapper>
    );
  }

  if (!chat) {
    return (
      <ModalWrapper alignItems='center' justifyContent='center'>
        <Typography component='span' width='fit-content'>
          Информация о чате не найдена
        </Typography>
      </ModalWrapper>
    );
  }

  const date =
    chat?.eventStartDate && dayjs(chat?.eventStartDate).format('DD.MM.YYYY');
  const horse =
    chat?.eventStartDate && dayjs(chat?.eventStartDate).format('HH:mm');

  return (
    <ModalWrapper>
      <ChatEntity
        dateNode={
          <Typography color='#3677FF' fontWeight={400} fontSize='12px'>
            {date}
            <br />
            {horse}
          </Typography>
        }
        chatTitleNode={
          <>
            <img src={iconSrc} />
            <Typography noWrap maxWidth={100} fontWeight={500} fontSize='14px'>
              {chat.title}
            </Typography>
          </>
        }
        inputNode={
          <InputSearch
            endIcon={<SendIcon color='info' />}
            placeholder='Введите сообщение'
            startIcon={null}
          />
        }
      >
        {null}
        {/* <ChatMessages messages={messages} profile={profile} /> */}
      </ChatEntity>
    </ModalWrapper>
  );
};
