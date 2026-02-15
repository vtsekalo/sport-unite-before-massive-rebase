import { FC } from 'react';

import { Box, Skeleton, useTheme } from '@mui/material';

import { CommonEventListEntity } from '@entities/common-event-list';
import { EventStatus } from '@shared/lib';

import { Styled } from './common-events-list.styled';

interface EventListSkeletonProps {
  count?: number;
  isMobile?: boolean;
}

export const CommonEventListSkeleton: FC<EventListSkeletonProps> = ({
  count = 5,
  isMobile,
}) => {
  const theme = useTheme();
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Styled.PrevInfoCard
          position={'relative'}
          margin={theme.spacing(0, 1)}
          padding={theme.spacing(1, 2)}
          borderRadius={2}
          boxShadow={theme.shadows[3]}
          color={theme.palette.background.paper}
          width='100%'
          maxWidth={345}
          maxHeight={isMobile ? 150 : 202}
          display={'flex'}
          flexDirection={'column'}
          key={index}
        >
          <CommonEventListEntity
            eventStatus={EventStatus.PLANNED}
            typeNode={
              <Box
                gap={theme.spacing(1)}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'flex-start'}
              >
                <Skeleton height={24} width={24} variant='base' />
                <Skeleton height={24} width={24} variant='base' />
              </Box>
            }
            titleNode={
              <Box
                gap={theme.spacing(1)}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'flex-start'}
              >
                <Skeleton height={20} width={150} />
              </Box>
            }
            addressNode={
              <Box
                gap={theme.spacing(1)}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'flex-start'}
              >
                <Skeleton height={16} width={150} />
              </Box>
            }
            eventTimeNode={
              <Box
                gap={theme.spacing(1)}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'flex-start'}
              >
                <Skeleton height={16} width={150} />
              </Box>
            }
            imageEventNode={
              <Skeleton variant='base' height={56} width={isMobile ? 80 : 80} />
            }
            textNode={
              <>
                {!isMobile ? (
                  <>
                    <Skeleton height={60} />
                    <Skeleton height={60} />{' '}
                  </>
                ) : null}
              </>
            }
            buttonNode={isMobile ? <Skeleton height={60} /> : null}
          />
        </Styled.PrevInfoCard>
      ))}
    </>
  );
};
