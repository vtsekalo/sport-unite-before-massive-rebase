import { FC } from 'react';
import { useParams } from 'react-router-dom';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Button,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';

import { UserProfileInfo } from '@entities/user-profile-info';
import { useGetUserByIdQuery } from '@shared/api';

import { Styled } from './user-profile.styled';

export const UserProfile: FC = () => {
  const { id: userId } = useParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { data, isLoading } = useGetUserByIdQuery(userId ?? skipToken);

  if (isLoading) {
    return (
      <UserProfileInfo
        avatarNode={
          <Skeleton
            variant='circular'
            width={isMobile ? 80 : 400}
            height={isMobile ? 80 : 400}
          />
        }
        nicknameNode={<Skeleton width={232} height={isMobile ? 20 : 40} />}
        buttonsNode={
          <Skeleton width={isMobile ? 232 : 560} height={isMobile ? 40 : 64} />
        }
        buttonNode={<Skeleton width={isMobile ? 320 : 180} height={40} />}
        personalNode={
          <>
            <Skeleton width={isMobile ? 131 : 180} height={24} />
            <Skeleton width={100} height={20} />
            <Skeleton width={160} height={20} />
            <Skeleton width={120} height={32} />
          </>
        }
        ratingNode={<Skeleton width={170} height={46} variant='rectangular' />}
        contactsNode={
          <>
            <Skeleton width={200} height={20} />
            <Box
              display='flex'
              flexDirection='column'
              alignItems='start'
              justifyContent='space-between'
              gap={2}
            >
              <Skeleton width={270} height={20} />
              <Skeleton width={270} height={20} />
              <Skeleton width={270} height={20} />
            </Box>
          </>
        }
      />
    );
  }

  if (!data) {
    return (
      <Typography display='flex' alignItems='center' justifyContent='center'>
        Информация о пользователе не найдена
      </Typography>
    );
  }

  return (
    <UserProfileInfo
      avatarNode={
        data.profilePicture ? (
          <img src={`${data.profilePicture}?v=${Math.random()}`} alt='Avatar' />
        ) : (
          <Styled.StyledPhotoCameraFrontIcon color='primary' />
        )
      }
      nicknameNode={data.nickname}
      buttonsNode={
        <Box
          display='flex'
          justifyContent='space-between'
          width='100%'
          gap={{ xs: 1, md: 5 }}
          maxWidth={{ xs: 232, md: 560 }}
        >
          <Button variant='contained' fullWidth size='veryBig'>
            <Box display='flex' flexDirection='column'>
              <Typography
                lineHeight={{ xs: '14px', md: '24px' }}
                fontSize={{ xs: '10px', md: '14px' }}
              >
                События
              </Typography>
              <Typography
                lineHeight={{ xs: '14px', md: '24px' }}
                fontSize={{ xs: '10px', md: '14px' }}
              >
                0
              </Typography>
            </Box>
          </Button>
          <Button variant='lightBlue' size='small' fullWidth>
            <Box display='flex' flexDirection='column'>
              <Typography
                lineHeight={{ xs: '14px', md: '24px' }}
                fontSize={{ xs: '10px', md: '14px' }}
              >
                Подписчики
              </Typography>
              <Typography
                lineHeight={{ xs: '14px', md: '24px' }}
                fontSize={{ xs: '10px', md: '14px' }}
              >
                0
              </Typography>
            </Box>
          </Button>
          <Button variant='lightBlue' fullWidth>
            <Box display='flex' flexDirection='column'>
              <Typography
                lineHeight={{ xs: '14px', md: '24px' }}
                fontSize={{ xs: '10px', md: '14px' }}
              >
                Подписчики
              </Typography>
              <Typography
                lineHeight={{ xs: '14px', md: '24px' }}
                fontSize={{ xs: '10px', md: '14px' }}
              >
                0
              </Typography>
            </Box>
          </Button>
        </Box>
      }
      buttonNode={
        <Button variant='contained' size='mediumFixed' fullWidth>
          Подписаться
        </Button>
      }
      personalNode={
        <>
          <Typography fontWeight={700} fontSize={{ xs: '16px', md: '20px' }}>
            {data.firstName} {data.lastName}
          </Typography>
          <Typography fontSize='14px'>
            {new Date(data.dateOfBirth).toLocaleDateString('ru-RU')}
          </Typography>
          <Typography fontSize='14px'>{data.biography}</Typography>
          <Box display='flex' alignItems='center'>
            <LocationOnIcon fontSize='small' color='primary' />
            <Typography fontSize='12px'>{data.city}</Typography>
          </Box>
        </>
      }
      ratingNode={
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          px={2}
          py={1}
          gap={1}
        >
          <StarIcon fontSize='large' htmlColor='#ffb400' />
          <Typography fontWeight={500} fontSize='14px'>
            Рейтинг:
          </Typography>
          <Typography fontWeight={700} fontSize='20px'>
            {data.averageRating.toFixed(1)}
          </Typography>
        </Box>
      }
      contactsNode={
        <>
          <Typography
            fontWeight={700}
            fontSize='16px'
            lineHeight='20px'
            letterSpacing={0}
          >
            Контактная информация
          </Typography>
          <Box display='flex' alignItems='start' gap={2}>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='start'
              justifyContent='space-between'
              gap={2}
            >
              <Typography
                fontWeight={400}
                fontSize='16px'
                lineHeight='20px'
                letterSpacing={0}
              >
                e-mail:
              </Typography>
              <Typography
                fontWeight={400}
                fontSize='16px'
                lineHeight='20px'
                letterSpacing={0}
              >
                phone:
              </Typography>
              <Typography
                fontWeight={400}
                fontSize='16px'
                lineHeight='20px'
                letterSpacing={0}
              >
                telegram:
              </Typography>
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='start'
              justifyContent='space-between'
              gap={2}
            >
              <Typography
                fontWeight={400}
                fontSize='16px'
                lineHeight='20px'
                letterSpacing={0}
              >
                {data.email}
              </Typography>
              <Typography
                fontWeight={400}
                fontSize='16px'
                lineHeight='20px'
                letterSpacing={0}
              >
                -
              </Typography>
              <Typography
                fontWeight={400}
                fontSize='16px'
                lineHeight='20px'
                letterSpacing={0}
              >
                -
              </Typography>
            </Box>
          </Box>
        </>
      }
    />
  );
};
