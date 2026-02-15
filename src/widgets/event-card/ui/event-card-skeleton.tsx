import { FC } from 'react';

import { AvatarGroup, Box, Skeleton, Typography } from '@mui/material';

import { EventCardEntity } from '@entities/event-card';
import { Styled } from '@widgets/event-card/ui/event-card.styled';

interface EventListSkeletonProps {
  count?: number;
  isMobile?: boolean;
}

export const EventCardSkeleton: FC<EventListSkeletonProps> = () => {
  return (
    <Styled.AnimatedModalWrapper
      maxWidth={{ xs: '361px', md: '440px' }}
      showBackButton
    >
      <EventCardEntity
        headerNode={
          <Styled.Header>
            <Skeleton variant='rectangular' width='100%' height='100%' />
          </Styled.Header>
        }
        titleNode={
          <>
            <Skeleton variant='circular' width={48} height={48} />
            <Box flex={1} alignSelf='center' pr={4}>
              <Skeleton height={20} />
            </Box>
          </>
        }
        dateNode={
          <>
            <Skeleton height={20} width={70} />
            <Skeleton height={20} width={90} />
          </>
        }
        locationNode={
          <>
            <Skeleton height={20} width={200} />
          </>
        }
        descriptionNode={
          <>
            <Skeleton height={20} width='90%' />
            <Skeleton height={20} width='80%' />
            <Skeleton height={20} width='75%' />
          </>
        }
        organizerNode={
          <>
            <Typography variant='body2' color='text.disabled' fontSize='12px'>
              <Skeleton height={20} width={100} />
            </Typography>
            <Skeleton variant='circular' width={32} height={32} />
          </>
        }
        participantsNode={
          <>
            <Typography variant='body2' color='text.disabled' fontSize='12px'>
              <Skeleton height={20} width={120} />
            </Typography>
            <AvatarGroup max={4}>
              {[1, 2, 3, 4].map((i) => (
                <Styled.EventAvatar key={i}>
                  <Skeleton variant='circular' />
                </Styled.EventAvatar>
              ))}
            </AvatarGroup>
          </>
        }
        footerActionsNode={
          <>
            <Box width={40} height={40}>
              <Skeleton variant='button' width='100%' height='100%' />
            </Box>

            <Box flex={1} height={40}>
              <Skeleton variant='button' width='100%' height='100%' />
            </Box>

            <Box width={40} height={40}>
              <Skeleton variant='button' width='100%' height='100%' />
            </Box>
          </>
        }
      />
    </Styled.AnimatedModalWrapper>
  );
};
