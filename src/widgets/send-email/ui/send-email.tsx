import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

export const SendEmail = () => {
  const navigate = useNavigate();

  return (
    <Box
      padding='20px'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      gap='32px'
    >
      <Typography
        component='span'
        width='min-content'
        fontWeight={700}
        fontSize='24px'
      >
        Регистрация
      </Typography>
      <Box
        justifyContent='center'
        display='flex'
        flexDirection='column'
        gap='40px'
      >
        <Typography fontWeight={400} fontSize='16px'>
          Письмо отправлено на указанную почту. Перейдите по ссылке, чтобы
          завершить регистрацию.
        </Typography>
        <Button variant='contained' onClick={() => navigate('/')}>
          Главная страница
        </Button>
      </Box>
    </Box>
  );
};
