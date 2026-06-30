// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { DestructiveConfirmDialog } from './DestructiveConfirmDialog'

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
})
