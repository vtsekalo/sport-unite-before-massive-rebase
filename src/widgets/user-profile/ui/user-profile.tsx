import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Avatar,
  Box,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';

import { ProfileInfo } from '@entities/profile-info';
import { QueryInfo } from '@entities/query-info';
import { useGetUserByIdQuery } from '@shared/api';

dayjs.extend(relativeTime);
dayjs.locale('ru');

export const UserProfile: FC = () => {
  const { id: userId } = useParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { data: userDate, isLoading } = useGetUserByIdQuery(
    userId ?? skipToken,
  );

  if (isLoading) {
    return (
      <Box width='100%' pt={{ xs: 0, md: 5 }}>
        <ProfileInfo
          gridTemplateAreas={{
            xs: `
            "avatar  avatar"
            "info info"
          `,
            md: `"avatar info"`,
          }}
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
              width={{ xs: '100%', md: '70%' }}
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              gap={5}
            >
              <Skeleton width='50%' height={24} />
              <Box
                display='flex'
                width='100%'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                gap={2}
              >
                <Skeleton width='70%' height={24} />
                <Skeleton width='30%' height={24} />
                <Skeleton width='100%' height={24} />
                <Skeleton width='50%' height={24} />
              </Box>
              <Box
                display='flex'
                width='100%'
                justifyContent='center'
                alignItems='center'
                flexDirection='column'
                gap={{ xs: 1, md: 3 }}
              >
                <Skeleton width='70%' height={24} />
                <Skeleton width='70%' height={24} />
              </Box>
            </Box>
          }
        />
      </Box>
    );
  }

  if (!userDate) {
    return (
      <QueryInfo type='error' title='Невозможно загрузить данные профиля' />
    );
  }
  const {
    nickname,
    email,
    dateOfBirth,
    firstName,
    lastName,
    city,
    biography,
    profilePicture,
  } = userDate;
  return (
    <Box width='100%' pt={{ xs: 0, md: 5 }}>
      <ProfileInfo
        gridTemplateAreas={{
          xs: `
            "avatar  avatar"
            "info info"
          `,
          md: `"avatar info"`,
        }}
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
            {!profilePicture ? (
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
          <Box display='flex' flexDirection='column' gap={5}>
            <Typography
              fontWeight={700}
              lineHeight='40px'
              fontSize={{ xs: '16px', md: '40px' }}
            >
              {nickname}
            </Typography>
            <Box display='flex' flexDirection='column' gap={2}>
              {(firstName || lastName) && (
                <Typography
                  fontWeight={700}
                  lineHeight='20px'
                  fontSize={{ xs: '16px', md: '24px' }}
                >
                  {[firstName, lastName].filter(Boolean).join(' ')}
                </Typography>
              )}
              <Typography fontSize='14px' fontWeight={400} lineHeight='20px'>
                {dayjs(dateOfBirth).fromNow(true)}
              </Typography>
              {biography && (
                <Typography fontSize='14px'>{biography}</Typography>
              )}
              <Box
                display='flex'
                flexDirection='row'
                justifyContent='center'
                alignItems='center'
              >
                <LocationOnIcon fontSize='small' color='primary' />
                <Typography fontSize='12px'>{city}</Typography>
              </Box>
            </Box>
            <Box display='flex' flexDirection='column' gap={{ xs: 1, md: 3 }}>
              <Typography
                fontWeight={700}
                fontSize='16px'
                lineHeight='20px'
                letterSpacing={0}
              >
                Контактная информация
              </Typography>
              <Typography
                fontWeight={400}
                fontSize='16px'
                lineHeight='20px'
                letterSpacing={0}
              >
                {`e-mail: ${email}`}
              </Typography>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};
