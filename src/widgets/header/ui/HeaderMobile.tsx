import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';

import { HeaderEventsSearch } from '@shared/ui/input';

import { StyledHeaderWrapper } from './Header.styled';

export const HeaderMobile = () => {
  return (
    <StyledHeaderWrapper width='min-content' height='56' padding='8px 8px'>
      <Stack direction='row' alignItems='center' spacing={1}>
        <HeaderEventsSearch />
        <IconButton color='primary'>
          <FilterAltIcon fontSize='medium' />
        </IconButton>
      </Stack>
    </StyledHeaderWrapper>
  );
};
