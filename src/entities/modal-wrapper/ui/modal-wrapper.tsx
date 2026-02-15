import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, BoxProps, Button, IconButton } from '@mui/material';

interface ModalWrapperProps extends BoxProps {
  children: ReactNode;
  showBackButton?: boolean;
  showBackEmptyButton?: boolean;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  showBackButton,
  showBackEmptyButton,
  ...props
}) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate(-1);
  };

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
      {showBackEmptyButton && (
        <Box
          position='absolute'
          top={{ xs: 16, md: 40 }}
          left={{ xs: 16, md: 40 }}
          zIndex={10}
        >
          <IconButton>
            <ArrowBackIcon onClick={handleCloseModal} color='primary' />
          </IconButton>
        </Box>
      )}
      {showBackButton && (
        <Box position='absolute' top={16} left={16} zIndex={10}>
          <Button variant={'classicWidthAction'}>
            <ArrowBackIcon onClick={handleCloseModal} />
          </Button>
        </Box>
      )}
      {children}
    </Box>
  );
};
