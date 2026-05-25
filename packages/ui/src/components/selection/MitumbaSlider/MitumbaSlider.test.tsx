// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaSlider } from './MitumbaSlider'
import type { MitumbaSliderProps } from './MitumbaSlider.types'

function renderSlider(props: MitumbaSliderProps) {
  return render(
    <MitumbaThemeProvider>
      <MitumbaSlider 
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        max={props.max}
        step={props.step}
        label={props.label}
        disabled={props.disabled}
        showTooltip={props.showTooltip}
        sx={props.sx}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaSlider', () => {
  it('renders with a label', () => {
    renderSlider({ label: 'Volume', value: 50, onChange: () => {} })
    expect(screen.getByText('Volume')).toBeInTheDocument()
  })

  it('reflects correct value', () => {
    renderSlider({ label: 'Volume', value: 75, onChange: () => {} })
    const slider = screen.getByRole('slider')
    expect(slider).toHaveValue('75')
  })

  it('respects disabled state', () => {
    renderSlider({ label: 'Volume', value: 50, disabled: true, onChange: () => {} })
    const slider = screen.getByRole('slider')
    // MUI Slider might set disabled attribute on the hidden input
    expect(slider).toBeDisabled()
  })
})
