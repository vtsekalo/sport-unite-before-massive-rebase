import { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { useGetTypeEventsQuery } from '@shared/api';
import {
  CreateEventFormData,
  EventFormInitialData,
  createEventSchema,
  dayjs,
} from '@shared/lib';
import { LocationAutocomplete } from '@shared/ui/location-autocomplete';

import { PhotoPreview } from './event-form.styled';

interface EventFormEntityProps {
  title: string;
  defaultValues: EventFormInitialData;
  onSubmit: (data: CreateEventFormData) => Promise<void>;
  onClose: () => void;
  submitButtonText: string;
  isSubmitting: boolean;
  isUploadingPhoto: boolean;
  initialPhotoUrl?: string;
}

export const EventFormEntity: FC<EventFormEntityProps> = ({
  title,
  defaultValues,
  onSubmit,
  onClose,
  submitButtonText,
  isSubmitting,
  isUploadingPhoto,
  initialPhotoUrl,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(
    initialPhotoUrl,
  );

  const { data: eventTypes, isLoading: isLoadingTypes } =
    useGetTypeEventsQuery();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
  } = useForm<CreateEventFormData>({
    resolver: yupResolver(createEventSchema),
    mode: 'onChange',
    defaultValues: defaultValues as CreateEventFormData,
  });

  const eventLocation = watch('eventLocation');

  const isFormDisabled =
    !isValid || !isDirty || isSubmitting || isUploadingPhoto;

  const today = dayjs();
  const maxDate = today.add(30, 'day');

  const sortedEventTypes = useMemo(() => {
    if (!eventTypes) return [];
    return [...eventTypes].sort((a, b) =>
      a.typeName.localeCompare(b.typeName, 'ru'),
    );
  }, [eventTypes]);

  const handleLocationChange = useCallback(
    (
      location: string,
      coordinates?: { latitude: number; longitude: number },
    ) => {
      setValue('eventLocation', location, { shouldValidate: true });
      if (coordinates) {
        setValue('coordinates', coordinates, { shouldValidate: true });
      }
    },
    [setValue],
  );

  const handleCoordinatesChange = useCallback(
    (coordinates: { latitude: number; longitude: number }) => {
      setValue('coordinates', coordinates, { shouldValidate: true });
    },
    [setValue],
  );

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue('eventPhoto', file, { shouldValidate: true });
    },
    [setValue],
  );

  const handleRemovePhoto = useCallback(() => {
    setValue('eventPhoto', null);
    setPhotoPreview(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [setValue]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      width='100%'
      maxWidth={isMobile ? 361 : 480}
      margin='0 auto'
      padding={isMobile ? theme.spacing(2) : theme.spacing(3)}
      gap={theme.spacing(2)}
    >
      <Typography fontSize={20} fontWeight={700} textAlign='center'>
        {title}
      </Typography>

      <Box display='flex' flexDirection='column' gap={theme.spacing(2)}>
        <input
          ref={fileInputRef}
          type='file'
          hidden
          accept='image/jpeg,image/jpg,image/png,image/webp'
          onChange={handlePhotoChange}
          disabled={isUploadingPhoto}
        />

        <Box
          height={232}
          overflow='hidden'
          position='relative'
          borderRadius='10px'
          bgcolor='grey.100'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          {photoPreview ? (
            <PhotoPreview src={photoPreview} alt='Event preview' />
          ) : (
            <ImageIcon fontSize='large' color='disabled' />
          )}
        </Box>

        <Box display='flex' gap={theme.spacing(1)}>
          <Button
            variant='contained'
            fullWidth
            startIcon={isUploadingPhoto ? null : <ImageIcon />}
            onClick={handlePhotoClick}
            disabled={isUploadingPhoto}
            size='mediumFixed'
          >
            {isUploadingPhoto ? (
              <CircularProgress size={20} />
            ) : (
              'ЗАГРУЗИТЬ ФОТО'
            )}
          </Button>

          {photoPreview && (
            <Button
              variant='contained'
              size='classicWidthAction'
              onClick={handleRemovePhoto}
            >
              <DeleteIcon />
            </Button>
          )}
        </Box>
      </Box>

      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        display='flex'
        flexDirection='column'
        gap={theme.spacing(2)}
      >
        <FormControl error={Boolean(errors.eventType)}>
          <Controller
            name='eventType'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                disabled={isLoadingTypes}
                size='small'
              >
                <MenuItem value='' disabled>
                  Выберите тип события
                </MenuItem>
                {isLoadingTypes ? (
                  <MenuItem value=''>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : (
                  sortedEventTypes.map((type) => (
                    <MenuItem key={type.typeId} value={type.typeName}>
                      {type.typeName}
                    </MenuItem>
                  ))
                )}
              </Select>
            )}
          />
          <FormHelperText>
            {errors.eventType?.message || 'Выберите тип события'}
          </FormHelperText>
        </FormControl>

        <Controller
          name='eventName'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Название события'
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.eventName)}
              helperText={
                errors.eventName?.message || 'Введите название события'
              }
            />
          )}
        />

        <LocationAutocomplete
          value={eventLocation ?? ''}
          onChange={handleLocationChange}
          onCoordinatesChange={handleCoordinatesChange}
          error={Boolean(errors.eventLocation)}
          errorsMassage={errors.eventLocation?.message}
          placeholder='Начните вводить адрес или название места'
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name='eventStartDate'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                label='Дата начала мероприятия'
                minDate={today}
                maxDate={maxDate}
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
                    size: 'small',
                    error: !!error,
                    helperText:
                      error?.message ||
                      (field.value || ''
                        ? 'Данные введены корректно.'
                        : 'Укажите дату начала события'),
                    fullWidth: true,
                  },
                }}
                format='DD.MM.YYYY'
              />
            )}
          />

          <Controller
            name='eventStartTime'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TimePicker
                label='Время начала события'
                value={
                  field.value && field.value !== 'invalid'
                    ? dayjs(`2000-01-01T${field.value}`)
                    : null
                }
                onChange={(newTime) => {
                  if (newTime && newTime.isValid()) {
                    field.onChange(newTime.format('HH:mm'));
                  } else {
                    field.onChange(newTime === null ? '' : 'invalid');
                  }
                }}
                slots={{ openPickerButton: () => null, toolbar: () => null }}
                slotProps={{
                  textField: {
                    size: 'small',
                    error: !!error,
                    helperText:
                      error?.message || 'Укажите время начала события',
                    fullWidth: true,
                  },
                }}
                format='HH:mm'
              />
            )}
          />

          <Controller
            name='eventEndTime'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                label='Время окончания события'
                value={
                  field.value && field.value !== 'invalid'
                    ? dayjs(`2000-01-01T${field.value}`)
                    : null
                }
                onChange={(newTime) => {
                  if (newTime && newTime.isValid()) {
                    field.onChange(newTime.format('HH:mm'));
                  } else {
                    field.onChange(newTime === null ? '' : 'invalid');
                  }
                }}
                slots={{ openPickerButton: () => null, toolbar: () => null }}
                slotProps={{
                  textField: {
                    size: 'small',
                    error: !!error,
                    helperText:
                      error?.message || 'Укажите время окончания события',
                    fullWidth: true,
                  },
                }}
                format='HH:mm'
              />
            )}
          />
        </LocalizationProvider>

        <Controller
          name='countUsers'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Количество участников'
              type='number'
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: 2, max: 1000 }}
              error={Boolean(errors.countUsers)}
              helperText={
                errors.countUsers?.message || 'От 2 до 1000 участников'
              }
            />
          )}
        />

        <Controller
          name='eventDescription'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Описание'
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.eventDescription)}
              multiline
              rows={8}
              helperText={
                errors.eventDescription?.message || 'Опишите событие подробнее'
              }
            />
          )}
        />

        <Button
          type='submit'
          variant='contained'
          disabled={isFormDisabled}
          fullWidth
          size='mediumFixed'
          startIcon={
            isSubmitting || isUploadingPhoto ? null : (
              <CheckCircleOutlineOutlinedIcon />
            )
          }
        >
          {isSubmitting || isUploadingPhoto ? (
            <CircularProgress size={20} />
          ) : (
            submitButtonText
          )}
        </Button>

        <Button
          variant='outlined'
          fullWidth
          size='mediumFixed'
          onClick={onClose}
        >
          ОТМЕНА
        </Button>
      </Box>
    </Box>
  );
};
