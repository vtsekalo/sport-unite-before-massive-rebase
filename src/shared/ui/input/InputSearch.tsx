import { FC, ReactNode } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  InputAdornment,
  InputBaseProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Logo } from '@shared/ui/icons';

import { StyledInput, StyledInputAdornment } from './Input.styled';

type InputSearchProps = {
  onClick?: () => void;
  endIcon?: ReactNode;
  placeholder?: string;
  startIcon?: ReactNode;
} & Omit<InputBaseProps, 'placeholder' | 'startAdornment' | 'endAdornment'>;

export const InputSearch: FC<InputSearchProps> = ({
  startIcon = (
    <Box component='img' src={Logo} alt='Logo' width={24} height={24} />
  ),
  endIcon = <SearchIcon />,
  onClick,
  placeholder = 'Поиск...',
  ...rest
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const startAdornment =
    startIcon && isMobile ? (
      <InputAdornment position='start'>{startIcon}</InputAdornment>
    ) : null;

  const endAdornment = endIcon && (
    <StyledInputAdornment onClick={onClick} position='end'>
      {endIcon}
    </StyledInputAdornment>
  );

  return (
    <StyledInput
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onClick?.();
        }
      }}
      placeholder={placeholder}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      {...rest}
    />
  );
};
