// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaPagination } from './MitumbaPagination'

afterEach(() => {
  cleanup()
})

describe('MitumbaPagination', () => {
  it('renders correctly with current page', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaPagination count={10} page={1} onChange={() => {}} />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByLabelText('page 1')).toBeInTheDocument()
    expect(screen.getByLabelText('page 1')).toHaveAttribute('aria-current', 'page')
  })

  it('calls onChange when a page is clicked', () => {
    const onChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaPagination count={10} page={1} onChange={onChange} />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByLabelText('Go to page 2'))
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('navigates with arrows', () => {
    const onChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaPagination count={10} page={2} onChange={onChange} />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByLabelText('Go to next page'))
    expect(onChange).toHaveBeenCalledWith(3)

    fireEvent.click(screen.getByLabelText('Go to previous page'))
    expect(onChange).toHaveBeenCalledWith(1)
  })
})
