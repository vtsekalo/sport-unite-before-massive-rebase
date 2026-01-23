import { useCallback, useMemo, useState } from 'react';
import { Outlet, useNavigate, useOutlet } from 'react-router-dom';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import { FilterEventsModal } from '@features/filter-events/ui/filter-events-modal';
import { ROUTES } from '@shared/lib';
import { PageModal } from '@shared/ui/modal';
import { HeaderDesktop, HeaderMobile } from '@widgets/header';
import { EventsMap } from '@widgets/map';
import { NavBar } from '@widgets/navbar';

export const Layout = () => {
  const navigate = useNavigate();

  const hasOutlet = useOutlet();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const memoizedMap = useMemo(() => <EventsMap />, []);

  const handleCloseModal = () => {
    navigate(ROUTES.HOME);
  };
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const buttonRefCallback = useCallback((node: HTMLButtonElement | null) => {
    setAnchorEl(node);
  }, []);

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
        <HeaderMobile buttonRef={buttonRefCallback} />
      ) : (
        <HeaderDesktop buttonRef={buttonRefCallback} />
      )}
      <FilterEventsModal buttonRef={anchorEl} />
      <PageModal open={Boolean(hasOutlet)} onClose={handleCloseModal}>
        <Outlet />
      </PageModal>

      <NavBar />
    </Box>
  );
};
