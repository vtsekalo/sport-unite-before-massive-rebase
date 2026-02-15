import { useCallback, useState } from 'react';
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import { CreateEventFab } from '@features/create-event/ui/create-event-fab';
import { FilterEventsModal } from '@features/filter-events';
import { ROUTES } from '@shared/lib/constants';
import { PageModal } from '@shared/ui/modal';
import { HeaderDesktop, HeaderMobile } from '@widgets/header';
import { EventsMap } from '@widgets/map';
import { MapControls } from '@widgets/map-controls';
import { NavBar } from '@widgets/navbar';

export const Layout = () => {
  const navigate = useNavigate();
  const hasOutlet = useOutlet();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCloseModal = () => {
    navigate(ROUTES.HOME);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const buttonRefCallback = useCallback((node: HTMLButtonElement | null) => {
    setAnchorEl(node);
  }, []);

  const showFab = location.pathname === ROUTES.HOME;

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
      <EventsMap />

      {isMobile ? (
        <HeaderMobile buttonRef={buttonRefCallback} />
      ) : (
        <HeaderDesktop buttonRef={buttonRefCallback} />
      )}
      <FilterEventsModal buttonRef={anchorEl} />
      <MapControls />
      <PageModal open={Boolean(hasOutlet)} onClose={handleCloseModal}>
        <Outlet />
      </PageModal>

      <NavBar />

      {showFab && <CreateEventFab />}
    </Box>
  );
};
