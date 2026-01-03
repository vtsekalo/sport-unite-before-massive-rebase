import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type IconProps = BoxProps & {
  src?: string;
  alt?: string;
};

const Icon = styled(Box)<IconProps>(() => ({
  filter: 'brightness(0) invert(1)',
}));

export const Styled = {
  Icon,
};
