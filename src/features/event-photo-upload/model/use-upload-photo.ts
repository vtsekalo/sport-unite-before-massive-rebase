import { useState } from 'react';

export const usePhotoUpload = (initialPreview?: string | null) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialPreview ?? null,
  );

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    setPhotoPreview(null);
  };

  return {
    photoPreview,
    handleUpload,
    handleDelete,
  };
};
