// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaAvatar } from './MitumbaAvatar'
import type { MitumbaAvatarProps } from './MitumbaAvatar.types'

function renderAvatar(props: Partial<MitumbaAvatarProps> = {}) {
  const avatarProps: MitumbaAvatarProps = {
    name: 'John Doe',
    imageUrl: undefined,
    size: 'md',
    badge: undefined,
    ...props,
  }

  return render(
    <MitumbaThemeProvider>
      <MitumbaAvatar
        name={avatarProps.name}
        imageUrl={avatarProps.imageUrl}
        size={avatarProps.size}
        badge={avatarProps.badge}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaAvatar', () => {
  it('renders initials from name when no image is provided', () => {
    renderAvatar({ name: 'Alice Mwangi' })

    expect(screen.getByText('AM')).toBeInTheDocument()
  })

  it('renders first two letters for single word', () => {
    renderAvatar({ name: 'Bob' })

    expect(screen.getByText('BO')).toBeInTheDocument()
  })

  it('renders at most two initials', () => {
    renderAvatar({ name: 'Alice Bob Carol' })

    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('renders an image when imageUrl is provided', () => {
    renderAvatar({ imageUrl: 'https://example.com/avatar.jpg', name: 'John' })

    const img = screen.getByAltText('John')

    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })

  it('supports different sizes', () => {
    const { rerender } = render(
      <MitumbaThemeProvider>
        <MitumbaAvatar name="Test" size="xs" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('TE')).toBeInTheDocument()

    rerender(
      <MitumbaThemeProvider>
        <MitumbaAvatar name="Test" size="lg" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('TE')).toBeInTheDocument()
  })

  it('renders a badge when provided', () => {
    renderAvatar({ badge: '99' })

    expect(screen.getByText('99')).toBeInTheDocument()
  })
})
