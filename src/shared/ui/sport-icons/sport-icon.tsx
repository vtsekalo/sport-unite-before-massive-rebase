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

import { Styled } from './sport-icon.styled';

interface SportIconProps {
  type: string;
  sizeBox?: number;
  sizeIcon?: number;
  color?: string;
  invert?: boolean;
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

export const SportIcon = ({
  type,
  sizeBox = 24,
  sizeIcon = 16,
  color = '#FFFFFF',
  invert = true,
}: SportIconProps) => {
  const IconComponent = Sport[type];
  return (
    <Box
      bgcolor='#3677FF'
      width={sizeBox}
      height={sizeBox}
      borderRadius={12}
      color={color}
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      {IconComponent && (
        <Styled.Icon
          component='img'
          src={IconComponent}
          width={sizeIcon}
          height={sizeIcon}
          alt={type}
          {...(invert ? { invert } : {})}
        />
      )}
    </Box>
  );
};
