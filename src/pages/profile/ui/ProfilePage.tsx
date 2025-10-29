import React from 'react';

import { Box, Typography } from '@mui/material';

import { ProfileViewModal } from '@widgets/profile';

type ProfilePageProps = Record<string, never>;

export const ProfilePage: React.FC<ProfilePageProps> = () => {
  return (
    <Box>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        p={{ xs: 1, md: 1 }}
      >
        <Typography
          fontWeight='bold'
          fontSize={{ xs: '20px', md: '24px' }}
          lineHeight={1.6}
        >
          Профиль
        </Typography>
      </Box>

      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flex={1}
        width='100%'
      >
        <ProfileViewModal />
      </Box>
    </Box>
  );
};

ProfilePage.displayName = 'ProfilePage';
export default ProfilePage;
