import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Button,
  MenuItem,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ProfileInfo } from '@entities/profile-info';
import { QueryInfo } from '@entities/query-info';
import { UserStatusVariant, useProfile } from '@shared/lib';

import { BUTTONS_LABELS } from '../lib/constants';
import {
  StyledAvatarImage,
  StyledMenu,
  StyledPhotoCameraFrontIcon,
} from './styled';

type ProfileViewModalProps = {
  onEdit?: () => void;
  onLogoutClick: () => void;
};

const ProfileViewModal: React.FC<ProfileViewModalProps> = ({
  onEdit,
  onLogoutClick,
}) => {
  const [contactsAnchorEl, setContactsAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const navigate = useNavigate();

  const { profile, isLoading, isAuthError, isError } = useProfile();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const renderMenuItem = (text: string, divider = false) => (
    <MenuItem dense disableGutters divider={divider}>
      {text}
    </MenuItem>
  );

  useEffect(() => {
    if (isAuthError) {
      navigate('/auth');
    }
  }, [isAuthError, navigate]);

  if (isError) {
    return <QueryInfo type='error' title='Ошибка загрузки профиля' />;
  }

  const buttonsNode = (
    <>
      {BUTTONS_LABELS.map((label) => (
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
        onClick={onEdit}
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
      onClick={onLogoutClick}
    >
      Выйти из профиля
    </Button>
  );

  const renderContent = () => {
    if (isLoading) {
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

    if (!profile) {
      return null;
    }

    return {
      avatarNode: profile.profilePicture ? (
        <StyledAvatarImage
          src={`${profile.profilePicture}?v=${Math.random()}`}
          alt='Avatar'
        />
      ) : (
        <StyledPhotoCameraFrontIcon color='primary' />
      ),
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
          <Box display='flex' alignItems='center'>
            <LocationOnIcon fontSize='small' color='primary' />
            <Typography fontSize='12px'>{profile.city}</Typography>
          </Box>
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
        </StyledMenu>
      ) : null,
    };
  };

  const content = renderContent();

  if (!content) {
    return <QueryInfo type='error' title='Ошибка загрузки профиля' />;
  }

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
