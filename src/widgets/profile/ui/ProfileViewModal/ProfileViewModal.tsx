import React, { useState } from 'react';

import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import {
  Button,
  MenuItem,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { UserStatusVariant } from '@shared/lib';

import { ProfileInfo } from '../../../../entities/profile-info';
import { useProfile } from '../../lib/useProfile';
import { Styled, StyledMenu } from './styled';

const ProfileViewModal: React.FC = () => {
  const [contactsAnchorEl, setContactsAnchorEl] = useState<null | HTMLElement>(
    null,
  );

  const { profile, isLoading } = useProfile(
    '72f9124c-12f4-434e-a2e7-77ac3780adf9',
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const buttonsLabels = [
    'Мои события',
    'Мои подписки/подписчики',
    'Мои отзывы',
    'Мои контакты',
  ];

  const renderMenuItem = (text: string, divider = false) => (
    <MenuItem dense disableGutters divider={divider}>
      {text}
    </MenuItem>
  );

  const buttonsNode = (
    <>
      {buttonsLabels.map((label) => (
        <Button
          key={label}
          fullWidth
          variant='outlined'
          color='primary'
          endIcon={
            label === 'Мои контакты' ? <KeyboardArrowDownIcon /> : undefined
          }
          onClick={
            label === 'Мои контакты'
              ? (e) => setContactsAnchorEl(e.currentTarget)
              : () => console.log(`Button: ${label}`)
          }
        >
          {label}
        </Button>
      ))}

      <Button
        fullWidth
        variant='outlined'
        color='primary'
        startIcon={<CreateIcon fontSize='small' />}
        onClick={() => console.log('Edit profile')}
      >
        Редактировать профиль
      </Button>
    </>
  );

  const logoutNode = (
    <Button
      fullWidth={isMobile}
      variant='contained'
      size='medium'
      color='primary'
      onClick={() => console.log('logout')}
    >
      Выйти из профиля
    </Button>
  );

  const renderContent = () => {
    if (isLoading || !profile) {
      return {
        avatarNode: <Skeleton variant='circular' width={160} height={160} />,
        mobileNicknameNode: <Skeleton width={133} height={48} />,
        personalNode: (
          <>
            <Skeleton width={isMobile ? 131 : 180} height={24} />
            <Skeleton width={100} height={20} />
            <Skeleton width={80} height={20} />
            <Skeleton width='70%' height={20} />
            <Skeleton width='100%' height={32} variant='rectangular' />
          </>
        ),
        nicknameNode: <Skeleton width={280} height={48} />,
        ratingNode: <Skeleton width={170} height={46} variant='rectangular' />,
        contactsMenuNode: null,
      };
    }

    return {
      avatarNode: <Styled.PhotoCameraFrontIcon color='primary' />,
      mobileNicknameNode: (
        <Typography fontWeight={700} fontSize='18px'>
          {profile.nickname}
        </Typography>
      ),
      personalNode: (
        <>
          <Typography fontWeight={700} fontSize={{ xs: '16px', md: '20px' }}>
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography fontSize='14px'>
            {new Date(profile.dateOfBirth).toLocaleDateString('ru-RU')}
          </Typography>
          <Typography fontSize='14px' color='text.disabled'>
            {profile.userStatus === UserStatusVariant.ACTIVE
              ? 'В сети'
              : 'Не в сети'}
          </Typography>
          <Typography fontSize='14px'>{profile.biography}</Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon fontSize='small' color='primary' />
            <Typography fontSize='12px'>{profile.city}</Typography>
          </div>
        </>
      ),
      nicknameNode: (
        <Typography fontWeight={700} fontSize='32px' lineHeight='1.6'>
          {profile.nickname}
        </Typography>
      ),
      ratingNode: (
        <>
          <StarIcon fontSize='large' htmlColor='#ffb400' />
          <Typography fontWeight={500} fontSize='14px'>
            Рейтинг:
          </Typography>
          <Typography fontWeight={700} fontSize='20px'>
            {profile.averageRating.toFixed(1)}
          </Typography>
        </>
      ),
      contactsMenuNode: contactsAnchorEl ? (
        <StyledMenu
          anchorEl={contactsAnchorEl}
          open={Boolean(contactsAnchorEl)}
          onClose={() => setContactsAnchorEl(null)}
          disableAutoFocusItem
          slotProps={{
            paper: {
              style: {
                width: contactsAnchorEl?.clientWidth || 'auto',
              },
            },
          }}
        >
          {renderMenuItem(`Email: ${profile.email}`, true)}
          {renderMenuItem('Телефон: +7 (999) 123-45-67', true)}
          {renderMenuItem('Telegram: @username')}
        </StyledMenu>
      ) : null,
    };
  };

  const content = renderContent();

  return (
    <ProfileInfo
      avatarNode={content.avatarNode}
      mobileNicknameNode={content.mobileNicknameNode}
      personalNode={content.personalNode}
      nicknameNode={content.nicknameNode}
      buttonsNode={buttonsNode}
      ratingNode={content.ratingNode}
      logoutNode={logoutNode}
      contactsMenuNode={content.contactsMenuNode}
    />
  );
};

ProfileViewModal.displayName = 'ProfileViewModal';
export default ProfileViewModal;
