import { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
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

import { useGetTypeEventsQuery } from '@shared/api';
import { showSnackbar } from '@shared/lib';
import { CreateEventFormData, createEventSchema } from '@shared/lib';
import { EventFormInitialData } from '@shared/lib';
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

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);
  const formattedToday = today.toISOString().split('T')[0];
  const formattedMaxDate = maxDate.toISOString().split('T')[0];

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

      if (file.size > 5 * 1024 * 1024) {
        showSnackbar('Размер файла не должен превышать 5 МБ', 'error');
        return;
      }

      const supportedFormats = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/webp',
      ];

      if (!supportedFormats.includes(file.type)) {
        showSnackbar(
          'Поддерживаются только изображения (jpg, jpeg, png, webp)',
          'error',
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const handleRemovePhoto = useCallback(() => {
    setPhotoPreview(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

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

      {/* Фото */}
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
            <Button size='classicWidthAction' onClick={handleRemovePhoto}>
              <DeleteIcon />
            </Button>
          )}
        </Box>
      </Box>

      {/* Форма */}
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        display='flex'
        flexDirection='column'
        gap={theme.spacing(2)}
      >
        {/* Тип события */}
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

        {/* Название */}
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

        {/* Место проведения */}
        <LocationAutocomplete
          value={eventLocation ?? ''}
          onChange={handleLocationChange}
          onCoordinatesChange={handleCoordinatesChange}
          error={Boolean(errors.eventLocation)}
          errorsMassage={errors.eventLocation?.message}
          placeholder='Начните вводить адрес или название места'
        />

        {/* Дата начала */}
        <Controller
          name='eventStartDate'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Дата начала мероприятия'
              type='date'
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: formattedToday,
                max: formattedMaxDate,
              }}
              error={Boolean(errors.eventStartDate)}
              helperText={
                errors.eventStartDate?.message || 'Укажите дату начала события'
              }
            />
          )}
        />

        {/* Время начала */}
        <Controller
          name='eventStartTime'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Время начала события'
              type='time'
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.eventStartTime)}
              helperText={
                errors.eventStartTime?.message || 'Укажите время начала события'
              }
            />
          )}
        />

        {/* TODO: вернуть когда пользователь сможет выбирать дату окончания (до МВП отложено)
        <Controller
          name='eventEndDate'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Дата окончания события'
              type='date'
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.eventEndDate)}
              helperText={
                errors.eventEndDate?.message || 'Укажите дату окончания события'
              }
            />
          )}
        /> */}

        {/* Время окончания */}
        <Controller
          name='eventEndTime'
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size='small'
              label='Время окончания события'
              type='time'
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.eventEndTime)}
              helperText={
                errors.eventEndTime?.message ||
                'Должно быть после времени начала'
              }
            />
          )}
        />

        {/* Количество участников */}
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

        {/* Описание */}
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

        {/* Кнопки */}
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
