import { ReactNode } from 'react';

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
  icon: ReactNode;
  onClick?: () => void;
  zIndex: number;
}

/**
 * Элемент ответа от 2GIS API (внутренний тип)
 */
export interface TwoGisApiItem {
  id: string;
  name?: string;
  full_name?: string;
  address_name?: string;
  point?: {
    lat: number;
    lon: number;
  };
}

/**
 * Ответ от 2GIS API (внутренний тип)
 */
export interface TwoGisApiResponse {
  result?: {
    items?: TwoGisApiItem[];
  };
}

/**
 * Элемент подсказки для автокомплита адресов
 */
export interface SuggestionItem {
  id: string;
  name: string;
  full_name: string;
  address_name: string;
  point: {
    lat: number;
    lon: number;
  };
}
