import { Box, BoxProps, styled } from '@mui/material';

const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 20,
  position: 'absolute',
  display: 'flex',
  top: '24px',
  borderRadius: '10px',
  minWidth: '361px',
  boxShadow: `0px 3px 5px -1px #00000033;
              0px 6px 10px 0px #00000024;
              0px 1px 18px 0px #0000001F;`,
  backgroundColor: 'rgba(255, 255, 255, 1)',

  [theme.breakpoints.down('md')]: {
    height: 56,
  },
}));

type LogoProps = BoxProps & {
  src?: string;
  alt?: string;
};

const LogoWrapper = styled(Box)<LogoProps>(() => ({
  cursor: 'pointer',
}));

const ProfileButton = styled(Box)(() => ({
  cursor: 'pointer',
}));

export const Styled = {
  HeaderWrapper,
  LogoWrapper,
  ProfileButton,
};
