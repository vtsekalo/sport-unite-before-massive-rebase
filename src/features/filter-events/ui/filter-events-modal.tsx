import { FC, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  IconButton,
  InputAdornment,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useGetTypeEventsQuery } from '@shared/api';
import {
  IEventType,
  ROUTES,
  dayjs,
  useAppDispatch,
  useAppSelector,
  useEventSearch,
} from '@shared/lib';
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

interface FilterEventsModalProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export const FilterEventsModal: FC<FilterEventsModalProps> = ({
  anchorEl,
  onClose,
}) => {
  const dispatch = useAppDispatch();
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

  const selectedSports = useAppSelector(selectSportIds);
  const radius = useAppSelector(selectTempRadius);
  const searchTerm = useAppSelector(selectSearchTerm);
  const tempDateValue = useAppSelector(selectTempDateValue);
  const filters = useAppSelector(selectFilters);

  const hasTempSportFilter = selectedSports.length > 0;
  const hasTempDateFilter = tempDateValue !== null;
  const hasTempRangeFilter = radius !== 0;
  const hasAnyTempFilter =
    hasTempSportFilter || hasTempDateFilter || hasTempRangeFilter;
  const hasAnyFilter = hasAnyTempFilter || hasAppliedFilters;

  const [isSportOpen, setIsSportOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const dateValue = tempDateValue ? dayjs(tempDateValue) : null;
  const toggleSport = () => setIsSportOpen((prev) => !prev);
  const toggleDate = () => setIsDateOpen((prev) => !prev);
  const toggleLocation = () => setIsLocationOpen((prev) => !prev);

  const closeMain = useCallback(() => {
    setIsSportOpen(false);
    setIsDateOpen(false);
    setIsLocationOpen(false);
    onClose();
  }, [onClose]);

  const applyFilters = useCallback(() => {
    const sportNames = selectedSports.map((id) => {
      const sport = eventTypes.find((s) => s.typeId.toString() === id);
      return sport ? sport.typeName : id;
    });
    setTypes(sportNames.length > 0 ? sportNames : undefined);

    const dateString = dateValue
      ?.startOf('day')
      .format('YYYY-MM-DDTHH:mm:ss[Z]');
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
    closeMain();
  }, [
    selectedSports,
    setTypes,
    dateValue,
    setStartDate,
    radius,
    location.pathname,
    closeMain,
    eventTypes,
    setRange,
    filters.latitude,
    dispatch,
    navigate,
  ]);

  const handleResetDate = useCallback(() => {
    setStartDate(undefined);
    dispatch(setTempDateValue(null));
    closeMain();
  }, [setStartDate, dispatch, closeMain]);

  const handleToggleSport = useCallback(
    (sportId: string) => {
      dispatch(toggleSportId(sportId));
    },
    [dispatch],
  );

  const handleResetSport = useCallback(() => {
    setTypes(undefined);
    dispatch(setSelectedSportIds([]));
    closeMain();
  }, [setTypes, dispatch, closeMain]);

  const handleResetLocation = useCallback(() => {
    dispatch(resetCustomRange());
    closeMain();
  }, [closeMain, dispatch]);

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
  }, [closeMain, resetFilters]);

  const formatDisplayValue = useCallback((value: number) => `${value} км`, []);

  const filteredSports = useMemo(
    () =>
      eventTypes.filter((sport) =>
        sport.typeName.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [eventTypes, searchTerm],
  );
  const paperStyle = useMemo(() => {
    if (!anchorEl) return {};
    return {
      maxHeight: `calc(100vh - ${anchorEl.getBoundingClientRect().bottom + 112}px)`,
    };
  }, [anchorEl]);

  return (
    <Styled.MainPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={closeMain}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      marginThreshold={null}
      elevation={6}
      slotProps={{ paper: { style: paperStyle } }}
    >
      <Stack direction='column' gap={1} width='100%' alignItems='stretch'>
        <Styled.FilterSectionButton
          size='mediumFixed'
          color='primary'
          variant={'outlined'}
          className={isSportOpen ? 'opened' : ''}
          onClick={toggleSport}
        >
          КАТЕГОРИИ СПОРТА
          <Styled.ArrowIcon />
        </Styled.FilterSectionButton>

        <Collapse in={isSportOpen} unmountOnExit>
          <Stack maxHeight='318px' direction='column' gap={1}>
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
                      {searchTerm && (
                        <IconButton
                          size='small'
                          onClick={() => dispatch(setSearchTerm(''))}
                        >
                          <ClearIcon fontSize='small' />
                        </IconButton>
                      )}
                      <Styled.SportSearchIcon color='primary' />
                    </InputAdornment>
                  ),
                },
              }}
              variant='outlined'
            />

            <Styled.SportList disablePadding>
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
                <Box p='2px' textAlign='center'>
                  <Typography variant='body1' color='textSecondary'>
                    Виды спорта не найдены
                  </Typography>
                </Box>
              )}
            </Styled.SportList>
          </Stack>

          <Stack
            alignItems='center'
            justifyContent='center'
            width='100%'
            mt={1}
          >
            <Box width={'120px'}>
              <Button
                fullWidth
                size='mediumFixed'
                variant='contained'
                color='primary'
                onClick={handleResetSport}
                disabled={!hasTempSportFilter && !hasAppliedSportFilter}
              >
                Сбросить
              </Button>
            </Box>
          </Stack>
        </Collapse>

        <Styled.FilterSectionButton
          size='mediumFixed'
          color='primary'
          variant='outlined'
          className={isDateOpen ? 'opened' : ''}
          onClick={toggleDate}
        >
          ДАТА И ВРЕМЯ
          <Styled.ArrowIcon />
        </Styled.FilterSectionButton>

        <Collapse in={isDateOpen} unmountOnExit>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
            <Styled.SportDataCalendar
              value={dateValue}
              reduceAnimations
              disablePast
              showDaysOutsideCurrentMonth
              onChange={(newValue) => {
                dispatch(
                  setTempDateValue(newValue ? newValue.toISOString() : null),
                );
              }}
            />
          </LocalizationProvider>

          <Stack
            alignItems='center'
            justifyContent='center'
            width='100%'
            mt={1}
          >
            <Box width={'120px'}>
              <Button
                fullWidth
                size='mediumFixed'
                variant='contained'
                color='primary'
                onClick={handleResetDate}
                disabled={!hasTempSportFilter && !hasAppliedDateFilter}
              >
                Сбросить
              </Button>
            </Box>
          </Stack>
        </Collapse>

        <Styled.FilterSectionButton
          size='mediumFixed'
          color='primary'
          variant='outlined'
          className={isLocationOpen ? 'opened' : ''}
          onClick={toggleLocation}
        >
          МЕСТО И УДАЛЕННОСТЬ
          <Styled.ArrowIcon />
        </Styled.FilterSectionButton>

        <Collapse in={isLocationOpen} unmountOnExit>
          <Box my={1}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='bodySmall'>Радиус поиска</Typography>
              <Typography
                variant='bodySmall'
                fontWeight={700}
                color={radius === 0 ? 'text.disabled' : 'primary'}
              >
                {radius} км
              </Typography>
            </Stack>

            <Box mt={1}>
              <Styled.RadiusSlider
                size='small'
                aria-label='Small'
                value={radius}
                onChange={handleSliderChange}
                min={0}
                max={50}
                step={1}
                valueLabelDisplay='auto'
                valueLabelFormat={formatDisplayValue}
              />
            </Box>

            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='bodySmall' color='textSecondary'>
                0 км
              </Typography>
              <Typography variant='bodySmall' color='textSecondary'>
                50 км
              </Typography>
            </Stack>
          </Box>

          <Stack
            alignItems='center'
            justifyContent='center'
            width='100%'
            mt={1}
          >
            <Box width={'120px'}>
              <Button
                fullWidth
                size='mediumFixed'
                variant='contained'
                color='primary'
                onClick={handleResetLocation}
                disabled={!hasTempSportFilter && !hasAppliedRangeFilter}
              >
                Сбросить
              </Button>
            </Box>
          </Stack>
        </Collapse>
        <Stack
          alignItems='center'
          justifyContent='center'
          width='100%'
          mt={1}
          gap={1}
        >
          <Box width={'220px'} m={'8px auto 0'}>
            <Button
              fullWidth
              size='mediumFixed'
              onClick={applyFilters}
              variant='contained'
              color='primary'
              disabled={!hasAnyFilter}
            >
              Показать события
            </Button>
          </Box>
          <Box width={'220px'} m={'8px auto 0'}>
            <Styled.ActionButton
              fullWidth
              size='mediumFixed'
              variant='contained'
              color='primary'
              onClick={handleResetAll}
              disabled={!hasAnyFilter}
            >
              Сбросить все фильтры
            </Styled.ActionButton>
          </Box>
        </Stack>
      </Stack>
    </Styled.MainPopover>
  );
};
