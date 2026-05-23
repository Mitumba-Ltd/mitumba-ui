// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { SectionHeader } from './SectionHeader'

describe('SectionHeader', () => {
  afterEach(cleanup)

  it('renders title', () => {
    render(
      <MitumbaThemeProvider>
        <SectionHeader title="New Arrivals" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('New Arrivals')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(
      <MitumbaThemeProvider>
        <SectionHeader title="Shoes" subtitle="Browse latest styles" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Browse latest styles')).toBeInTheDocument()
  })

  it('calls onAction when action button is clicked', () => {
    const onAction = vi.fn()
    render(
      <MitumbaThemeProvider>
        <SectionHeader title="Collections" actionLabel="See all" onAction={onAction} />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'See all' }))

    expect(onAction).toHaveBeenCalledTimes(1)
  })
})
