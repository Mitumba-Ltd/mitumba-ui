// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaTabs } from './MitumbaTabs'

const tabs = [
  { label: 'Tab 1', value: '1' },
  { label: 'Tab 2', value: '2' },
]

afterEach(() => {
  cleanup()
})

describe('MitumbaTabs', () => {
  it('renders all tab labels', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaTabs value="1" onChange={() => {}} tabs={tabs} />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
  })

  it('calls onChange when a tab is clicked', () => {
    const onChange = vi.fn()
    render(
      <MitumbaThemeProvider>
        <MitumbaTabs value="1" onChange={onChange} tabs={tabs} />
      </MitumbaThemeProvider>,
    )

    fireEvent.click(screen.getByText('Tab 2'))
    expect(onChange).toHaveBeenCalledWith('2')
  })

  it('reflects the selected value', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaTabs value="2" onChange={() => {}} tabs={tabs} />
      </MitumbaThemeProvider>,
    )

    const tab2 = screen.getByRole('tab', { selected: true })
    expect(tab2).toHaveTextContent('Tab 2')
  })
})
