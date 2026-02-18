import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography, useTheme } from '@mui/material';

import { CommonEventListEntity } from '@entities/common-event-list';
import { Crown } from '@shared/assets';
import { IEventWithoutCoordinates, ROUTES } from '@shared/lib';
import { ImageWrapper } from '@shared/ui';
import { SportIcon } from '@shared/ui/sport-icons';
import { CommonEventListSkeleton } from '@widgets/common-events-list';

import { Styled } from './common-events-list.styled';

type CommonEventsListProps = {
  events: IEventWithoutCoordinates[];
  isLoading: boolean;
};

export const CommonEventsListDesktop: FC<CommonEventsListProps> = ({
  events,
  isLoading,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOpenCard = (eventId: string) => () => {
    navigate(ROUTES.EVENT.DETAIL(eventId), { state: { from: 'list' } });
  };

  return (
    <Styled.ListCardsContainer
      display={'flex'}
      borderRadius={'10px'}
      flexDirection={'column'}
      width={'100%'}
      height={'100%'}
    >
      <Box
        width={380}
        display='flex'
        gap={1}
        flexDirection={'column'}
        alignItems='center'
        justifyContent={'flex-start'}
        pt={2}
        pb={2}
      >
        {isLoading ? (
          <CommonEventListSkeleton count={5} />
        ) : (
          events.map((eventItem) => {
            return (
              <Styled.PrevInfoCard
                position={'relative'}
                margin={theme.spacing(0, 1)}
                padding={theme.spacing(1, 2)}
                borderRadius={2}
                boxShadow={theme.shadows[3]}
                color={theme.palette.background.paper}
                height={'202px'}
                width={'345px'}
                display={'flex'}
                flexDirection={'column'}
                key={eventItem.eventId}
              >
                <CommonEventListEntity
                  events={eventItem}
                  crownNode={
                    <img width={24} height={24} src={Crown} alt='icon' />
                  }
                  typeNode={
                    <Box
                      gap={theme.spacing(1)}
                      display={'flex'}
                      flexDirection={'column'}
                      alignItems={'flex-start'}
                    >
                      <SportIcon type={eventItem.eventType} />
                    </Box>
                  }
                  titleNode={
                    <Styled.EventTypography
                      fontSize={theme.typography.pxToRem(14)}
                      color={theme.palette.text.primary}
                      textAlign={'left'}
                      fontWeight={600}
                      overflow={'hidden'}
                      lineHeight={1.4}
                    >
                      {eventItem.eventName}
                    </Styled.EventTypography>
                  }
                  addressNode={
                    <Styled.EventTypography
                      color={theme.palette.text.secondary}
                      fontSize={theme.typography.pxToRem(12)}
                      textAlign={'left'}
                      fontWeight={'400'}
                      lineHeight={'1.4'}
                      overflow={'hidden'}
                    >
                      {eventItem.eventLocation}
                    </Styled.EventTypography>
                  }
                  eventTimeNode={
                    <Typography
                      color={theme.palette.primary.main}
                      textAlign={'left'}
                      fontSize={theme.typography.pxToRem(12)}
                      fontWeight={'500'}
                      lineHeight={'1.5'}
                    >
                      {eventItem.eventStartDate
                        ? dayjs(eventItem.eventEndDate).format(
                            'DD.MM.YYYY [в] HH:mm',
                          )
                        : ''}
                    </Typography>
                  }
                  textNode={
                    <Styled.EventTypographyDescription
                      fontSize={theme.typography.pxToRem(14)}
                      color={theme.palette.text.primary}
                      textAlign={'left'}
                      fontWeight={'500'}
                      lineHeight={'1.5'}
                      overflow={'hidden'}
                    >
                      {eventItem.eventDescription}
                    </Styled.EventTypographyDescription>
                  }
                  imageEventNode={
                    <>
                      <ImageWrapper
                        height={56}
                        width={80}
                        src={eventItem.eventPhoto}
                      >
                        <Styled.EventImage
                          height={56}
                          width={80}
                          $status={eventItem.eventStatus}
                          src={eventItem.eventPhoto}
                          alt={eventItem.eventName}
                        />
                      </ImageWrapper>
                    </>
                  }
                  buttonNode={
                    <Button
                      variant='contained'
                      fullWidth
                      size='mediumFixed'
                      onClick={handleOpenCard(eventItem.eventId)}
                    >
                      Подробнее
                    </Button>
                  }
                />
              </Styled.PrevInfoCard>
            );
          })
        )}
      </Box>
    </Styled.ListCardsContainer>
  );
};
