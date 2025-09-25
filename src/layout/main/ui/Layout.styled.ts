import { Box } from '@mui/material';
import { styled } from '@mui/material';

export const StyledHeaderWrapper = styled(Box)`
  transform: translateX(-50%);
  @media (max-width: 600px) {
    height: 56px;
    top: 16px;
  }
`;

export const StyledFooterMobile = styled(Box)`
  @media (max-width: 600px) {
    transform: translateX(-50%);
    display: flex;
  }
`;
