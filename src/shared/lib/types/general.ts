/**
 * Конфигурация отображения уведомлений (UI Feedback) для запроса
 * @prop toast - Общий флаг: показывать ли уведомление в любом случае
 * @prop toastOnSuccess - Показывать уведомление только при успешном выполнении
 * @prop toastOnError - Показывать уведомление только в случае ошибки
 */
export type RequestMeta = {
  toast?: boolean;
  toastOnSuccess?: boolean;
  toastOnError?: boolean;
};

/**
 * Вспомогательный тип для расширения данных мета-информацией о запросе
 * @template T - Тип основных данных (Payload)
 * @prop __meta - Служебное поле с настройками отображения (Toast и др.)
 */
export type WithMeta<T> = T & { __meta?: RequestMeta };
