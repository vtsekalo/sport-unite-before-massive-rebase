import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import EventIcon from '@mui/icons-material/Event';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { ROUTES } from '@shared/lib';

import { useRegistrationUserMutation } from '../api/registration-api';
import { RegistrationFormData, registrationSchema } from '../lib/schema';
import { Styled } from './registration-form.styled';

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [registerUser, { isLoading }] = useRegistrationUserMutation();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmVisibility = () => setShowConfirm((prev) => !prev);

  const watchedValues = watch();

  const onSubmit = async (data: RegistrationFormData) => {
    await registerUser(data).unwrap();
    navigate(ROUTES.SEND_EMAIL);
    reset();
  };

  return (
    <Box
      component='form'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      gap='16px'
      maxWidth={{ xs: '360px', md: '480px' }}
      p={{ xs: '16px', md: '24px 32px' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography
        display='flex'
        justifyContent='center'
        alignItems='center'
        fontWeight={700}
        fontSize='24px'
        lineHeight='24px'
        letterSpacing='0.15px'
        height='56px'
      >
        Регистрация
      </Typography>
      <Box>
        <TextField
          label='Никнейм'
          {...register('nickname')}
          error={!!errors.nickname}
          helperText={
            errors.nickname?.message ||
            (watchedValues.nickname // TODO: Сделать проверку уникальности никнейма через запрос к backend
              ? 'Уникальный никнейм.'
              : 'Введите никнейм')
          }
          fullWidth
        />
      </Box>
      <Box>
        <TextField
          label='Email'
          type='email'
          {...register('email')}
          error={!!errors.email}
          helperText={
            errors.email?.message ||
            (watchedValues.email // TODO: Сделать проверку уникальности никнейма через запрос к backend
              ? 'Уникальный email.'
              : 'Введите email')
          }
          fullWidth
        />
      </Box>
      <Box>
        <TextField
          label='Пароль'
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          helperText={
            errors.password?.message ||
            (watchedValues.password ? 'Пароль надежный.' : 'Введите пароль')
          }
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
      </Box>
      <Box>
        <TextField
          label='Повторите пароль'
          type={showConfirm ? 'text' : 'password'}
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={
            errors.confirmPassword?.message ||
            (watchedValues.confirmPassword
              ? 'Пароли совпадают.'
              : 'Повторите пароль')
          }
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
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name='dateOfBirth'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                label='Дата рождения'
                value={field.value ? dayjs(field.value) : null}
                onChange={(newDate) => {
                  field.onChange(newDate ? newDate.format('YYYY-MM-DD') : '');
                }}
                slots={{ openPickerIcon: EventIcon, toolbar: () => null }}
                slotProps={{
                  textField: {
                    size: isMobile ? 'small' : 'medium',
                    error: !!error,
                    helperText:
                      error?.message ||
                      (field.value || ''
                        ? 'Данные введены корректно.'
                        : 'Введите дату рождения'),
                    fullWidth: true,
                  },
                }}
                format='DD.MM.YYYY'
              />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <TextField
          label='Город проживания'
          {...register('city')}
          error={!!errors.city}
          helperText={
            errors.city?.message ||
            (watchedValues.city
              ? 'Информация сохранена.'
              : 'Введите город проживания')
          }
          fullWidth
        />
      </Box>
      <Box pl='12px'>
        <Controller
          name='agree'
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox {...field} checked={field.value} color='primary' />
              }
              label={
                <Typography variant='body1'>
                  Я согласен(а) с <Link href='/rules'>правилами</Link>
                </Typography>
              }
            />
          )}
        />
        <Typography
          display='block'
          variant='caption'
          color={errors.agree ? 'error.main' : 'text.secondary'}
        >
          {errors.agree
            ? errors.agree.message
            : 'Необходимо ознакомиться и согласиться с правилами'}
        </Typography>
      </Box>
      <Styled.RegistrationButton
        type='submit'
        variant='contained'
        color='primary'
        disabled={!isValid || isLoading}
        fullWidth
      >
        {isLoading ? (
          <CircularProgress size={25} color='inherit' />
        ) : (
          'Зарегистрироваться'
        )}
      </Styled.RegistrationButton>
    </Box>
  );
};
