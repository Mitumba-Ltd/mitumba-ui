// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { SellerDisputeResponseCard } from './SellerDisputeResponseCard'

const defaultProps = {
  reason: 'Item not as described',
  description: 'The dress has a stain not shown in photos.',
  onAccept: vi.fn(() => Promise.resolve()),
  onContest: vi.fn(() => Promise.resolve()),
}

function renderCard(overrides: Partial<typeof defaultProps> = {}) {
  const props = { ...defaultProps, ...overrides }
  return render(
    <MitumbaThemeProvider>
      <SellerDisputeResponseCard
        reason={props.reason}
        description={props.description}
        onAccept={props.onAccept}
        onContest={props.onContest}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(cleanup)

describe('SellerDisputeResponseCard', () => {
  it('renders the dispute reason', () => {
    renderCard()
    expect(screen.getByText('Item not as described')).toBeInTheDocument()
  })

  it('renders the description', () => {
    renderCard()
    expect(screen.getByText('The dress has a stain not shown in photos.')).toBeInTheDocument()
  })

  it('renders both action buttons', () => {
    renderCard()
    expect(screen.getByRole('button', { name: /Accept & Refund/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Respond with Evidence/i })).toBeInTheDocument()
  })

  it('clicking contest shows the form', () => {
    renderCard()
    fireEvent.click(screen.getByRole('button', { name: /Respond with Evidence/i }))
    expect(screen.getByLabelText(/Your response/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Upload evidence/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Submit Response/i })).toBeInTheDocument()
  })
})
