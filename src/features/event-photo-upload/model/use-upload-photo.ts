import { useState } from 'react';

export const usePhotoUpload = (initialPreview?: string | null) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialPreview ?? null,
  );

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
    setPhotoFile(file);
  };

  const handleDelete = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  return {
    photoFile,
    photoPreview,
    handleUpload,
    handleDelete,
  };
};
