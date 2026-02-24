import { FC } from 'react';

import { Typography, useMediaQuery, useTheme } from '@mui/material';

import { NoEventsIcon } from '@shared/assets';
import { useEventSearch } from '@shared/lib';

import { Styled } from './no-events-modal.styled';

export const NoEventsModal: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { hasAppliedFilters, resetFilters } = useEventSearch();

  return (
    <Styled.ModalContent>
      <Styled.IconWrapper>
        <img src={NoEventsIcon} alt='Событий не найдено' />
      </Styled.IconWrapper>

      <Typography
        variant='body1'
        fontWeight={400}
        fontSize={isMobile ? 14 : 16}
        letterSpacing='0.15px'
        textAlign='center'
      >
        Событий не найдено.
      </Typography>

      {hasAppliedFilters && (
        <Styled.ResetButton
          variant='contained'
          size='fullWidthAction'
          onClick={resetFilters}
        >
          СБРОСИТЬ ФИЛЬТРЫ
        </Styled.ResetButton>
      )}
    </Styled.ModalContent>
  );
};
