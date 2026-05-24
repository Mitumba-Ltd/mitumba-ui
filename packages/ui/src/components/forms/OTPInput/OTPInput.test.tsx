// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useState } from 'react'
import { MitumbaThemeProvider } from '../../../theme'
import { OTPInput } from './OTPInput'

afterEach(() => {
  cleanup()
})

const OTPInputWrapper = ({ initialValue = '', onComplete }: { initialValue?: string; onComplete?: (otp: string) => void }) => {
  const [value, setValue] = useState(initialValue)
  return <OTPInput value={value} onChange={setValue} onComplete={onComplete ?? (() => {})} />
}

describe('OTPInput', () => {
  it('renders 6 input fields', () => {
    render(
      <MitumbaThemeProvider>
        <OTPInput value="" onChange={() => {}} onComplete={() => {}} />
      </MitumbaThemeProvider>
    )
    expect(screen.getAllByRole('textbox')).toHaveLength(6)
  })

  it('calls onChange and onComplete when all 6 digits entered', () => {
    const onComplete = vi.fn()
    render(
      <MitumbaThemeProvider>
        <OTPInputWrapper onComplete={onComplete} />
      </MitumbaThemeProvider>
    )
    const inputs = screen.getAllByRole('textbox')
    fireEvent.change(inputs[0], { target: { value: '1' } })
    fireEvent.change(inputs[1], { target: { value: '2' } })
    fireEvent.change(inputs[2], { target: { value: '3' } })
    fireEvent.change(inputs[3], { target: { value: '4' } })
    fireEvent.change(inputs[4], { target: { value: '5' } })
    fireEvent.change(inputs[5], { target: { value: '6' } })
    expect(onComplete).toHaveBeenCalledWith('123456')
  })

  it('auto-advances focus on digit entry', () => {
    render(
      <MitumbaThemeProvider>
        <OTPInputWrapper />
      </MitumbaThemeProvider>
    )
    const inputs = screen.getAllByRole('textbox')
    inputs[0].focus()
    fireEvent.change(inputs[0], { target: { value: '1' } })
    expect(document.activeElement).toBe(inputs[1])
  })

  it('auto-backspaces to previous on delete', () => {
    render(
      <MitumbaThemeProvider>
        <OTPInputWrapper initialValue="123" />
      </MitumbaThemeProvider>
    )
    const inputs = screen.getAllByRole('textbox')
    inputs[2].focus()
    fireEvent.keyDown(inputs[2], { key: 'Backspace' })
    expect(document.activeElement).toBe(inputs[1])
  })

  it('supports paste across all fields', () => {
    const onComplete = vi.fn()
    render(
      <MitumbaThemeProvider>
        <OTPInputWrapper onComplete={onComplete} />
      </MitumbaThemeProvider>
    )
    const inputs = screen.getAllByRole('textbox')
    fireEvent.paste(inputs[0], { clipboardData: { getData: () => '987654' } })
    expect(onComplete).toHaveBeenCalledWith('987654')
  })

  it('adds shake animation on error', async () => {
    const { rerender } = render(
      <MitumbaThemeProvider>
        <OTPInput value="" onChange={() => {}} onComplete={() => {}} error={false} />
      </MitumbaThemeProvider>
    )
    rerender(
      <MitumbaThemeProvider>
        <OTPInput value="" onChange={() => {}} onComplete={() => {}} error />
      </MitumbaThemeProvider>
    )
    
    // The animation is on the flex container (parent of the inputs)
    const inputs = screen.getAllByRole('textbox')
    const animatedContainer = inputs[0].parentElement
    expect(animatedContainer).toHaveStyle('animation: shake 0.5s ease-in-out')
  })

  it('disables inputs when loading', () => {
    render(
      <MitumbaThemeProvider>
        <OTPInput value="" onChange={() => {}} onComplete={() => {}} loading />
      </MitumbaThemeProvider>
    )
    const inputs = screen.getAllByRole('textbox')
    expect(inputs[0]).toBeDisabled()
  })
})
