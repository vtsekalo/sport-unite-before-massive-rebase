import { FC, ReactNode } from 'react';

import { Box, BoxProps } from '@mui/material';

interface ModalWrapperProps extends BoxProps {
  children: ReactNode;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({ children, ...props }) => {
  return (
    <Box
      bgcolor='background.paper'
      borderRadius='10px'
      boxShadow={6}
      height='100%'
      width='100%'
      maxWidth={{ xs: 361, md: 1351 }}
      display='flex'
      flexDirection='column'
      overflow='auto'
      {...props}
    >
      {children}
    </Box>
  );
};
