// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { STIScoreChip } from './STIScoreChip'

function renderChip(score: number, compact?: boolean, showLabel?: boolean) {
  return render(
    <MitumbaThemeProvider>
      <STIScoreChip
        score={score}
        compact={compact}
        showLabel={showLabel}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

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

  describe('score ranges and color logic', () => {
    it('shows Trusted label and color for score 85–100', () => {
      renderChip(85)
      expect(screen.getByText('Trusted ★')).toBeInTheDocument()
      expect(screen.getByText('85')).toBeInTheDocument()
    })

    it('shows Trusted label for score 100', () => {
      renderChip(100)
      expect(screen.getByText('Trusted ★')).toBeInTheDocument()
    })

    it('shows Good label and color for score 60–84', () => {
      renderChip(60)
      expect(screen.getByText('Good')).toBeInTheDocument()
      expect(screen.getByText('60')).toBeInTheDocument()
    })

    it('shows Good label for score 84', () => {
      renderChip(84)
      expect(screen.getByText('Good')).toBeInTheDocument()
    })

    it('shows At risk label and color for score 40–59', () => {
      renderChip(40)
      expect(screen.getByText('At risk')).toBeInTheDocument()
      expect(screen.getByText('40')).toBeInTheDocument()
    })

    it('shows At risk label for score 59', () => {
      renderChip(59)
      expect(screen.getByText('At risk')).toBeInTheDocument()
    })

    it('shows Flagged label and color for score 20–39', () => {
      renderChip(20)
      expect(screen.getByText('Flagged')).toBeInTheDocument()
      expect(screen.getByText('20')).toBeInTheDocument()
    })

    it('shows Flagged label for score 39', () => {
      renderChip(39)
      expect(screen.getByText('Flagged')).toBeInTheDocument()
    })

    it('shows Suspended label and color for score 0–19', () => {
      renderChip(0)
      expect(screen.getByText('Suspended')).toBeInTheDocument()
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('shows Suspended label for score 19', () => {
      renderChip(19)
      expect(screen.getByText('Suspended')).toBeInTheDocument()
    })
  })

  describe('compact mode', () => {
    it('hides label when compact is true', () => {
      renderChip(92, true)
      expect(screen.queryByText('Trusted ★')).not.toBeInTheDocument()
      expect(screen.getByText('92')).toBeInTheDocument()
    })

    it('shows only score when compact', () => {
      renderChip(45, true)
      expect(screen.queryByText('At risk')).not.toBeInTheDocument()
      expect(screen.getByText('45')).toBeInTheDocument()
    })
  })

  describe('showLabel prop', () => {
    it('shows label when showLabel is true', () => {
      renderChip(92, true, true)
      expect(screen.getByText('Trusted ★')).toBeInTheDocument()
      expect(screen.getByText('92')).toBeInTheDocument()
    })

    it('hides label when showLabel is false', () => {
      renderChip(92, false, false)
      expect(screen.queryByText('Trusted ★')).not.toBeInTheDocument()
      expect(screen.getByText('92')).toBeInTheDocument()
    })
  })

  it('has accessible aria-label with score and label', () => {
    renderChip(92)
    expect(screen.getByLabelText('STI Score: 92, Trusted ★')).toBeInTheDocument()
  })
})
