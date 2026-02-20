import { ChangeEvent, FC, useCallback, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
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
import { PhotoVariant } from '@shared/lib';
import { StyledTextField } from '@shared/ui';
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
  photoMode: PhotoVariant;
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
  photoMode,
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
      maxWidth={1200}
      margin='0 auto'
      padding={isMobile ? theme.spacing(2) : theme.spacing(3)}
      gap={isMobile ? theme.spacing(2) : theme.spacing(3)}
    >
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Typography
          variant='h5'
          fontFamily='Roboto'
          fontWeight={700}
          fontSize='20px'
          textAlign='center'
          color='textSecondary'
          flex={1}
        >
          {title}
        </Typography>
      </Box>

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
          width={329}
          height={232}
          lineHeight={24}
          letterSpacing={0.15}
          overflow='hidden'
          position='relative'
          borderRadius='10px'
          bgcolor='grey.200'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          {photoPreview ? (
            <PhotoPreview src={photoPreview} alt='Event preview' />
          ) : photoMode === PhotoVariant.CREATE ? (
            <ImageIcon />
          ) : (
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              gap={1}
            >
              <ImageIcon />
              <Typography color='grey.600' variant='body2'>
                Добавить фото
              </Typography>
            </Box>
          )}
        </Box>

        <Box display='flex' gap={1}>
          <Button
            variant='contained'
            fullWidth
            startIcon={<ImageIcon />}
            onClick={handlePhotoClick}
            disabled={isUploadingPhoto}
          >
            {isUploadingPhoto ? 'Загрузка...' : 'ЗАГРУЗИТЬ ФОТО'}
          </Button>

          <Box>
            {photoPreview && (
              <Button variant='classicWidthAction' onClick={handleRemovePhoto}>
                <DeleteIcon />
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        display='flex'
        flexDirection='column'
        gap={theme.spacing(2.5)}
      >
        <Box
          display='flex'
          width={329}
          height={41}
          flexDirection='column'
          gap='4px'
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
                  renderValue={(selected) => {
                    if (!selected || selected === '') {
                      return (
                        <Typography color='text.disabled'>
                          Тип события
                        </Typography>
                      );
                    }
                    return selected;
                  }}
                >
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
            {errors.eventType && (
              <Typography variant='caption' color='error'>
                {errors.eventType.message}
              </Typography>
            )}
          </FormControl>
        </Box>

        <Box display='flex' flexDirection='column' gap='4px'>
          <Controller
            name='eventName'
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                label='Название события'
                variant='outlined'
                placeholder='Введите название события'
                error={Boolean(errors.eventName)}
                fullWidth
              />
            )}
          />
          {errors.eventName && (
            <Typography variant='caption' color='error'>
              {errors.eventName.message}
            </Typography>
          )}
        </Box>

        <Box display='flex' flexDirection='column' gap='4px'>
          <LocationAutocomplete
            value={eventLocation ?? ''}
            onChange={handleLocationChange}
            onCoordinatesChange={handleCoordinatesChange}
            error={Boolean(errors.eventLocation)}
            helperText={errors.eventLocation?.message}
            placeholder='Начните вводить адрес или название места'
          />
        </Box>

        <Box display='flex' flexDirection='column' gap='4px'>
          <Controller
            name='eventStartDate'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Дата начала мероприятия'
                type='date'
                error={Boolean(errors.eventStartDate)}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Typography variant='caption' color='textSecondary'>
            Укажите дата начала события.
          </Typography>
          {errors.eventStartDate && (
            <Typography variant='caption' color='error'>
              {errors.eventStartDate.message}
            </Typography>
          )}
        </Box>

        <Box display='flex' flexDirection='column' gap='4px'>
          <Controller
            name='eventStartTime'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Время начала события'
                type='time'
                error={Boolean(errors.eventStartTime)}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Typography variant='caption' color='textSecondary'>
            Укажите время начала события.
          </Typography>
          {errors.eventStartTime && (
            <Typography variant='caption' color='error'>
              {errors.eventStartTime.message}
            </Typography>
          )}
        </Box>

        <Box display='flex' flexDirection='column' gap='4px'>
          <Controller
            name='eventEndDate'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Дата окончания события'
                type='date'
                error={Boolean(errors.eventEndDate)}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          {errors.eventEndDate && (
            <Typography variant='caption' color='error'>
              {errors.eventEndDate.message}
            </Typography>
          )}
        </Box>

        <Box display='flex' flexDirection='column' gap='4px'>
          <Controller
            name='eventEndTime'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Время окончания события'
                type='time'
                error={Boolean(errors.eventEndTime)}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          {errors.eventEndTime && (
            <Typography variant='caption' color='error'>
              {errors.eventEndTime.message}
            </Typography>
          )}
        </Box>

        <Box display='flex' flexDirection='column' gap='4px'>
          <Controller
            name='countUsers'
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                label='Количество участников'
                type='number'
                error={Boolean(errors.countUsers)}
                inputProps={{ min: 2, max: 1000 }}
              />
            )}
          />
          {errors.countUsers && (
            <Typography variant='caption' color='error'>
              {errors.countUsers.message}
            </Typography>
          )}
        </Box>

        <Box display='flex' flexDirection='column' gap='4px'>
          <Controller
            name='eventDescription'
            control={control}
            render={({ field }) => (
              <StyledTextField
                {...field}
                label='Описание'
                placeholder='Опишите событие подробнее'
                error={Boolean(errors.eventDescription)}
                multiline
                rows={6}
              />
            )}
          />
          {errors.eventDescription && (
            <Typography variant='caption' color='error'>
              {errors.eventDescription.message}
            </Typography>
          )}
        </Box>

        <Box display='flex' flexDirection='column' gap={theme.spacing(2)}>
          <Button
            type='submit'
            variant='contained'
            disabled={isFormDisabled}
            fullWidth
            startIcon={
              isSubmitting || isUploadingPhoto ? null : (
                <CheckCircleOutlineIcon />
              )
            }
          >
            {isSubmitting || isUploadingPhoto ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              submitButtonText
            )}
          </Button>

          <Button variant='outlined' fullWidth onClick={onClose}>
            ОТМЕНА
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
