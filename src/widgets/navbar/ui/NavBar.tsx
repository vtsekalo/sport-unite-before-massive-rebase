import { useNavigate } from 'react-router-dom';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Stack } from '@mui/material';

import { CustomIconButton } from './NavBar.styled';

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Stack
      direction='row'
      spacing={0}
      p={2}
      width={'100%'}
      justifyContent={'space-between'}
    >
      <IconButton color='primary' onClick={() => navigate('/map')}>
        <MenuIcon fontSize='medium' />
      </IconButton>
      <IconButton color='primary' onClick={() => navigate('/notifications')}>
        <NotificationsIcon fontSize='medium' />
      </IconButton>
      <CustomIconButton size={80} onClick={() => navigate('/addevent')}>
        <AddCircleIcon fontSize='inherit' />
      </CustomIconButton>
      <IconButton color='primary' onClick={() => navigate('/messages')}>
        <EmailIcon fontSize='medium' />
      </IconButton>
      <IconButton color='primary' onClick={() => navigate('/profile')}>
        <AccountBoxIcon fontSize='medium' />
      </IconButton>
    </Stack>
  );
};
