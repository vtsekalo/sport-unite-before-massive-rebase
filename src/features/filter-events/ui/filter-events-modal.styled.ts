import styled from '@emotion/styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  FormControlLabel,
  List,
  Popover,
  Slider,
  TextField,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const MainPopover = styled(Popover)`
  & .MuiPopover-paper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    border-radius: 10px;
    padding: 24px;
    margin-top: 16px;
  }
`;

const FilterSectionButton = styled(Button)`
  width: 100%;
  padding: 0;
  justify-content: center;
  gap: 14px;

  &:not(:first-of-type) {
    margin-top: 8px;
  }
  &:hover {
    background-color: #3677ff4d;
  }
  &.opened {
    background-color: #3677ff4d;
    & .MuiSvgIcon-root {
      transform: rotate(-90deg);
    }
  }
`;

const ActionButton = styled(Button)`
  &:hover {
    background-color: #1565c0;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
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
`;

const ArrowIcon = styled(ArrowForwardIosIcon)`
  width: 16px;
  height: 16px;
  transform: rotate(90deg);
  transition: transform 0.3s ease;
`;

const SportSearchIcon = styled(SearchIcon)`
  opacity: 0.5;
`;

const SportDataCalendar = styled(DateCalendar)`
  width: 100%;
  height: auto;

  & .MuiPickersCalendarHeader-root {
    padding: 0;
    margin: 16px 0 8px;
  }
  & .MuiPickersDay-dayOutsideMonth {
    pointer-events: none;
    color: rgba(0, 0, 0, 0.38);
  }
  & .MuiDayCalendar-weekDayLabel {
    font-size: 14px;
    margin-bottom: 8px;
  }
  & .MuiDayCalendar-root {
    margin-bottom: 18px;
  }
  & .MuiPickersDay-root {
    font-size: 14px;
  }
  & .MuiPickersArrowSwitcher-spacer {
    width: 34px;
  }

  & .MuiDayCalendar-monthContainer {
    position: relative;
  }
  & .MuiDayCalendar-slideTransition {
    min-height: fit-content;
  }
`;

const SportFormControlLabel = styled(FormControlLabel)`
  width: 100%;
  margin: 0;
  padding: 6px 16px;

  &:has(.Mui-checked) {
    background-color: rgba(54, 119, 255, 0.04);
  }
`;

export const RadiusSlider = styled(Slider)(() => ({
  height: 6,

  '& .MuiSlider-rail': {
    height: 4,
    borderRadius: 2,
  },

  '& .MuiSlider-track': {
    height: 6,
    borderRadius: 3,
  },

  '& .MuiSlider-thumb': {
    width: 20,
    height: 20,
  },
}));

export const Styled = {
  MainPopover,
  FilterSectionButton,
  ActionButton,
  SearchField,
  SportList,
  ArrowIcon,
  SportSearchIcon,
  SportDataCalendar,
  SportFormControlLabel,
  RadiusSlider,
};
