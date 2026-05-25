// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaDatePicker } from './MitumbaDatePicker'
import type { MitumbaDatePickerProps } from './MitumbaDatePicker.types'

function renderDatePicker(props: MitumbaDatePickerProps) {
  return render(
    <MitumbaThemeProvider>
      <MitumbaDatePicker 
        value={props.value}
        onChange={props.onChange}
        label={props.label}
        hint={props.hint}
        disabled={props.disabled}
        size={props.size}
        sx={props.sx}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaDatePicker', () => {
  it('renders with a label and correct value', () => {
    const date = new Date(2022, 10, 15) // Nov 15, 2022
    renderDatePicker({ label: 'Birthday', value: date, onChange: () => {} })
    
    expect(screen.getByText('Birthday')).toBeInTheDocument()
    // Local date format for Kenya (DD/MM/YYYY)
    expect(screen.getByDisplayValue('15/11/2022')).toBeInTheDocument()
  })

  it('opens calendar popover on click', () => {
    renderDatePicker({ value: null, onChange: () => {} })
    
    fireEvent.click(screen.getByPlaceholderText('Select date'))
    expect(screen.getByRole('presentation')).toBeInTheDocument() // Popover role
  })

  it('calls onChange when a date is clicked', () => {
    const onChange = vi.fn()
    renderDatePicker({ value: null, onChange })
    
    fireEvent.click(screen.getByPlaceholderText('Select date'))
    
    // Find a day in the calendar and click it
    const day = screen.getByText('15')
    fireEvent.click(day)
    
    expect(onChange).toHaveBeenCalledWith(expect.any(Date))
  })
})
