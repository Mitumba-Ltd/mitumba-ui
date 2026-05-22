// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaTextField } from './MitumbaTextField'
import type { MitumbaTextFieldProps } from './MitumbaTextField.types'

function renderTextField(props: Partial<MitumbaTextFieldProps> = {}) {
  const textFieldProps: MitumbaTextFieldProps = {
    disabled: false,
    error: undefined,
    hint: 'Enter your text',
    label: undefined,
    multiline: false,
    onChange: vi.fn(),
    prefix: undefined,
    rows: undefined,
    suffix: undefined,
    type: 'text',
    value: '',
    ...props,
  }

  return render(
    <MitumbaThemeProvider>
      <MitumbaTextField
        disabled={textFieldProps.disabled}
        error={textFieldProps.error}
        hint={textFieldProps.hint}
        label={textFieldProps.label}
        multiline={textFieldProps.multiline}
        onChange={textFieldProps.onChange}
        prefix={textFieldProps.prefix}
        rows={textFieldProps.rows}
        suffix={textFieldProps.suffix}
        type={textFieldProps.type}
        value={textFieldProps.value}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaTextField', () => {
  it('renders input with placeholder text', () => {
    renderTextField({ hint: 'Your full name' })

    expect(screen.getByPlaceholderText('Your full name')).toBeInTheDocument()
  })

  it('calls onChange when typing', () => {
    const onChange = vi.fn()
    renderTextField({ onChange })

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'New value' },
    })

    expect(onChange).toHaveBeenCalledWith('New value')
  })

  it('displays label when provided', () => {
    renderTextField({ label: 'Email address' })

    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
  })

  it('renders error state with helper text', () => {
    renderTextField({
      hint: 'Phone number',
      error: 'Phone number is required',
      value: '',
      onChange: vi.fn(),
    })

    expect(screen.getByText('Phone number is required')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is true', () => {
    renderTextField({ disabled: true })

    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders prefix and suffix adornments', () => {
    renderTextField({
      prefix: <span data-testid="prefix">KES</span>,
      suffix: <span data-testid="suffix">.00</span>,
    })

    expect(screen.getByTestId('prefix')).toBeInTheDocument()
    expect(screen.getByTestId('suffix')).toBeInTheDocument()
  })
})
