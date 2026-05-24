// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaSearchBar } from './MitumbaSearchBar'

afterEach(() => {
  cleanup()
})

describe('MitumbaSearchBar', () => {
  it('renders with placeholder', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaSearchBar value="" onChange={() => {}} onSubmit={() => {}} placeholder="Search items" />
      </MitumbaThemeProvider>
    )
    expect(screen.getByPlaceholderText('Search items')).toBeInTheDocument()
  })

  it('calls onChange when typing', () => {
    const onChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaSearchBar value="" onChange={onChange} onSubmit={() => {}} />
      </MitumbaThemeProvider>
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'shoes' } })
    expect(onChange).toHaveBeenCalledWith('shoes')
  })

  it('calls onSubmit on Enter key', () => {
    const onSubmit = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaSearchBar value="shoes" onChange={() => {}} onSubmit={onSubmit} />
      </MitumbaThemeProvider>
    )
    const input = screen.getByRole('textbox')
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSubmit).toHaveBeenCalledWith('shoes')
  })

  it('shows suggestions when focused', () => {
    const suggestions = ['Shoes', 'Shirts', 'Shorts']
    render(
      <MitumbaThemeProvider>
        <MitumbaSearchBar
          value=""
          onChange={() => {}}
          onSubmit={() => {}}
          suggestions={suggestions}
        />
      </MitumbaThemeProvider>
    )
    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    suggestions.forEach((s) => {
      expect(screen.getByText(s)).toBeInTheDocument()
    })
  })

  it('calls onSuggestionClick when suggestion is clicked', () => {
    const onSuggestionClick = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaSearchBar
          value=""
          onChange={() => {}}
          onSubmit={() => {}}
          suggestions={['Shoes', 'Shirts']}
          onSuggestionClick={onSuggestionClick}
        />
      </MitumbaThemeProvider>
    )
    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    fireEvent.click(screen.getByText('Shoes'))
    expect(onSuggestionClick).toHaveBeenCalledWith('Shoes')
  })

  it('clears value when clear icon clicked', () => {
    const onChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaSearchBar value="shoes" onChange={onChange} onSubmit={() => {}} />
      </MitumbaThemeProvider>
    )
    const clearBtn = screen.getByLabelText('Clear search')
    fireEvent.click(clearBtn)
    expect(onChange).toHaveBeenCalledWith('')
  })
})
