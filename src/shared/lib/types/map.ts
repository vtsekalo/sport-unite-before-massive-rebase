/**
 * @prop latitude - Широта
 * @prop longitude - Долгота
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * @prop latitude - Широта
 * @prop longitude - Долгота
 * @prop range - Радиус в метрах
 */

export interface CoordinateFilterDto extends Coordinates {
  range: number;
}

/**
 * Кортеж координат: [долгота, широта]
 */
export type CoordinatesTuple = [longitude: number, latitude: number];

export interface MapMarker {
  id: string;
  coordinates: CoordinatesTuple;
  icon: string;
  onClick?: () => void;
}
