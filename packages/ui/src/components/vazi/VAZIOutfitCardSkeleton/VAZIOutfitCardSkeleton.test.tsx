// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { VAZIOutfitCardSkeleton } from './VAZIOutfitCardSkeleton'

function renderSkeleton() {
  return render(
    <MitumbaThemeProvider>
      <VAZIOutfitCardSkeleton />
    </MitumbaThemeProvider>,
  )
}

describe('VAZIOutfitCardSkeleton', () => {
  afterEach(cleanup)

  it('renders skeleton elements', () => {
    renderSkeleton()

    // All MitumbaSkeleton components use the same aria-label
    const skeletons = screen.getAllByLabelText(/Loading content.../i)
    expect(skeletons.length).toBeGreaterThan(0)
  })
})
