import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, useMediaQuery, useTheme } from '@mui/material';

import { Logo } from '@shared/ui/icons';

import { StyledHeaderEventsSearch } from './Input.styled';

export const HeaderEventsSearch = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const startAdornment = isMobile ? (
    <InputAdornment position='start'>
      <Box component='img' src={Logo} alt='Logo' width={24} height={24} />
    </InputAdornment>
  ) : null;

  const endAdornment = (
    <InputAdornment position='end'>
      <SearchIcon />
    </InputAdornment>
  );

  return (
    <StyledHeaderEventsSearch
      placeholder='Search...'
      startAdornment={startAdornment}
      endAdornment={endAdornment}
    />
  );
};
