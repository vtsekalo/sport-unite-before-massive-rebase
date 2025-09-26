import { StyledHeaderWrapper } from './Layout.styled';

export const Header = () => {
  return (
    <StyledHeaderWrapper
      position='absolute'
      alignItems='center'
      display='flex'
      justifyContent='center'
      top='24px'
      left='50%'
      borderRadius='10px'
      minWidth={300}
      maxWidth={'95%'}
      width='min-content'
      height={88}
      boxShadow={`0px 3px 5px -1px #00000033;
              0px 6px 10px 0px #00000024;
              0px 1px 18px 0px #0000001F;`}
    >
      Header
    </StyledHeaderWrapper>
  );
};
