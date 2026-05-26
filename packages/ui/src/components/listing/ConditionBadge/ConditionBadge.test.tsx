// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ConditionBadge } from './ConditionBadge'
import type { ConditionBadgeProps } from './ConditionBadge.types'

function renderBadge(customProps: Partial<ConditionBadgeProps> = {}) {
  const merged: ConditionBadgeProps = {
    grade: 'A',
    ...customProps,
  }
  return render(
    <MitumbaThemeProvider>
      <ConditionBadge 
        grade={merged.grade}
        showLabel={merged.showLabel}
      />
    </MitumbaThemeProvider>,
  )
}

afterEach(cleanup)

describe('ConditionBadge', () => {
  it('renders grade letter only by default', () => {
    renderBadge({ grade: 'A' })
    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('shows label when showLabel is true', () => {
    renderBadge({ grade: 'B', showLabel: true })
    expect(screen.getByText(/B/i)).toBeInTheDocument()
    expect(screen.getByText(/Good/i)).toBeInTheDocument()
  })

  it('renders "Fair" label for grade C', () => {
    renderBadge({ grade: 'C', showLabel: true })
    expect(screen.getByText(/C/i)).toBeInTheDocument()
    expect(screen.getByText(/Fair/i)).toBeInTheDocument()
  })
})
