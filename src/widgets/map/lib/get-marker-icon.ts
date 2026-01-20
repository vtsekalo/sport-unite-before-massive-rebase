import basketballIcon from '@shared/ui/icons/basketballIcon.svg';
import cyclingIcon from '@shared/ui/icons/cyclingIcon.svg';
import defaultMarker from '@shared/ui/icons/defaultMarker.svg';
import footballIcon from '@shared/ui/icons/footballIcon.svg';
import runningIcon from '@shared/ui/icons/runningIcon.svg';
import tennisIcon from '@shared/ui/icons/tennisIcon.svg';
import volleyballIcon from '@shared/ui/icons/volleyballIcon.svg';
import yogaIcon from '@shared/ui/icons/yogaIcon.svg';

const sportIconsMap: Record<string, string> = {
  'ФУТБОЛ': footballIcon,
  'БАСКЕТБОЛ': basketballIcon,
  'ВОЛЕЙБОЛ': volleyballIcon,
  'ТЕННИС': tennisIcon,
  'БЕГ': runningIcon,
  'ПРОБЕЖКА': runningIcon,
  'ВЕЛОСПОРТ': cyclingIcon,
  'ЙОГА': yogaIcon,
  'СКЕЙТБОРДИНГ': defaultMarker,
  'РОЛИКОВЫЕ КОНЬКИ': defaultMarker,
};

export const getMarkerIcon = (eventType: string): string => {
  const normalizedType = eventType?.toUpperCase() || 'OTHER';
  return sportIconsMap[normalizedType] || defaultMarker;
};

export const getEventTypeName = (eventType: string): string => {
  const names: Record<string, string> = {
    FOOTBALL: 'Футбол',
    BASKETBALL: 'Баскетбол',
    VOLLEYBALL: 'Волейбол',
    TENNIS: 'Теннис',
    RUNNING: 'Бег',
    CYCLING: 'Велоспорт',
    YOGA: 'Йога',
    BOXING: 'Бокс',
  };
  return names[eventType?.toUpperCase()] || eventType;
};
