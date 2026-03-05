/**
 * Сущность чата, привязанного к событию
 * @prop id - Уникальный идентификатор чата
 * @prop eventId - Идентификатор связанного события (мероприятия)
 * @prop title - Заголовок чата (обычно название события)
 * @prop eventLocation - Место проведения мероприятия (адрес или название локации)
 * @prop eventType - Категория или тип события (например, "спорт", "митап")
 * @prop lastMessage - Текст последнего сообщения для превью в списке
 * @prop lastMessageDateTime - ISO-дата и время отправки последнего сообщения
 * @prop eventStartDate - Дата и время начала самого события
 */
export interface IChat {
  eventId: string;
  title: string;
  eventLocation: string;
  eventType: string;
  lastMessage: string | null;
  lastMessageDateTime: string | null;
  eventStartDate: string | null;
}
/**
 * Сущность сообщения в чате события
 * @prop id - Уникальный идентификатор сообщения
 * @prop createdAt - Дата и время создания сообщения (ISO string)
 * @prop updateAt - Дата и время последнего редактирования сообщения
 * @prop chatRoomId - Идентификатор комнаты (чата), к которой относится сообщение
 * @prop userId - Идентификатор автора сообщения
 * @prop text - Текст сообщения
 * @prop userPhotoUrl - Ссылка на аватарку пользователя
 * @prop eventName - Название события, в рамках которого идет общение
 * @prop eventType - Тип или категория события
 * @prop eventStartDate - Дата и время начала события
 */
export interface IMessage {
  id: string;
  createdAt: string;
  updateAt: string;
  chatRoomId: string;
  userId: string;
  text: string;
  userPhotoUrl: string;
  eventName: string;
  eventType: string;
  eventStartDate: string;
}
