import { useSelector } from 'react-redux';

import { Coordinates } from '../types';
import { normalizeCoord } from '../utils/normalize-coord';

export const useCurrentMapCoords = () => {
  const rawCoords = useSelector((state: { map: Coordinates }) => state.map);

  const coords = {
    latitude: normalizeCoord(rawCoords.latitude),
    longitude: normalizeCoord(rawCoords.longitude),
  };

  return { coords };
};
