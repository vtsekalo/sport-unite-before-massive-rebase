import styled from 'styled-components';

import { Box, BoxProps } from '@mui/material';

type IconProps = BoxProps & {
  src?: string;
  alt?: string;
  $filter: boolean;
};

const Icon = styled(Box)<IconProps>`
  filter: ${(props) => (props.$filter ? 'brightness(0) invert(1)' : 'none')};
  user-select: none;
`;

export const Styled = {
  Icon,
};
