import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useRegistrationUserMutation } from '../api/registrationApi';
import { RegistrationFormData, registrationSchema } from '../lib/schema';

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      agree: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [registerUser, { isLoading }] = useRegistrationUserMutation();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmVisibility = () => setShowConfirm((prev) => !prev);

  const onSubmit = (data: RegistrationFormData) => {
    registerUser(data);
    reset();
  };

  return (
    <Stack
      component='form'
      padding={2}
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant='h5' align='center'>
        Регистрация
      </Typography>

      <TextField
        label='Никнейм'
        {...register('nickname')}
        error={!!errors.nickname}
        helperText={errors.nickname?.message}
        fullWidth
      />

      <TextField
        label='Email'
        type='email'
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        label='Пароль'
        type={showPassword ? 'text' : 'password'}
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={togglePasswordVisibility} edge='end'>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label='Повтор пароля'
        type={showConfirm ? 'text' : 'password'}
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={toggleConfirmVisibility} edge='end'>
                  {showConfirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label='Дата рождения'
        type='date'
        {...register('dateOfBirth')}
        error={!!errors.dateOfBirth}
        helperText={errors.dateOfBirth?.message}
        fullWidth
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <TextField
        label='Город'
        {...register('city')}
        error={!!errors.city}
        helperText={errors.city?.message}
        fullWidth
      />

      <Controller
        name='agree'
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox {...field} checked={field.value} color='primary' />
            }
            label='Согласен с условиями'
          />
        )}
      />
      {errors.agree && (
        <Typography variant='caption' color='error'>
          {errors.agree.message}
        </Typography>
      )}

      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={!isValid || isLoading}
        fullWidth
      >
        {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>
    </Stack>
  );
};
