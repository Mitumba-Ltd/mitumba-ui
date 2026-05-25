// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaCheckbox } from './MitumbaCheckbox'
import type { MitumbaCheckboxProps } from './MitumbaCheckbox.types'

function renderCheckbox(props: MitumbaCheckboxProps) {
  return render(
    <MitumbaThemeProvider>
      <MitumbaCheckbox 
        checked={props.checked}
        onChange={props.onChange}
        label={props.label}
        disabled={props.disabled}
        indeterminate={props.indeterminate}
        sx={props.sx}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaCheckbox', () => {
  it('renders with a label', () => {
    renderCheckbox({ label: 'Remember me', checked: false, onChange: () => {} })
    expect(screen.getByText('Remember me')).toBeInTheDocument()
  })

  it('calls onChange when clicked', () => {
    const onChange = vi.fn()
    renderCheckbox({ label: 'Accept', checked: false, onChange })
    
    fireEvent.click(screen.getByLabelText('Accept'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('reflects checked state', () => {
    renderCheckbox({ label: 'Accept', checked: true, onChange: () => {} })
    expect(screen.getByLabelText('Accept')).toBeChecked()
  })

  it('supports indeterminate state', () => {
    renderCheckbox({ label: 'Select All', indeterminate: true, onChange: () => {} })
    const checkbox = screen.getByLabelText('Select All')
    expect((checkbox as HTMLInputElement).indeterminate).toBe(true)
  })

  it('respects disabled state', () => {
    const onChange = vi.fn()
    renderCheckbox({ label: 'Disabled', disabled: true, checked: false, onChange })
    
    const checkbox = screen.getByLabelText('Disabled')
    expect(checkbox).toBeDisabled()
    
    fireEvent.click(checkbox)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('renders without a label as an accessible checkbox', () => {
    renderCheckbox({ checked: false, onChange: () => {} })
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })
})
