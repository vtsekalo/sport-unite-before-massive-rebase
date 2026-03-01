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
 * Координаты точки
 * @prop lat - Широта
 * @prop lon - Долгота
 */
export interface TwoGisPoint {
  lat: number;
  lon: number;
}

/**
 * Административная единица в иерархии 2GIS (город, район и т.д.)
 * @prop id - Идентификатор территории
 * @prop name - Название (например, "Иваново")
 * @prop type - Тип объекта (city, settlement, district)
 */
export interface TwoGisAdmDiv {
  id: string;
  name: string;
  type: 'city' | 'settlement' | 'district' | 'division' | string;
}

/**
 * Объект справочника 2GIS (филиал, здание, геообъект)
 * @prop id - Идентификатор объекта в базе 2GIS
 * @prop name - Краткое название (напр. "Мяснофф")
 * @prop full_name - Полное название с типом объекта
 * @prop address_name - Адресация (улица, номер дома)
 * @prop point - Геометрический центр объекта
 * @prop adm_div - Массив административных делений (используем для получения города)
 */
export interface TwoGisApiItem {
  id: string;
  name?: string;
  full_name?: string;
  address_name?: string;
  point?: TwoGisPoint;
  adm_div?: TwoGisAdmDiv[];
}

/**
 * Обобщенный ответ от API 2GIS
 * @prop result - Контейнер с данными ответа
 */
export interface TwoGisApiResponse {
  result?: {
    items?: TwoGisApiItem[];
    total?: number;
  };
}

/**
 * Элемент списка подсказок поискового сервиса (Suggest)
 * @prop id - Идентификатор для получения подробной информации
 * @prop name - Текст основной подсказки
 * @prop full_name - Полный текст подсказки
 * @prop address_name - Сокращенный адрес объекта
 * @prop point - Координаты для позиционирования на карте
 * @prop city - Название города, где находится объект
 */
export interface SuggestionItem {
  id: string;
  name: string;
  full_name: string;
  address_name: string;
  point: TwoGisPoint;
  city: string;
}
