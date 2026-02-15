import { FC, ReactNode } from 'react';

import { Box } from '@mui/material';

import {
  EventStatus,
  IEventWithoutCoordinates,
  useIsEventOrganizer,
  useProfile,
} from '@shared/lib';

interface EventEntityProps {
  typeNode?: ReactNode;
  crownNode?: ReactNode;
  titleNode?: ReactNode;
  addressNode?: ReactNode;
  eventTimeNode?: ReactNode;
  imageEventNode?: ReactNode;
  textNode?: ReactNode;
  buttonNode?: ReactNode;
  eventStatus?: EventStatus;
  events?: IEventWithoutCoordinates;
}

export const CommonEventListEntity: FC<EventEntityProps> = ({
  typeNode,
  titleNode,
  addressNode,
  eventTimeNode,
  imageEventNode,
  textNode,
  buttonNode,
  crownNode,
  events,
}) => {
  const { profile } = useProfile();
  const [isOrganizer] = useIsEventOrganizer(events, profile?.id);
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        gap={0.5}
        height={{ xs: 122, md: 202 }}
      >
        <Box
          display='flex'
          flexDirection='row'
          alignItems='flex-start'
          justifyContent='space-between'
          mt={{ xs: 0, md: 1 }}
        >
          <Box
            display='flex'
            flexDirection='row'
            alignItems='flex-start'
            gap={1}
            flex={1}
          >
            <Box display='flex' flexDirection='column' gap={1.4}>
              {typeNode}
              {isOrganizer && crownNode}
            </Box>

            <Box
              marginRight={1}
              display='flex'
              flexDirection='column'
              gap={0.5}
              flex={1}
            >
              {titleNode}
              {addressNode}
              {eventTimeNode}
            </Box>
          </Box>

          {imageEventNode}
        </Box>
        <Box justifyContent={'center'} alignItems={'center'}>
          {textNode}
        </Box>
        <Box mt='auto' mb={'10px'}>
          {buttonNode}
        </Box>
      </Box>
    </>
  );
};
