import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';
import { useGetUserChatsQuery } from '@shared/api';
import { ROUTES } from '@shared/lib';
import { ChatsList } from '@widgets/chats-list';

export const Chats: FC = () => {
  const { data, isLoading, error } = useGetUserChatsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (error && 'status' in error && error?.status === 401) {
      navigate(ROUTES.AUTH);
    }
  }, [error, navigate]);

  return (
    <ModalWrapper
      paddingY={2}
      paddingX={1}
      display='flex'
      alignItems='center'
      justifyItems='center'
      flexDirection='column'
      gap={'16px'}
    >
      <Typography
        component='h3'
        fontWeight={700}
        fontSize={20}
        lineHeight={'24px'}
      >
        Сообщения
      </Typography>
      <ChatsList chats={data ?? []} loading={isLoading} />
    </ModalWrapper>
  );
};
