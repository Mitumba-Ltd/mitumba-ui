// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { AddTwoFactorMethodModal } from './AddTwoFactorMethodModal'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

afterEach(cleanup)

function renderModal(props: Partial<Parameters<typeof AddTwoFactorMethodModal>[0]> = {}) {
  const onSelectType = props.onSelectType ?? vi.fn()
  const onClose = props.onClose ?? vi.fn()
  return {
    onSelectType,
    onClose,
    ...render(
      <MitumbaThemeProvider>
        <AddTwoFactorMethodModal
          open={props.open ?? true}
          onClose={onClose}
          availableTypes={props.availableTypes ?? ['totp', 'sms', 'email']}
          onSelectType={onSelectType}
          titleLevel={props.titleLevel}
        />
      </MitumbaThemeProvider>,
    ),
  }
}

describe('AddTwoFactorMethodModal', () => {
  it('renders title', () => {
    renderModal()
    expect(screen.getByText('Add 2FA Method')).toBeInTheDocument()
  })

  it('renders all three method types', () => {
    renderModal()
    expect(screen.getByText('Authenticator App')).toBeInTheDocument()
    expect(screen.getByText('SMS')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('shows Recommended badge on TOTP', () => {
    renderModal()
    expect(screen.getByText('Recommended')).toBeInTheDocument()
  })

  it('calls onSelectType when a type is clicked', () => {
    const { onSelectType } = renderModal()
    fireEvent.click(screen.getByText('Authenticator App'))
    expect(onSelectType).toHaveBeenCalledWith('totp')
  })

  it('exposes the choices as a radiogroup with real radios', () => {
    renderModal()
    expect(screen.getByRole('radiogroup', { name: 'Choose a two-factor method' })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(4)
  })

  it('marks unavailable types as disabled radios', () => {
    renderModal({ availableTypes: ['totp'] })
    expect(screen.getByRole('radio', { name: 'SMS' })).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByRole('radio', { name: 'Authenticator App' })).not.toHaveAttribute('aria-disabled')
  })

  it('disables unavailable types (no selection on click)', () => {
    const { onSelectType } = renderModal({ availableTypes: ['totp'] })
    fireEvent.click(screen.getByText('SMS'))
    expect(onSelectType).not.toHaveBeenCalled()
  })

  it('selects and activates a radio via keyboard', () => {
    const { onSelectType } = renderModal()
    const totp = screen.getByRole('radio', { name: 'Authenticator App' })
    fireEvent.keyDown(totp, { key: 'Enter' })
    expect(onSelectType).toHaveBeenCalledWith('totp')
    expect(totp).toHaveAttribute('aria-checked', 'true')
  })

  it('moves selection with arrow keys among available radios', () => {
    renderModal({ availableTypes: ['totp', 'sms', 'email'] })
    const totp = screen.getByRole('radio', { name: 'Authenticator App' })
    fireEvent.keyDown(totp, { key: 'ArrowDown' })
    // passkey is unavailable here so it is skipped -> SMS becomes checked
    expect(screen.getByRole('radio', { name: 'SMS' })).toHaveAttribute('aria-checked', 'true')
  })

  it('omits titleLevel by default (non-heading title)', () => {
    renderModal()
    expect(screen.getByText('Add 2FA Method').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s title when titleLevel is set',
    (level) => {
      renderModal({ titleLevel: level })
      expect(screen.getByText('Add 2FA Method').tagName).toBe(`H${level}`)
    }
  )

  it('closes on Escape', () => {
    const { onClose } = renderModal()
    screen.getByRole('dialog').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(onClose).toHaveBeenCalled()
  })

  it('restores focus to the trigger after closing', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()

    function Wrapper({ open }: { open: boolean }) {
      return (
        <MitumbaThemeProvider>
          <AddTwoFactorMethodModal open={open} onClose={() => {}} availableTypes={['totp', 'sms']} onSelectType={() => {}} />
        </MitumbaThemeProvider>
      )
    }

    const { rerender } = render(<Wrapper open />)
    await waitFor(() => expect(document.activeElement).not.toBe(trigger))
    rerender(<Wrapper open={false} />)
    await waitFor(() => expect(document.activeElement).toBe(trigger))
    trigger.remove()
  })

  it('inherits host theme fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <AddTwoFactorMethodModal open onClose={() => {}} availableTypes={['totp']} onSelectType={() => {}} titleLevel={2} />
      </ThemeProvider>
    )
    expect(screen.getByText('Add 2FA Method').style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = renderModal({ titleLevel: 2 })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
