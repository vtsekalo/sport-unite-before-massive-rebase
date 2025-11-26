import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    mediumFixed: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    mediumFixed: true;
  }
}

export const theme = (isMobile: boolean) =>
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: 'rgba(54, 119, 255, 1)',
        dark: '#0056b3',
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

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
        variants: [
          {
            props: { size: 'medium' },
            style: {
              minHeight: isMobile ? 40 : 56,
            },
          },
          {
            props: { size: 'mediumFixed' },
            style: {
              minHeight: 40,
            },
          },
          {
            props: { size: 'large' },
            style: {
              minHeight: 56,
            },
          },
        ],
      },

      MuiTextField: {
        defaultProps: {
          size: isMobile ? 'small' : 'medium',
        },
      },
    },
  });
