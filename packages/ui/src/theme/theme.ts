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

const focusVisibleStyles = {
  outline: `${tokens.spacing.xs / tokens.spacing.xs}px solid transparent`,
  boxShadow: tokens.shadows.focus,
} as const

export const mitumbaTheme: Theme = createTheme({
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
      fontSize: tokens.typography.fontSizes.display,
      fontWeight: tokens.typography.fontWeights.extrabold,
      lineHeight: tokens.typography.lineHeights.tight,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    h2: {
      fontSize: tokens.typography.fontSizes.xxxl,
      fontWeight: tokens.typography.fontWeights.bold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    h3: {
      fontSize: tokens.typography.fontSizes.xxl,
      fontWeight: tokens.typography.fontWeights.bold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    h4: {
      fontSize: tokens.typography.fontSizes.xl,
      fontWeight: tokens.typography.fontWeights.bold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    h5: {
      fontSize: tokens.typography.fontSizes.lg,
      fontWeight: tokens.typography.fontWeights.semibold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    h6: {
      fontSize: tokens.typography.fontSizes.md,
      fontWeight: tokens.typography.fontWeights.semibold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    body1: {
      fontSize: tokens.typography.fontSizes.md,
      lineHeight: tokens.typography.lineHeights.normal,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    body2: {
      fontSize: tokens.typography.fontSizes.base,
      lineHeight: tokens.typography.lineHeights.normal,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    button: {
      fontSize: tokens.typography.fontSizes.base,
      fontWeight: tokens.typography.fontWeights.bold,
      lineHeight: tokens.typography.lineHeights.snug,
      letterSpacing: tokens.typography.letterSpacings.normal,
      textTransform: 'none',
    },
    caption: {
      fontSize: tokens.typography.fontSizes.sm,
      lineHeight: tokens.typography.lineHeights.normal,
      letterSpacing: tokens.typography.letterSpacings.normal,
    },
    overline: {
      fontSize: tokens.typography.fontSizes.xs,
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
          borderRadius: tokens.radius.lg,
          minHeight: tokens.spacing.xxl,
          paddingInline: tokens.spacing.lg,
          paddingBlock: tokens.spacing.md,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: tokens.shadows.card,
          },
          '&.Mui-focusVisible': focusVisibleStyles,
        },
        sizeSmall: {
          minHeight: tokens.spacing.xl,
          paddingInline: tokens.spacing.base,
          paddingBlock: tokens.spacing.sm,
          fontSize: tokens.typography.fontSizes.sm,
        },
        sizeLarge: {
          minHeight: tokens.spacing.xxxl,
          paddingInline: tokens.spacing.xl,
          paddingBlock: tokens.spacing.base,
          fontSize: tokens.typography.fontSizes.md,
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
          borderRadius: tokens.radius.lg,
          backgroundColor: tokens.colors.surface,
          boxShadow: tokens.shadows.card,
          border: `${tokens.spacing.xs / tokens.spacing.xs}px solid ${tokens.colors.divider}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: tokens.radius.lg,
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
          borderRadius: tokens.radius.md,
          backgroundColor: tokens.colors.surface,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.border,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
            borderWidth: tokens.spacing.xs / tokens.spacing.xs,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.error,
          },
          '&.Mui-focused': focusVisibleStyles,
        },
        input: {
          paddingBlock: tokens.spacing.md,
          paddingInline: tokens.spacing.base,
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
          marginInline: tokens.spacing.sm,
          fontSize: tokens.typography.fontSizes.sm,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.full,
          fontWeight: tokens.typography.fontWeights.semibold,
          '&.Mui-focusVisible': focusVisibleStyles,
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
          minHeight: tokens.spacing.xxxl,
          backgroundColor: tokens.colors.surface,
          borderTop: `${tokens.spacing.xs / tokens.spacing.xs}px solid ${tokens.colors.divider}`,
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
          '&.Mui-focusVisible': focusVisibleStyles,
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
          borderBottom: `${tokens.spacing.xs / tokens.spacing.xs}px solid ${tokens.colors.divider}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: tokens.radius.xl,
          boxShadow: tokens.shadows.bottomSheet,
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.shadows.elevated,
          fontWeight: tokens.typography.fontWeights.semibold,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.lg,
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
          borderRadius: tokens.radius.md,
        },
      },
    },
  },
})
