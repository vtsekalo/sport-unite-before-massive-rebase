import { useNavigate } from 'react-router-dom';

import { Button, Stack } from '@mui/material';

export const AuthPage = () => {
  const navigate = useNavigate();
  return (
    <Stack gap={2} padding={3}>
      <Button
        variant='contained'
        onClick={() => {
          navigate('/profile');
        }}
      >
        Профиль
      </Button>
      <Button variant='contained'>Логин</Button>
      <Button
        variant='contained'
        onClick={() => {
          navigate('/registration');
        }}
      >
        Регистрация
      </Button>
    </Stack>
  );
};
