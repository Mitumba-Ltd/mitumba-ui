// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { ConditionBadge } from './ConditionBadge'
import type { ConditionBadgeProps } from './ConditionBadge.types'

const HOST_FONT = '"Comic Sans MS", cursive'

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

  it('inherits the host theme typography.fontFamily (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <ConditionBadge grade="A" />
      </ThemeProvider>,
    )

    const chipRoot = screen.getByText('A').closest('.MuiChip-root') as HTMLElement
    expect(chipRoot).not.toBeNull()
    expect(chipRoot.style.fontFamily).toBe('')
  })
})
