// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { TwoFactorMethodList } from './TwoFactorMethodList'
import type { TwoFactorMethodView } from './TwoFactorMethodList.types'

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
})
