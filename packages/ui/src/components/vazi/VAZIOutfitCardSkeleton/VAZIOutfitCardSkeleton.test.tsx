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

afterEach(() => {
  cleanup()
})

describe('VAZIOutfitCardSkeleton', () => {
  it('renders all skeleton elements', () => {
    renderSkeleton()

    expect(screen.getByLabelText(/Loading VAZI label/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Loading outfit name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Loading total price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Loading buy button/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Loading seller info/i)).toBeInTheDocument()
  })

  it('renders image skeletons', () => {
    renderSkeleton()

    expect(screen.getByLabelText(/Loading item image 1/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Loading item image 2/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Loading item image 3/i)).toBeInTheDocument()
  })

  it('renders seller skeletons', () => {
    renderSkeleton()

    expect(screen.getByLabelText(/Loading seller name 1/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Loading seller name 2/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Loading seller name 3/i)).toBeInTheDocument()
  })
})
