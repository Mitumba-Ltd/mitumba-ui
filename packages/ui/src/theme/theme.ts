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

// Professional Transitions (Benchmark: StaNLink UI)
const transitions = {
  standard: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const

export const mitumbaTheme: Theme = createTheme({
  // Spacing factor 4px (Mandate)
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
      dark: tokens.colors.successDark,
      contrastText: tokens.colors.textOnGreen,
    },
    error: {
      main: tokens.colors.error,
      light: tokens.colors.errorLight,
      dark: tokens.colors.errorDark,
      contrastText: tokens.colors.white,
    },
    warning: {
      main: tokens.colors.warning,
      light: tokens.colors.warningLight,
      dark: tokens.colors.warningDark,
      contrastText: tokens.colors.textPrimary,
    },
    info: {
      main: tokens.colors.info,
      light: tokens.colors.infoLight,
      dark: tokens.colors.infoDark,
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

  // Logically mapped shadow scale (Benchmark alignment)
  shadows: [
    'none',
    tokens.shadows.card, // 1: Card
    tokens.shadows.elevated, // 2: Elevated
    tokens.shadows.deep, // 3: Deep
    tokens.shadows.bottomSheet, // 4: BottomSheet
    tokens.shadows.focus, // 5: Focus
    tokens.shadows.green, // 6: Brand Green
    tokens.shadows.earth, // 7: Brand Earth
    'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none',
  ],

  typography: {
    fontFamily: tokens.typography.fontFamily,
    fontWeightRegular: tokens.typography.fontWeights.regular,
    fontWeightMedium: tokens.typography.fontWeights.medium,
    fontWeightBold: tokens.typography.fontWeights.bold,
    h1: {
      fontSize: `${tokens.typography.fontSizes.display}px`,
      fontWeight: tokens.typography.fontWeights.extrabold,
      lineHeight: 1.1,
    },
    h2: {
      fontSize: `${tokens.typography.fontSizes.xxxl}px`,
      fontWeight: tokens.typography.fontWeights.bold,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: `${tokens.typography.fontSizes.xxl}px`,
      fontWeight: tokens.typography.fontWeights.bold,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: `${tokens.typography.fontSizes.md}px`,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: `${tokens.typography.fontSizes.base}px`,
      lineHeight: 1.5,
    },
    button: {
      fontSize: `${tokens.typography.fontSizes.base}px`,
      fontWeight: 600,
      textTransform: 'none',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: tokens.colors.background,
          color: tokens.colors.textPrimary,
          fontFamily: tokens.typography.fontFamily,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: `${tokens.radius.md}px`,
          padding: theme.spacing(2.5, 6), // 10px 24px (Tight Proportions)
          transition: transitions.standard,
          fontWeight: 600,
          '&:hover': {
            transform: 'translateY(-2px) scale(1.02)',
          },
          '&:active': {
            transform: 'translateY(0) scale(0.98)',
          },
          '&.Mui-disabled': {
            backgroundColor: tokens.colors.divider,
            color: tokens.colors.textDisabled,
          },
        }),
        containedPrimary: {
          backgroundColor: tokens.colors.green,
          '&:hover': {
            backgroundColor: tokens.colors.greenDark,
            boxShadow: tokens.shadows.green,
          },
        },
        containedSecondary: {
          backgroundColor: tokens.colors.earth,
          '&:hover': {
            backgroundColor: tokens.colors.earthDark,
            boxShadow: tokens.shadows.earth,
          },
        },
        outlinedPrimary: {
          borderWidth: '2px !important',
          '&:hover': {
            backgroundColor: `${tokens.colors.green}0A`,
          },
        },
        sizeSmall: ({ theme }) => ({
          padding: theme.spacing(1.5, 4), // 6px 16px
          fontSize: `${tokens.typography.fontSizes.sm}px`,
        }),
        sizeLarge: ({ theme }) => ({
          padding: theme.spacing(3, 8), // 12px 32px
          fontSize: `${tokens.typography.fontSizes.md}px`,
        }),
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.radius.lg}px`,
          backgroundColor: tokens.colors.surface,
          boxShadow: tokens.shadows.card,
          transition: transitions.standard,
          border: '1px solid',
          borderColor: tokens.colors.divider,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: tokens.shadows.elevated,
            borderColor: tokens.colors.border,
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: false, // Remove disastrous default
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.radius.md}px`,
          backgroundColor: tokens.colors.surface,
          transition: transitions.standard,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.border,
            borderWidth: '1px',
            transition: transitions.standard,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.colors.green,
            borderWidth: '2px',
          },
          '&.Mui-focused': {
            boxShadow: tokens.shadows.focus,
          },
        },
        input: ({ theme }) => ({
          paddingBlock: theme.spacing(3), // 12px
          paddingInline: theme.spacing(4), // 16px
          height: '24px', // Standard height
        }),
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          transition: transitions.spring,
          cursor: 'pointer',
          '&:hover': {
            transform: 'perspective(500px) rotateY(15deg) rotateX(-5deg) scale(1.1)',
            boxShadow: tokens.shadows.elevated,
          },
          '&:active': {
            transform: 'perspective(500px) rotateY(0deg) rotateX(0deg) scale(1.05)',
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: `${tokens.radius.full}px`,
          height: theme.spacing(8), // 32px
          paddingInline: theme.spacing(1),
          fontWeight: 600,
          transition: transitions.standard,
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: tokens.shadows.card,
          },
        }),
        sizeSmall: ({ theme }) => ({
          height: theme.spacing(6), // 24px
        }),
      },
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: tokens.colors.surface,
          color: tokens.colors.textPrimary,
          borderBottom: '1px solid',
          borderColor: tokens.colors.divider,
        },
      },
    },

    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.colors.surface,
          borderTop: '1px solid',
          borderColor: tokens.colors.divider,
          boxShadow: tokens.shadows.bottomSheet,
        },
      },
    },
  },
})
