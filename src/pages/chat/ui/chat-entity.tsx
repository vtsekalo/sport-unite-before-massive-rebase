import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

interface ChatEntityProps {
  chatTitleNode: ReactNode;
  dateNode: ReactNode;
  children: ReactNode;
  inputNode: ReactNode;
}

export const ChatEntity: FC<ChatEntityProps> = ({
  chatTitleNode,
  dateNode,
  children,
  inputNode,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box display='flex' flexDirection='column' height='100%' width='100%'>
      <Box
        display='flex'
        justifyContent='space-between'
        borderBottom={'1px solid #E3EBFF'}
        bgcolor={'#F5F8FF'}
        paddingX={'16px'}
        paddingY={'14px'}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon color='info' />
        </IconButton>
        <Box display='flex' flexDirection='column' gap='4px'>
          <Typography fontWeight={700} fontSize={'16px'}>
            Чат события
          </Typography>
          <Box display='flex' gap='10px'>
            {chatTitleNode}
          </Box>
        </Box>
        {dateNode}
      </Box>
      <Box
        gap='8px'
        paddingX='8px'
        paddingY='8px'
        height='100%'
        overflow='auto'
        display='flex'
        flexDirection='column'
      >
        {children}
      </Box>
      <Box
        display={'flex'}
        justifyContent={'end'}
        alignItems={'end'}
        height={isMobile ? '55px' : '80px'}
        borderTop={'1px solid #E3EBFF'}
        padding='8px'
      >
        {inputNode}
      </Box>
    </Box>
  );
};
