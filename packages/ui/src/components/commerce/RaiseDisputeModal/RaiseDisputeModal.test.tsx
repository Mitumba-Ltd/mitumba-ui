// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, waitFor, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { RaiseDisputeModal } from './RaiseDisputeModal'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

afterEach(() => {
  cleanup()
})

const onClose = vi.fn()
const onSubmit = vi.fn().mockResolvedValue(undefined)

function renderModal(props: Partial<React.ComponentProps<typeof RaiseDisputeModal>> = {}) {
  return render(
    <MitumbaThemeProvider>
      <RaiseDisputeModal
        open={props.open ?? true}
        onClose={props.onClose ?? onClose}
        orderShortId={props.orderShortId ?? 'MTB-7X2K'}
        onSubmit={props.onSubmit ?? onSubmit}
        submitting={props.submitting}
        titleLevel={props.titleLevel}
        errorMessage={props.errorMessage}
      />
    </MitumbaThemeProvider>
  )
}

describe('RaiseDisputeModal', () => {
  it('renders title with dialog role and accessible name', () => {
    renderModal()
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAccessibleName(/Raise a Dispute/i)
    expect(screen.getByText('Raise a Dispute')).toBeInTheDocument()
  })

  it('shows reason options', () => {
    renderModal()
    expect(screen.getByText('Reason')).toBeInTheDocument()
  })

  it('validates description length', () => {
    renderModal()
    expect(screen.getByText('0/2000')).toBeInTheDocument()
  })

  it('shows reassurance text', () => {
    renderModal()
    expect(screen.getByText('Your funds stay safely held until this is resolved.')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    renderModal()
    expect(screen.getByText('Submit Dispute')).toBeInTheDocument()
  })

  it('omits titleLevel by default, rendering a non-heading title', () => {
    renderModal()
    const title = screen.getByText('Raise a Dispute')
    expect(title.tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s element when titleLevel is set (visual sx unchanged)',
    (level) => {
      renderModal({ titleLevel: level })
      const title = screen.getByText('Raise a Dispute')
      expect(title.tagName).toBe(`H${level}`)
    }
  )

  it('exposes the desired resolution as a radiogroup with real radios', () => {
    renderModal()
    const group = screen.getByRole('radiogroup', { name: /Desired Resolution/i })
    expect(group).toBeInTheDocument()
    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3)
    radios.forEach((r) => expect(r).toHaveAttribute('aria-checked', 'false'))
  })

  it('selects a resolution radio (native button, keyboard-operable)', () => {
    renderModal()
    const refund = screen.getByRole('radio', { name: 'Refund' })
    refund.focus()
    expect(refund).toHaveFocus()
    fireEvent.click(refund)
    expect(refund).toHaveAttribute('aria-checked', 'true')
  })

  it('provides a keyboard-operable evidence upload button', () => {
    renderModal()
    expect(screen.getByRole('button', { name: 'Add evidence photo' })).toBeInTheDocument()
  })

  it('announces submit progress via role=status', () => {
    renderModal({ submitting: true })
    expect(screen.getByRole('status')).toHaveTextContent('Submitting dispute')
  })

  it('announces an error via role=alert without duplication', () => {
    renderModal({ errorMessage: 'Submission failed. Try again.' })
    const alerts = screen.getAllByRole('alert')
    expect(alerts).toHaveLength(1)
    expect(alerts[0]).toHaveTextContent('Submission failed. Try again.')
  })

  it('closes on Escape', () => {
    const close = vi.fn()
    renderModal({ onClose: close })
    const dialog = screen.getByRole('dialog')
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(close).toHaveBeenCalled()
  })

  it('restores focus to the trigger after closing', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()

    function Wrapper({ open }: { open: boolean }) {
      return (
        <MitumbaThemeProvider>
          <RaiseDisputeModal open={open} onClose={() => {}} orderShortId="MTB" onSubmit={onSubmit} />
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
        <RaiseDisputeModal open onClose={onClose} orderShortId="MTB" onSubmit={onSubmit} titleLevel={2} />
      </ThemeProvider>
    )
    const title = screen.getByText('Raise a Dispute')
    expect(title.style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = renderModal({ titleLevel: 2, errorMessage: 'Oops' })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
