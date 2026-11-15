// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MitumbaThemeProvider } from '../../../theme'
import { NotificationBell, badgeText } from './NotificationBell'
import type { NotificationBellProps } from './NotificationBell.types'

expect.extend(toHaveNoViolations)

const renderBell = (props: NotificationBellProps) => render(
  <MitumbaThemeProvider>
    <NotificationBell count={props.count} href={props.href} onClick={props.onClick} label={props.label} size={props.size} linkComponent={props.linkComponent} />
  </MitumbaThemeProvider>,
)

afterEach(cleanup)

describe('NotificationBell', () => {
  it('hides the badge at zero and labels the bell plainly', () => {
    const { container } = renderBell({ count: 0, onClick: () => undefined })
    expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument()
    expect(container.querySelector('.MuiBadge-invisible')).not.toBeNull()
  })

  it('shows the count, announces it, and works as a button', () => {
    const onClick = vi.fn()
    const { container } = renderBell({ count: 7, onClick })
    const bell = screen.getByRole('button', { name: 'Notifications, 7 unread' })
    fireEvent.click(bell)
    expect(onClick).toHaveBeenCalledOnce()
    expect(container.querySelector('.MuiBadge-badge')).toHaveTextContent('7')
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('7 unread notifications')
  })

  it('caps the badge at 99+, and treats a negative or fractional count sensibly', () => {
    const { container } = renderBell({ count: 120, label: 'Alerts' })
    expect(screen.getByRole('button', { name: 'Alerts, 120 unread' })).toBeInTheDocument()
    expect(container.querySelector('.MuiBadge-badge')).toHaveTextContent('99+')
    cleanup()
    renderBell({ count: -3 })
    expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument()
    expect(badgeText(99)).toBe('99')
  })

  it('has no axe violations as a button or a link', async () => {
    const button = renderBell({ count: 7, onClick: () => undefined })
    expect(await axe(button.container)).toHaveNoViolations()
    cleanup()
    const link = renderBell({ count: 0, href: '/notifications' })
    expect(await axe(link.container)).toHaveNoViolations()
  })

  it('renders as a link, with an anchor or a given link component', () => {
    renderBell({ count: 2, href: '/notifications', size: 'small' })
    expect(screen.getByRole('link', { name: 'Notifications, 2 unread' })).toHaveAttribute('href', '/notifications')
    cleanup()
    const RouterLink = React.forwardRef<HTMLAnchorElement, { href: string; className?: string; 'aria-label'?: string; children?: React.ReactNode }>(({ href, className, 'aria-label': ariaLabel, children }, ref) => <a ref={ref} data-router="yes" href={href} className={className} aria-label={ariaLabel}>{children}</a>)
    RouterLink.displayName = 'RouterLink'
    renderBell({ count: 0, href: '/n', linkComponent: RouterLink })
    expect(screen.getByRole('link', { name: 'Notifications' })).toHaveAttribute('data-router', 'yes')
  })
})
