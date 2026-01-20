import { useNavigate } from 'react-router-dom';

import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';
import { ROUTES } from '@shared/lib';

export const SendEmail = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <ModalWrapper
      p={2}
      justifyContent='center'
      alignItems='center'
      gap='32px'
      height='auto'
      maxHeight='100%'
      maxWidth={500}
    >
      <Typography
        display='flex'
        alignItems='center'
        justifyContent='center'
        fontWeight={700}
        fontSize='24px'
      >
        Регистрация
      </Typography>

      <Typography align='center' fontWeight={400} fontSize='16px'>
        Письмо отправлено на указанную почту. Перейдите по ссылке, чтобы
        завершить регистрацию.
      </Typography>
      <Button
        variant='contained'
        fullWidth={isMobile}
        size='mediumFixed'
        onClick={() => navigate(ROUTES.HOME)}
      >
        Главная страница
      </Button>
    </ModalWrapper>
  );
};
