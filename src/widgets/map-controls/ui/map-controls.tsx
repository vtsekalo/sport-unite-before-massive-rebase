import { FC, useEffect, useState } from 'react';

import { Add, Remove } from '@mui/icons-material';
import { NearMeDisabled, NearMeOutlined } from '@mui/icons-material';
import { Box, CircularProgress, Tooltip } from '@mui/material';

import { useAppDispatch, useAppSelector, useGeolocation } from '@shared/lib';
import { selectMapZoom, setMapCenter, setMapZoom } from '@shared/store';

import { Styled } from './map-controls.styled';

export const MapControls: FC = () => {
  const dispatch = useAppDispatch();
  const zoom = useAppSelector(selectMapZoom);

  const { coords, error, isLoading, getLocation } = useGeolocation();
  const [showPermissionError, setShowPermissionError] = useState(false);

  useEffect(() => {
    if (error === 'Доступ запрещен') setShowPermissionError(true);
    else if (coords) setShowPermissionError(false);
  }, [error, coords]);

  const handleZoomIn = () => dispatch(setMapZoom(zoom + 1));
  const handleZoomOut = () => dispatch(setMapZoom(zoom - 1));

  const handleGeolocate = () => {
    getLocation();
  };

  useEffect(() => {
    if (coords) {
      dispatch(
        setMapCenter({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      );
      dispatch(setMapZoom(14));
    }
  }, [coords, dispatch]);

  const getGeolocationIcon = () => {
    if (isLoading) return <CircularProgress size={24} color='primary' />;
    if (showPermissionError)
      return <NearMeDisabled fontSize='medium' color='primary' />;
    return <NearMeOutlined fontSize='medium' color='primary' />;
  };

  const getTooltipTitle = () => {
    if (isLoading) return 'Определение местоположения...';
    if (showPermissionError)
      return 'Доступ к геолокации запрещен. Нажмите для повторной попытки.';
    if (error) return error;
    return 'Показать мое местоположение';
  };

  return (
    <Styled.ControlsWrapper
      position='absolute'
      top='50%'
      right={{ xs: '16px', md: '40px' }}
      zIndex={10}
    >
      <Box display='flex' flexDirection='column' gap='19px'>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          borderRadius='10px'
          overflow='hidden'
          boxShadow={6}
          bgcolor='#ffffff'
        >
          <Tooltip
            title={zoom >= 20 ? 'Максимальный зум' : 'Приблизить карту'}
            placement='left'
          >
            <Styled.ControlsButton onClick={handleZoomIn} disabled={zoom >= 20}>
              <Add fontSize='medium' color='primary' />
            </Styled.ControlsButton>
          </Tooltip>

          <Tooltip
            title={zoom <= 2 ? 'Минимальный зум' : 'Отдалить карту'}
            placement='left'
          >
            <Styled.ControlsButton onClick={handleZoomOut} disabled={zoom <= 2}>
              <Remove fontSize='medium' color='primary' />
            </Styled.ControlsButton>
          </Tooltip>
        </Box>

        <Tooltip title={getTooltipTitle()} placement='left'>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            borderRadius='10px'
            overflow='hidden'
            boxShadow={6}
            bgcolor='#ffffff'
            onClick={handleGeolocate}
          >
            <Styled.ControlsButton>
              {getGeolocationIcon()}
            </Styled.ControlsButton>
          </Box>
        </Tooltip>
      </Box>
    </Styled.ControlsWrapper>
  );
};
