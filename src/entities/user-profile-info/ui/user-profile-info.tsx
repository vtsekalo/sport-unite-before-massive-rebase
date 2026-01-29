import { FC, ReactNode } from 'react';

import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

import { Styled } from './user-profile-info.styled';

type UserProfileInfoProps = {
  avatarNode: ReactNode;
  nicknameNode: ReactNode;
  buttonsNode: ReactNode;
  buttonNode: ReactNode;
  personalNode: ReactNode;
  ratingNode: ReactNode;
  contactsNode: ReactNode;
};

export const UserProfileInfo: FC<UserProfileInfoProps> = ({
  avatarNode,
  nicknameNode,
  buttonsNode,
  personalNode,
  ratingNode,
  contactsNode,
  buttonNode,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box display='flex' flexDirection='row' height='100%' width='100%' gap={10}>
      {!isMobile && (
        <Box pt='20px' width='100%' maxWidth={400}>
          <Styled.AvatarUser variant='circular'>{avatarNode}</Styled.AvatarUser>
        </Box>
      )}
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='start'
        width='100%'
        maxWidth={711}
        gap={{ xs: 3, md: 5 }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          width='100%'
          gap='17px'
        >
          {isMobile && (
            <Box width='100%' maxWidth={80}>
              <Styled.AvatarUser variant='circular'>
                {avatarNode}
              </Styled.AvatarUser>
            </Box>
          )}
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            width='100%'
            gap={{ xs: '20px', md: 5 }}
          >
            <Typography
              display='flex'
              justifyContent={{ xs: 'start', md: 'center' }}
              fontWeight={700}
              fontSize={{ xs: '16px', md: '40px' }}
              lineHeight={{ xs: '20px', md: '40px' }}
              letterSpacing={0}
            >
              {nicknameNode}
            </Typography>
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              width='100%'
              gap={5}
            >
              {buttonsNode}
            </Box>
          </Box>
        </Box>
        <Box width='100%' maxWidth={{ xs: '100%', md: 180 }}>
          {buttonNode}
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          width='100%'
          gap={1}
        >
          {personalNode}
        </Box>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='centre'
          maxWidth='170px'
          borderRadius='8px'
          border='1px solid rgba(54, 119, 255, 0.5)'
        >
          {ratingNode}
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='start'
          justifyContent='center'
          gap={3}
        >
          {contactsNode}
        </Box>
      </Box>
    </Box>
  );
};
