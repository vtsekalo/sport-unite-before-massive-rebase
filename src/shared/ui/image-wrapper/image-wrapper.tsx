import { ReactNode, useState } from 'react';

import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import { Box, BoxProps } from '@mui/material';

interface FallbackProps extends BoxProps {
  src?: string;
  children: ReactNode;
}

export const ImageWrapper = ({ src, children, ...props }: FallbackProps) => {
  const [hasError, setHasError] = useState(false);

  const isInvalid = !src || src === 'string';

  if (isInvalid || hasError) {
    return (
      <Box
        {...props}
        display='flex'
        alignItems='center'
        justifyContent='center'
        bgcolor='grey.300'
        borderRadius='10px'
      >
        <NoPhotographyIcon color='disabled' />
      </Box>
    );
  }

  return (
    <Box component='div' onError={() => setHasError(true)} display='contents'>
      {children}
    </Box>
  );
};
