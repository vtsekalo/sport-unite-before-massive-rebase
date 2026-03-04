import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';
import { ROUTES } from '@shared/lib';

export const SendEmail = () => {
  const navigate = useNavigate();
  return (
    <ModalWrapper
      justifyContent='center'
      alignItems='center'
      gap={{ xs: 2, md: 5 }}
      px={4}
      py={3}
      height='auto'
      maxHeight='100%'
      maxWidth={{ xs: 361, md: 480 }}
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        width='100%'
        gap={2}
      >
        <Typography
          display='flex'
          alignItems='center'
          justifyContent='center'
          fontWeight={700}
          fontSize='24px'
          lineHeight='56px'
        >
          Регистрация
        </Typography>

        <Typography
          align='center'
          fontWeight={400}
          fontSize='16px'
          lineHeight='24px'
        >
          Письмо отправлено на указанную почту. Перейдите по ссылке, чтобы
          завершить регистрацию.
        </Typography>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        width='100%'
        gap={{ xs: 2, md: 3 }}
      >
        <Button variant='contained' fullWidth borderRadius={'4px'}>
          Отправить письмо повторно
        </Button>
        <Button
          variant='contained'
          fullWidth
          borderRadius={'4px'}
          onClick={() => navigate(ROUTES.HOME)}
        >
          Главная страница
        </Button>
      </Box>
    </ModalWrapper>
  );
};
