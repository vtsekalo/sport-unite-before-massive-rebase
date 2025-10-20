import { Outlet } from 'react-router-dom';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import { HeaderMobile } from '@widgets/header';
import { HeaderDesktop } from '@widgets/header/';
import { NavBar } from '@widgets/navbar/';

export const Layout = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      padding='0 16px'
      position='relative'
      display='flex'
      maxWidth='100%'
      height='100dvh'
      flexDirection='column'
      zIndex={1}
    >
      {isMobile ? <HeaderMobile /> : <HeaderDesktop />}

      <Outlet />

      <NavBar />
    </Box>
  );
};
