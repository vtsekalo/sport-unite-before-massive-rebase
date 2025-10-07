import { NavBar } from '@widgets/navbar';

import { StyledFooterMobile } from './Layout.styled';

export const FooterMobile = () => {
  return (
    <StyledFooterMobile
      borderRadius={'10px'}
      alignItems={'center'}
      display='none'
      justifyContent='center'
      minWidth={250}
      width='100%'
      maxWidth={300}
      left={'50%'}
      height={56}
      position='absolute'
      boxShadow={`0px 3px 5px -1px #00000033;
              0px 6px 10px 0px #00000024;
              0px 1px 18px 0px #0000001F;`}
      bottom='24px'
    >
      <NavBar />
    </StyledFooterMobile>
  );
};
