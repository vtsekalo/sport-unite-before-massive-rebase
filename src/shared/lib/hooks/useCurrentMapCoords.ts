import { useSelector } from 'react-redux';

import { Coordinates } from '../types/map';
import { normalizeCoord } from '../utils/normalizeCoord';

export const useCurrentMapCoords = () => {
  const rawCoords = useSelector((state: { map: Coordinates }) => state.map);

  const coords = {
    latitude: normalizeCoord(rawCoords.latitude),
    longitude: normalizeCoord(rawCoords.longitude),
  };

  return { coords };
};
