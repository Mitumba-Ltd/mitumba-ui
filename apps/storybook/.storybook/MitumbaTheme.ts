import { create } from '@storybook/theming/create'
import { tokens } from '@mitumba/tokens'

export default create({
  base: 'light',
  brandTitle: 'Mitumba UI',
  brandUrl: 'https://mitumba.stanl.ink',
  brandTarget: '_self',

  // Colors
  colorPrimary: tokens.colors.green,
  colorSecondary: tokens.colors.earth,

  // UI
  appBg: tokens.colors.background,
  appContentBg: tokens.colors.surface,
  appBorderColor: tokens.colors.divider,
  appBorderRadius: tokens.radius.md,

  // Typography
  fontBase: tokens.typography.fontFamily,
  fontCode: 'monospace',

  // Text colors
  textColor: tokens.colors.textPrimary,
  textInverseColor: tokens.colors.white,

  // Toolbar default and active colors
  barTextColor: tokens.colors.textSecondary,
  barSelectedColor: tokens.colors.green,
  barBg: tokens.colors.surface,

  // Form colors
  inputBg: tokens.colors.surface,
  inputBorder: tokens.colors.divider,
  inputTextColor: tokens.colors.textPrimary,
  inputBorderRadius: tokens.radius.sm,
})
