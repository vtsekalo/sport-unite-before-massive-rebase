import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';

type LogoutConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const LogoutConfirmationModal: React.FC<
  LogoutConfirmationModalProps
> = ({ open, onClose, onConfirm }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='logout-dialog-title'>
      <DialogTitle display='flex' alignItems='center' justifyContent='center'>
        Выход из профиля
      </DialogTitle>

      <DialogContent dividers={false}>
        <Box display='flex' justifyContent='center'>
          Вы действительно хотите выйти из профиля?
        </Box>
      </DialogContent>

      <DialogActions>
        <Box
          display='flex'
          flexDirection={isMobile ? 'column' : 'row'}
          justifyContent={isMobile ? 'center' : 'flex-end'}
          gap='16px'
          width='100%'
          px={'16px'}
        >
          <Button
            variant='outlined'
            color='primary'
            size='large'
            onClick={onClose}
            fullWidth={isMobile}
          >
            Отмена
          </Button>
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={onConfirm}
            fullWidth={isMobile}
          >
            Выйти
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

LogoutConfirmationModal.displayName = 'LogoutConfirmationModal';
export default LogoutConfirmationModal;
