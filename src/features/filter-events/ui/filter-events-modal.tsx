import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Checkbox,
  InputAdornment,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { IEventType, useEventSearch, useEventTypes } from '@shared/lib';
import { setFilterRange } from '@shared/store';

import { Styled } from './filter-events-modal.styled';

interface FilterEventsModalProps {
  buttonRef: HTMLButtonElement | null;
}

export const FilterEventsModal: React.FC<FilterEventsModalProps> = ({
  buttonRef,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const eventsByFilter = useEventSearch();
  const { eventTypes } = useEventTypes();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [sportAnchorEl, setSportAnchorEl] = useState<HTMLElement | null>(null);
  const [dateAnchorEl, setDateAnchorEl] = useState<HTMLElement | null>(null);
  const [locationAnchorEl, setLocationAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const sportButtonRef = useRef<HTMLButtonElement | null>(null);
  const dateButtonRef = useRef<HTMLButtonElement | null>(null);
  const locationButtonRef = useRef<HTMLButtonElement | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSports, setSelectedSports] = useState<string[]>(
    () => eventsByFilter.filters.eventTypes || [],
  );
  const [radius, setRadius] = useState<number>(5);
  const [dateValue, setDateValue] = useState<Dayjs | null>(() =>
    eventsByFilter.filters.eventStartDate
      ? dayjs(eventsByFilter.filters.eventStartDate)
      : null,
  );

  useEffect(() => {
    const button = buttonRef;
    if (!button) return;

    const handleClick = () => setAnchorEl(button);
    button.addEventListener('click', handleClick);
    return () => button.removeEventListener('click', handleClick);
  }, [buttonRef]);

  const handleSportClick = () => setSportAnchorEl(sportButtonRef.current);
  const handleDateClick = () => setDateAnchorEl(dateButtonRef.current);
  const handleLocationClick = () =>
    setLocationAnchorEl(locationButtonRef.current);

  const closeMain = () => setAnchorEl(null);
  const closeSport = () => setSportAnchorEl(null);
  const closeDate = () => setDateAnchorEl(null);
  const closeLocation = () => setLocationAnchorEl(null);

  const handleApplyDate = useCallback(() => {
    const dateString = dateValue
      ? `${dateValue.format('YYYY-MM-DD')}T00:00:00.000Z`
      : undefined;

    eventsByFilter.setStartDateTime(dateString);
    closeDate();
    closeMain();
  }, [dateValue, eventsByFilter]);

  const handleResetDate = useCallback(() => {
    eventsByFilter.setStartDateTime(undefined);
    setDateValue(null);
    closeDate();
    closeMain();
  }, [eventsByFilter]);

  const handleToggleSport = useCallback((sportId: string) => {
    setSelectedSports((prev) =>
      prev.includes(sportId)
        ? prev.filter((id) => id !== sportId)
        : [...prev, sportId],
    );
  }, []);

  const handleApplySport = useCallback(() => {
    const sportNames = selectedSports.map((id) => {
      const sport = eventTypes.find((s) => s.typeId.toString() === id);
      return sport ? sport.typeName : id;
    });
    eventsByFilter.setTypes(sportNames.length > 0 ? sportNames : undefined);
    closeSport();
    closeMain();
  }, [selectedSports, eventsByFilter, eventTypes]);

  const handleResetSport = useCallback(() => {
    eventsByFilter.setTypes(undefined);
    setSelectedSports([]);
    setSearchTerm('');
    closeSport();
    closeMain();
  }, [eventsByFilter]);

  const handleApplyLocation = useCallback(() => {
    dispatch(setFilterRange({ range: radius * 1000, fromUser: true }));
    closeLocation();
    closeMain();
  }, [radius, dispatch]);

  const handleResetLocation = useCallback(() => {
    dispatch(setFilterRange({ range: undefined, fromUser: false }));
    setRadius(5);
    closeLocation();
    closeMain();
  }, [dispatch]);

  const handleSliderChange = useCallback(
    (_: Event, value: number | number[]) => {
      if (typeof value === 'number') setRadius(value);
    },
    [],
  );

  const handleResetAll = useCallback(() => {
    eventsByFilter.resetFilters();
    setSelectedSports([]);
    setDateValue(null);
    setRadius(5);
    setSearchTerm('');
    closeMain();
  }, [eventsByFilter]);

  const formatDisplayValue = useCallback((value: number) => `${value} км`, []);

  const filteredSports = eventTypes.filter((sport) =>
    sport.typeName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Styled.MainPopover
        open={Boolean(anchorEl)}
        anchorEl={buttonRef}
        onClose={closeMain}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Styled.MainStack>
          <Styled.FilterButton
            ref={sportButtonRef}
            color='primary'
            variant='outlined'
            onClick={handleSportClick}
          >
            КАТЕГОРИИ СПОРТА
            <Styled.ArrowIcon />
          </Styled.FilterButton>

          <Styled.FilterButton
            ref={dateButtonRef}
            color='primary'
            variant='outlined'
            onClick={handleDateClick}
          >
            ДАТА И ВРЕМЯ
            <Styled.ArrowIcon />
          </Styled.FilterButton>

          <Styled.FilterButton
            ref={locationButtonRef}
            color='primary'
            variant='outlined'
            onClick={handleLocationClick}
          >
            МЕСТО И УДАЛЕННОСТЬ
            <Styled.ArrowIcon />
          </Styled.FilterButton>
        </Styled.MainStack>
        <Styled.PrimaryButton
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleResetAll}
        >
          Сбросить все фильтры
        </Styled.PrimaryButton>
      </Styled.MainPopover>

      <Styled.SportPopover
        open={Boolean(sportAnchorEl)}
        anchorEl={sportButtonRef.current}
        onClose={closeSport}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isMobile ? 'right' : 'left',
        }}
      >
        {isMobile && (
          <Styled.BackButton
            color='primary'
            variant='outlined'
            onClick={closeSport}
          >
            <Styled.ArrowIconRotate />
            КАТЕГОРИИ СПОРТА
          </Styled.BackButton>
        )}
        <Styled.SportContainer>
          <Styled.SearchField
            fullWidth
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size='small'
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    <Styled.SportSearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            variant='outlined'
          />

          <Styled.SportList>
            {filteredSports.length > 0 ? (
              filteredSports.map((sport: IEventType) => (
                <ListItem key={sport.typeId} dense disablePadding>
                  <Styled.SportFormControlLabel
                    control={
                      <Checkbox
                        checked={selectedSports.includes(
                          sport.typeId.toString(),
                        )}
                        onChange={() =>
                          handleToggleSport(sport.typeId.toString())
                        }
                        color='primary'
                        size='medium'
                      />
                    }
                    label={sport.typeName}
                  />
                </ListItem>
              ))
            ) : (
              <Styled.NoSportsBox>
                <Typography variant='body1' color='textSecondary'>
                  Виды спорта не найдены
                </Typography>
              </Styled.NoSportsBox>
            )}
          </Styled.SportList>
        </Styled.SportContainer>

        <Styled.SportButtonStack spacing={2}>
          <Styled.SportResetButton
            onClick={handleResetSport}
            variant='contained'
            color='primary'
          >
            Сбросить
          </Styled.SportResetButton>

          <Styled.SportApplyButton
            onClick={handleApplySport}
            variant='contained'
            color='primary'
          >
            Показать события
          </Styled.SportApplyButton>
        </Styled.SportButtonStack>
      </Styled.SportPopover>

      <Styled.DatePopover
        open={Boolean(dateAnchorEl)}
        anchorEl={dateButtonRef.current}
        onClose={closeDate}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isMobile ? 'right' : 'left',
        }}
        disableRestoreFocus
      >
        {isMobile && (
          <Styled.BackButton
            color='primary'
            variant='outlined'
            onClick={closeDate}
          >
            <Styled.ArrowIconRotate />
            ДАТА И ВРЕМЯ
          </Styled.BackButton>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
          <Styled.SportDataCalendar value={dateValue} onChange={setDateValue} />
        </LocalizationProvider>
        <Styled.DateButtonStack spacing={2}>
          <Styled.DateResetButton
            onClick={handleResetDate}
            variant='contained'
            color='primary'
          >
            Сбросить
          </Styled.DateResetButton>

          <Styled.DateApplyButton
            onClick={handleApplyDate}
            variant='contained'
            color='primary'
          >
            Показать события
          </Styled.DateApplyButton>
        </Styled.DateButtonStack>
      </Styled.DatePopover>

      <Styled.LocationPopover
        open={Boolean(locationAnchorEl)}
        anchorEl={locationButtonRef.current}
        onClose={closeLocation}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isMobile ? 'right' : 'left',
        }}
      >
        {isMobile && (
          <Styled.BackButton
            color='primary'
            variant='outlined'
            onClick={closeLocation}
          >
            <Styled.ArrowIconRotate />
            МЕСТО И УДАЛЕННОСТЬ
          </Styled.BackButton>
        )}
        <Styled.SliderContainer>
          <Styled.SliderHeader>
            <Typography variant='body1' fontWeight={500}>
              Радиус поиска
            </Typography>
            <Typography variant='body1' fontWeight={600} color='primary'>
              {radius} км
            </Typography>
          </Styled.SliderHeader>

          <Styled.RadiusSlider
            size='small'
            aria-label='Small'
            value={radius}
            onChange={handleSliderChange}
            min={0}
            max={50}
            step={0.5}
            valueLabelDisplay='auto'
            valueLabelFormat={formatDisplayValue}
          />

          <Styled.SliderLabels>
            <Typography variant='body1' fontWeight={500} color='textSecondary'>
              0 км
            </Typography>
            <Typography variant='body1' fontWeight={500} color='textSecondary'>
              50 км
            </Typography>
          </Styled.SliderLabels>
        </Styled.SliderContainer>

        <Styled.LocationButtonStack spacing={2}>
          <Styled.LocationResetButton
            onClick={handleResetLocation}
            variant='contained'
            color='primary'
          >
            Сбросить
          </Styled.LocationResetButton>

          <Styled.LocationApplyButton
            onClick={handleApplyLocation}
            variant='contained'
            color='primary'
          >
            Показать события
          </Styled.LocationApplyButton>
        </Styled.LocationButtonStack>
      </Styled.LocationPopover>
    </>
  );
};
