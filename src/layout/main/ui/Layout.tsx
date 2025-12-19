import { useMemo, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import { FilterEventsModal } from '@features/filter-events/ui/FilterEventsModal';
import { PageModal } from '@shared/ui/modal';
import { HeaderDesktop, HeaderMobile } from '@widgets/header';
import { EventsMap } from '@widgets/map';
import { NavBar } from '@widgets/navbar';

export const Layout = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const memoizedMap = useMemo(() => <EventsMap />, []);

  const handleCloseModal = () => {
    navigate('/');
  };

  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

      {isMobile ? (
        <HeaderMobile buttonRef={buttonRef} />
      ) : (
        <HeaderDesktop buttonRef={buttonRef} />
      )}
      <FilterEventsModal buttonRef={buttonRef} />
      <PageModal open={location.pathname !== '/'} onClose={handleCloseModal}>
        <Outlet />
      </PageModal>

      <NavBar />
    </Box>
  );
};
