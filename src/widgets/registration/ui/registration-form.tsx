import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import EventIcon from '@mui/icons-material/Event';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormHelperText,
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

import { useGetCityByFilterQuery } from '@shared/api';
import { ROUTES, dayjs, useDebounce } from '@shared/lib';

import { useRegistrationUserMutation } from '../api/registration-api';
import { RegistrationFormData, registrationSchema } from '../lib/schema';

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, touchedFields },
    watch,
    reset,
    setError,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      agree: false,
      city: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [filter, setFilter] = useState('');
  const [isOpenSuggestion, setIsOpenSuggestion] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const debouncedFilter = useDebounce(filter, 500);

  const [registerUser, { isLoading, error }] = useRegistrationUserMutation();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmVisibility = () => setShowConfirm((prev) => !prev);

  const watchedValues = watch();

  const { data: hometown = [], isFetching } = useGetCityByFilterQuery(
    debouncedFilter,
    {
      skip: debouncedFilter.length < 2,
    },
  );

  const onSubmit = async (data: RegistrationFormData) => {
    await registerUser(data).unwrap();
    navigate(ROUTES.SEND_EMAIL);
    reset();
  };

  useEffect(() => {
    if (error && 'data' in error) {
      const data = error.data as {
        name: string;
        message: string;
        code: number;
      };

      if (data.code === 409) {
        const msg = data.message.toLowerCase();
        if (msg.includes('email')) {
          setError('email', {
            type: 'server',
            message: 'Email уже зарегистрирован.',
          });
        } else if (msg.includes('никнейм') || msg.includes('nickname')) {
          setError('nickname', {
            type: 'server',
            message: 'Этот никнейм уже занят.',
          });
        }
      }
    }
  }, [error, setError]);

  return (
    <Box
      component='form'
      display='flex'
      flexDirection='column'
      gap='16px'
      maxWidth={{ xs: '361px', md: '480px' }}
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
          required
          {...register('nickname')}
          error={!!errors.nickname}
          helperText={
            errors.nickname
              ? errors.nickname.message
              : watchedValues.nickname
                ? 'Уникальный email.'
                : 'Введите email'
          }
          slotProps={{
            inputLabel: {
              shrink: !!watchedValues.nickname || undefined,
            },
          }}
          fullWidth
        />
      </Box>
      <Box>
        <TextField
          label='Email'
          required
          type='email'
          {...register('email')}
          error={!!errors.email}
          helperText={
            errors.email
              ? errors.email.message
              : watchedValues.email
                ? 'Уникальный email.'
                : 'Введите email'
          }
          slotProps={{
            inputLabel: {
              shrink: !!watchedValues.email || undefined,
            },
          }}
          fullWidth
        />
      </Box>
      <Box>
        <TextField
          label='Пароль'
          required
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
            inputLabel: {
              shrink: !!watchedValues.password || undefined,
            },
          }}
        />
      </Box>
      <Box>
        <TextField
          label='Повторите пароль'
          required
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
            inputLabel: {
              shrink: !!watchedValues.confirmPassword || undefined,
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
                maxDate={dayjs()}
                value={
                  field.value && field.value !== 'invalid'
                    ? dayjs(field.value)
                    : null
                }
                onChange={(newDate) => {
                  if (newDate && newDate.isValid()) {
                    field.onChange(newDate.format('YYYY-MM-DD'));
                  } else {
                    field.onChange(newDate === null ? '' : 'invalid');
                  }
                }}
                slots={{ openPickerIcon: EventIcon, toolbar: () => null }}
                slotProps={{
                  textField: {
                    required: true,
                    size: isMobile ? 'small' : 'medium',
                    error: !!error,
                    helperText:
                      error?.message ||
                      (field.value || ''
                        ? 'Данные введены корректно.'
                        : 'Введите дату рождения'),
                    slotProps: {
                      inputLabel: {
                        shrink: !!field.value || undefined,
                      },
                    },
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
        <Controller
          name='city'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              fullWidth
              noOptionsText='Нет доступных вариантов'
              loadingText='Загрузка...'
              popupIcon={null}
              options={hometown}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.city
              }
              open={isOpenSuggestion && filter.length > 0}
              onOpen={() => filter.length > 0 && setIsOpenSuggestion(true)}
              onClose={() => setIsOpenSuggestion(false)}
              loading={isFetching}
              isOptionEqualToValue={(option, val) =>
                option.city === (typeof val === 'object' ? val?.city : val)
              }
              onInputChange={(_, newInputValue) => {
                setFilter(newInputValue);
                if (!newInputValue.trim()) {
                  setIsOpenSuggestion(false);
                  onChange('');
                } else {
                  setIsOpenSuggestion(true);
                }
              }}
              onChange={(_, newValue) => {
                onChange(newValue ? newValue.city : '');
                setIsOpenSuggestion(false);
              }}
              value={
                hometown.find((c) => c.city === value) ||
                (value ? { city: value, country: '' } : null)
              }
              slotProps={{
                listbox: {
                  sx: {
                    maxHeight: '190px',
                    overflowY: 'auto',
                  },
                },
                popper: {
                  placement: 'bottom-start',
                  modifiers: [
                    {
                      name: 'flip',
                      enabled: false,
                    },
                    {
                      name: 'offset',
                      enabled: true,
                      options: {
                        offset: [0, 4],
                      },
                    },
                  ],
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Город проживания'
                  error={!!errors.city}
                  helperText={
                    errors.city?.message ||
                    (watchedValues.city?.trim()
                      ? 'Информация сохранена.'
                      : touchedFields.city
                        ? 'Необязательное поле'
                        : 'Введите город проживания')
                  }
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isFetching && (
                            <CircularProgress color='primary' size={20} />
                          )}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
              )}
            />
          )}
        />
      </Box>
      <Box pl='12px'>
        <Controller
          name='agree'
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error} variant='standard'>
              <FormControlLabel
                control={
                  <Checkbox {...field} checked={field.value} color='primary' />
                }
                label={
                  <Typography variant='body1'>
                    Я согласен(а) с <Link href='/rules'>правилами</Link> *
                  </Typography>
                }
              />
              <FormHelperText>{error ? error.message : ' '}</FormHelperText>
            </FormControl>
          )}
        />
      </Box>
      <Button
        type='submit'
        variant='contained'
        borderRadius={'4px'}
        color='primary'
        disabled={!isValid || isLoading}
        fullWidth
      >
        {isLoading ? (
          <CircularProgress size={25} color='inherit' />
        ) : (
          'Зарегистрироваться'
        )}
      </Button>
    </Box>
  );
};
