// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaSkeleton } from './MitumbaSkeleton'

afterEach(() => {
  cleanup()
})

describe('MitumbaSkeleton', () => {
  it('renders with given width and height', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaSkeleton width={100} height={20} />
      </MitumbaThemeProvider>,
    )
    const skeleton = screen.getByLabelText('Loading content...')
    expect(skeleton).toHaveStyle({ width: '100px', height: '20px' })
  })

  it('renders rectangular variant', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaSkeleton width={100} height={20} variant="rectangular" />
      </MitumbaThemeProvider>,
    )
    const skeleton = screen.getByLabelText('Loading content...')
    expect(skeleton).toHaveStyle('border-radius: 2px')
  })

  it('renders rounded variant', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaSkeleton width={100} height={20} variant="rounded" />
      </MitumbaThemeProvider>,
    )
    const skeleton = screen.getByLabelText('Loading content...')
    expect(skeleton).toHaveStyle('border-radius: 8px')
  })

  it('renders circular variant', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaSkeleton width={100} height={100} variant="circular" />
      </MitumbaThemeProvider>,
    )
    const skeleton = screen.getByLabelText('Loading content...')
    expect(skeleton).toHaveStyle({ borderRadius: '50%' })
  })

  it('applies custom border radius', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaSkeleton width={100} height={20} borderRadius={8} />
      </MitumbaThemeProvider>,
    )
    const skeleton = screen.getByLabelText('Loading content...')
    expect(skeleton).toHaveStyle({ borderRadius: '8px' })
  })
})
