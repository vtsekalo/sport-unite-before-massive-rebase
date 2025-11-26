// src/entities/query-info/ui/QueryInfo.tsx
import React from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

type QueryInfoProps = {
  type: 'loading' | 'error';
  title?: string;
};

export const QueryInfo: React.FC<QueryInfoProps> = ({
  type,
  title = type === 'loading' ? 'Загрузка...' : 'Произошла ошибка',
}) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100%'
      width='100%'
    >
      {type === 'loading' ? (
        <CircularProgress />
      ) : (
        <Typography>{title}</Typography>
      )}
    </Box>
  );
};
