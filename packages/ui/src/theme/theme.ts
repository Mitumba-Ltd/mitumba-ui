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
    borderRadius: tokens.radius.md, // 8px default
  },

  shadows: [
    'none',
    tokens.shadows.card, // 1
    tokens.shadows.elevated, // 2
    tokens.shadows.deep, // 3
    tokens.shadows.bottomSheet, // 4
    tokens.shadows.focus, // 5
    tokens.shadows.green, // 6
    tokens.shadows.earth, // 7
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
    h4: {
      fontSize: `${tokens.typography.fontSizes.xl}px`,
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
    caption: {
      fontSize: `${tokens.typography.fontSizes.sm}px`,
      lineHeight: 1.5,
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
      },
      styleOverrides: {
        root: {
          borderRadius: `${tokens.radius.md}px`,
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
            borderColor: tokens.colors.divider,
          },
        },
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
          borderColor: tokens.colors.border,
          color: tokens.colors.textPrimary,
          '&:hover': {
            backgroundColor: tokens.colors.background,
            borderColor: tokens.colors.green,
            color: tokens.colors.green,
          },
        },
        textPrimary: {
          color: tokens.colors.textSecondary,
          '&:hover': {
            backgroundColor: tokens.colors.background,
            color: tokens.colors.textPrimary,
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.radius.xl}px`,
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

    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: `${tokens.radius.xl}px`,
        },
        elevation1: {
          boxShadow: tokens.shadows.card,
        },
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
            borderColor: tokens.colors.textDisabled,
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
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          transition: transitions.spring,
          cursor: 'pointer',
          '&:hover': {
            transform: 'perspective(1000px) rotateY(15deg) rotateX(-5deg) scale(1.1)',
            boxShadow: tokens.shadows.elevated,
          },
          '&:active': {
            transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)',
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: `${tokens.radius.xxxl}px`,
          boxShadow: tokens.shadows.bottomSheet,
          backgroundImage: 'none',
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: `${tokens.radius.lg}px`,
          alignItems: 'center',
        },
      },
    },
  },
})
