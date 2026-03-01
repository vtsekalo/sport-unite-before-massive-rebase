import { useState } from 'react';
import { Outlet, useLocation, useNavigate, useOutlet } from 'react-router-dom';

import { Box, useMediaQuery, useTheme } from '@mui/material';

import { LoginButton } from '@features/auth';
import { FilterEventsModal } from '@features/filter-events';
import { useEventSearch, useProfile } from '@shared/lib';
import { ROUTES } from '@shared/lib/constants';
import { PageModal } from '@shared/ui/modal';
import { Header } from '@widgets/header';
import { EventsMap } from '@widgets/map';
import { MapControls } from '@widgets/map-controls';
import { NavBar } from '@widgets/navbar';
import { NoEventsModal } from '@widgets/no-events-modal';

export const Layout = () => {
  const navigate = useNavigate();
  const hasOutlet = useOutlet();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const { pathname } = location;
  const { events, isLoading, hasAppliedFilters } = useEventSearch();

  const handleCloseModal = () => {
    navigate(ROUTES.HOME);
  };
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { isAuthenticated } = useProfile({ __meta: { toast: false } });
  const isHomePage = location.pathname === ROUTES.HOME;

  const handleOpenFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const showNoEventsModal =
    (pathname === ROUTES.HOME || pathname === ROUTES.LIST) &&
    !isLoading &&
    events.length === 0 &&
    (pathname === ROUTES.LIST || hasAppliedFilters);

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

      <Header
        onFilterClick={handleOpenFilter}
        isFilterOpen={Boolean(anchorEl)}
      />

      <FilterEventsModal anchorEl={anchorEl} onClose={handleCloseFilter} />

      <MapControls />
      <PageModal open={Boolean(hasOutlet)} onClose={handleCloseModal}>
        <Outlet />
      </PageModal>

      {showNoEventsModal && (
        <Box
          position='absolute'
          zIndex={20}
          top={isMobile ? 88 : 112}
          left={isMobile ? 0 : 80}
          {...(isMobile && {
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          })}
        >
          <NoEventsModal />
        </Box>
      )}

      {isAuthenticated ? <NavBar /> : isHomePage && <LoginButton />}
    </Box>
  );
};
