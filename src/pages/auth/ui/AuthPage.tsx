import { useNavigate } from 'react-router-dom';

import { Button, Stack } from '@mui/material';

export const AuthPage = () => {
  const navigate = useNavigate();

  const login = () => {
    window.location.assign(
      'http://api-gateway.dev.sport-unite.it-mentor.space/oauth2/authorization/gateway',
    );
  };

  const logout = () => {
    window.location.assign(
      'http://api-gateway.dev.sport-unite.it-mentor.space/logout',
    );
  };

  return (
    <Stack gap={2} padding={3}>
      <Button onClick={login} variant='contained'>
        Логин
      </Button>
      <Button
        variant='contained'
        onClick={() => {
          navigate('/registration');
        }}
      >
        Регистрация
      </Button>
      <Button onClick={logout} variant='contained'>
        Выйти
      </Button>
    </Stack>
  );
};
