import { SportIcon } from '../sport-icons';
import { Styled } from './marker.styled';

interface MarkerProps {
  type: string;
}

export const Marker = ({ type }: MarkerProps) => {
  return (
    <Styled.MarkerWrapper>
      <Styled.Marker
        bgcolor='#3677FF'
        width={40}
        height={57}
        display='flex'
        justifyContent='center'
        alignItems='center'
        pb='17px'
      >
        <SportIcon
          bgcolor='#FFFFFF'
          filter={false}
          type={type}
          width='30px'
          height='30px'
          widthIcon='20px'
          heightIcon='20px'
        />
      </Styled.Marker>
    </Styled.MarkerWrapper>
  );
};
