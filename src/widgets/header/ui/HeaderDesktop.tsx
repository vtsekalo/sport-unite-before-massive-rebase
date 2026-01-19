import { Ref } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InputIcon from '@mui/icons-material/Input';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box, IconButton, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import { useGetMyProfileQuery } from '@shared/api';
import { Logo } from '@shared/ui/icons';
import { InputSearch } from '@shared/ui/input';

import { StyledHeaderWrapper } from './Header.styled';

interface HeaderDesktopProps {
  buttonRef: Ref<HTMLButtonElement | null>;
}

export const HeaderDesktop = ({ buttonRef }: HeaderDesktopProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: profile, isLoading } = useGetMyProfileQuery({
    __meta: { toast: false },
  });

  const handleNavigate = (route: string) => {
    if (route === location.pathname) {
      navigate('/');

      return;
    }

    navigate(route);
  };

  return (
    <StyledHeaderWrapper width='95%' height='88px' padding='0 24px'>
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
            onClick={() => handleNavigate('/')}
          />

          <InputSearch />

          <IconButton color='primary' ref={buttonRef}>
            <FilterAltIcon fontSize='medium' />
          </IconButton>
          <IconButton onClick={() => handleNavigate('/list')} color='primary'>
            <FormatListBulletedIcon fontSize='medium' />
          </IconButton>
        </Stack>
        <Stack direction='row' spacing={2}>
          <Box display='flex' alignItems='center'>
            <IconButton color='primary'>
              <LocationOnIcon fontSize='medium' />
            </IconButton>
            <Typography color='primary'>
              <u>{profile?.city}</u>
            </Typography>
          </Box>
          <IconButton loading={isLoading} disabled={!profile} color='primary'>
            <NotificationsIcon
              fontSize='medium'
              onClick={() => handleNavigate('/notifications')}
            />
          </IconButton>
          <IconButton loading={isLoading} disabled={!profile} color='primary'>
            <EmailIcon
              fontSize='medium'
              onClick={() => handleNavigate('/chats')}
            />
          </IconButton>
          {profile ? (
            <Box
              display='flex'
              alignItems='center'
              bgcolor={'rgba(54, 119, 255, 0.3)'}
              padding={2}
              gap={2}
              borderRadius={2}
              onClick={() => handleNavigate('/profile')}
            >
              {profile?.profilePicture ? (
                <img
                  width={20}
                  height={20}
                  src={`${profile.profilePicture}?v=${Math.random()}`}
                />
              ) : (
                <AccountCircleIcon fontSize='medium' />
              )}
              <Typography color='primary'>{profile.nickname}</Typography>
            </Box>
          ) : (
            <IconButton onClick={() => navigate('/auth')}>
              <InputIcon color='info' fontSize='medium' />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </StyledHeaderWrapper>
  );
};
