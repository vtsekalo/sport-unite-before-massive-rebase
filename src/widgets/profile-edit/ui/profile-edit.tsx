import { FC, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { QueryInfo } from '@entities/query-info';
import { ProfileDeleteModal } from '@features/profile-delete';
import { useGetMyProfileQuery } from '@shared/api';
import { GenderVariant, ROUTES } from '@shared/lib';

import {
  useDeleteMyAvatarMutation,
  useUpdateMyAvatarMutation,
  useUpdateMyProfileMutation,
} from '../api/profile-edit-api';
import { FORM_LIMITS } from '../lib/constants';
import { ProfileEditFormData, profileEditSchema } from '../lib/schema';
import {
  StyledAvatarImage,
  StyledButtonSettingsConf,
  StyledDeleteAvatarButton,
  StyledGridContainer,
} from './profile-edit.styled';

export const ProfileEdit: FC = () => {
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: profile, isLoading: isLoadingProfile } = useGetMyProfileQuery(
    {},
  );

  const [updateMyProfile, { isLoading: isSaving }] =
    useUpdateMyProfileMutation();
  const [deleteMyAvatar, { isLoading: isLoadingDeleteAvatar }] =
    useDeleteMyAvatarMutation();

  const [
    updateImage,
    { data: updateImageData, isLoading: isLoadingUpdateAvatar },
  ] = useUpdateMyAvatarMutation();

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<ProfileEditFormData>({
    resolver: yupResolver(profileEditSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: '',
      dateOfBirth: '',
      gender: GenderVariant.MALE,
      interestIds: [],
      biography: '',
      email: '',
      city: '',
      profilePicture: undefined,
    },
  });

  const nicknameValue = watch('nickname') || '';
  // const interestsValue = watch('interestIds') || [];
  const biographyValue = watch('biography') || '';
  const cityValue = watch('city') || '';
  const profilePictureValue = watch('profilePicture');

  useEffect(() => {
    if (updateImageData?.photoUrl) {
      setAvatarPreview(updateImageData.photoUrl);
    }
  }, [updateImageData]);

  useEffect(() => {
    if (profile) {
      reset({
        nickname: profile.nickname || '',
        dateOfBirth: profile.dateOfBirth || '',
        gender: profile.gender || GenderVariant.MALE,
        interestIds: [],
        biography: profile.biography || '',
        email: profile.email || '',
        city: profile.city || '',
        profilePicture: undefined,
      });
      setAvatarPreview(profile.profilePicture);
    }
  }, [profile, reset]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setValue('profilePicture', file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    const formData = new FormData();
    formData.append('file', file, file.name);

    updateImage({ id: profile?.id ?? '', file: formData });
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    deleteMyAvatar({ id: profile?.id ?? '' }).unwrap();

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (data: ProfileEditFormData) => {
    if (!profile) return;

    const updateData = {
      nickname: data.nickname,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      firstName: profile.firstName,
      lastName: profile.lastName,
      biography: data.biography || '',
      city: data.city,
      interestIds: [],
      profilePicture:
        updateImageData?.photoUrl || profile?.profilePicture || '',
    };

    await updateMyProfile(updateData).unwrap();

    navigate(ROUTES.PROFILE.INDEX);
  };

  const canSave = isValid && !isSaving;

  if (isLoadingProfile) {
    return <QueryInfo type='loading' />;
  }

  if (!profile) {
    return <QueryInfo type='error' title='Ошибка загрузки профиля' />;
  }
  
  const avatarSrc = `${(updateImageData?.photoUrl || profile.profilePicture || avatarPreview || '').replace('http://194.85.218.83:9000', '')}?v=${updateImageData?.fileName}${updateImageData?.fileSize}_${Math.random()}`;
  // const avatarSrc = `${updateImageData?.photoUrl || profile.profilePicture || avatarPreview}?v=${updateImageData?.fileName}${updateImageData?.fileSize}_${Math.random()}`;

  return (
    <>
      <StyledGridContainer>
        <Box display='none'>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept='image/jpeg,image/png,image/jpg'
          />
        </Box>

        <Box gridArea='avatar'>
          <Box
            pt={{ xs: '0px', md: '80px' }}
            display='flex'
            flexDirection='column'
            alignItems='center'
            gap={3}
          >
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              width={240}
              height={240}
              bgcolor='grey.100'
              borderRadius='300px'
              overflow='hidden'
              fontSize='100px'
            >
              {avatarSrc && !isLoadingUpdateAvatar ? (
                <StyledAvatarImage
                  key={`${updateImageData?.fileName}${updateImageData?.fileSize}`}
                  src={avatarSrc}
                  alt='Avatar'
                />
              ) : (
                <PhotoCameraFrontIcon color='primary' fontSize='inherit' />
              )}
            </Box>

            {errors.profilePicture && (
              <Typography color='error' fontSize='12px' textAlign='center'>
                {errors.profilePicture.message}
              </Typography>
            )}

            <Box display='flex' gap={2} width='100%' maxWidth={240}>
              <Button
                size='mediumFixed'
                variant='contained'
                fullWidth
                loading={isLoadingUpdateAvatar}
                onClick={handleAvatarClick}
              >
                Изменить фото
              </Button>
              <StyledDeleteAvatarButton
                variant='contained'
                color='primary'
                loading={isLoadingDeleteAvatar}
                onClick={handleRemoveAvatar}
                disabled={!avatarPreview && !profilePictureValue}
              >
                <DeleteIcon />
              </StyledDeleteAvatarButton>
            </Box>
          </Box>
        </Box>

        <Box
          gridArea={{ xs: 'mobile-forms', md: 'main-desktop' }}
          flexDirection='column'
          gap={3}
          pl={{ xs: '0px', md: '72px' }}
          component='form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <StyledButtonSettingsConf
              size='mediumFixed'
              variant='contained'
              startIcon={<SettingsIcon />}
            >
              Настройки конфиденциальности
            </StyledButtonSettingsConf>
            <Typography
              fontWeight={700}
              fontSize='40px'
              color='text.primary'
              display={{ xs: 'none', md: 'flex' }}
              maxWidth='400px'
              overflow='hidden'
              whiteSpace='nowrap'
            >
              {profile?.nickname}
            </Typography>
          </Box>

          <Box
            display='flex'
            gap={{ xs: '16px', md: '40px' }}
            width='100%'
            flex={1}
            flexDirection={{ xs: 'column', md: 'row' }}
            pt={{ xs: '16px', md: '40px' }}
          >
            <Box flex={1} display='flex' flexDirection='column'>
              <Box display='flex' flexDirection='column' gap={2}>
                <Typography
                  fontWeight={700}
                  fontSize='14px'
                  color='text.primary'
                >
                  Персональные данные
                </Typography>

                <Controller
                  name='nickname'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Никнейм'
                      variant='outlined'
                      fullWidth
                      error={!!errors.nickname}
                      helperText={
                        errors.nickname?.message ||
                        `${nicknameValue.length}/${FORM_LIMITS.NICKNAME}`
                      }
                    />
                  )}
                />

                <Controller
                  name='dateOfBirth'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Дата рождения'
                      type='date'
                      variant='outlined'
                      fullWidth
                      error={!!errors.dateOfBirth}
                      helperText={errors.dateOfBirth?.message}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  )}
                />

                <Controller
                  name='gender'
                  control={control}
                  render={({ field }) => (
                    <Box>
                      <FormLabel component='legend'>Пол</FormLabel>
                      <RadioGroup
                        row
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <FormControlLabel
                          value={GenderVariant.MALE}
                          control={<Radio />}
                          label='Мужской'
                        />
                        <FormControlLabel
                          value={GenderVariant.FEMALE}
                          control={<Radio />}
                          label='Женский'
                        />
                      </RadioGroup>
                    </Box>
                  )}
                />

                {/* <Controller
                name='interestIds'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id='demo-multiple-checkbox-label'>
                      Мои интересы
                    </InputLabel>
                    <Select
                      {...field}
                      multiple
                      input={
                        <OutlinedInput
                          placeholder='Например: бег, плавание, чтение'
                          label='Мои интересы'
                        />
                      }
                      renderValue={(selected) =>  (
                           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                              const type = typeEvents?.find((t) => t.typeId === value);

                              return (
                              <Chip key={value} label={type ? type.typeName : value} />
                            )})}
                          </Box>
                        )
                      }
                    >
                      {typeEvents?.map((name) => (
                        <MenuItem key={name.typeId} value={name.typeId}>
                          <Checkbox
                            checked={interestsValue.includes(name.typeId)}
                          />
                          <ListItemText primary={name.typeName} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              /> */}

                <Controller
                  name='biography'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='О себе'
                      variant='outlined'
                      fullWidth
                      helperText={`${biographyValue.length}/${FORM_LIMITS.BIOGRAPHY}`}
                    />
                  )}
                />
              </Box>
            </Box>

            <Box flex={1} display='flex' flexDirection='column' gap={2}>
              <Typography fontWeight={700} fontSize='14px'>
                Контактная информация
              </Typography>

              <Controller
                name='city'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Город'
                    variant='outlined'
                    fullWidth
                    error={!!errors.city}
                    helperText={
                      errors.city?.message ||
                      `${cityValue.length}/${FORM_LIMITS.CITY}`
                    }
                  />
                )}
              />

              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Email'
                    type='email'
                    variant='outlined'
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Box>
          </Box>
        </Box>

        <Box
          gridArea='actions'
          display='flex'
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent={{ xs: 'center', md: 'space-between' }}
          gap={2}
          height='100dvh'
          maxHeight={{ xs: '168px', md: '40px' }}
        >
          <Button
            size='mediumFixed'
            fullWidth={isMobile}
            variant='contained'
            startIcon={<DeleteIcon />}
            onClick={() => setIsDeleteOpen(true)}
          >
            Удалить профиль
          </Button>

          <Box
            width={{ xs: '100%', md: 'auto' }}
            display='flex'
            gap={2}
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Button
              size='mediumFixed'
              fullWidth={isMobile}
              variant='outlined'
              onClick={() => navigate(ROUTES.PROFILE.INDEX)}
            >
              Отмена
            </Button>
            <Button
              loading={isSaving}
              fullWidth={isMobile}
              size='mediumFixed'
              variant='contained'
              type='submit'
              onClick={handleSubmit(onSubmit)}
              disabled={!canSave}
            >
              Сохранить
            </Button>
          </Box>
        </Box>
      </StyledGridContainer>
      <ProfileDeleteModal
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => navigate(ROUTES.PROFILE.DELETED)}
      />
    </>
  );
};
