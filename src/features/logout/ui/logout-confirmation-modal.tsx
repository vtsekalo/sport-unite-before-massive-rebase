import { Box, Button, Typography } from '@mui/material';

import { ConfirmModal } from '@shared/ui/confirm-modal';

import { useLogout } from '../lib/use-logout';

type LogoutConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
};

export const LogoutConfirmationModal = ({
  open,
  onClose,
}: LogoutConfirmationModalProps) => {
  const { logout } = useLogout();
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
        Выход из профиля
      </Typography>

      <Typography
        align='center'
        fontWeight={400}
        fontSize='0.75rem'
        lineHeight={1.66}
        letterSpacing='0.4px'
        pt='4px'
        px={{ xs: '29px', md: '49.5px' }}
        pb={3}
      >
        Вы действительно хотите выйти из профиля?
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
            onClick={() => logout()}
            fullWidth
          >
            Выйти
          </Button>
        </Box>
      </Box>
    </ConfirmModal>
  );
};
