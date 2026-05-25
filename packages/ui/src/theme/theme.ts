import { createTheme } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'
import { tokens } from '@mitumba/tokens'

declare module '@mui/material/styles' {
  interface Palette {
    earth: Palette['primary']
  }

  interface PaletteOptions {
    earth?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    earth: true
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    earth: true
  }
}

export const mitumbaTheme: Theme = createTheme({
  spacing: (factor: number) => `${factor * 4}px`,
  breakpoints: {
    values: tokens.breakpoints,
  },
  palette: {
    mode: 'light',
    primary: {
      main: tokens.colors.green,
      light: tokens.colors.greenLight,
      dark: tokens.colors.greenDark,
      contrastText: tokens.colors.textOnGreen,
    },
    secondary: {
      main: tokens.colors.earth,
      light: tokens.colors.earthLight,
      dark: tokens.colors.earthDark,
      contrastText: tokens.colors.textOnEarth,
    },
    earth: {
      main: tokens.colors.earth,
      light: tokens.colors.earthLight,
      dark: tokens.colors.earthDark,
      contrastText: tokens.colors.textOnEarth,
    },
    success: {
      main: tokens.colors.success,
      light: tokens.colors.successLight,
      dark: tokens.colors.greenDark,
      contrastText: tokens.colors.textOnGreen,
    },
    error: {
      main: tokens.colors.error,
      light: tokens.colors.errorLight,
      dark: tokens.colors.error,
      contrastText: tokens.colors.white,
    },
    warning: {
      main: tokens.colors.warning,
      light: tokens.colors.warningLight,
      dark: tokens.colors.warning,
      contrastText: tokens.colors.textPrimary,
    },
    info: {
      main: tokens.colors.info,
      light: tokens.colors.infoLight,
      dark: tokens.colors.info,
      contrastText: tokens.colors.white,
    },
    background: {
      default: tokens.colors.background,
      paper: tokens.colors.surface,
    },
    divider: tokens.colors.divider,
    text: {
      primary: tokens.colors.textPrimary,
      secondary: tokens.colors.textSecondary,
      disabled: tokens.colors.textDisabled,
    },
    common: {
      black: tokens.colors.textPrimary,
      white: tokens.colors.white,
    },
  },
  shape: {
    borderRadius: tokens.radius.md,
  },
  shadows: [
    'none',
    tokens.shadows.card,
    tokens.shadows.card,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.elevated,
    tokens.shadows.bottomSheet,
    tokens.shadows.bottomSheet,
    tokens.shadows.bottomSheet,
    tokens.shadows.bottomSheet,
    tokens.shadows.bottomSheet,
    tokens.shadows.bottomSheet,
    tokens.shadows.bottomSheet,
    tokens.shadows.bottomSheet,
    tokens.shadows.bottomSheet,
  ],
  typography: {
    fontFamily: tokens.typography.fontFamily,
    fontWeightRegular: tokens.typography.fontWeights.regular,
    fontWeightMedium: tokens.typography.fontWeights.medium,
    fontWeightBold: tokens.typography.fontWeights.bold,
    h1: {
      fontSize: `${tokens.typography.fontSizes.display}px`,
      fontWeight: tokens.typography.fontWeights.extrabold,
      lineHeight: tokens.typography.lineHeights.tight,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    h2: {
      fontSize: `${tokens.typography.fontSizes.xxxl}px`,
      fontWeight: tokens.typography.fontWeights.bold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    h3: {
      fontSize: `${tokens.typography.fontSizes.xxl}px`,
      fontWeight: tokens.typography.fontWeights.bold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    h4: {
      fontSize: `${tokens.typography.fontSizes.xl}px`,
      fontWeight: tokens.typography.fontWeights.bold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    h5: {
      fontSize: `${tokens.typography.fontSizes.lg}px`,
      fontWeight: tokens.typography.fontWeights.semibold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    h6: {
      fontSize: `${tokens.typography.fontSizes.md}px`,
      fontWeight: tokens.typography.fontWeights.semibold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    body1: {
      fontSize: `${tokens.typography.fontSizes.md}px`,
      lineHeight: tokens.typography.lineHeights.normal,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    body2: {
      fontSize: `${tokens.typography.fontSizes.base}px`,
      lineHeight: tokens.typography.lineHeights.normal,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    button: {
      fontSize: `${tokens.typography.fontSizes.base}px`,
      fontWeight: tokens.typography.fontWeights.bold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
      textTransform: 'none',
    },
    caption: {
      fontSize: `${tokens.typography.fontSizes.sm}px`,
      lineHeight: tokens.typography.lineHeights.normal,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    overline: {
      fontSize: `${tokens.typography.fontSizes.xs}px`,
      fontWeight: tokens.typography.fontWeights.bold,
      lineHeight: tokens.typography.lineHeights.normal,
      letterSpacing: tokens.typography.letterSpacings.wider,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.colors.background,
          color: tokens.colors.textPrimary,
          fontFamily: tokens.typography.fontFamily,
        },
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        '::selection': {
          backgroundColor: tokens.colors.greenLight,
          color: tokens.colors.textPrimary,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          borderRadius: `${tokens.radius.lg}px`,
          minHeight: '44px',
          paddingInline: `${tokens.spacing.lg}px`,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: tokens.shadows.card,
          },
          '&.Mui-focusVisible': {
            boxShadow: tokens.shadows.focus,
          },
        },
        sizeSmall: {
          minHeight: '32px',
          paddingInline: `${tokens.spacing.base}px`,
          fontSize: `${tokens.typography.fontSizes.sm}px`,
        },
        sizeLarge: {
          minHeight: '56px',
          paddingInline: `${tokens.spacing.xl}px`,
          fontSize: `${tokens.typography.fontSizes.md}px`,
        },
        outlined: {
          borderColor: tokens.colors.border,
          '&:hover': {
            borderColor: tokens.colors.green,
            backgroundColor: tokens.colors.greenLight,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.radius.lg}px`,
          backgroundColor: tokens.colors.surface,
          boxShadow: tokens.shadows.card,
          border: `1px solid ${tokens.colors.divider}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: `${tokens.radius.lg}px`,
        },
        elevation1: {
          boxShadow: tokens.shadows.card,
        },
        elevation8: {
          boxShadow: tokens.shadows.bottomSheet,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.radius.md}px`,
          backgroundColor: tokens.colors.surface,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.border,
            borderWidth: '1px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
            borderWidth: '2px',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.error,
          },
          '&.Mui-focused': {
            boxShadow: tokens.shadows.focus,
          },
        },
        input: {
          paddingBlock: '12px',
          paddingInline: `${tokens.spacing.base}px`,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: tokens.colors.textSecondary,
          '&.Mui-focused': {
            color: tokens.colors.green,
          },
          '&.Mui-error': {
            color: tokens.colors.error,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: '0px',
          marginTop: `${tokens.spacing.xs}px`,
          fontSize: `${tokens.typography.fontSizes.sm}px`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.radius.full}px`,
          fontWeight: tokens.typography.fontWeights.semibold,
          '&.Mui-focusVisible': {
            boxShadow: tokens.shadows.focus,
          },
        },
        colorDefault: {
          backgroundColor: tokens.colors.background,
          color: tokens.colors.textSecondary,
          borderColor: tokens.colors.border,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          minHeight: '64px',
          backgroundColor: tokens.colors.surface,
          borderTop: `1px solid ${tokens.colors.divider}`,
          boxShadow: tokens.shadows.bottomSheet,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: tokens.colors.textSecondary,
          '&.Mui-selected': {
            color: tokens.colors.green,
          },
          '&.Mui-focusVisible': {
            boxShadow: tokens.shadows.focus,
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'inherit',
      },
      styleOverrides: {
        root: {
          backgroundColor: tokens.colors.surface,
          color: tokens.colors.textPrimary,
          borderBottom: `1px solid ${tokens.colors.divider}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: `${tokens.radius.xl}px`,
          boxShadow: tokens.shadows.bottomSheet,
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.radius.lg}px`,
          boxShadow: tokens.shadows.elevated,
          fontWeight: tokens.typography.fontWeights.semibold,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.radius.lg}px`,
          alignItems: 'center',
        },
        standardSuccess: {
          backgroundColor: tokens.colors.successLight,
          color: tokens.colors.greenDark,
        },
        standardError: {
          backgroundColor: tokens.colors.errorLight,
          color: tokens.colors.error,
        },
        standardWarning: {
          backgroundColor: tokens.colors.warningLight,
          color: tokens.colors.warning,
        },
        standardInfo: {
          backgroundColor: tokens.colors.infoLight,
          color: tokens.colors.info,
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.colors.divider,
          borderRadius: `${tokens.radius.md}px`,
        },
      },
    },
  },
})
