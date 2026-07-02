// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { AddTwoFactorMethodModal } from './AddTwoFactorMethodModal'

afterEach(cleanup)

function renderModal(props: Partial<Parameters<typeof AddTwoFactorMethodModal>[0]> = {}) {
  const onSelectType = props.onSelectType ?? vi.fn()
  return {
    onSelectType,
    ...render(
      <MitumbaThemeProvider>
        <AddTwoFactorMethodModal
          open={props.open ?? true}
          onClose={props.onClose ?? vi.fn()}
          availableTypes={props.availableTypes ?? ['totp', 'sms', 'email']}
          onSelectType={onSelectType}
        />
      </MitumbaThemeProvider>,
    ),
  }
}

describe('AddTwoFactorMethodModal', () => {
  it('renders title', () => {
    renderModal()
    expect(screen.getByText('Add 2FA Method')).toBeInTheDocument()
  })

  it('renders all three method types', () => {
    renderModal()
    expect(screen.getByText('Authenticator App')).toBeInTheDocument()
    expect(screen.getByText('SMS')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('shows Recommended badge on TOTP', () => {
    renderModal()
    expect(screen.getByText('Recommended')).toBeInTheDocument()
  })

  it('calls onSelectType when a type is clicked', () => {
    const { onSelectType } = renderModal()
    fireEvent.click(screen.getByText('Authenticator App'))
    expect(onSelectType).toHaveBeenCalledWith('totp')
  })

  it('disables unavailable types', () => {
    const { onSelectType } = renderModal({ availableTypes: ['totp'] })
    fireEvent.click(screen.getByText('SMS'))
    expect(onSelectType).not.toHaveBeenCalled()
  })
})
