import { LngLatBounds } from '@2gis/mapgl/types';

export const getDistance = (
  coord1: { latitude: number; longitude: number },
  coord2: { latitude: number; longitude: number },
): number => {
  const R = 6371e3;
  const φ1 = (coord1.latitude * Math.PI) / 180;
  const φ2 = (coord2.latitude * Math.PI) / 180;
  const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const getBoundsRadius = (
  bounds: LngLatBounds,
  center: number[] | [number, number],
): number => {
  const [west, south] = bounds.southWest;
  const [east, north] = bounds.northEast;
  const [lng, lat] = center;

  const distances = [
    getDistance(
      { latitude: lat, longitude: lng },
      { latitude: north, longitude: east },
    ),
    getDistance(
      { latitude: lat, longitude: lng },
      { latitude: north, longitude: west },
    ),
    getDistance(
      { latitude: lat, longitude: lng },
      { latitude: south, longitude: east },
    ),
    getDistance(
      { latitude: lat, longitude: lng },
      { latitude: south, longitude: west },
    ),
  ];

  return Math.ceil(Math.max(...distances));
};
