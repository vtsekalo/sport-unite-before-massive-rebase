import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, BoxProps, IconButton } from '@mui/material';

interface ModalWrapperProps extends BoxProps {
  children: ReactNode;
  showBackButton?: boolean;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  showBackButton,
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <Box
      position='relative'
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
      {showBackButton && (
        <Box
          position='absolute'
          top={{ xs: 16, md: 40 }}
          left={{ xs: 16, md: 40 }}
          zIndex={10}
        >
          <IconButton>
            <ArrowBackIcon onClick={() => navigate(-1)} color='primary' />
          </IconButton>
        </Box>
      )}
      {children}
    </Box>
  );
};
