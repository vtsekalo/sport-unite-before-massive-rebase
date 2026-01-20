import { FC, Ref } from 'react';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';

import { InputSearch } from '@shared/ui/input';

import { Styled } from './header.styled';

interface HeaderMobileProps {
  buttonRef: Ref<HTMLButtonElement | null>;
}

export const HeaderMobile: FC<HeaderMobileProps> = ({ buttonRef }) => {
  return (
    <Styled.HeaderWrapper width='min-content' height='56' padding='8px 8px'>
      <Stack direction='row' alignItems='center' spacing={1}>
        <InputSearch />
        <IconButton color='primary' ref={buttonRef}>
          <FilterAltIcon fontSize='medium' />
        </IconButton>
      </Stack>
    </Styled.HeaderWrapper>
  );
};
