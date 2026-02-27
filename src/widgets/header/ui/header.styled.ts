import { Box, BoxProps, IconButton, styled } from '@mui/material';

const HeaderWrapper = styled(Box)(() => ({
  position: 'absolute',
  zIndex: 20,
  top: '24px',
}));

type LogoProps = BoxProps & {
  src?: string;
  alt?: string;
};

const FilterButton = styled(IconButton)`
  border-radius: 10px;
  &.active {
    background-color: #3677ff4d;
  }
`;

const LogoWrapper = styled(Box)<LogoProps>(() => ({
  cursor: 'pointer',
}));

export const Styled = {
  HeaderWrapper,
  FilterButton,
  LogoWrapper,
};
