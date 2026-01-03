import { Box } from '@mui/material';

import {
  Basket,
  Bike,
  Bmx,
  Roller,
  Run,
  Skateboarding,
  Snowboard,
  Soccer,
  Tennis,
} from '@shared/assets';

import { Styled } from './SportIcon.styled';

interface SportIconProps {
  type: string;
}

const Sport: Record<string, string> = {
  'Футбол': Soccer,
  'Баскетбол': Basket,
  'Теннис': Tennis,
  'Бег': Run,
  'Скейтбординг': Skateboarding,
  'BMX': Bmx,
  'Роллер-спорт': Roller,
  'Велоспорт': Bike,
  'Сноубординг': Snowboard,
};
export const SportIcon = ({ type }: SportIconProps) => {
  const IconComponent = Sport[type];
  return (
    <Box
      bgcolor='#3677FF'
      width={24}
      height={24}
      borderRadius={12}
      color='#FFFFFF'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      {IconComponent && (
        <Styled.Icon
          component='img'
          src={IconComponent}
          width={16}
          height={16}
          alt={type}
        />
      )}
    </Box>
  );
};
