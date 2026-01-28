import { FC, Ref } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InputIcon from '@mui/icons-material/Input';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import { useGetMyProfileQuery } from '@shared/api';
import { ROUTES } from '@shared/lib';
import { Logo } from '@shared/ui/icons';
import { InputSearch } from '@shared/ui/input';

import { Styled } from './header.styled';

interface HeaderDesktopProps {
  buttonRef: Ref<HTMLButtonElement | null>;
}

export const HeaderDesktop: FC<HeaderDesktopProps> = ({ buttonRef }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: profile, isLoading } = useGetMyProfileQuery({
    __meta: { toast: false },
  });

  const handleNavigate = (route: string) => {
    if (route === location.pathname) {
      navigate(ROUTES.HOME);

      return;
    }

    navigate(route);
  };

  return (
    <Styled.HeaderWrapper width='95%' height='88px' padding='0 24px'>
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
            onClick={() => handleNavigate(ROUTES.HOME)}
          />

          <InputSearch />

          <IconButton color='primary' ref={buttonRef}>
            <FilterAltIcon fontSize='medium' />
          </IconButton>
          <IconButton
            onClick={() => handleNavigate(ROUTES.LIST)}
            color='primary'
          >
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
              onClick={() => handleNavigate(ROUTES.NOTIFICATIONS)}
            />
          </IconButton>
          <IconButton loading={isLoading} disabled={!profile} color='primary'>
            <EmailIcon
              fontSize='medium'
              onClick={() => handleNavigate(ROUTES.CHATS.INDEX)}
            />
          </IconButton>
          {profile ? (
            <Box
              display='flex'
              alignItems='center'
              bgcolor={'rgba(54, 119, 255, 0.3)'}
              px={2}
              py={1}
              gap={2}
              borderRadius={2}
              onClick={() => handleNavigate(ROUTES.PROFILE.INDEX)}
            >
              {profile?.profilePicture ? (
                <Avatar
                  src={`${profile.profilePicture?.replace('http://194.85.218.83:9000', '') || ''}?v=${Math.random()}`}
                  // src={`${profile.profilePicture}?v=${Math.random()}`}
                />
              ) : (
                <AccountCircleIcon fontSize='medium' />
              )}
              <Typography color='primary'>{profile.nickname}</Typography>
            </Box>
          ) : (
            <IconButton onClick={() => navigate(ROUTES.AUTH)}>
              <InputIcon color='info' fontSize='medium' />
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Styled.HeaderWrapper>
  );
};
