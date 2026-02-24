import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ModalWrapper } from '@entities/modal-wrapper';
import { useGetMyProfileQuery } from '@shared/api';
import { useGetUserEventsQuery } from '@shared/api';
import { ROUTES, UserRole } from '@shared/lib';
import { MyEventListDesktop, MyEventListMobile } from '@widgets/my-events-list';

export const MyEventsPage: FC = () => {
  const {
    data: eventsData,
    isLoading: eventsIsLoading,
    error,
  } = useGetUserEventsQuery();
  const { data: profileData, isLoading: profileIsLoading } =
    useGetMyProfileQuery({
      __meta: { toast: false },
    });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const organizers = eventsData?.reduce(
    (sum, event) =>
      sum + event.users.filter((u) => u.userRole === UserRole.organizer).length,
    0,
  );

  const participants = eventsData?.reduce(
    (sum, event) =>
      sum +
      event.users.filter((u) => u.userRole === UserRole.participant).length,
    0,
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (error && 'status' in error && error?.status === 401) {
      navigate(ROUTES.AUTH);
    }
  }, [error, navigate]);

  const nickname = profileIsLoading ? (
    isMobile ? (
      <Skeleton height={24} width={140} />
    ) : (
      <Skeleton height={40} width={232} />
    )
  ) : (
    profileData?.nickname
  );

  return (
    <ModalWrapper>
      <Box
        position='relative'
        display='flex'
        alignItems='center'
        justifyItems='center'
        flexDirection='column'
        overflow='hidden'
        gap={{ xs: 1, md: 3 }}
        p={{ xs: 2, md: 5 }}
      >
        <Typography
          component='h3'
          fontWeight={700}
          fontSize={24}
          lineHeight={1}
          letterSpacing='0.4px'
        >
          Мои события
        </Typography>
        <Box
          width='100%'
          display='flex'
          justifyContent='space-between'
          flexDirection={{ xs: 'column', md: 'row' }}
        >
          <Box
            flex={1}
            display={{ xs: 'none', md: 'flex' }}
            justifyContent='flex-start'
            alignItems='flex-start'
          ></Box>
          <Box
            order={{ xs: 2, md: 2 }}
            flex={1}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            height={'72px'}
            alignItems='center'
            textAlign='center'
            p={1}
            gap={1}
          >
            <Typography
              component='h3'
              fontWeight={600}
              fontSize={14}
              lineHeight='24px'
              letterSpacing='0.4px'
            >
              {eventsIsLoading ? (
                <Skeleton height={30} width={257} />
              ) : (
                `Вы приняли участие в ${organizers} событиях.`
              )}
            </Typography>
            <Typography
              component='h3'
              fontWeight={600}
              fontSize={14}
              lineHeight='24px'
              letterSpacing='0.4px'
            >
              {eventsIsLoading ? (
                <Skeleton height={30} width={188} />
              ) : (
                `Организовали ${participants} события.`
              )}
            </Typography>
          </Box>
          <Box
            order={{ xs: 1, md: 3 }}
            flex={1}
            display='flex'
            justifyContent={{ xs: 'center', md: 'flex-end' }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            p={1}
          >
            <Typography
              component='h3'
              fontWeight={700}
              fontSize={{ xs: 24, md: 40 }}
              lineHeight={1}
            >
              {nickname}
            </Typography>
          </Box>
        </Box>
        {isMobile ? (
          <MyEventListMobile
            events={eventsData ?? []}
            loading={eventsIsLoading}
          />
        ) : (
          <MyEventListDesktop
            events={eventsData ?? []}
            loading={eventsIsLoading}
          />
        )}
      </Box>
    </ModalWrapper>
  );
};
