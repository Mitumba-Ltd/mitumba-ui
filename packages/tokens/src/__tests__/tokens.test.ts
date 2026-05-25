import { describe, expect, it } from 'vitest'
import { tokens } from '../index'

const expectedTokens = {
  colors: {
    // Brand
    green: '#3D9A52',
    greenLight: '#EAF5EC',
    greenDark: '#2C7A3E',
    earth: '#A06235',
    earthLight: '#F5EDE5',
    earthDark: '#7D4A24',

    // Neutrals
    white: '#FFFFFF',
    background: '#F7F7F5',
    surface: '#FFFFFF',
    divider: '#EAEAE7',
    border: '#D9D9D5',

    // Text
    textPrimary: '#1A1A18',
    textSecondary: '#6B6B65',
    textDisabled: '#ADADA8',
    textOnGreen: '#FFFFFF',
    textOnEarth: '#FFFFFF',

    // Semantic
    success: '#3D9A52',
    successLight: '#EAF5EC',
    successDark: '#2C7A3E',
    error: '#D93025',
    errorLight: '#FCECEB',
    errorDark: '#A52714',
    warning: '#E67E22',
    warningLight: '#FEF3E2',
    warningDark: '#D35400',
    info: '#2E86C1',
    infoLight: '#E8F4FD',
    infoDark: '#1B4F72',

    // STI Score
    stiTrusted: '#3D9A52',
    stiGood: '#2E86C1',
    stiAtRisk: '#E67E22',
    stiFlagged: '#D93025',
    stiSuspended: '#6B6B65',
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 6,
    md: 8,
    base: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 48,
    giant: 64,
  },
  typography: {
    fontFamily: '"Nunito", "Helvetica Neue", Arial, sans-serif',
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    fontSizes: {
      xs: 11,
      sm: 12,
      base: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 22,
      xxxl: 26,
      display: 32,
    },
    lineHeights: {
      tight: 1.2,
      snug: 1.35,
      normal: 1.5,
      relaxed: 1.6,
    },
    letterSpacings: {
      tight: '-0.5px',
      normal: '0px',
      wide: '0.1px',
      wider: '0.3px',
    },
  },
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },
  shadows: {
    card: '0px 1px 3px rgba(0,0,0,0.06), 0px 1px 2px rgba(0,0,0,0.12)',
    elevated: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
    deep: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)',
    bottomSheet: '0px -4px 24px rgba(0,0,0,0.08)',
    focus: '0 0 0 3px rgba(61,154,82,0.25)',
    green: '0 8px 20px rgba(61, 154, 82, 0.2)',
    earth: '0 8px 20px rgba(160, 98, 53, 0.2)',
  },
  breakpoints: {
    xs: 375,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
} as const

describe('tokens', () => {
  it('exports the exact Phase 1 token object', () => {
    expect(tokens).toStrictEqual(expectedTokens)
  })

  it('defines every color as a hex string', () => {
    const hexColor = /^#[0-9A-F]{6}$/

    Object.values(tokens.colors).forEach((color) => {
      expect(color).toMatch(hexColor)
    })
  })
})
