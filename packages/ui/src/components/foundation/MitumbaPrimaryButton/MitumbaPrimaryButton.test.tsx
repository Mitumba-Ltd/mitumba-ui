// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaPrimaryButton } from './MitumbaPrimaryButton'
import type { MitumbaPrimaryButtonProps } from './MitumbaPrimaryButton.types'

function renderButton(props: Partial<MitumbaPrimaryButtonProps> = {}) {
  const buttonProps = {
    disabled: false,
    fullWidth: true,
    icon: undefined,
    label: 'Sell now',
    loading: false,
    onClick: undefined,
    size: 'medium',
    variant: 'primary',
    ...props,
  } satisfies MitumbaPrimaryButtonProps

  return render(
    <MitumbaThemeProvider>
      <MitumbaPrimaryButton
        disabled={buttonProps.disabled}
        fullWidth={buttonProps.fullWidth}
        icon={buttonProps.icon}
        label={buttonProps.label}
        loading={buttonProps.loading}
        onClick={buttonProps.onClick}
        size={buttonProps.size}
        variant={buttonProps.variant}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaPrimaryButton', () => {
  it('renders the label as an accessible button name', () => {
    renderButton()

    expect(screen.getByRole('button', { name: 'Sell now' })).toBeInTheDocument()
  })

  it('calls onClick when enabled', () => {
    const onClick = vi.fn()
    renderButton({ onClick })

    fireEvent.click(screen.getByRole('button', { name: 'Sell now' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn()
    renderButton({ disabled: true, onClick })

    fireEvent.click(screen.getByRole('button', { name: 'Sell now' }))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('shows a loading spinner and prevents clicks while loading', () => {
    const onClick = vi.fn()
    renderButton({ loading: true, onClick })

    const button = screen.getByRole('button', { name: /sell now/i })

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('progressbar', { name: 'Sell now loading' })).toBeInTheDocument()

    fireEvent.click(button)

    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders an optional leading icon', () => {
    renderButton({ icon: <span data-testid="button-icon">+</span> })

    expect(screen.getByTestId('button-icon')).toBeInTheDocument()
  })

  it('supports non-full-width rendering', () => {
    renderButton({ fullWidth: false })

    expect(screen.getByRole('button', { name: 'Sell now' })).toBeInTheDocument()
  })
})
