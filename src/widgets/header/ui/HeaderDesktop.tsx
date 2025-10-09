import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, IconButton, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import Logo from '@shared/assets/Logo.svg';
import { HeaderEventsSearch } from '@shared/ui/input';

import { StyledHeaderWrapper } from './Header.styled';

export const HeaderDesktop = () => {
  const navigate = useNavigate();
  return (
    <StyledHeaderWrapper
      position='absolute'
      alignItems='center'
      display='flex'
      justifyContent='center'
      top='24px'
      left='50%'
      borderRadius='10px'
      minWidth='300px'
      maxWidth='95%'
      width='95%'
      height='88px'
      padding='0 64px'
      boxShadow={`0px 3px 5px -1px #00000033;
              0px 6px 10px 0px #00000024;
              0px 1px 18px 0px #0000001F;`}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        spacing={2}
        width='100%'
      >
        <Stack
          direction='row'
          alignItems='center'
          spacing={2}
          maxWidth={600}
          flex={1}
        >
          <Box
            component='img'
            src={Logo}
            alt='Logo'
            onClick={() => navigate('/')}
          />

          <HeaderEventsSearch />

          <IconButton color='primary'>
            <FilterAltIcon fontSize='medium' />
          </IconButton>
          <IconButton color='primary'>
            <MenuIcon fontSize='medium' onClick={() => navigate('/map')} />
          </IconButton>
        </Stack>
        <Stack direction='row' spacing={2}>
          <Box
            display='flex'
            alignItems='center'
            onClick={() => navigate('/map')}
          >
            <IconButton color='primary'>
              <LocationOnIcon fontSize='medium' />
            </IconButton>
            <Typography color='primary'>
              <u>Москва</u>
            </Typography>
          </Box>
          <IconButton color='primary'>
            <NotificationsIcon
              fontSize='medium'
              onClick={() => navigate('/notifications')}
            />
          </IconButton>
          <IconButton color='primary'>
            <EmailIcon
              fontSize='medium'
              onClick={() => navigate('/messages')}
            />
          </IconButton>
          <Box
            display='flex'
            alignItems='center'
            bgcolor={'rgba(54, 119, 255, 0.3)'}
            padding={2}
            gap={2}
            borderRadius={2}
            onClick={() => navigate('/profile')}
          >
            <AccountCircleIcon fontSize='medium' />
            <Typography color='primary'>Никнейм</Typography>
          </Box>
        </Stack>
      </Stack>
    </StyledHeaderWrapper>
  );
};
