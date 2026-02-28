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

/**
 * Маркер на карте
 * @prop id - Уникальный идентификатор маркера
 * @prop coordinates - Координаты в формате [lat, lon]
 * @prop icon - React-компонент иконки
 * @prop onClick - Обработчик клика по маркеру
 * @prop zIndex - Порядок наложения (высота) слоя
 */
export interface MapMarker {
  id: string;
  coordinates: CoordinatesTuple;
  icon: ReactNode;
  onClick?: () => void;
  zIndex: number;
}

/**
 * Объект справочника 2GIS (филиал, здание, геообъект)
 * @prop id - Идентификатор объекта в базе 2GIS
 * @prop name - Краткое название объекта
 * @prop full_name - Полное название (включая тип объекта)
 * @prop address_name - Адресация объекта (улица, номер дома)
 * @prop point - Геометрический центр объекта
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
 * Обобщенный ответ от API 2GIS
 * @prop result - Контейнер с данными ответа
 * @prop result.items - Список найденных объектов справочника
 */
export interface TwoGisApiResponse {
  result?: {
    items?: TwoGisApiItem[];
  };
}

/**
 * Элемент списка подсказок поискового сервиса (Suggest)
 * @prop id - Идентификатор для получения подробной информации через Items API
 * @prop name - Текст основной подсказки
 * @prop full_name - Полный текст подсказки с уточнением региона
 * @prop address_name - Сокращенный адрес объекта
 * @prop point - Координаты для позиционирования на карте
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
