import { GenderVariant, UserStatusVariant } from './enums';

/**
 * ORGANIZER - Организатор.
 * PARTICIPANT - Участник
 */
export enum UserRole {
  organizer = 'ORGANIZER',
  participant = 'PARTICIPANT',
}

/**
 * @prop id - Идентификатор пользователя.
 * @prop nickname - Никнейм пользователя.
 * @prop email - Email пользователя.
 * @prop dateOfBirth - Дата рождения.
 * @prop userStatus - Статус активности.
 * @prop firstName - Имя.
 * @prop lastName - Фамилия.
 * @prop city - Город проживания.
 * @prop gender - Пол.
 * @prop biography - Биография.
 * @prop profilePicture - URL аватара (может быть null).
 * @prop averageRating - Средний рейтинг.
 * @prop interests - Список интересов.
 */
export interface IUserProfile {
  id: string;
  nickname: string;
  email: string;
  emailVerified: boolean;
  dateOfBirth: string;
  userStatus: UserStatusVariant;
  firstName: string;
  lastName: string;
  city: string;
  gender: GenderVariant;
  biography: string;
  profilePicture: string | null;
  averageRating: number;
  interests?: string[];
}
/**
 * Данные пользователя — участника события включая организатора
 * @prop userId - Уникальный идентификатор пользователя
 * @prop nickName - Публичное имя (никнейм) для отображения
 * @prop userRole - Роль пользователя в контексте события (организатор, участник)
 * @prop urlUserPhoto - Ссылка на аватар пользователя (null, если фото не установлено)
 */
export interface IUserParticipant {
  userId: string;
  nickName: string;
  userRole: UserRole;
  urlUserPhoto: string;
}
