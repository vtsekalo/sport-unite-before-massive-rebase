import { ChangeEvent, FC, useRef } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Button } from '@mui/material';

import { usePhotoUpload } from '../model/use-upload-photo';

interface PhotoUploadProps {
  onChange: (file: File | null) => void;
  initialPreview?: string | null;
}

export const PhotoUpload: FC<PhotoUploadProps> = ({
  onChange,
  initialPreview,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { photoPreview, handleUpload, handleDelete } =
    usePhotoUpload(initialPreview);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    handleUpload(file);
    onChange(file);
  };

  const handleRemove = () => {
    handleDelete();
    onChange(null);
  };

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <input
        ref={fileInputRef}
        type='file'
        hidden
        accept='image/jpeg,image/jpg,image/png,image/webp'
        onChange={handleFileChange}
      />
      <Box
        height={232}
        overflow='hidden'
        borderRadius='10px'
        bgcolor='grey.100'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        {photoPreview ? (
          <Box
            component='img'
            src={photoPreview}
            alt='preview'
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <ImageIcon fontSize='large' color='disabled' />
        )}
      </Box>
      <Box display='flex' gap={1}>
        <Button
          variant='contained'
          fullWidth
          startIcon={<ImageIcon />}
          onClick={() => fileInputRef.current?.click()}
          size='mediumFixed'
        >
          ЗАГРУЗИТЬ ФОТО
        </Button>
        {photoPreview && (
          <Button
            variant='contained'
            size='classicWidthAction'
            onClick={handleRemove}
          >
            <DeleteIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
};
