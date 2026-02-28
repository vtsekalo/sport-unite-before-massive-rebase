import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EmailIcon from '@mui/icons-material/Email';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Badge, Box, IconButton, Stack, alpha, useTheme } from '@mui/material';

import { useGetCountNotificationsQuery } from '@shared/api';
import { ROUTES, useProfile, useToggleNavigate } from '@shared/lib';

import { StyledNavBar, StyledSwitch } from './nav-bar.styled';

export const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const toggleNavigate = useToggleNavigate();

  const { isAuthenticated } = useProfile({
    __meta: { toast: false },
  });

  const handleSwitchChange = () => {
    const nextPath =
      {
        [ROUTES.HOME]: ROUTES.LIST,
        [ROUTES.LIST]: ROUTES.HOME,
      }[pathname] ?? ROUTES.HOME;

    navigate(nextPath);
  };

  const isActive = (path: string) => pathname === path;

  const { data: count } = useGetCountNotificationsQuery(
    {
      __meta: { toast: false },
    },
    {
      pollingInterval: 20_000,
      skipPollingIfUnfocused: true,
      skip: !isAuthenticated,
    },
  );

  const actualNotifications = count
    ? count?.countAllActualMessages - count?.countReadMessages
    : 0;

  const notificationIconWrapper = (icon: ReactNode) =>
    count && actualNotifications > 0 ? (
      <Badge color='error' variant='dot'>
        {icon}
      </Badge>
    ) : (
      icon
    );

  return (
    <StyledNavBar
      display='flex'
      height='100%'
      maxHeight='48px'
      alignItems='center'
      justifyContent='center'
      position='absolute'
      minWidth={'361px'}
      borderRadius={'10px'}
      padding={'0 16px'}
      boxShadow={6}
      bottom={'32px'}
      bgcolor={theme.palette.background.paper}
      zIndex={20}
    >
      <Stack
        width={'100%'}
        direction='row'
        justifyContent={'space-between'}
        alignItems='center'
      >
        <Box
          width={40}
          height={40}
          borderRadius={2}
          bgcolor={
            isActive(ROUTES.CHATS.INDEX)
              ? `${alpha(theme.palette.primary.main, 0.3)}`
              : undefined
          }
        >
          <IconButton
            color='primary'
            onClick={() => toggleNavigate(ROUTES.CHATS.INDEX)}
            disabled={!isAuthenticated}
          >
            {isActive(ROUTES.CHATS.INDEX) ? (
              <EmailIcon />
            ) : (
              <EmailOutlinedIcon />
            )}
          </IconButton>
        </Box>

        <Box
          width={40}
          height={40}
          borderRadius={2}
          bgcolor={
            isActive(ROUTES.PROFILE.INDEX)
              ? `${alpha(theme.palette.primary.main, 0.3)}`
              : undefined
          }
        >
          <IconButton
            color='primary'
            onClick={() => toggleNavigate(ROUTES.PROFILE.INDEX)}
          >
            {isActive(ROUTES.PROFILE.INDEX) ? (
              <AccountCircleIcon />
            ) : (
              <AccountCircleOutlinedIcon />
            )}
          </IconButton>
        </Box>

        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          width={64}
          height={64}
          bgcolor={theme.palette.primary.main}
          color={theme.palette.common.white}
          borderRadius={3}
        >
          <IconButton
            color='inherit'
            size='large'
            onClick={() => toggleNavigate(ROUTES.ADD_EVENT)}
          >
            <AddOutlinedIcon fontSize='large' />
          </IconButton>
        </Box>

        <StyledSwitch
          icon={
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              height={28}
              width={28}
              borderRadius={'50%'}
              bgcolor={theme.palette.common.white}
            >
              <MapOutlinedIcon height={28} width={28} />
            </Box>
          }
          checkedIcon={
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              height={28}
              width={28}
              borderRadius={'50%'}
              bgcolor={theme.palette.common.white}
            >
              <FormatListBulletedOutlinedIcon fontSize='small' />
            </Box>
          }
          checked={location.pathname === ROUTES.LIST}
          onChange={handleSwitchChange}
        />

        <Box
          width={40}
          height={40}
          borderRadius={2}
          bgcolor={
            isActive(ROUTES.NOTIFICATIONS)
              ? `${alpha(theme.palette.primary.main, 0.3)}`
              : undefined
          }
        >
          <IconButton
            color='primary'
            onClick={() => toggleNavigate(ROUTES.NOTIFICATIONS)}
            disabled={!isAuthenticated}
          >
            {notificationIconWrapper(
              isActive(ROUTES.NOTIFICATIONS) ? (
                <NotificationsIcon />
              ) : (
                <NotificationsNoneOutlinedIcon />
              ),
            )}
          </IconButton>
        </Box>
      </Stack>
    </StyledNavBar>
  );
};
