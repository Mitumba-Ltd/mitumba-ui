// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ConditionBadge } from './ConditionBadge'

describe('ConditionBadge', () => {
  afterEach(cleanup)

  it('renders grade letter only by default', () => {
    render(
      <MitumbaThemeProvider>
        <ConditionBadge grade="A" />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.queryByText('Like new')).not.toBeInTheDocument()
  })

  it('shows label when showLabel is true', () => {
    render(
      <MitumbaThemeProvider>
        <ConditionBadge grade="B" showLabel />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('Good')).toBeInTheDocument()
  })

  it('renders "Fair" label for grade C', () => {
    render(
      <MitumbaThemeProvider>
        <ConditionBadge grade="C" showLabel />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.getByText('Fair')).toBeInTheDocument()
  })
})
