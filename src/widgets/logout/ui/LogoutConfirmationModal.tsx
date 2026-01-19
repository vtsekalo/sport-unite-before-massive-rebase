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

import { useLogout } from '../lib/useLogout';

type LogoutConfirmationModalProps = {
  open: boolean;
  onClose: () => void;
};

export const LogoutConfirmationModal: React.FC<
  LogoutConfirmationModalProps
> = ({ open, onClose }) => {
  const { logout } = useLogout();
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
          flexWrap={isMobile ? 'wrap' : 'nowrap'}
          gap='16px'
          width='100%'
          px={'16px'}
        >
          <Button
            variant='outlined'
            color='primary'
            size='medium'
            onClick={onClose}
            fullWidth={true}
          >
            Отмена
          </Button>
          <Button
            variant='contained'
            color='primary'
            size='medium'
            onClick={logout}
            fullWidth={true}
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
