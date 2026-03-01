/** Ключ доступа к API карт 2GIS. Берется из переменных окружения. */
export const MAP_API_KEY = import.meta.env.VITE_2GIS_MAP_API_KEY;

/** Координаты центра карты по умолчанию (Москва). Формат: [долгота, широта]. */
export const DEFAULT_MAP_CENTER: [number, number] = [37.620001, 55.754167];

/** Масштаб карты при инициализации. */
export const DEFAULT_MAP_ZOOM = 14;

/**
 * Базовый радиус поиска событий (в метрах) при инициализации.
 */
export const BASE_RADIUS = 5000;
