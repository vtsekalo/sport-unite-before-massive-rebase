import { FC } from 'react';

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ConfirmModal } from '@shared/ui/confirm-modal';

export type CancelEventConfirmModalProps = {
  open: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const CancelEventConfirmModal: FC<CancelEventConfirmModalProps> = ({
  open,
  isLoading = false,
  onClose,
  onConfirm,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const maxWidth = isMobile ? 361 : 600;

  return (
    <ConfirmModal open={open} onClose={onClose} disableClose={isLoading}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        textAlign='center'
        width='100%'
        maxWidth={maxWidth}
        gap={2}
        padding={2}
      >
        <Typography
          variant='h6'
          fontWeight={500}
          lineHeight='160%'
          letterSpacing='0.15px'
        >
          Отмена события
        </Typography>

        <Typography variant='body2' lineHeight='166%' letterSpacing='0.4px'>
          Вы уверены, что хотите отменить событие? Все участники получат
          уведомление об отмене.
        </Typography>

        <Box
          width='100%'
          display='flex'
          flexDirection='column'
          gap={2}
          mt={1.5}
          px={3}
        >
          <Button
            variant='outlined'
            size='mediumFixed'
            onClick={onClose}
            disabled={isLoading}
          >
            НЕТ
          </Button>

          <Button
            variant='contained'
            size='mediumFixed'
            onClick={onConfirm}
            loading={isLoading}
          >
            ДА
          </Button>
        </Box>
      </Box>
    </ConfirmModal>
  );
};
