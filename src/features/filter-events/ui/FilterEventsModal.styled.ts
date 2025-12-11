import styled from '@emotion/styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  List,
  Popover,
  Slider,
  Stack,
  TextField,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const MainPopover = styled(Popover)`
  & .MuiPopover-paper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 320px;
    height: 264px;
    border-radius: 10px;
    padding: 24px;
    transform: translateY(28px) !important;
  }

  @media (max-width: 600px) {
    & .MuiPopover-paper {
      transform: translateY(14px) translateX(14px) !important;
    }
  }
`;

const SportPopover = styled(Popover)`
  & .MuiPopover-paper {
    width: 320px;
    height: 478px;
    border-radius: 10px;
    padding: 24px 16px;
    transform: translateY(-24px) translateX(30px) !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: 600px) {
    & .MuiPopover-paper {
      height: 534px;
      transform: translateY(-22px) translateX(24px) !important;
    }
  }
`;

const DatePopover = styled(Popover)`
  & .MuiPopover-paper {
    width: 320px;
    height: 470px;
    border-radius: 10px;
    padding: 16px;
    transform: translateX(30px) !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: 600px) {
    & .MuiPopover-paper {
      padding: 24px 16px;
      height: 542px;
      transform: translateY(-80px) translateX(24px) !important;
    }
  }
`;

const LocationPopover = styled(Popover)`
  & .MuiPopover-paper {
    width: 320px;
    height: 226px;
    border-radius: 10px;
    padding: 16px;
    transform: translateX(30px) !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media (max-width: 600px) {
    & .MuiPopover-paper {
      height: 274px;
      transform: translateY(-135px) translateX(24px) !important;
    }
  }
`;

const MainStack = styled(Stack)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonStack = styled(Stack)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SportContainer = styled(Stack)`
  width: 288px;
  height: 318px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SportButtonStack = styled(Stack)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DateButtonStack = styled(Stack)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const LocationButtonStack = styled(Stack)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FilterButton = styled(Button)`
  width: 272px;
  min-height: 40px;
  max-height: 40px;
  border-radius: 10px;
  text-transform: uppercase;
  padding: 0;
  justify-content: flex-end;

  &:hover {
    background-color: rgba(54, 119, 255, 0.3);
  }
`;

const BackButton = styled(Button)`
  width: 100%;
  min-height: 40px;
  max-height: 40px;
  border-radius: 10px;
  text-transform: uppercase;
  padding: 0;
  justify-content: flex-start;

  &:hover {
    background-color: rgba(54, 119, 255, 0.3);
  }
`;

const PrimaryButton = styled(Button)`
  width: 220px;
  min-height: 40px;
  max-height: 40px;
  border-radius: 10px;
  text-transform: uppercase;
  padding: 0;

  &:hover {
    background-color: #1565c0;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: #0000001f;
    color: #00000061;
  }
`;

const SportResetButton = styled(Button)`
  width: 184px;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  text-transform: uppercase;
`;

const SportApplyButton = styled(Button)`
  width: 184px;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  text-transform: uppercase;
  white-space: nowrap;
`;

const DateResetButton = styled(Button)`
  width: 184px;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  text-transform: uppercase;
  white-space: nowrap;
`;

const DateApplyButton = styled(Button)`
  width: 184px;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  text-transform: uppercase;
  white-space: nowrap;
`;

const LocationResetButton = styled(Button)`
  width: 184px;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  text-transform: uppercase;
  white-space: nowrap;
`;

const LocationApplyButton = styled(Button)`
  width: 184px;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  text-transform: uppercase;
  white-space: nowrap;
`;

const SearchField = styled(TextField)`
  & .MuiOutlinedInput-notchedOutline {
    border-color: #3677ffb2;
    opacity: 0.7;
  }

  & .MuiOutlinedInput-root {
    border-radius: 10px;
    border-color: #3677ffb2;

    &:hover fieldset {
      border-color: #3677ffb2;
    }

    &.Mui-focused fieldset {
      border-color: #3677ffb2;
    }

    & .MuiInputBase-input::placeholder {
      color: #3677ffb2;
      opacity: 0.5;
    }
  }
`;

const SportList = styled(List)`
  max-height: 400px;
  overflow: auto;

  & .MuiListItem-root {
    padding: 6.4px 24px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }

  @media (max-width: 600px) {
    & .MuiListItem-root {
      padding: 8px 16px;
    }
  }
`;

const NoSportsBox = styled(Box)`
  padding: 2px;
  text-align: center;
`;

const RadiusSlider = styled(Slider)`
  color: #1976d2;
`;

const SliderContainer = styled(Box)``;

const SliderHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SliderLabels = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 1px;
`;

const FilterDialog = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 16px;
    min-height: 600px;
  }

  @media (max-width: 600px) {
    & .MuiDialog-paper {
      margin: 16px;
      width: calc(100% - 32px);
      min-height: 500px;
    }
  }
`;

const DialogTitle = styled(Box)`
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const SportDialog = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 16px;
  }

  @media (max-width: 600px) {
    & .MuiDialog-paper {
      margin: 16px;
      width: calc(100% - 32px);
    }
  }
`;

const LocationDialog = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 16px;
  }

  @media (max-width: 600px) {
    & .MuiDialog-paper {
      margin: 16px;
      width: calc(100% - 32px);
    }
  }
`;

const ArrowIcon = styled(ArrowForwardIosIcon)`
  width: 16px;
  height: 16px;
  margin: 0 16px 0 8px;
`;

const ArrowIconRotate = styled(ArrowForwardIosIcon)`
  width: 16px;
  height: 16px;
  margin: 0 16px 0 8px;
  transform: rotate(180deg);
`;

const SportSearchIcon = styled(SearchIcon)`
  color: #1976d2;
  opacity: 0.6;
`;

const SportDataCalendar = styled(DateCalendar)`
  height: 358px;
  width: 100%;
`;
const SportFormControlLabel = styled(FormControlLabel)`
  width: 100%;
  margin: 0;
`;

export const Styled = {
  MainPopover,
  SportPopover,
  DatePopover,
  LocationPopover,
  MainStack,
  ButtonStack,
  SportContainer,
  SportButtonStack,
  DateButtonStack,
  LocationButtonStack,
  FilterButton,
  PrimaryButton,
  SportResetButton,
  SportApplyButton,
  DateResetButton,
  DateApplyButton,
  LocationResetButton,
  LocationApplyButton,
  SearchField,
  SportList,
  NoSportsBox,
  RadiusSlider,
  SliderContainer,
  SliderHeader,
  SliderLabels,
  FilterDialog,
  DialogTitle,
  SportDialog,
  LocationDialog,
  ArrowIcon,
  BackButton,
  ArrowIconRotate,
  SportSearchIcon,
  SportDataCalendar,
  SportFormControlLabel,
};
