import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';
import { ROUTES } from '@shared/lib';

export const AuthPage = () => {
  const navigate = useNavigate();

  const login = () => {
    window.location.assign(
      'https://api-gateway.dev.sport-unite.it-mentor.space/oauth2/authorization/gateway',
    );
  };

  return (
    <ModalWrapper height='auto' justifyContent='center' maxWidth='361px'>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        gap={2}
        p={3}
      >
        <Button onClick={login} variant='contained'>
          Логин
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            navigate(ROUTES.REGISTRATION);
          }}
        >
          Регистрация
        </Button>
      </Box>
    </ModalWrapper>
  );
};
