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

import { useActiveButton } from '../lib/useActiveButton';
import { useSwitchState } from '../lib/useSwitchState';
import { StyledNavBar, StyledSwitch, StyledSwitchThumb } from './NavBar.styled';

export const NavBar = () => {
  const { activeButton, setActiveButton, handleNavigate } = useActiveButton();
  const { checked, handleSwitchChange } = useSwitchState(setActiveButton);

  const theme = useTheme();

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
            activeButton === '/messages'
              ? `${alpha(theme.palette.primary.main, 0.3)}`
              : undefined
          }
        >
          <IconButton
            color='primary'
            onClick={() => handleNavigate('/messages')}
          >
            <Badge color='error' variant='dot'>
              {activeButton === '/messages' ? (
                <EmailIcon />
              ) : (
                <EmailOutlinedIcon />
              )}
            </Badge>
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
            <Badge color='error' variant='dot'>
              {activeButton === '/notifications' ? (
                <NotificationsIcon />
              ) : (
                <NotificationsNoneOutlinedIcon />
              )}
            </Badge>
          </IconButton>
        </Box>
      </Stack>
    </StyledNavBar>
  );
};
