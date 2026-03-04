import { FC, useCallback, useMemo } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import EventIcon from '@mui/icons-material/Event';
import {
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { EventFormValues } from '@features/event-form';
import { useGetTypeEventsQuery } from '@shared/api';
import { dayjs } from '@shared/lib';
import { LocationAutocomplete } from '@shared/ui/location-autocomplete';

interface EventFormProps {
  form: UseFormReturn<EventFormValues>;
}

export const EventForm: FC<EventFormProps> = ({ form }) => {
  const theme = useTheme();

  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const { data: eventTypes, isLoading: isLoadingTypes } =
    useGetTypeEventsQuery();

  const eventLocation = watch('eventLocation');

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

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={theme.spacing(2)}
      width='100%'
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
              renderValue={(selected) => {
                if (!selected)
                  return (
                    <Typography color='text.secondary'>Тип события</Typography>
                  );
                return selected as string;
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
      </FormControl>

      <Controller
        name='eventName'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            size='small'
            label='Название события'
            error={Boolean(errors.eventName)}
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
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <DatePicker
              {...field}
              label='Дата начала мероприятия'
              minDate={today}
              maxDate={maxDate}
              format='DD.MM.YYYY'
              value={value && value !== 'invalid' ? dayjs(value) : null}
              onChange={(date) => {
                const formatted = date?.isValid()
                  ? date.format('YYYY-MM-DD')
                  : date === null
                    ? ''
                    : 'invalid';
                onChange(formatted);
              }}
              slots={{ openPickerIcon: EventIcon, toolbar: () => null }}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                  error: !!error,
                },
              }}
            />
          )}
        />

        <Controller
          name='eventStartTime'
          control={control}
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <TimePicker
              {...field}
              label='Время начала события'
              ampm={false}
              format='HH:mm'
              value={
                value && value !== 'invalid' ? dayjs(value, 'HH:mm') : null
              }
              onChange={(time) => {
                const formatted = time?.isValid()
                  ? time.format('HH:mm')
                  : time === null
                    ? ''
                    : 'invalid';
                onChange(formatted);
              }}
              slots={{ openPickerButton: () => null, toolbar: () => null }}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                  error: !!error,
                },
              }}
            />
          )}
        />

        <Controller
          name='eventEndTime'
          control={control}
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <TimePicker
              {...field}
              label='Время окончания'
              ampm={false}
              format='HH:mm'
              value={
                value && value !== 'invalid' ? dayjs(value, 'HH:mm') : null
              }
              minTime={
                watch('eventStartTime')
                  ? dayjs(watch('eventStartTime'), 'HH:mm')
                  : undefined
              }
              onChange={(time) => {
                const formatted = time?.isValid()
                  ? time.format('HH:mm')
                  : time === null
                    ? ''
                    : 'invalid';
                onChange(formatted);
              }}
              slots={{ openPickerButton: () => null, toolbar: () => null }}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                  error: !!error,
                },
              }}
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
            error={Boolean(errors.countUsers)}
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
            error={Boolean(errors.eventDescription)}
            multiline
          />
        )}
      />
    </Box>
  );
};
