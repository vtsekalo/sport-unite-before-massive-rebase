import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CreateIcon from '@mui/icons-material/Create';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ProfileInfo } from '@entities/profile-info';
import { QueryInfo } from '@entities/query-info';
import { LogoutConfirmationModal } from '@features/logout';
import { ROUTES, useProfile } from '@shared/lib';

dayjs.extend(relativeTime);
dayjs.locale('ru');

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
      <Box width='100%' height='100%' px={{ xs: 'none', md: '75.5px' }}>
        <ProfileInfo
          avatarNode={
            <Skeleton
              variant='circular'
              width={isMobile ? 160 : 400}
              height={isMobile ? 160 : 400}
            />
          }
          personalNode={
            <Box
              display='flex'
              width='100%'
              height='100%'
              alignItems='center'
              flexDirection='column'
              gap={{ xs: 2, md: 1 }}
            >
              <Skeleton width='50%' height={24} />
              <Skeleton width='70%' height={24} />
              <Skeleton width='30%' height={24} />
              <Skeleton width='100%' height={24} />
              <Skeleton width='50%' height={24} />
            </Box>
          }
          buttonsNode={
            <>
              <Skeleton
                variant='button'
                width='100%'
                height={isMobile ? 40 : 56}
              />
              <Skeleton
                variant='button'
                width='100%'
                height={isMobile ? 40 : 56}
              />
              <Skeleton
                variant='button'
                width='100%'
                height={isMobile ? 40 : 56}
              />
            </>
          }
        />
      </Box>
    );
  }

  if (!profile) {
    return (
      <QueryInfo type='error' title='Невозможно загрузить данные профиля' />
    );
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
    <Box width='100%' px={{ xs: 'none', md: '75.5px' }}>
      <ProfileInfo
        avatarNode={
          <Box
            width={{ xs: 160, md: 400 }}
            height={{ xs: 160, md: 400 }}
            borderRadius='50%'
            display='flex'
            alignItems='center'
            justifyContent='center'
            bgcolor={'rgba(243, 245, 249, 1)'}
          >
            {profilePicture ? (
              <Avatar
                width={{ xs: 160, md: 400 }}
                height={{ xs: 160, md: 400 }}
                src={profilePicture || ''}
                alt='Avatar'
              />
            ) : (
              <AccountCircleOutlinedIcon
                color='rgba(90, 157, 222, 1)'
                width={{ xs: 60, md: 200 }}
              />
            )}
          </Box>
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
              {(firstName || lastName) && (
                <Typography
                  fontWeight={{ xs: 500, md: 700 }}
                  lineHeight='20px'
                  fontSize={{ xs: '14px', md: '20px' }}
                >
                  {[firstName, lastName].filter(Boolean).join(' ')}
                </Typography>
              )}
            </Box>
            <Typography fontSize='14px' lineHeight='20px'>
              {dayjs(dateOfBirth).fromNow(true)}
            </Typography>
            {biography && (
              <Typography
                fontSize='14px'
                width='100%'
                maxWidth='100%'
                whiteSpace='pre-line'
                lineHeight='20px'
              >
                {biography}
              </Typography>
            )}
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              gap='10px'
            >
              <LocationOnIcon fontSize='small' color='primary' />
              <Typography lineHeight='40px' fontSize='12px'>
                {city}
              </Typography>
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
