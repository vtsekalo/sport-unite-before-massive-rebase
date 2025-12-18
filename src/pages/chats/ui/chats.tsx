import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { useGetUserChatsQuery } from '@shared/api';
import { ChatsList } from '@widgets/chats-list';

export const Chats: FC = () => {
  const { data, isLoading, error } = useGetUserChatsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (error && 'status' in error && error?.status === 401) {
      navigate('/auth');
    }
  }, [error, navigate]);

  return (
    <Box
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
    </Box>
  );
};
