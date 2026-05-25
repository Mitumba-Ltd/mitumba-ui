// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaAvatar, MitumbaAvatarGroup } from './MitumbaAvatar'
import type { MitumbaAvatarProps } from './MitumbaAvatar.types'

function renderAvatar(props: MitumbaAvatarProps) {
  return render(
    <MitumbaThemeProvider>
      <MitumbaAvatar {...props} />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaAvatar', () => {
  it('renders initials from name when no image is provided', () => {
    renderAvatar({ name: 'John Doe' })
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders first two letters for single word', () => {
    renderAvatar({ name: 'Bob' })
    expect(screen.getByText('BO')).toBeInTheDocument()
  })

  it('renders at most two initials', () => {
    renderAvatar({ name: 'Isaac Stanley Blik' })
    expect(screen.getByText('IS')).toBeInTheDocument()
  })

  it('renders an image when imageUrl is provided', () => {
    renderAvatar({ name: 'John Doe', imageUrl: 'https://example.com/avatar.jpg' })
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })

  it('supports presence status', () => {
    renderAvatar({ name: 'Online', status: 'online' })
    // Presence dot is a decorative box, but we can verify it doesn't crash
    expect(screen.getByText('ON')).toBeInTheDocument()
  })

  it('renders a notification count', () => {
    renderAvatar({ name: 'Alert', notificationCount: 5 })
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('renders a legacy badge when provided', () => {
    renderAvatar({ name: 'John Doe', badge: '99' })
    expect(screen.getByText('99')).toBeInTheDocument()
  })

  it('renders name and subtitle in side-alignment mode', () => {
    renderAvatar({ name: 'Isaac', subtitle: 'Leading...', textAlignment: 'side' })
    expect(screen.getByText('Isaac')).toBeInTheDocument()
    expect(screen.getByText('Leading...')).toBeInTheDocument()
  })

  it('renders progress text in bottom-alignment mode', () => {
    renderAvatar({ name: 'Isaac', progress: 85, textAlignment: 'bottom' })
    expect(screen.getByText('85% complete')).toBeInTheDocument()
  })

  it('renders selected state tick', () => {
    const { container } = renderAvatar({ name: 'Selected', selected: true })
    // Tick is an SVG
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})

describe('MitumbaAvatarGroup', () => {
  it('renders a stack of avatars', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaAvatarGroup>
          <MitumbaAvatar name="User 1" />
          <MitumbaAvatar name="User 2" />
        </MitumbaAvatarGroup>
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('U1')).toBeInTheDocument()
    expect(screen.getByText('U2')).toBeInTheDocument()
  })

  it('renders overflow badge for large groups', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaAvatarGroup max={2}>
          <MitumbaAvatar name="User 1" />
          <MitumbaAvatar name="User 2" />
          <MitumbaAvatar name="User 3" />
          <MitumbaAvatar name="User 4" />
        </MitumbaAvatarGroup>
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('+2')).toBeInTheDocument()
  })
})
