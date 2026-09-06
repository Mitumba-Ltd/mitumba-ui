// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { SellerDisputeResponseCard } from './SellerDisputeResponseCard'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

const defaultProps = {
  reason: 'Item not as described',
  description: 'The dress has a stain not shown in photos.',
  onAccept: vi.fn(() => Promise.resolve()),
  onContest: vi.fn(() => Promise.resolve()),
}

function renderCard(overrides: Partial<React.ComponentProps<typeof SellerDisputeResponseCard>> = {}) {
  const props = { ...defaultProps, ...overrides }
  return render(
    <MitumbaThemeProvider>
      <SellerDisputeResponseCard
        reason={props.reason}
        description={props.description}
        onAccept={props.onAccept}
        onContest={props.onContest}
        submitting={props.submitting}
        titleLevel={props.titleLevel}
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

  it('exposes the card as a labelled article', () => {
    renderCard()
    expect(screen.getByRole('article', { name: 'Dispute Filed' })).toBeInTheDocument()
  })

  it('omits titleLevel by default (non-heading title)', () => {
    renderCard()
    expect(screen.getByText('Dispute Filed').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s title when titleLevel is set',
    (level) => {
      renderCard({ titleLevel: level })
      expect(screen.getByText('Dispute Filed').tagName).toBe(`H${level}`)
    }
  )

  it('announces submitting status via role=status', () => {
    renderCard({ submitting: true })
    expect(screen.getByRole('status')).toHaveTextContent('Submitting your response')
  })

  it('inherits host theme fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <SellerDisputeResponseCard
          reason={defaultProps.reason}
          description={defaultProps.description}
          onAccept={defaultProps.onAccept}
          onContest={defaultProps.onContest}
          titleLevel={2}
        />
      </ThemeProvider>
    )
    expect(screen.getByText('Dispute Filed').style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = renderCard({ titleLevel: 2 })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
