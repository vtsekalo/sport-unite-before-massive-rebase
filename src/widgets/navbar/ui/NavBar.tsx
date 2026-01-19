import { ReactNode } from 'react';

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

import { useActiveButton } from '../lib/useActiveButton';
import { useSwitchState } from '../lib/useSwitchState';
import { StyledNavBar, StyledSwitch, StyledSwitchThumb } from './NavBar.styled';

export const NavBar = () => {
  const { activeButton, setActiveButton, handleNavigate } = useActiveButton();
  const { data: count } = useGetCountNotificationsQuery(
    {
      __meta: { toast: false },
    },
    {
      pollingInterval: 20_000,
      skipPollingIfUnfocused: true,
    },
  );
  const { checked, handleSwitchChange } = useSwitchState(setActiveButton);

  const theme = useTheme();

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
            activeButton === '/chats'
              ? `${alpha(theme.palette.primary.main, 0.3)}`
              : undefined
          }
        >
          <IconButton color='primary' onClick={() => handleNavigate('/chats')}>
            {activeButton === '/chats' ? <EmailIcon /> : <EmailOutlinedIcon />}
          </IconButton>
        </Box>

        <Box
          width={40}
          height={40}
          borderRadius={2}
          bgcolor={
            activeButton === '/profile'
              ? `${alpha(theme.palette.primary.main, 0.3)}`
              : undefined
          }
        >
          <IconButton
            color='primary'
            onClick={() => handleNavigate('/profile')}
          >
            {activeButton === '/profile' ? (
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
            onClick={() => handleNavigate('/addevent')}
          >
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
          checked={checked}
          onChange={handleSwitchChange}
        />

        <Box
          width={40}
          height={40}
          borderRadius={2}
          bgcolor={
            activeButton === '/notifications'
              ? `${alpha(theme.palette.primary.main, 0.3)}`
              : undefined
          }
        >
          <IconButton
            color='primary'
            onClick={() => handleNavigate('/notifications')}
          >
            {notificationIconWrapper(
              activeButton === '/notifications' ? (
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
