// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ListingImageGallery } from './ListingImageGallery'

const images = [
  'https://example.com/1.jpg',
  'https://example.com/2.jpg',
  'https://example.com/3.jpg',
]

const title = 'Test Listing'

describe('ListingImageGallery', () => {
  afterEach(cleanup)

  it('renders the primary image', () => {
    render(
      <MitumbaThemeProvider>
        <ListingImageGallery images={images} title={title} />
      </MitumbaThemeProvider>,
    )

    const primary = screen.getByAltText('Test Listing — image 1 of 3')
    expect(primary).toBeInTheDocument()
    expect(primary).toHaveAttribute('src', 'https://example.com/1.jpg')
  })

  it('clicking a thumbnail swaps the primary image', () => {
    render(
      <MitumbaThemeProvider>
        <ListingImageGallery images={images} title={title} />
      </MitumbaThemeProvider>,
    )

    const thumb2 = screen.getByRole('button', { name: 'View image 2 of 3' })
    fireEvent.click(thumb2)

    const primary = screen.getByAltText('Test Listing — image 2 of 3')
    expect(primary).toBeInTheDocument()
    expect(primary).toHaveAttribute('src', 'https://example.com/2.jpg')
  })

  it('keyboard left/right arrows cycle images', () => {
    render(
      <MitumbaThemeProvider>
        <ListingImageGallery images={images} title={title} />
      </MitumbaThemeProvider>,
    )

    const primary = () => screen.getByAltText(/Test Listing — image/)

    expect(primary()).toHaveAttribute('src', 'https://example.com/1.jpg')

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(primary()).toHaveAttribute('src', 'https://example.com/2.jpg')

    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(primary()).toHaveAttribute('src', 'https://example.com/1.jpg')
  })

  it('shows empty state when no images', () => {
    render(
      <MitumbaThemeProvider>
        <ListingImageGallery images={[]} title={title} />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('No images available')).toBeInTheDocument()
  })
})
