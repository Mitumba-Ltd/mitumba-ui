// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { PhoneInput } from './PhoneInput'

afterEach(() => {
  cleanup()
})

describe('PhoneInput', () => {
  it('renders with +254 prefix', () => {
    render(
      <MitumbaThemeProvider>
        <PhoneInput value="" onChange={() => {}} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('+254')).toBeInTheDocument()
  })

  it('calls onChange with digits only', () => {
    const onChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <PhoneInput value="" onChange={onChange} />
      </MitumbaThemeProvider>
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'abc712345678' } })
    expect(onChange).toHaveBeenCalledWith('712345678')
  })

  it('limits to 9 digits', () => {
    const onChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <PhoneInput value="" onChange={onChange} />
      </MitumbaThemeProvider>
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '7123456789' } })
    expect(onChange).toHaveBeenCalledWith('712345678')
  })

  it('formats on blur', () => {
    const onChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <PhoneInput value="712345678" onChange={onChange} />
      </MitumbaThemeProvider>
    )
    const input = screen.getByRole('textbox')
    fireEvent.blur(input)
    expect(input).toHaveValue('712 345 678')
  })

  it('shows error message', () => {
    render(
      <MitumbaThemeProvider>
        <PhoneInput value="" onChange={() => {}} error="Invalid number" />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Invalid number')).toBeInTheDocument()
  })

  it('respects disabled state', () => {
    render(
      <MitumbaThemeProvider>
        <PhoneInput value="" onChange={() => {}} disabled />
      </MitumbaThemeProvider>
    )
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })
})
