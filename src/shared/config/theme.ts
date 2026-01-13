import { Theme, createTheme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    mediumFixed: true;
  }
  interface ButtonPropsVariantOverrides {
    classicWidthAction: true;
    fullWidthAction: true;
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
        ],
      },

      MuiTextField: {
        defaultProps: {
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
