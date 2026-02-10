import { useCallback, useState } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      setError('Браузер не поддерживает геолокацию');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );

      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setCoords(location);
      return location;
    } catch (err) {
      const geolocationError = err as GeolocationPositionError;
      const message =
        geolocationError.code === 1
          ? 'Доступ запрещен'
          : geolocationError.code === 2
            ? 'Позиция недоступна'
            : geolocationError.code === 3
              ? 'Таймаут'
              : 'Ошибка геолокации';

      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    coords,
    error,
    isLoading,
    getLocation,
  };
};
