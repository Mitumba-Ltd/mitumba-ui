// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import { MitumbaThemeProvider } from '../../../theme'
import { EmptyState } from './EmptyState'

afterEach(() => {
  cleanup()
})

describe('EmptyState', () => {
  it('renders icon, title and subtitle', () => {
    render(
      <MitumbaThemeProvider>
        <EmptyState icon={<SearchOffIcon />} title="No results" subtitle="Try adjusting your filters" />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('No results')).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your filters')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('renders action button when provided', () => {
    const onClick = vi.fn()
    render(
      <MitumbaThemeProvider>
        <EmptyState
          icon={<SearchOffIcon />}
          title="No results"
          subtitle="Try adjusting your filters"
          action={{ label: 'Clear filters', onClick }}
        />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Clear filters')).toBeInTheDocument()
  })

  it('calls action onClick when clicked', () => {
    const onClick = vi.fn()
    render(
      <MitumbaThemeProvider>
        <EmptyState
          icon={<SearchOffIcon />}
          title="No results"
          subtitle="Try adjusting your filters"
          action={{ label: 'Clear filters', onClick }}
        />
      </MitumbaThemeProvider>
    )
    const button = screen.getByText('Clear filters')
    button.click()
    expect(onClick).toHaveBeenCalled()
  })
})
