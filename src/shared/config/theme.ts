import { Theme, createTheme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    mediumFixed: true;
    veryBig: true;
  }
  interface ButtonPropsVariantOverrides {
    classicWidthAction: true;
    fullWidthAction: true;
    lightBlue: true;
  }
}

const getActionButtonCommonStyles = (theme: Theme) => ({
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  textTransform: 'uppercase' as const,
  fontWeight: 600,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
});

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
      MuiButton: {
        defaultProps: {
          variant: 'contained',
          size: 'medium',
        },
        styleOverrides: {
          root: {
            width: '100%',
            borderRadius: 4,
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
            props: { variant: 'classicWidthAction' },
            style: ({ theme }) => ({
              ...getActionButtonCommonStyles(theme),
              width: theme.spacing(5),
              height: theme.spacing(5),
              minWidth: theme.spacing(5),
              minHeight: theme.spacing(5),
              maxWidth: theme.spacing(5),
              maxHeight: theme.spacing(5),
            }),
          },
          {
            props: { variant: 'fullWidthAction' },
            style: ({ theme }) => ({
              ...getActionButtonCommonStyles(theme),
              width: 'auto',
              height: theme.spacing(5),
              minHeight: theme.spacing(5),
              maxHeight: theme.spacing(5),
              gap: theme.spacing(1),
              padding: theme.spacing(1, 2),
              '&.Mui-disabled': {
                backgroundColor: theme.palette.grey[400],
                color: theme.palette.text.disabled,
              },
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
    },
  });
