// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaRadio } from './MitumbaRadio'
import type { MitumbaRadioProps } from './MitumbaRadio.types'

function renderRadio(props: MitumbaRadioProps) {
  return render(
    <MitumbaThemeProvider>
      <MitumbaRadio 
        selected={props.selected}
        value={props.value}
        label={props.label}
        onChange={props.onChange}
        disabled={props.disabled}
        sx={props.sx}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaRadio', () => {
  it('renders with a label', () => {
    renderRadio({ label: 'Pick me', value: '1', selected: false, onChange: () => {} })
    expect(screen.getByText('Pick me')).toBeInTheDocument()
  })

  it('calls onChange when clicked', () => {
    const onChange = vi.fn()
    renderRadio({ label: 'Option 1', value: '1', selected: false, onChange })
    
    fireEvent.click(screen.getByLabelText('Option 1'))
    expect(onChange).toHaveBeenCalledWith('1')
  })

  it('reflects selected state', () => {
    renderRadio({ label: 'Option 1', value: '1', selected: true, onChange: () => {} })
    expect(screen.getByLabelText('Option 1')).toBeChecked()
  })

  it('respects disabled state', () => {
    const onChange = vi.fn()
    renderRadio({ label: 'Disabled', value: '1', disabled: true, selected: false, onChange })
    
    const radio = screen.getByLabelText('Disabled')
    expect(radio).toBeDisabled()
    
    fireEvent.click(radio)
    expect(onChange).not.toHaveBeenCalled()
  })
})
