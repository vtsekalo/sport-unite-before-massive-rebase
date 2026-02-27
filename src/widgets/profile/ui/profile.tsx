import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateIcon from '@mui/icons-material/Create';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Box,
  Button,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ProfileInfo } from '@entities/profile-info';
import { LogoutConfirmationModal } from '@features/logout';
import { ROUTES, dayjs, useProfile } from '@shared/lib';

import { Styled } from './profile.styled';

export const Profile: FC = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const navigate = useNavigate();

  const { profile, isLoading, isAuthError } = useProfile();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isAuthError) {
      navigate(ROUTES.AUTH);
    }
  }, [isAuthError, navigate]);

  if (isLoading) {
    return (
      <ProfileInfo
        avatarNode={<Skeleton variant='circular' width={160} height={160} />}
        personalNode={
          <>
            <Skeleton width={isMobile ? 131 : 180} height={24} />
            <Skeleton width={100} height={20} />
            <Skeleton width='70%' height={20} />
            <Skeleton width='100%' height={32} variant='rectangular' />
          </>
        }
        buttonsNode={
          <>
            <Skeleton width={280} height={48} />
            <Skeleton variant='button' width='100%' height={56} />
            <Skeleton variant='button' width='100%' height={56} />
            <Skeleton variant='button' width='100%' height={56} />
          </>
        }
      />
    );
  }

  if (!profile) {
    return null;
  }
  const {
    nickname,
    dateOfBirth,
    firstName,
    lastName,
    city,
    biography,
    profilePicture,
  } = profile;

  return (
    <Box width='100%' height='100%' px={{ xs: 'none', md: '75.5px' }}>
      <ProfileInfo
        avatarNode={
          profilePicture ? (
            <Styled.AvatarImage src={profilePicture || ''} alt='Avatar' />
          ) : (
            <Styled.StyledPhotoCameraFrontIcon color='primary' />
          )
        }
        personalNode={
          <Box display='flex' flexDirection='column' gap={{ xs: 2, md: 1 }}>
            <Box display='flex' flexDirection='column' gap={2}>
              <Typography
                fontWeight={700}
                lineHeight='20px'
                fontSize={{ xs: '16px', md: '24px' }}
              >
                {nickname}
              </Typography>
              <Styled.ProfileTypography
                fontWeight={{ xs: 500, md: 700 }}
                lineHeight='20px'
                fontSize={{ xs: '14px', md: '20px' }}
              >
                {`${firstName} ${lastName}`}
              </Styled.ProfileTypography>
            </Box>
            <Typography fontSize='14px' lineHeight='20px'>
              {dayjs().diff(dayjs(dateOfBirth), 'year')} лет
            </Typography>
            <Styled.ProfileTypography
              fontSize='14px'
              width='100%'
              maxWidth='100%'
              whiteSpace='pre-line'
              lineHeight='20px'
            >
              {biography}
            </Styled.ProfileTypography>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              gap='10px'
            >
              <LocationOnIcon fontSize='small' color='primary' />
              <Styled.ProfileTypography lineHeight='40px' fontSize='12px'>
                {city}
              </Styled.ProfileTypography>
            </Box>
          </Box>
        }
        buttonsNode={
          <>
            <Button
              fullWidth
              variant='outlined'
              color='primary'
              onClick={() => navigate(ROUTES.PROFILE.MY_EVENTS)}
            >
              Мои события
            </Button>
            <Button
              fullWidth
              variant='outlined'
              color='primary'
              startIcon={<CreateIcon fontSize='small' />}
              onClick={() => navigate(ROUTES.PROFILE.EDIT)}
            >
              Редактировать профиль
            </Button>

            <Button
              fullWidth
              variant='contained'
              size='medium'
              color='primary'
              onClick={() => setIsLogoutOpen(true)}
            >
              Выйти из профиля
            </Button>
          </>
        }
      />
      <LogoutConfirmationModal
        open={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
      />
    </Box>
  );
};
