import { useNavigate } from 'react-router-dom';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmailIcon from '@mui/icons-material/Email';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IconButton, Stack } from '@mui/material';

import { StyledIconButton, StyledNavBar } from './NavBar.styled';

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <StyledNavBar
      borderRadius={'10px'}
      alignItems={'center'}
      display='none'
      justifyContent='center'
      minWidth={250}
      width='100%'
      maxWidth={300}
      left={'50%'}
      height={56}
      position='absolute'
      boxShadow={`0px 3px 5px -1px #00000033;
              0px 6px 10px 0px #00000024;
              0px 1px 18px 0px #0000001F;`}
      bottom='24px'
    >
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
        <StyledIconButton size={80} onClick={() => navigate('/addevent')}>
          <AddCircleIcon fontSize='inherit' />
        </StyledIconButton>
        <IconButton color='primary' onClick={() => navigate('/messages')}>
          <EmailIcon fontSize='medium' />
        </IconButton>
        <IconButton color='primary' onClick={() => navigate('/profile')}>
          <AccountBoxIcon fontSize='medium' />
        </IconButton>
      </Stack>
    </StyledNavBar>
  );
};
