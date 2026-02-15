import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';
import { useGetCountNotificationsQuery } from '@shared/api';
import { NotificationsList } from '@widgets/notification-list';

export const Notifications: FC = () => {
  const { data: count } = useGetCountNotificationsQuery({
    __meta: { toast: false },
  });

  const countAllActualMessages = count?.countAllActualMessages ?? 0;
  const countReadMessages = count?.countReadMessages ?? 0;

  return (
    <ModalWrapper>
      <Box
        paddingX='8px'
        overflow='hidden'
        paddingTop='16px'
        alignItems='center'
        flexDirection='column'
        display='flex'
        gap='8px'
      >
        <Typography fontWeight={700} fontSize='20px'>
          Уведомления
        </Typography>
        <Typography fontWeight={400} fontSize='14px'>
          Не прочитано {countAllActualMessages - countReadMessages}/
          {countAllActualMessages}
        </Typography>
        <NotificationsList />
      </Box>
    </ModalWrapper>
  );
};
