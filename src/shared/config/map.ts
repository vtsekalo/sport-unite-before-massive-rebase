/**
 * Константы для работы с картой 2GIS
 */

export const MAP_API_KEY = '5b4bb0de-e668-4d76-b383-e5134c3a4ac7';
export const DEFAULT_MAP_CENTER: [number, number] = [37.620001, 55.754167];
export const DEFAULT_MAP_ZOOM = 14;

/**
 * Базовый радиус поиска событий (в метрах)
 */
export const BASE_RADIUS = 50000;

/**
 * Базовый уровень зума для расчета радиуса
 */
export const BASE_ZOOM = 10;

/**
 * Фактор изменения радиуса при изменении зума
 */
export const RADIUS_FACTOR = 2;

/**
 * Вычисляет радиус поиска событий на основе текущего зума карты.
 * Чем больше зум (карта приближена), тем меньше радиус поиска.
 *
 * @param zoom - Текущий уровень зума карты
 * @returns Радиус поиска в метрах
 *
 * @example
 * zoomToRadius(10) // 50000м (50 км)
 * zoomToRadius(14) // 3125м (3.1 км)
 * zoomToRadius(16) // 781м
 */
export const zoomToRadius = (zoom: number): number => {
  return Math.round(BASE_RADIUS / Math.pow(RADIUS_FACTOR, zoom - BASE_ZOOM));
};
