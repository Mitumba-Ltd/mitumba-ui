// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { StatsCard } from './StatsCard'

afterEach(() => {
  cleanup()
})

describe('StatsCard', () => {
  it('renders label and value', () => {
    render(
      <MitumbaThemeProvider>
        <StatsCard label="Total Orders" value={42} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Total Orders')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders unit when provided', () => {
    render(
      <MitumbaThemeProvider>
        <StatsCard label="Revenue" value="12,500" unit="KES" />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('KES')).toBeInTheDocument()
  })

  it('renders trend with up direction', () => {
    render(
      <MitumbaThemeProvider>
        <StatsCard label="Growth" value="15" trend={{ direction: 'up', percent: 12.5 }} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('12.5%')).toBeInTheDocument()
  })

  it('renders trend with down direction', () => {
    render(
      <MitumbaThemeProvider>
        <StatsCard label="Decline" value="8" trend={{ direction: 'down', percent: 5.3 }} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('5.3%')).toBeInTheDocument()
  })

  it('renders icon when provided', async () => {
    const { default: InboxIcon } = await import('@mui/icons-material/Inbox')
    render(
      <MitumbaThemeProvider>
        <StatsCard label="Messages" value={3} icon={<InboxIcon data-testid="inbox-icon" />} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByTestId('inbox-icon')).toBeInTheDocument()
  })
})
