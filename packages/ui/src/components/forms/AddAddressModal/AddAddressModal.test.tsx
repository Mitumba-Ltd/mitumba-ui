// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { AddAddressModal } from './AddAddressModal'

afterEach(cleanup)

function renderModal(props: Partial<Parameters<typeof AddAddressModal>[0]> = {}) {
  const onClose = props.onClose ?? vi.fn()
  const onSave = props.onSave ?? vi.fn()
  return { onClose, onSave, ...render(
    <MitumbaThemeProvider>
      <AddAddressModal
        open={props.open ?? true}
        onClose={onClose}
        onSave={onSave}
        saving={props.saving}
        error={props.error}
        isFirstAddress={props.isFirstAddress}
      />
    </MitumbaThemeProvider>,
  ) }
}

describe('AddAddressModal', () => {
  it('renders title and subtitle', () => {
    renderModal()
    expect(screen.getByText('Add Delivery Address')).toBeInTheDocument()
    expect(screen.getByText('Where should we deliver your items?')).toBeInTheDocument()
  })

  it('renders all required form fields', () => {
    renderModal()
    expect(screen.getByLabelText(/label/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/address line 1/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument()
  })

  it('renders save button', () => {
    renderModal()
    expect(screen.getByRole('button', { name: /save address/i })).toBeInTheDocument()
  })

  it('shows error message when provided', () => {
    renderModal({ error: 'Something went wrong' })
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('shows default checkbox checked for first address', () => {
    renderModal({ isFirstAddress: true })
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    renderModal({ onClose })
    fireEvent.click(screen.getByLabelText('Close modal'))
    expect(onClose).toHaveBeenCalled()
  })
})
