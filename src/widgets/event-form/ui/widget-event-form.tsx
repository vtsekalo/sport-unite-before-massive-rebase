import { FC } from 'react';

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from '@mui/material';

import { EventForm } from '@features/event-form';
import { useEventForm } from '@features/event-form';
import { EventFormValues } from '@features/event-form';
import { PhotoUpload } from '@features/event-photo-upload';

interface EventFormWidgetProps {
  title: string;
  submitLabel: string;
  initialValues?: Partial<EventFormValues>;
  initialPhotoUrl?: string | null;
  onSubmit: (data: EventFormValues) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EventFormWidget: FC<EventFormWidgetProps> = ({
  title,
  submitLabel,
  initialValues,
  initialPhotoUrl,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const theme = useTheme();

  const form = useEventForm(initialValues);

  const {
    handleSubmit,
    formState: { isValid, isDirty },
  } = form;

  const isFormDisabled = !isValid || !isDirty || !!isLoading;

  return (
    <Box
      display='flex'
      flexDirection='column'
      width='100%'
      maxWidth={480}
      margin='0 auto'
      padding={theme.spacing(3)}
      gap={theme.spacing(2)}
    >
      <Typography fontSize={20} fontWeight={700} textAlign='center'>
        {title}
      </Typography>

      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        display='flex'
        flexDirection='column'
        gap={theme.spacing(2)}
      >
        <PhotoUpload
          initialPreview={initialPhotoUrl}
          onChange={(file) => form.setValue('eventPhoto', file)}
        />
        <EventForm form={form} />

        <Button
          type='submit'
          variant='contained'
          disabled={isFormDisabled}
          fullWidth
          size='mediumFixed'
          startIcon={isLoading ? null : <CheckCircleOutlineOutlinedIcon />}
        >
          {isLoading ? <CircularProgress size={20} /> : submitLabel}
        </Button>

        <Button
          variant='outlined'
          fullWidth
          size='mediumFixed'
          onClick={onCancel}
        >
          ОТМЕНА
        </Button>
      </Box>
    </Box>
  );
};
