import { GenderVariant, UserStatusVariant } from './enums';

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
  dateOfBirth: string;
  userStatus: UserStatusVariant;
  firstName: string;
  lastName: string;
  city: string;
  gender: GenderVariant;
  biography: string;
  profilePicture: string | null;
  averageRating: number;
  interests: string[];
}
