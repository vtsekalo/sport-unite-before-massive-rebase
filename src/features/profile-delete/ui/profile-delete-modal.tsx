import { FC } from 'react';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { profileDeletionStorage } from '@shared/lib';
import { ConfirmModal } from '@shared/ui/confirm-modal';

import { useDeleteMyProfileMutation } from '../api/profile-delete-api';

type LogoutConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ProfileDeleteModal: FC<LogoutConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [deleteMyProfile, { isLoading: isLoadingDelete }] =
    useDeleteMyProfileMutation();
  const onSubmit = async () => {
    await deleteMyProfile({}).unwrap();
    profileDeletionStorage.set();
    onConfirm();
    onClose();
  };

  return (
    <ConfirmModal open={open}>
      <Typography
        display='flex'
        alignItems='center'
        justifyContent='center'
        fontWeight={500}
        fontSize='1.25rem'
        lineHeight={1.6}
        letterSpacing='0.15px'
        py={2}
      >
        Удаление профиля
      </Typography>

      <Typography
        align='center'
        fontWeight={400}
        fontSize='0.75rem'
        lineHeight={1.66}
        letterSpacing='0.4px'
        pt='4px'
        px={{ xs: '29px', md: '35.5px' }}
        pb={3}
      >
        Вы действительно хотите удалить свой профиль?
        <br /> Аккаунт можно будет восстановить
        <br /> в течении 6 месяцев.
      </Typography>
      <Box
        display='flex'
        justifyContent={{ xs: 'center', md: 'flex-end' }}
        pt={1}
        pb={2}
        px={2}
      >
        <Box
          flex={1}
          display='flex'
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={2}
          maxWidth={{ xs: '278px', md: '256px' }}
        >
          <Button
            variant='outlined'
            color='primary'
            size='mediumFixed'
            onClick={onClose}
            fullWidth
          >
            Отмена
          </Button>
          <Button
            variant='contained'
            color='primary'
            size='mediumFixed'
            onClick={onSubmit}
            disabled={isLoadingDelete}
            fullWidth
          >
            {isLoadingDelete ? (
              <CircularProgress size={25} color='inherit' />
            ) : (
              'Удалить'
            )}
          </Button>
        </Box>
      </Box>
    </ConfirmModal>
  );
};
