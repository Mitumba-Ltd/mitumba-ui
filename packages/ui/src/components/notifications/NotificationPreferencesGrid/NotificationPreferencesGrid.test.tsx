// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { NotificationPreferencesGrid } from './NotificationPreferencesGrid'
import type { NotificationPreferenceRow, NotificationPreferencesGridProps } from './NotificationPreferencesGrid.types'

expect.extend(toHaveNoViolations)

const CATEGORIES: NotificationPreferenceRow[] = [
  {
    id: 'account', label: 'Account and security', description: 'Sign-ins and changes to your account.', required: true,
    channels: [{ channel: 'in_app', enabled: true }, { channel: 'email', enabled: true }, { channel: 'push', enabled: false }],
  },
  {
    id: 'orders', label: 'Orders', description: 'Orders you placed or received.',
    channels: [{ channel: 'in_app', enabled: true }, { channel: 'email', enabled: false }, { channel: 'whatsapp', enabled: true }],
  },
]

function renderGrid({
  categories = CATEGORIES, columns, unavailable, pending, requiredHint, unavailableHint, loading,
}: Partial<NotificationPreferencesGridProps> = {}) {
  const onChange = vi.fn()
  const view = render(
    <MitumbaThemeProvider>
      <NotificationPreferencesGrid
        categories={categories}
        columns={columns}
        unavailable={unavailable}
        pending={pending}
        requiredHint={requiredHint}
        unavailableHint={unavailableHint}
        loading={loading}
        onChange={onChange}
      />
    </MitumbaThemeProvider>,
  )
  return { onChange, ...view }
}

/** Both layouts are in the DOM under jsdom (CSS breakpoints decide which shows), so each switch appears twice. */
const switches = (name: string) => screen.getAllByLabelText(name)

afterEach(() => { cleanup() })

describe('NotificationPreferencesGrid', () => {
  it('names each switch "<category> by <channel>" and shows its state', () => {
    renderGrid()
    expect(switches('Orders by Email')).toHaveLength(2)
    switches('Orders by Email').forEach((toggle) => expect(toggle).not.toBeChecked())
    switches('Orders by WhatsApp').forEach((toggle) => expect(toggle).toBeChecked())
    expect(screen.getAllByText('Orders you placed or received.')).toHaveLength(2)
  })

  it('reports each change once, with the category id and channel', () => {
    const { onChange } = renderGrid()
    fireEvent.click(switches('Orders by Email')[0]!)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({ category: 'orders', channel: 'email', enabled: true })
    fireEvent.click(switches('Account and security by Push')[1]!)
    expect(onChange).toHaveBeenLastCalledWith({ category: 'account', channel: 'push', enabled: true })
  })

  it('gives a switch only for the channels a category uses, and hides columns nobody uses', () => {
    renderGrid()
    expect(screen.queryByLabelText('Orders by Push')).toBeNull()
    expect(screen.queryByLabelText('Account and security by WhatsApp')).toBeNull()
    const table = screen.getByRole('table')
    const headers = within(table).getAllByRole('columnheader').map((header) => header.textContent)
    expect(headers).toEqual(['Category', 'In-app', 'Email', 'Push', 'WhatsApp'])
    expect(within(table).getAllByRole('rowheader').map((header) => header.textContent)).toEqual([
      expect.stringContaining('Account and security'), expect.stringContaining('Orders'),
    ])
  })

  it('follows the given column order and labels', () => {
    renderGrid({ columns: [{ channel: 'whatsapp', label: 'WA' }, { channel: 'in_app', label: 'App' }] })
    const headers = within(screen.getByRole('table')).getAllByRole('columnheader').map((header) => header.textContent)
    expect(headers).toEqual(['Category', 'WA', 'App'])
    expect(switches('Orders by WA')).toHaveLength(2)
    expect(screen.queryByLabelText('Orders by Email')).toBeNull()
  })

  it('shows the lock text on required rows', () => {
    renderGrid({ requiredHint: 'Security alerts always arrive.' })
    expect(screen.getAllByText('Security alerts always arrive.')).toHaveLength(2)
    cleanup()
    renderGrid({ categories: [CATEGORIES[1]!], requiredHint: 'Security alerts always arrive.' })
    expect(screen.queryAllByText('Security alerts always arrive.')).toHaveLength(0)
  })

  it('disables an unavailable channel without hiding its value', () => {
    const { onChange } = renderGrid({ unavailable: ['whatsapp'], unavailableHint: 'Connect WhatsApp first' })
    switches('Orders by WhatsApp').forEach((toggle) => {
      expect(toggle).toBeDisabled()
      expect(toggle).toBeChecked()
    })
    fireEvent.click(switches('Orders by WhatsApp')[0]!)
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getAllByText('Connect WhatsApp first')).toHaveLength(2)
    switches('Orders by Email').forEach((toggle) => expect(toggle).toBeEnabled())
  })

  it('shows a spinner on a cell being saved and ignores input there', () => {
    const { onChange } = renderGrid({ pending: [{ category: 'orders', channel: 'email' }] })
    expect(screen.getAllByLabelText('Saving Orders by Email')).toHaveLength(2)
    switches('Orders by Email').forEach((toggle) => expect(toggle).toBeDisabled())
    fireEvent.click(switches('Orders by Email')[0]!)
    expect(onChange).not.toHaveBeenCalled()
    switches('Orders by In-app').forEach((toggle) => expect(toggle).toBeEnabled())
  })

  it('shows skeletons while loading', () => {
    renderGrid({ loading: true })
    expect(screen.getByLabelText('Loading notification settings')).toHaveAttribute('aria-busy', 'true')
    expect(screen.queryByRole('table')).toBeNull()
    expect(screen.queryByLabelText('Orders by Email')).toBeNull()
  })

  it('has no axe violations', async () => {
    const { container } = renderGrid({ unavailable: ['push'], pending: [{ category: 'orders', channel: 'in_app' }] })
    expect(await axe(container)).toHaveNoViolations()
  })
})
