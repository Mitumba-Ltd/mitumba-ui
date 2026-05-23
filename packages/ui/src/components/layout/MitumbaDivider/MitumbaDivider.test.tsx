// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaDivider } from './MitumbaDivider'

describe('MitumbaDivider', () => {
  afterEach(cleanup)

  it('renders as an hr element', () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <MitumbaDivider />
      </MitumbaThemeProvider>,
    )

    expect(container.querySelector('hr')).toBeInTheDocument()
  })
})
