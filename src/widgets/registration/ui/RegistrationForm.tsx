import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import EventIcon from '@mui/icons-material/Event';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Alert,
  Checkbox,
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

import { useRegistrationUserMutation } from '../api/registrationApi';
import { RegistrationFormData, registrationSchema } from '../lib/schema';
import { Styled } from './RegistrationForm.styled';

export const RegistrationForm = () => {
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [registerUser, { isLoading }] = useRegistrationUserMutation();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmVisibility = () => setShowConfirm((prev) => !prev);

  const watchedValues = watch();

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await registerUser(data).unwrap();
      window.location.assign(
        'http://api-gateway.dev.sport-unite.it-mentor.space/oauth2/authorization/gateway',
      );
      reset();
    } catch (error: unknown) {
      const err = error as {
        status?: number;
        data?: { message?: string };
        message?: string;
      };
      if (err?.status === 400) {
        setErrorMessage('Некорректные данные. Проверьте введённую информацию');
      } else if (err?.status === 409) {
        setErrorMessage('Пользователь с таким email уже существует');
      } else if (err?.status === 0 || err?.status === undefined) {
        setErrorMessage('Нет соединения с сервером. Проверьте интернет');
      } else {
        setErrorMessage(err?.data?.message || 'Ошибка регистрации');
      }
    }
  };

  return (
    <Styled.MainBox>
      <Styled.FormContainer>
        <Styled.FormStack as='form' onSubmit={handleSubmit(onSubmit)}>
          <Styled.TitleForms variant='h5'>Регистрация</Styled.TitleForms>
          <Styled.InputContainer>
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
          </Styled.InputContainer>
          <Styled.InputContainer>
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
          </Styled.InputContainer>
          <Styled.InputContainer>
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
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Styled.InputContainer>
          <Styled.InputContainer>
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
                        {showConfirm ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Styled.InputContainer>
          <Styled.InputContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name='dateOfBirth'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label='Дата рождения'
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(newDate) => {
                      field.onChange(
                        newDate ? newDate.format('YYYY-MM-DD') : '',
                      );
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
          </Styled.InputContainer>
          <Styled.InputContainer>
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
          </Styled.InputContainer>
          <Styled.FlagContainer>
            <Controller
              name='agree'
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      color='primary'
                    />
                  }
                  label={
                    <Typography variant='body1'>
                      Я согласен(а) с <Link href='/rules'>правилами</Link>
                    </Typography>
                  }
                />
              )}
            />
            <Styled.Tooltip
              variant='caption'
              color={errors.agree ? 'error.main' : 'text.secondary'}
            >
              {errors.agree
                ? errors.agree.message
                : 'Необходимо ознакомиться и согласиться с правилами'}
            </Styled.Tooltip>
          </Styled.FlagContainer>
          {errorMessage && (
            <Alert severity='error' sx={{ mb: 3, width: '100%' }}>
              {errorMessage}
            </Alert>
          )}
          <Styled.RegistrationButton
            type='submit'
            variant='contained'
            color='primary'
            disabled={!isValid || isLoading}
            fullWidth
          >
            {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
          </Styled.RegistrationButton>
        </Styled.FormStack>
      </Styled.FormContainer>
    </Styled.MainBox>
  );
};
