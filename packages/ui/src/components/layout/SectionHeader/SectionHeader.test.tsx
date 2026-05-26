// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { SectionHeader } from './SectionHeader'

afterEach(() => {
  cleanup()
})

describe('SectionHeader', () => {
  it('renders title and subtitle', () => {
    render(
      <MitumbaThemeProvider>
        <SectionHeader title="Testing" subtitle="Descriptive text" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Testing')).toBeInTheDocument()
    expect(screen.getByText('Descriptive text')).toBeInTheDocument()
  })

  it('renders overline text when provided', () => {
    render(
      <MitumbaThemeProvider>
        <SectionHeader title="Testing" overline="Small overline" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Small overline')).toBeInTheDocument()
  })

  it('calls onAction when legacy action button is clicked', () => {
    const onAction = vi.fn()
    render(
      <MitumbaThemeProvider>
        <SectionHeader title="Testing" actionLabel="Click me" onAction={onAction} />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: /Click me/i }))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('renders custom action node', () => {
    render(
      <MitumbaThemeProvider>
        <SectionHeader title="Testing" action={<div data-testid="custom-action">Action</div>} />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByTestId('custom-action')).toBeInTheDocument()
  })
})
