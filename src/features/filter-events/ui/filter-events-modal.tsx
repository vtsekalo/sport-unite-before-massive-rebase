import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

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

import { useGetTypeEventsQuery } from '@shared/api';
import { IEventType, ROUTES, useEventSearch } from '@shared/lib';
import {
  resetCustomRange,
  selectFilters,
  selectSearchTerm,
  selectSportIds,
  selectTempDateValue,
  selectTempRadius,
  setPendingZoom,
  setSearchTerm,
  setSelectedSportIds,
  setTempDateValue,
  setTempRadius,
  toggleSportId,
} from '@shared/store';

import { getZoomForRadius } from '../lib/get-zoom-for-radius';
import { Styled } from './filter-events-modal.styled';

dayjs.extend(utc);

interface FilterEventsModalProps {
  buttonRef: HTMLButtonElement | null;
}

export const FilterEventsModal: FC<FilterEventsModalProps> = ({
  buttonRef,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    hasAppliedFilters,
    hasAppliedSportFilter,
    hasAppliedDateFilter,
    hasAppliedRangeFilter,
    setTypes,
    setStartDate,
    setRange,
    resetFilters,
  } = useEventSearch();
  const { data: eventTypes = [] } = useGetTypeEventsQuery();

  const selectedSports = useSelector(selectSportIds);
  const radius = useSelector(selectTempRadius);
  const searchTerm = useSelector(selectSearchTerm);
  const tempDateValue = useSelector(selectTempDateValue);
  const filters = useSelector(selectFilters);

  const hasTempSportFilter = selectedSports.length > 0;
  const hasTempDateFilter = tempDateValue !== null;
  const hasTempRangeFilter = radius !== 0;
  const hasAnyTempFilter =
    hasTempSportFilter || hasTempDateFilter || hasTempRangeFilter;
  const hasAnyFilter = hasAnyTempFilter || hasAppliedFilters;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [sportAnchorEl, setSportAnchorEl] = useState<HTMLElement | null>(null);
  const [dateAnchorEl, setDateAnchorEl] = useState<HTMLElement | null>(null);
  const [locationAnchorEl, setLocationAnchorEl] = useState<HTMLElement | null>(
    null,
  );
  const sportButtonRef = useRef<HTMLButtonElement | null>(null);
  const dateButtonRef = useRef<HTMLButtonElement | null>(null);
  const locationButtonRef = useRef<HTMLButtonElement | null>(null);

  const dateValue = tempDateValue ? dayjs(tempDateValue) : null;

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

  const applyFilters = useCallback(() => {
    const sportNames = selectedSports.map((id) => {
      const sport = eventTypes.find((s) => s.typeId.toString() === id);
      return sport ? sport.typeName : id;
    });
    setTypes(sportNames.length > 0 ? sportNames : undefined);

    const dateString = dateValue
      ? dateValue.utc().startOf('day').toISOString()
      : undefined;
    setStartDate(dateString);

    if (radius > 0) {
      const radiusMeters = radius * 1000;
      setRange(radiusMeters, true);

      const mapContainer = document.querySelector('[data-testid="base-map"]');
      const width = mapContainer?.clientWidth ?? window.innerWidth;
      const height = mapContainer?.clientHeight ?? window.innerHeight;

      const newZoom = getZoomForRadius(
        radiusMeters,
        filters.latitude,
        width,
        height,
      );
      dispatch(setPendingZoom(newZoom));
    }

    if (
      location.pathname !== ROUTES.HOME &&
      location.pathname !== ROUTES.LIST
    ) {
      navigate(ROUTES.HOME);
    }
  }, [
    selectedSports,
    dateValue,
    radius,
    eventTypes,
    setTypes,
    setStartDate,
    setRange,
    filters.latitude,
    dispatch,
    location.pathname,
    navigate,
  ]);

  const handleApplyDate = useCallback(() => {
    applyFilters();
    closeDate();
    closeMain();
  }, [applyFilters]);

  const handleResetDate = useCallback(() => {
    setStartDate(undefined);
    dispatch(setTempDateValue(null));
    closeDate();
    closeMain();
  }, [setStartDate, dispatch]);

  const handleToggleSport = useCallback(
    (sportId: string) => {
      dispatch(toggleSportId(sportId));
    },
    [dispatch],
  );

  const handleApplySport = useCallback(() => {
    applyFilters();
    closeSport();
    closeMain();
  }, [applyFilters]);

  const handleResetSport = useCallback(() => {
    setTypes(undefined);
    dispatch(setSelectedSportIds([]));
    closeSport();
    closeMain();
  }, [setTypes, dispatch]);

  const handleApplyLocation = useCallback(() => {
    applyFilters();
    closeLocation();
    closeMain();
  }, [applyFilters]);

  const handleResetLocation = useCallback(() => {
    dispatch(resetCustomRange());
    closeLocation();
    closeMain();
  }, [dispatch]);

  const handleSliderChange = useCallback(
    (_: Event, value: number | number[]) => {
      if (typeof value === 'number') {
        dispatch(setTempRadius(value));
      }
    },
    [dispatch],
  );

  const handleResetAll = useCallback(() => {
    resetFilters();
    closeMain();
  }, [resetFilters]);

  const formatDisplayValue = useCallback((value: number) => `${value} км`, []);

  const filteredSports = useMemo(
    () =>
      eventTypes.filter((sport) =>
        sport.typeName.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [eventTypes, searchTerm],
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
          disabled={!hasAnyFilter}
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
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
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
            disabled={!hasTempSportFilter && !hasAppliedSportFilter}
          >
            Сбросить
          </Styled.SportResetButton>

          <Styled.SportApplyButton
            onClick={handleApplySport}
            variant='contained'
            color='primary'
            disabled={!hasAnyFilter}
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
          <Styled.SportDataCalendar
            value={dateValue}
            onChange={(newValue) => {
              dispatch(
                setTempDateValue(newValue ? newValue.toISOString() : null),
              );
            }}
          />
        </LocalizationProvider>
        <Styled.DateButtonStack spacing={2}>
          <Styled.DateResetButton
            onClick={handleResetDate}
            variant='contained'
            color='primary'
            disabled={!hasTempDateFilter && !hasAppliedDateFilter}
          >
            Сбросить
          </Styled.DateResetButton>

          <Styled.DateApplyButton
            onClick={handleApplyDate}
            variant='contained'
            color='primary'
            disabled={!hasAnyFilter}
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
            <Typography
              variant='body1'
              fontWeight={600}
              color={radius === 0 ? 'text.disabled' : 'primary'}
            >
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
            disabled={!hasTempRangeFilter && !hasAppliedRangeFilter}
          >
            Сбросить
          </Styled.LocationResetButton>

          <Styled.LocationApplyButton
            onClick={handleApplyLocation}
            variant='contained'
            color='primary'
            disabled={!hasAnyFilter}
          >
            Показать события
          </Styled.LocationApplyButton>
        </Styled.LocationButtonStack>
      </Styled.LocationPopover>
    </>
  );
};
