import { Box, Button, Container, Typography, styled } from '@mui/material';

const MainBox = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

const Tooltip = styled(Typography)`
  display: block;
`;

const FormStack = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 480px;
  border-radius: 7px;
  padding: 24px 32px;
  background-color: #ffffff;

  @media (max-width: 900px) {
    width: 360px;
    padding: 16px;
    gap: 8px;
  }
`;
const TitleForms = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.15px;
`;

const InputContainer = styled(Box)`
  min-height: 79px;

  @media (max-width: 900px) {
    min-height: 64px;
  }
`;

const FlagContainer = styled(Box)`
  min-height: 65px;
  padding-left: 12px;
  @media (max-width: 900px) {
    min-height: 82px;
  }
`;
const RegistrationButton = styled(Button)`
  height: 56px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 26px;
  letter-spacing: 0.46px;
  @media (max-width: 900px) {
    height: 40px;
  }
`;

export const Styled = {
  FormContainer,
  TitleForms,
  InputContainer,
  FlagContainer,
  RegistrationButton,
  FormStack,
  MainBox,
  Tooltip,
};
