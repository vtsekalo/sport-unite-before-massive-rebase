import { FC, MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';

import { Logo } from '@shared/assets';
import { ROUTES } from '@shared/lib';
import { InputSearch } from '@shared/ui/input';

import { Styled } from './header.styled';

interface HeaderProps {
  onFilterClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isFilterOpen?: boolean;
}

export const Header: FC<HeaderProps> = ({ onFilterClick, isFilterOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigate = (route: string) => {
    if (route === location.pathname) {
      navigate(ROUTES.HOME);
      return;
    }
    navigate(route);
  };

  return (
    <Styled.HeaderWrapper
      minWidth='361px'
      borderRadius='10px'
      bgcolor='white'
      display='flex'
      width={{ xs: '361px', md: '51.4%' }}
      height={{ xs: '56px', md: '64px' }}
      p={{ xs: '8px', md: 0 }}
      boxShadow={6}
    >
      <Stack direction='row' width='100%' alignItems='center'>
        {!isMobile && (
          <Styled.LogoWrapper
            component='img'
            src={Logo}
            alt='Logo'
            px='40px'
            onClick={() => handleNavigate(ROUTES.HOME)}
          />
        )}

        <InputSearch />

        <Box p={{ xs: '8px', md: '0 40px 0 24px' }}>
          <Styled.FilterButton
            color='primary'
            onClick={onFilterClick}
            className={isFilterOpen ? 'active' : ''}
          >
            <FilterAltIcon fontSize='medium' />
          </Styled.FilterButton>
        </Box>
      </Stack>
    </Styled.HeaderWrapper>
  );
};
