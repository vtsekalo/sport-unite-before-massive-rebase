import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';

import { HeaderEventsSearch } from '@shared/ui/input';

import { StyledHeaderWrapper } from './Header.styled';

export const HeaderMobile = () => {
  return (
    <StyledHeaderWrapper
      position='absolute'
      alignItems='center'
      display='flex'
      justifyContent='center'
      top='24px'
      left='50%'
      borderRadius='10px'
      minWidth='300px'
      maxWidth='95%'
      width='min-content'
      height='56'
      padding='8px 8px'
      boxShadow={`0px 3px 5px -1px #00000033;
              0px 6px 10px 0px #00000024;
              0px 1px 18px 0px #0000001F;`}
    >
      <Stack direction='row' alignItems='center' spacing={1}>
        <HeaderEventsSearch />
        <IconButton color='primary'>
          <FilterAltIcon fontSize='medium' />
        </IconButton>
      </Stack>
    </StyledHeaderWrapper>
  );
};
