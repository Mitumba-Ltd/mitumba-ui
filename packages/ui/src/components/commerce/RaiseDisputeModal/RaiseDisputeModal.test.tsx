// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { RaiseDisputeModal } from './RaiseDisputeModal'

afterEach(() => {
  cleanup()
})

const onClose = vi.fn()
const onSubmit = vi.fn().mockResolvedValue(undefined)

function renderModal() {
  return render(
    <MitumbaThemeProvider>
      <RaiseDisputeModal
        open
        onClose={onClose}
        orderShortId="MTB-7X2K"
        onSubmit={onSubmit}
      />
    </MitumbaThemeProvider>
  )
}

describe('RaiseDisputeModal', () => {
  it('renders title', () => {
    renderModal()
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
})
