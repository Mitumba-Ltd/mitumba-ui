// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { DestructiveConfirmDialog } from './DestructiveConfirmDialog'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

afterEach(cleanup)

function renderDialog(props: Partial<Parameters<typeof DestructiveConfirmDialog>[0]> = {}) {
  const defaults = {
    open: true,
    onClose: vi.fn(),
    title: 'Delete store',
    description: 'This is permanent.',
    onConfirm: vi.fn(() => Promise.resolve()),
  }
  const merged = { ...defaults, ...props }
  return {
    onConfirm: merged.onConfirm,
    onClose: merged.onClose,
    ...render(
      <MitumbaThemeProvider>
        <DestructiveConfirmDialog
          open={merged.open}
          onClose={merged.onClose}
          title={merged.title}
          description={merged.description}
          blockers={merged.blockers}
          confirmPhrase={merged.confirmPhrase}
          requireTotp={merged.requireTotp}
          onConfirm={merged.onConfirm}
          submitting={merged.submitting}
          confirmLabel={merged.confirmLabel}
          titleLevel={merged.titleLevel}
        />
      </MitumbaThemeProvider>,
    ),
  }
}

describe('DestructiveConfirmDialog', () => {
  it('renders title and description', () => {
    renderDialog()
    expect(screen.getByText('Delete store')).toBeInTheDocument()
    expect(screen.getByText('This is permanent.')).toBeInTheDocument()
  })

  it('renders delete and cancel buttons', () => {
    renderDialog()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('disables confirm when blockers present', () => {
    renderDialog({ blockers: ['Has active orders'] })
    expect(screen.getByRole('button', { name: /delete/i })).toBeDisabled()
    expect(screen.getByText('Has active orders')).toBeInTheDocument()
  })

  it('disables confirm until phrase matches', () => {
    renderDialog({ confirmPhrase: 'DELETE' })
    const btn = screen.getByRole('button', { name: /delete/i })
    expect(btn).toBeDisabled()
    fireEvent.change(screen.getByLabelText('Confirmation phrase'), { target: { value: 'DELETE' } })
    expect(btn).not.toBeDisabled()
  })

  it('shows TOTP input when requireTotp', () => {
    renderDialog({ requireTotp: true })
    expect(screen.getByLabelText('Authentication code')).toBeInTheDocument()
  })

  it('uses custom confirmLabel', () => {
    renderDialog({ confirmLabel: 'Remove Forever' })
    expect(screen.getByRole('button', { name: /remove forever/i })).toBeInTheDocument()
  })

  it('has dialog role with accessible name', () => {
    renderDialog()
    expect(screen.getByRole('dialog')).toHaveAccessibleName(/Delete store/i)
  })

  it('omits titleLevel by default (non-heading title)', () => {
    renderDialog()
    expect(screen.getByText('Delete store').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s title when titleLevel is set',
    (level) => {
      renderDialog({ titleLevel: level })
      expect(screen.getByText('Delete store').tagName).toBe(`H${level}`)
    }
  )

  it('announces blockers via a labelled alert', () => {
    renderDialog({ blockers: ['Has active orders'] })
    const alert = screen.getByRole('alert')
    expect(alert).toHaveAccessibleName('You must resolve these first:')
    expect(alert).toHaveTextContent('Has active orders')
  })

  it('keeps monospace on the confirm phrase input (documented exception)', () => {
    renderDialog({ confirmPhrase: 'DELETE' })
    const input = screen.getByLabelText('Confirmation phrase')
    expect(input).toHaveStyle({ fontFamily: 'monospace' })
  })

  it('keeps monospace on the displayed confirm phrase (documented exception)', () => {
    renderDialog({ confirmPhrase: 'DELETE' })
    const phrase = screen.getByText('DELETE', { selector: 'strong' })
    expect(phrase).toHaveStyle({ fontFamily: 'monospace' })
  })

  it('closes on Escape', () => {
    const onClose = vi.fn()
    renderDialog({ onClose })
    screen.getByRole('dialog').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(onClose).toHaveBeenCalled()
  })

  it('inherits host theme fontFamily on the description (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <DestructiveConfirmDialog
          open
          onClose={() => {}}
          title="Delete store"
          description="This is permanent."
          onConfirm={() => Promise.resolve()}
          titleLevel={2}
        />
      </ThemeProvider>
    )
    expect(screen.getByText('This is permanent.').style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = renderDialog({ titleLevel: 2, confirmPhrase: 'DELETE', blockers: [] })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
