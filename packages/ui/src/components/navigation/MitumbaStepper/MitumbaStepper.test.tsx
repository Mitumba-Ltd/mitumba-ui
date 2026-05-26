// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaStepper } from './MitumbaStepper'

const steps = [
  { label: 'Step 1' },
  { label: 'Step 2' },
]

afterEach(() => {
  cleanup()
})

describe('MitumbaStepper', () => {
  it('renders all step labels', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaStepper activeStep={0} steps={steps} />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
  })

  it('highlights the active step', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaStepper activeStep={1} steps={steps} />
      </MitumbaThemeProvider>,
    )

    const step2 = screen.getByText('Step 2')
    // In our implementation, active step label is heavier
    expect(step2).toHaveStyle({ fontWeight: '800' })
  })
})
