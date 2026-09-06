// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { DisputeStatusTimeline } from './DisputeStatusTimeline'
import type { DisputeEvent, DisputeStatusTimelineProps } from './DisputeStatusTimeline.types'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

const baseEvents: DisputeEvent[] = [
  { actor_role: 'buyer', action: 'Opened dispute', new_status: 'open', note: 'Wrong size received', created_at: 'Jun 20 at 3:15 PM' },
  { actor_role: 'seller', action: 'Responded', new_status: 'seller_responded', note: null, created_at: 'Jun 21 at 10:00 AM' },
]

function renderTimeline(props: Partial<DisputeStatusTimelineProps> = {}) {
  return render(
    <MitumbaThemeProvider>
      <DisputeStatusTimeline
        status={props.status ?? 'open'}
        events={props.events ?? baseEvents}
        sectionTitleLevel={props.sectionTitleLevel}
        currentEventIndex={props.currentEventIndex}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(cleanup)

describe('DisputeStatusTimeline', () => {
  it('renders status chip', () => {
    renderTimeline()
    expect(screen.getByTestId('dispute-status-chip')).toHaveTextContent('Open')
  })

  it('renders event actions', () => {
    renderTimeline()
    expect(screen.getByText('Opened dispute')).toBeInTheDocument()
    expect(screen.getByText('Responded')).toBeInTheDocument()
  })

  it('renders actor badges', () => {
    renderTimeline()
    const badges = screen.getAllByTestId('actor-badge')
    expect(badges[0]).toHaveTextContent('buyer')
    expect(badges[1]).toHaveTextContent('seller')
  })

  it('renders notes', () => {
    renderTimeline()
    expect(screen.getByText('Wrong size received')).toBeInTheDocument()
  })

  it('renders timestamps', () => {
    renderTimeline()
    expect(screen.getByText('Jun 20 at 3:15 PM')).toBeInTheDocument()
    expect(screen.getByText('Jun 21 at 10:00 AM')).toBeInTheDocument()
  })

  it('renders the events as an ordered list', () => {
    const { container } = renderTimeline()
    const ol = container.querySelector('ol')
    expect(ol).toBeInTheDocument()
    expect(ol?.querySelectorAll('li')).toHaveLength(baseEvents.length)
  })

  it('marks the most recent event as the current step by default', () => {
    const { container } = renderTimeline()
    const currents = container.querySelectorAll('li[aria-current="step"]')
    expect(currents).toHaveLength(1)
    expect(currents[0]).toHaveTextContent('Responded')
  })

  it('marks a specific event as current via currentEventIndex', () => {
    const { container } = renderTimeline({ currentEventIndex: 0 })
    const current = container.querySelector('li[aria-current="step"]')
    expect(current).toHaveTextContent('Opened dispute')
  })

  it('omits sectionTitleLevel by default (non-heading status chip)', () => {
    renderTimeline()
    const chip = screen.getByTestId('dispute-status-chip')
    // the SemanticTitle wrapper falls back to a div, chip is a span within it
    expect(chip.closest('h1,h2,h3,h4,h5,h6')).toBeNull()
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s section title when sectionTitleLevel is set',
    (level) => {
      renderTimeline({ sectionTitleLevel: level })
      const chip = screen.getByTestId('dispute-status-chip')
      expect(chip.closest(`h${level}`)).not.toBeNull()
    }
  )

  it('inherits host theme fontFamily on event text (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <DisputeStatusTimeline status="open" events={baseEvents} />
      </ThemeProvider>
    )
    const action = screen.getByText('Opened dispute')
    expect(action.style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = renderTimeline({ sectionTitleLevel: 3 })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
