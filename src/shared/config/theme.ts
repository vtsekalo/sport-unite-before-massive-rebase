import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgba(54, 119, 255, 1)',
      contrastText: 'rgba(255, 255, 255, 1)',
      dark: '#0056b3',
      light: 'rgba(25, 118, 210, 0.7)',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
    text: {
      primary: 'rgba(33, 33, 33, 0.87)',
      secondary: 'rgba(0, 0, 0, 1)',
      disabled: 'rgba(0, 0, 0, 0.4)',
    },
    grey: {
      50: '#f9f9f9',
      100: '#f0f0f0',
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  spacing: 4,

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { size: 'extraLarge' },
          style: {
            minHeight: 56,
            padding: '8px 22px',
            fontSize: '15px',
            lineHeight: 1.5,
          },
        },
        {
          props: { size: 'medium' },
          style: {
            minHeight: 40,
            padding: '6px 16px',
            fontSize: '15px',
            lineHeight: 1.5,
          },
        },
      ],
    },
  },
});

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    extraLarge: true;
    medium: true;
  }
}
