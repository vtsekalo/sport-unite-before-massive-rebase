import { FC, ReactNode } from 'react';

import { Box, alpha, useMediaQuery, useTheme } from '@mui/material';

import { Styled } from './profile-info.styled';

type ProfileInfoProps = {
  avatarNode: ReactNode;
  mobileNicknameNode: ReactNode;
  personalNode: ReactNode;
  nicknameNode: ReactNode;
  buttonsNode: ReactNode;
  ratingNode: ReactNode;
  logoutNode: ReactNode;
  contactsMenuNode: ReactNode;
};

const ProfileInfo: FC<ProfileInfoProps> = ({
  avatarNode,
  mobileNicknameNode,
  personalNode,
  nicknameNode,
  buttonsNode,
  ratingNode,
  logoutNode,
  contactsMenuNode,
}) => {
  const theme = useTheme();
  const { spacing, palette } = theme;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Styled.GridContainer gap={isMobile ? spacing(1) : spacing(2)}>
        <Box
          gridArea={isMobile ? 'profile' : 'avatar'}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          gap={isMobile ? spacing(1) : spacing(2)}
        >
          <Box
            width={{ xs: 160, md: 400 }}
            height={{ xs: 160, md: 400 }}
            borderRadius='300px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            bgcolor={palette.grey[100]}
          >
            {avatarNode}
          </Box>
          <Box
            display={{ xs: 'flex', md: 'none' }}
            justifyContent='center'
            alignItems='center'
          >
            {mobileNicknameNode}
          </Box>
        </Box>

        <Box
          gridArea='personal'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          gap={isMobile ? spacing(2) : spacing(1)}
        >
          {personalNode}
        </Box>

        {!isMobile ? (
          <Box
            gridArea='rightColumn'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='flex-start'
            gap={theme.spacing(4)}
          >
            <Box display='flex' justifyContent='center' alignItems='center'>
              {nicknameNode}
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              gap={spacing(2)}
              width='100%'
              maxWidth={560}
              overflow='hidden'
            >
              {buttonsNode}
            </Box>
          </Box>
        ) : (
          <Box
            gridArea='buttons'
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={spacing(2)}
            width='100%'
            maxWidth={329}
            overflow='hidden'
          >
            {buttonsNode}
          </Box>
        )}

        <Box
          gridArea='rating'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            gap={1}
            width='100%'
            maxWidth='170px'
            height='46px'
            borderRadius='8px'
            border={`1px solid ${alpha(palette.primary.main, 0.5)}`}
          >
            {ratingNode}
          </Box>
        </Box>

        <Box
          gridArea='logout'
          display='flex'
          alignSelf='flex-end'
          justifyContent={{ xs: 'center', md: 'flex-end' }}
          width='100%'
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          {logoutNode}
        </Box>
      </Styled.GridContainer>
      {contactsMenuNode}
    </>
  );
};

export default ProfileInfo;
