import { createTheme } from '@mui/material';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    bodySmall: true;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    mediumFixed: true;
    veryBig: true;
    adaptive: true;
    classicWidthAction: true;
    fullWidthAction: true;
    littleSquare: true;
  }
  interface ButtonPropsVariantOverrides {
    lightBlue: true;
  }
}
declare module '@mui/material/Skeleton' {
  interface SkeletonPropsVariantOverrides {
    base: true;
    button: true;
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
      info: {
        main: '#3677FF',
      },
    },
    typography: {
      fontFamily: 'Roboto, "Arial", sans-serif',
      button: {
        fontWeight: 500,
        letterSpacing: '0.028em',
      },
    },
    shape: {
      borderRadius: 4,
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
      MuiTypography: {
        variants: [
          {
            props: { variant: 'bodySmall' },
            style: {
              fontSize: '14px',
              fontWeight: 400,
            },
          },
        ],
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            lineHeight: 1.5,
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
          {
            props: { size: 'veryBig' },
            style: {
              minHeight: isMobile ? 40 : 64,
            },
          },
          {
            props: { size: 'adaptive' },
            style: {
              minHeight: isMobile ? 48 : 40,
            },
          },
          {
            props: { size: 'classicWidthAction' },
            style: ({ theme }) => ({
              width: theme.spacing(5),
              height: theme.spacing(5),
              minWidth: theme.spacing(5),
              minHeight: theme.spacing(5),
              maxWidth: theme.spacing(5),
              maxHeight: theme.spacing(5),
            }),
          },
          {
            props: { size: 'littleSquare' },
            style: ({ theme }) => ({
              minWidth: theme.spacing(4),
              minHeight: theme.spacing(4),
              maxWidth: theme.spacing(4),
              maxHeight: theme.spacing(4),
            }),
          },
          {
            props: { size: 'fullWidthAction' },
            style: ({ theme }) => ({
              width: 'auto',
              height: theme.spacing(5),
              minHeight: theme.spacing(5),
              maxHeight: theme.spacing(5),
              padding: theme.spacing(1, 2),
            }),
          },
          {
            props: { variant: 'lightBlue' },
            style: {
              backgroundColor: '#EBF2FF',
              color: '#000000',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#D0E2FF',
              },
            },
          },
        ],
      },

      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: isMobile ? 'small' : 'medium',
        },
      },
      MuiSelect: {
        defaultProps: {
          size: isMobile ? 'small' : 'medium',
        },
      },
      MuiSkeleton: {
        variants: [
          {
            props: { variant: 'base' },
            style: {
              borderRadius: 10,
            },
          },
          {
            props: { variant: 'button' },
            style: {
              borderRadius: 12,
            },
          },
        ],
      },
    },
  });
