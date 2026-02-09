import { ReactNode, useState } from 'react';

import BrokenImageIcon from '@mui/icons-material/BrokenImage';
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
        <BrokenImageIcon color='disabled' />
      </Box>
    );
  }

  return (
    <Box component='div' onError={() => setHasError(true)} display='contents'>
      {children}
    </Box>
  );
};
