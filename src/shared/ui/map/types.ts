import { Map } from '@2gis/mapgl/types';

/**
 * Типы для базового компонента карты 2GIS
 * Не содержит бизнес-логики, только работа с картой
 */

/**
 * Координаты [долгота, широта]
 */
export type Coordinates = [longitude: number, latitude: number];

/**
 * Данные маркера на карте
 */
export interface IMapMarker {
  id: string;
  coordinates: Coordinates; // Используем type alias
  icon: string; // URL иконки
  onClick?: () => void;
}

/**
 * Пропсы базового компонента карты
 */
export interface IBaseMapProps {
  /**
   * Центр карты [longitude, latitude]
   * @default [37.620001, 55.754167] (Москва)
   */
  center?: Coordinates;

  /**
   * Уровень зума карты
   * @default 14
   */
  zoom?: number;

  /**
   * API ключ 2GIS
   */
  apiKey: string;

  /**
   * Массив маркеров для отображения
   */
  markers?: IMapMarker[];

  /**
   * Показывать ли контроллы зума
   * @default false
   */
  showZoomControl?: boolean;

  /**
   * Callback при изменении зума
   */
  onZoomChange?: (zoom: number) => void;

  /**
   * Callback при изменении центра карты
   */
  onCenterChange?: (center: Coordinates) => void;

  /**
   * Callback при начале перемещения карты
   */
  onMoveStart?: () => void;

  /**
   * Callback при готовности карты (возвращает инстанс карты)
   */
  onMapReady?: (mapInstance: Map) => void;
}
