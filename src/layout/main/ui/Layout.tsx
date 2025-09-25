import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { FooterMobile } from './FooterMobile';
import { Header } from './Header';

export const Layout = () => {
  return (
    <Box
      padding='0 16px'
      position='relative'
      display='flex'
      maxWidth='100%'
      height='100dvh'
      flexDirection='column'
    >
      <Header />
      <Outlet />
      <FooterMobile />
    </Box>
  );
};

export default Layout;
