// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { STIScoreChip } from './STIScoreChip'

const HOST_FONT = '"Comic Sans MS", cursive'

function renderChip(score: number, compact?: boolean, showLabel?: boolean) {
  return render(
    <MitumbaThemeProvider>
      <STIScoreChip score={score} compact={compact} showLabel={showLabel} />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => { cleanup() })

describe('STIScoreChip', () => {
  it('renders the score number', () => {
    renderChip(92)
    expect(screen.getByText('92')).toBeInTheDocument()
  })

  it('clamps score above 100 to 100', () => {
    renderChip(150)
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('clamps score below 0 to 0', () => {
    renderChip(-10)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  describe('score ranges', () => {
    it('Trusted for 80+', () => {
      renderChip(85)
      expect(screen.getByText('Trusted')).toBeInTheDocument()
    })

    it('Good for 60-79', () => {
      renderChip(70)
      expect(screen.getByText('Good')).toBeInTheDocument()
    })

    it('At risk for 40-59', () => {
      renderChip(50)
      expect(screen.getByText('At risk')).toBeInTheDocument()
    })

    it('Flagged for 20-39', () => {
      renderChip(30)
      expect(screen.getByText('Flagged')).toBeInTheDocument()
    })

    it('Suspended for 0-19', () => {
      renderChip(10)
      expect(screen.getByText('Suspended')).toBeInTheDocument()
    })
  })

  describe('compact mode', () => {
    it('hides label when compact', () => {
      renderChip(92, true)
      expect(screen.queryByText('Trusted')).not.toBeInTheDocument()
      expect(screen.getByText('92')).toBeInTheDocument()
    })
  })

  describe('showLabel override', () => {
    it('shows label when showLabel=true even in compact', () => {
      renderChip(92, true, true)
      expect(screen.getByText('Trusted')).toBeInTheDocument()
    })

    it('hides label when showLabel=false', () => {
      renderChip(92, false, false)
      expect(screen.queryByText('Trusted')).not.toBeInTheDocument()
    })
  })

  it('has accessible aria-label', () => {
    renderChip(92)
    expect(screen.getByLabelText('STI Score: 92, Trusted')).toBeInTheDocument()
  })

  it('inherits the host theme typography.fontFamily (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <STIScoreChip score={92} />
      </ThemeProvider>,
    )

    expect(screen.getByText('92').style.fontFamily).toBe('')
    expect(screen.getByText('Trusted').style.fontFamily).toBe('')
  })
})
