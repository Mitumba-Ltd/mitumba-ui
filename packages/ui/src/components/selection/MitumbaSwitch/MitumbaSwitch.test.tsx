// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaSwitch } from './MitumbaSwitch'
import type { MitumbaSwitchProps } from './MitumbaSwitch.types'

function renderSwitch(props: MitumbaSwitchProps) {
  return render(
    <MitumbaThemeProvider>
      <MitumbaSwitch 
        on={props.on}
        onChange={props.onChange}
        label={props.label}
        disabled={props.disabled}
        sx={props.sx}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaSwitch', () => {
  it('renders with a label', () => {
    renderSwitch({ label: 'Airplane mode', on: false, onChange: () => {} })
    expect(screen.getByText('Airplane mode')).toBeInTheDocument()
  })

  it('calls onChange when clicked', () => {
    const onChange = vi.fn()
    renderSwitch({ label: 'Wifi', on: false, onChange })
    
    fireEvent.click(screen.getByLabelText('Wifi'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('reflects on state', () => {
    renderSwitch({ label: 'Wifi', on: true, onChange: () => {} })
    expect(screen.getByLabelText('Wifi')).toBeChecked()
  })

  it('respects disabled state', () => {
    const onChange = vi.fn()
    renderSwitch({ label: 'Disabled', disabled: true, on: false, onChange })
    
    const toggle = screen.getByLabelText('Disabled')
    expect(toggle).toBeDisabled()
    
    fireEvent.click(toggle)
    expect(onChange).not.toHaveBeenCalled()
  })
})
