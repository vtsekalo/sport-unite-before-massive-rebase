import { Box, BoxProps } from '@mui/material';

import { Sport } from '@shared/lib';

import { Styled } from './sport-icon.styled';

interface SportIconProps extends BoxProps {
  type: string;
  widthIcon?: string;
  heightIcon?: string;
  filter?: boolean;
}

export const SportIcon = ({
  type,
  widthIcon = '16px',
  heightIcon = '16px',
  filter = true,
  ...props
}: SportIconProps) => {
  const IconComponent = Sport[type];
  return (
    <Box
      bgcolor='#3677FF'
      width='24px'
      height='24px'
      borderRadius='50%'
      display='flex'
      alignItems='center'
      justifyContent='center'
      {...props}
    >
      {IconComponent && (
        <Styled.Icon
          component='img'
          src={IconComponent}
          width={widthIcon}
          height={heightIcon}
          alt={type}
          color='white'
          $filter={filter}
        />
      )}
    </Box>
  );
};
