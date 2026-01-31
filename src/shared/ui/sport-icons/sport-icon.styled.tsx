import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type IconProps = BoxProps & {
  src?: string;
  alt?: string;
  invert?: boolean;
};

const Icon = styled(Box)<IconProps>(({ invert }) => ({
  ...(invert && {
    filter: 'brightness(0) invert(1)',
  }),
}));

export const Styled = {
  Icon,
};
