// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaChip } from './MitumbaChip'
import type { MitumbaChipProps } from './MitumbaChip.types'

function renderChip(props: Partial<MitumbaChipProps> = {}) {
  const chipProps: MitumbaChipProps = {
    label: 'Verified',
    onClick: undefined,
    onDelete: undefined,
    size: 'medium',
    variant: 'outline',
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
        status={chipProps.status}
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

  it('calls onChange when clicked', () => {
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

  it('supports success status', () => {
    renderChip({ status: 'success', label: 'DONE' })

    expect(screen.getByText('DONE')).toBeInTheDocument()
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
