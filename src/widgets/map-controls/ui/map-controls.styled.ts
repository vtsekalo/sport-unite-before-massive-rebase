import { Box, IconButton, styled } from '@mui/material';

const ControlsWrapper = styled(Box)`
  transform: translateY(-50%);
`;

const ControlsButton = styled(IconButton)`
  width: 48px;
  height: 48px;
  border-radius: 0;

  &:disabled {
    opacity: 0.5;
  }
`;

export const Styled = {
  ControlsWrapper,
  ControlsButton,
};
