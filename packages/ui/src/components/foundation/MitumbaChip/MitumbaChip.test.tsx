// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaChip } from './MitumbaChip'
import type { MitumbaChipProps } from './MitumbaChip.types'

function renderChip(props: Partial<MitumbaChipProps> = {}) {
  const chipProps: MitumbaChipProps = {
    color: 'primary',
    label: 'Verified',
    onClick: undefined,
    onDelete: undefined,
    size: 'medium',
    variant: 'solid',
    ...props,
  }

  return render(
    <MitumbaThemeProvider>
      <MitumbaChip
        color={chipProps.color}
        label={chipProps.label}
        onClick={chipProps.onClick}
        onDelete={chipProps.onDelete}
        size={chipProps.size}
        variant={chipProps.variant}
        selected={chipProps.selected}
        disabled={chipProps.disabled}
        icon={chipProps.icon}
        avatar={chipProps.avatar}
        badge={chipProps.badge}
        rounding={chipProps.rounding}
        elevation={chipProps.elevation}
        sx={chipProps.sx}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(() => {
  cleanup()
})

describe('MitumbaChip', () => {
  it('renders label text', () => {
    renderChip({ label: 'Trusted' })

    expect(screen.getByText('Trusted')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    renderChip({ onClick })

    fireEvent.click(screen.getByRole('button', { name: /Verified/i }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('calls onDelete when delete icon is clicked', () => {
    const onDelete = vi.fn()
    renderChip({ onDelete })

    fireEvent.click(screen.getByTestId('CancelIcon'))

    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('supports earth color variant', () => {
    renderChip({ color: 'earth', label: 'VAZI' })

    expect(screen.getByText('VAZI')).toBeInTheDocument()
  })

  it('supports secondary color variant', () => {
    renderChip({ color: 'secondary', label: 'Pending' })

    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('supports outline variant', () => {
    renderChip({ variant: 'outline', label: 'Draft' })

    expect(screen.getByText('Draft')).toBeInTheDocument()
  })

  it('is not a button when not clickable', () => {
    renderChip({ onClick: undefined })

    expect(screen.getByText('Verified')).not.toHaveAttribute('role', 'button')
  })
})
