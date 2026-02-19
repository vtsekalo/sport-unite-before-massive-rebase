import { ReactNode, useState } from 'react';

import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import { Box, BoxProps } from '@mui/material';

enum FontSizeType {
  INHERIT = 'inherit',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface FallbackProps extends BoxProps {
  src?: string;
  children: ReactNode;
  borderRadius?: BoxProps['borderRadius'];
  fontSize?: FontSizeType | number;
}

export const ImageWrapper = ({
  src,
  children,
  borderRadius = '10px',
  fontSize = 30,
  ...props
}: FallbackProps) => {
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
        borderRadius={borderRadius}
      >
        <NoPhotographyIcon
          color='disabled'
          sx={{
            fontSize: { fontSize },
          }}
        />
      </Box>
    );
  }

  return (
    <Box component='div' onError={() => setHasError(true)} display='contents'>
      {children}
    </Box>
  );
};
