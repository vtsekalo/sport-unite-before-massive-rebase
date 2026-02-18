import { FC, Ref } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';

import { Logo } from '@shared/assets';
import { ROUTES } from '@shared/lib';
import { InputSearch } from '@shared/ui/input';

import { Styled } from './header.styled';

interface HeaderDesktopProps {
  buttonRef: Ref<HTMLButtonElement | null>;
}

export const HeaderDesktop: FC<HeaderDesktopProps> = ({ buttonRef }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (route: string) => {
    if (route === location.pathname) {
      navigate(ROUTES.HOME);

      return;
    }

    navigate(route);
  };

  return (
    <Styled.HeaderWrapper width='51.4%' height='64px'>
      <Stack direction='row' justifyContent='space-between' width='100%'>
        <Stack direction='row' alignItems='center' flex={1}>
          <Styled.LogoWrapper
            component='img'
            src={Logo}
            alt='Logo'
            px='40px'
            onClick={() => handleNavigate(ROUTES.HOME)}
          />

          <InputSearch />

          <Box p={'0 40px 0 24px'}>
            <IconButton color='primary' ref={buttonRef}>
              <FilterAltIcon fontSize='medium' />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    </Styled.HeaderWrapper>
  );
};
