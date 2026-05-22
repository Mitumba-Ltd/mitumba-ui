// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { tokens } from '@mitumba/tokens'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from './provider'
import { mitumbaTheme } from './theme'

describe('mitumbaTheme', () => {
  it('maps core palette values from tokens', () => {
    expect(mitumbaTheme.palette.primary.main).toBe(tokens.colors.green)
    expect(mitumbaTheme.palette.secondary.main).toBe(tokens.colors.earth)
    expect(mitumbaTheme.palette.earth.main).toBe(tokens.colors.earth)
    expect(mitumbaTheme.palette.background.default).toBe(tokens.colors.background)
    expect(mitumbaTheme.palette.text.primary).toBe(tokens.colors.textPrimary)
  })

  it('maps typography and shape values from tokens', () => {
    expect(mitumbaTheme.typography.fontFamily).toBe(tokens.typography.fontFamily)
    expect(mitumbaTheme.typography.button.textTransform).toBe('none')
    expect(mitumbaTheme.shape.borderRadius).toBe(tokens.radius.md)
    expect(mitumbaTheme.breakpoints.values.xs).toBe(tokens.breakpoints.xs)
  })
})

describe('MitumbaThemeProvider', () => {
  it('provides Mitumba theme styles to MUI components', () => {
    render(
      <MitumbaThemeProvider>
        <Button>Sell now</Button>
        <TextField label="Search" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByRole('button', { name: 'Sell now' })).toBeInTheDocument()
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
  })

  it('can render without CssBaseline for embedded hosts', () => {
    render(
      <MitumbaThemeProvider disableCssBaseline>
        <Button color="earth">VAZI</Button>
      </MitumbaThemeProvider>,
    )

    expect(screen.getByRole('button', { name: 'VAZI' })).toBeInTheDocument()
  })
})
