// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { MitumbaSelect } from './MitumbaSelect'
import type { MitumbaSelectProps } from './MitumbaSelect.types'

const HOST_FONT = '"Comic Sans MS", cursive'

const defaultCities = [
  { value: 'nairobi', label: 'Nairobi' },
  { value: 'kisumu', label: 'Kisumu' },
  { value: 'mombasa', label: 'Mombasa' },
]

function renderSelect(props: Partial<MitumbaSelectProps> = {}) {
  const selectProps: MitumbaSelectProps = {
    disabled: false,
    error: undefined,
    label: 'City',
    onChange: vi.fn(),
    options: defaultCities,
    value: '',
    ...props,
  }

  return render(
    <MitumbaThemeProvider>
      <MitumbaSelect
        disabled={selectProps.disabled}
        error={selectProps.error}
        label={selectProps.label}
        onChange={selectProps.onChange}
        options={selectProps.options}
        value={selectProps.value}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaSelect', () => {
  it('renders the label', () => {
    renderSelect({ label: 'Select city' })

    expect(screen.getByLabelText('Select city')).toBeInTheDocument()
  })

  it('displays all options when opened', () => {
    renderSelect()

    fireEvent.mouseDown(screen.getByLabelText('City'))

    const listbox = screen.getByRole('listbox')

    expect(within(listbox).getByText('Nairobi')).toBeInTheDocument()
    expect(within(listbox).getByText('Kisumu')).toBeInTheDocument()
    expect(within(listbox).getByText('Mombasa')).toBeInTheDocument()
  })

  it('calls onChange when an option is selected', () => {
    const onChange = vi.fn()
    renderSelect({ onChange })

    fireEvent.mouseDown(screen.getByLabelText('City'))
    fireEvent.click(screen.getByText('Kisumu'))

    expect(onChange).toHaveBeenCalledWith('kisumu')
  })

  it('displays error message when error is provided', () => {
    renderSelect({ error: 'Please select a city' })

    expect(screen.getByText('Please select a city')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    renderSelect({ disabled: true })

    expect(screen.getByLabelText('City')).toHaveAttribute('aria-disabled', 'true')
  })

  it('shows the pre-selected value', () => {
    renderSelect({ value: 'mombasa' })

    expect(screen.getByLabelText('City')).toHaveTextContent('Mombasa')
  })

  it('inherits the host theme typography.fontFamily on the select (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <MitumbaSelect label="City" value="mombasa" onChange={vi.fn()} options={defaultCities} />
      </ThemeProvider>,
    )

    const selectRoot = screen.getByLabelText('City').closest('.MuiOutlinedInput-root') as HTMLElement
    expect(selectRoot).not.toBeNull()
    expect(selectRoot.style.fontFamily).toBe('')
  })
})
