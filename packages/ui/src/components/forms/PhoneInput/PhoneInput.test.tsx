// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaFormatProvider } from '../../../format'
import type { PhoneFormat } from '../../../format'
import { PhoneInput } from './PhoneInput'

const NIGERIA: PhoneFormat = { callingCode: '+234', nationalLength: [10], example: '+2348031234567' }

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

  it('keeps the default placeholder', () => {
    render(<MitumbaThemeProvider><PhoneInput value="" onChange={vi.fn()} /></MitumbaThemeProvider>)
    expect(screen.getByPlaceholderText('7XX XXX XXX')).toBeInTheDocument()
  })

  it('keeps every digit of a partly typed number when not focused', () => {
    render(<MitumbaThemeProvider><PhoneInput value="71234" onChange={vi.fn()} /></MitumbaThemeProvider>)
    expect(screen.getByRole('textbox')).toHaveValue('712 34')
  })

  it('follows the provider numbering plan', () => {
    const onChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaFormatProvider phone={NIGERIA}>
          <PhoneInput value="8031234567" onChange={onChange} />
        </MitumbaFormatProvider>
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText('+234')).toBeInTheDocument()
    expect(screen.queryByText('+254')).not.toBeInTheDocument()
    expect(screen.getByPlaceholderText('8XX XXX XXXX')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveValue('803 123 4567')
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '80312345678999' } })
    expect(onChange).toHaveBeenLastCalledWith('8031234567')
  })

  it('lets the phone prop override the provider', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaFormatProvider phone={NIGERIA}>
          <PhoneInput value="" onChange={vi.fn()} phone={{ callingCode: '+256', nationalLength: [9], example: '+256712345678' }} />
        </MitumbaFormatProvider>
      </MitumbaThemeProvider>,
    )
    expect(screen.getByText('+256')).toBeInTheDocument()
    expect(screen.queryByText('+234')).not.toBeInTheDocument()
  })
})
