// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { MitumbaThemeProvider } from '../../../theme'
import { NotificationItem, relativeTime } from './NotificationItem'
import type { NotificationItemProps } from './NotificationItem.types'

expect.extend(toHaveNoViolations)

const NOW = new Date('2026-11-15T10:00:00Z')

function renderItem(props: Partial<NotificationItemProps> = {}) {
  const onNavigate = vi.fn()
  const merged: NotificationItemProps = { title: 'Your order is on its way', body: 'Shipped today.', createdAt: '2026-11-15T09:55:00Z', unread: true, now: NOW, onNavigate, ...props }
  const utils = render(
    <MitumbaThemeProvider>
      <NotificationItem title={merged.title} body={merged.body} createdAt={merged.createdAt} unread={merged.unread} category={merged.category} actions={merged.actions} link={merged.link} count={merged.count} onNavigate={merged.onNavigate} now={merged.now} />
    </MitumbaThemeProvider>,
  )
  return { ...utils, onNavigate, article: utils.container.querySelector<HTMLElement>('[data-unread]')! }
}

afterEach(cleanup)

describe('NotificationItem', () => {
  it('shows the title, body, relative time and an unread marker', () => {
    const { article } = renderItem()
    expect(screen.getByText('Your order is on its way')).toBeInTheDocument()
    expect(screen.getByText('Shipped today.')).toBeInTheDocument()
    expect(screen.getByText('5 min ago')).toHaveAttribute('datetime', '2026-11-15T09:55:00Z')
    expect(screen.getByRole('status', { name: 'Unread' })).toBeInTheDocument()
    expect(article).toHaveAttribute('data-unread', 'true')
  })

  it('has no unread marker once read, and is not a link without one', () => {
    const { article } = renderItem({ unread: false })
    expect(screen.queryByRole('status')).toBeNull()
    expect(article).toHaveAttribute('data-unread', 'false')
    expect(article).not.toHaveAttribute('role')
    expect(article).not.toHaveAttribute('tabindex')
    fireEvent.click(article)
  })

  it('navigates from the row on click and Enter', () => {
    const link = { route: '/orders/A1' }
    const { article, onNavigate } = renderItem({ link })
    expect(article).toHaveAttribute('role', 'link')
    expect(article).toHaveAttribute('tabindex', '0')
    fireEvent.click(article)
    fireEvent.keyDown(article, { key: 'Enter' })
    fireEvent.keyDown(article, { key: 'Space' })
    expect(onNavigate.mock.calls).toEqual([[link], [link]])
  })

  it('shows at most two actions, and an action does not also trigger the row', () => {
    const { article, onNavigate } = renderItem({
      link: { route: '/orders/A1' },
      actions: [
        { label: 'Track order', link: { route: '/orders/A1/track' } },
        { label: 'Get help', link: { url: 'https://help.mitumba.africa' } },
        { label: 'Ignored', link: { route: '/x' } },
      ],
    })
    expect(screen.queryByText('Ignored')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Get help' }))
    fireEvent.keyDown(screen.getByRole('button', { name: 'Track order' }), { key: 'Enter' })
    expect(onNavigate.mock.calls).toEqual([[{ url: 'https://help.mitumba.africa' }]])
    expect(article).toBeInTheDocument()
  })

  it('shows a collapse count only above one', () => {
    renderItem({ count: 3 })
    expect(screen.getByText('×3')).toBeInTheDocument()
    cleanup()
    renderItem({ count: 1 })
    expect(screen.queryByText('×1')).toBeNull()
  })

  it('falls back to a bell for an unknown category, and works without onNavigate or now', () => {
    render(<MitumbaThemeProvider><NotificationItem title="T" body="B" createdAt={new Date().toISOString()} unread={false} category="mystery" link={{ route: '/x' }} actions={[{ label: 'Go', link: { route: '/y' } }]} /></MitumbaThemeProvider>)
    expect(screen.getByText('just now')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Go' }))
    fireEvent.click(screen.getByRole('link', { name: 'T' }))
  })

  it('has no axe violations, as a link with actions and as a plain row', async () => {
    const linked = renderItem({ link: { route: '/orders/A1' }, count: 2, actions: [{ label: 'Track order', link: { route: '/t' } }] })
    expect(await axe(linked.container)).toHaveNoViolations()
    cleanup()
    const plain = renderItem({ unread: false })
    expect(await axe(plain.container)).toHaveNoViolations()
  })

  it.each(['account', 'orders', 'payments', 'messages', 'store', 'deals', 'announcements', 'operations'])('renders the %s category', (category) => {
    const { article } = renderItem({ category })
    expect(article.querySelector('svg')).not.toBeNull()
  })
})

describe('relativeTime', () => {
  it.each([
    ['2026-11-15T09:59:30Z', 'just now'],
    ['2026-11-15T09:15:00Z', '45 min ago'],
    ['2026-11-15T07:00:00Z', '3 h ago'],
    ['2026-11-13T10:00:00Z', '2 d ago'],
    ['not a date', ''],
  ])('labels %s as "%s"', (iso, label) => {
    expect(relativeTime(iso, NOW)).toBe(label)
  })

  it('shows the date for anything older than a week', () => {
    expect(relativeTime('2026-10-01T10:00:00Z', NOW)).toMatch(/1 Oct|Oct 1/)
  })
})
