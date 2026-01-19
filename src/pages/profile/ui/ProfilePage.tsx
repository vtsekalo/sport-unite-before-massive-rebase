import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';

import { LogoutConfirmationModal } from '@widgets/logout';
import { ProfileEditModal } from '@widgets/profile-edit';
import { ProfileViewModal } from '@widgets/profile-view';

type ProfilePageProps = Record<string, never>;

export const ProfilePage: React.FC<ProfilePageProps> = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const handleOpenEdit = () => setIsEdit(true);
  const handleCloseEdit = () => setIsEdit(false);

  const handleOpenLogoutModal = () => setOpenLogoutModal(true);
  const handleCloseLogoutModal = () => setOpenLogoutModal(false);

  return (
    <Box height={'100%'}>
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
        paddingY='10px'
        width='100%'
      >
        {!isEdit ? (
          <ProfileViewModal
            onEdit={handleOpenEdit}
            onLogoutClick={handleOpenLogoutModal}
          />
        ) : (
          <ProfileEditModal
            onCancel={handleCloseEdit}
            onSaved={handleCloseEdit}
          />
        )}
      </Box>

      <LogoutConfirmationModal
        open={openLogoutModal}
        onClose={handleCloseLogoutModal}
      />
    </Box>
  );
};

export default ProfilePage;
