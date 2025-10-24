import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import { PageModal } from '@shared/ui/Modal';
import { HeaderMobile } from '@widgets/header';
import { HeaderDesktop } from '@widgets/header/';
import { AppMap } from '@widgets/map';
import { NavBar } from '@widgets/navbar/';

export const Layout = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const memoizedMap = React.useMemo(() => <AppMap />, []);

  const handleCloseModal = () => {
    navigate('/');
  };

  return (
    <Box
      padding='16px'
      position='relative'
      display='flex'
      maxWidth='100%'
      height='100dvh'
      flexDirection='column'
      alignItems={'center'}
      gap={2}
    >
      {memoizedMap}

      {isMobile ? <HeaderMobile /> : <HeaderDesktop />}

      <PageModal open={location.pathname !== '/'} onClose={handleCloseModal}>
        <Outlet />
      </PageModal>

      <NavBar />
    </Box>
  );
};
