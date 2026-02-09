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
import { ROUTES, useProfile } from '@shared/lib';

import {
  StyledNavBar,
  StyledSwitch,
  StyledSwitchThumb,
} from './nav-bar.styled';

export const NavBar = () => {
 const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { isAuthenticated } = useProfile({
    __meta: { toast: false },
  });

  const authNavigate = (path: string, isProtected = true) => {
    if (isProtected && !isAuthenticated) {
      navigate(ROUTES.AUTH);
      return;
    }
    navigate(path);
  };

  const handleSwitchChange = () => {
    const nextPath = {
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
      display='none'
      alignItems='center'
      justifyContent='center'
      position='absolute'
      width={'360px'}
      height={'56px'}
      borderRadius={'10px'}
      padding={'0 16px'}
      boxShadow={`0px 3px 5px -1px #00000033;
                  0px 6px 10px 0px #00000024;
                  0px 1px 18px 0px #0000001F;`}
      bottom={'24px'}
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
            onClick={() => authNavigate(ROUTES.CHATS.INDEX)}
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
            onClick={() => authNavigate(ROUTES.PROFILE.INDEX)}
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
          <IconButton color='inherit' size='large' onClick={() => authNavigate(ROUTES.ADD_EVENT)}>
            <AddOutlinedIcon fontSize='large' />
          </IconButton>
        </Box>

        <StyledSwitch
          icon={
            <StyledSwitchThumb>
              <MapOutlinedIcon />
            </StyledSwitchThumb>
          }
          checkedIcon={
            <StyledSwitchThumb>
              <FormatListBulletedOutlinedIcon />
            </StyledSwitchThumb>
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
            onClick={() => authNavigate(ROUTES.NOTIFICATIONS)}
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
