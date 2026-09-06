// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { TwoFactorMethodList } from './TwoFactorMethodList'
import type { TwoFactorMethodView } from './TwoFactorMethodList.types'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

afterEach(cleanup)

const methods: TwoFactorMethodView[] = [
  { id: '1', type: 'totp', label: 'Google Authenticator', enabled: true, isPrimary: true, pending: false },
  { id: '2', type: 'sms', label: null, enabled: true, isPrimary: false, pending: false },
  { id: '3', type: 'email', label: null, enabled: false, isPrimary: false, pending: true },
]

function renderList(props: Partial<Parameters<typeof TwoFactorMethodList>[0]> = {}) {
  return render(
    <MitumbaThemeProvider>
      <TwoFactorMethodList
        methods={props.methods ?? methods}
        loading={props.loading}
        onAdd={props.onAdd ?? vi.fn()}
        onEnable={props.onEnable ?? vi.fn()}
        onDisable={props.onDisable ?? vi.fn()}
        onDelete={props.onDelete ?? vi.fn()}
        onSetPrimary={props.onSetPrimary ?? vi.fn()}
        titleLevel={props.titleLevel}
      />
    </MitumbaThemeProvider>,
  )
}

describe('TwoFactorMethodList', () => {
  it('renders method labels', () => {
    renderList()
    expect(screen.getByText('Google Authenticator')).toBeInTheDocument()
    expect(screen.getByText('SMS')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('shows Primary chip', () => {
    renderList()
    expect(screen.getByText('Primary')).toBeInTheDocument()
  })

  it('shows Pending chip', () => {
    renderList()
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('shows empty state when no methods', () => {
    renderList({ methods: [] })
    expect(screen.getByText(/No 2FA methods yet/)).toBeInTheDocument()
  })

  it('renders Add method button', () => {
    renderList()
    expect(screen.getByRole('button', { name: /add method/i })).toBeInTheDocument()
  })

  it('renders methods as a semantic list', () => {
    renderList()
    const list = screen.getByRole('list')
    expect(list.tagName).toBe('UL')
    expect(screen.getAllByRole('listitem')).toHaveLength(methods.length)
  })

  it('names the per-method options action', () => {
    renderList()
    expect(screen.getByRole('button', { name: 'Options for Google Authenticator' })).toBeInTheDocument()
  })

  it('conveys enabled/disabled state textually', () => {
    renderList()
    // 2 enabled + 1 disabled
    expect(screen.getAllByText('Enabled')).toHaveLength(2)
    expect(screen.getAllByText('Disabled')).toHaveLength(1)
  })

  it('exposes the list inside a labelled region', () => {
    renderList({ titleLevel: 2 })
    expect(screen.getByRole('region', { name: 'Two-Factor Methods' })).toBeInTheDocument()
  })

  it('omits titleLevel by default (non-heading title)', () => {
    renderList()
    expect(screen.getByText('Two-Factor Methods').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s title when titleLevel is set',
    (level) => {
      renderList({ titleLevel: level })
      expect(screen.getByText('Two-Factor Methods').tagName).toBe(`H${level}`)
    }
  )

  it('inherits host theme fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <TwoFactorMethodList
          methods={methods}
          onAdd={vi.fn()}
          onEnable={vi.fn()}
          onDisable={vi.fn()}
          onDelete={vi.fn()}
          onSetPrimary={vi.fn()}
          titleLevel={2}
        />
      </ThemeProvider>
    )
    expect(screen.getByText('Two-Factor Methods').style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = renderList({ titleLevel: 2 })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
