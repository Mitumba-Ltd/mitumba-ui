// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { QuietHoursField, isOvernight } from './QuietHoursField'
import type { QuietHoursFieldProps, QuietHoursValue } from './QuietHoursField.types'

expect.extend(toHaveNoViolations)

const NIGHT: QuietHoursValue = { enabled: true, start: '21:00', end: '07:00' }

function renderField({ value = NIGHT, label, description, timeZoneLabel, disabled }: Partial<QuietHoursFieldProps> = {}) {
  const onChange = vi.fn()
  const view = render(
    <MitumbaThemeProvider>
      <QuietHoursField value={value} onChange={onChange} label={label} description={description} timeZoneLabel={timeZoneLabel} disabled={disabled} />
    </MitumbaThemeProvider>,
  )
  return { onChange, ...view }
}

afterEach(() => { cleanup() })

describe('QuietHoursField', () => {
  it('shows the switch and both times', () => {
    renderField({ timeZoneLabel: 'Africa/Nairobi', description: 'Pop-ups wait until morning.' })
    expect(screen.getByRole('switch', { name: 'Quiet hours' })).toBeChecked()
    expect(screen.getByLabelText('From')).toHaveValue('21:00')
    expect(screen.getByLabelText('To')).toHaveValue('07:00')
    expect(screen.getByText('Times are in Africa/Nairobi')).toBeInTheDocument()
    expect(screen.getByText('Pop-ups wait until morning.')).toBeInTheDocument()
  })

  it('reports the whole value when the switch changes', () => {
    const { onChange } = renderField()
    fireEvent.click(screen.getByRole('switch', { name: 'Quiet hours' }))
    expect(onChange).toHaveBeenCalledWith({ enabled: false, start: '21:00', end: '07:00' })
  })

  it('reports a complete time, and ignores an incomplete one', () => {
    const { onChange } = renderField()
    fireEvent.change(screen.getByLabelText('From'), { target: { value: '22:30' } })
    expect(onChange).toHaveBeenLastCalledWith({ enabled: true, start: '22:30', end: '07:00' })
    fireEvent.change(screen.getByLabelText('To'), { target: { value: '06:15' } })
    expect(onChange).toHaveBeenLastCalledWith({ enabled: true, start: '21:00', end: '06:15' })
    onChange.mockClear()
    fireEvent.change(screen.getByLabelText('To'), { target: { value: '' } })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('disables the times while quiet hours are off, and everything when disabled', () => {
    renderField({ value: { ...NIGHT, enabled: false } })
    expect(screen.getByRole('switch', { name: 'Quiet hours' })).toBeEnabled()
    expect(screen.getByLabelText('From')).toBeDisabled()
    expect(screen.getByLabelText('To')).toBeDisabled()
    cleanup()
    renderField({ disabled: true })
    expect(screen.getByRole('switch', { name: 'Quiet hours' })).toBeDisabled()
    expect(screen.getByLabelText('From')).toBeDisabled()
  })

  it('marks an overnight window, and only that', () => {
    renderField()
    expect(screen.getByText('Overnight: ends the next day')).toBeInTheDocument()
    cleanup()
    renderField({ value: { enabled: true, start: '13:00', end: '14:00' } })
    expect(screen.queryByText('Overnight: ends the next day')).toBeNull()
  })

  it('uses a custom label', () => {
    renderField({ label: 'Do not disturb' })
    expect(screen.getByRole('switch', { name: 'Do not disturb' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Do not disturb' })).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = renderField({ timeZoneLabel: 'Africa/Nairobi' })
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('isOvernight', () => {
  it('is true only when a valid end comes before a valid start', () => {
    expect(isOvernight('21:00', '07:00')).toBe(true)
    expect(isOvernight('07:00', '21:00')).toBe(false)
    expect(isOvernight('09:00', '09:00')).toBe(false)
    expect(isOvernight('21:00', '')).toBe(false)
    expect(isOvernight('25:00', '07:00')).toBe(false)
  })
})
