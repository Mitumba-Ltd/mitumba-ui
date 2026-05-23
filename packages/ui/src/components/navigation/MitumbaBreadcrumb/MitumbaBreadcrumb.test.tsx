// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { MitumbaBreadcrumb } from './MitumbaBreadcrumb'

describe('MitumbaBreadcrumb', () => {
  afterEach(cleanup)

  it('renders all items', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaBreadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shoes' },
            { label: 'Nike Air' },
          ]}
        />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Shoes')).toBeInTheDocument()
    expect(screen.getByText('Nike Air')).toBeInTheDocument()
  })

  it('last item is not a link', () => {
    render(
      <MitumbaThemeProvider>
        <MitumbaBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Current' }]} />
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Current')).not.toHaveAttribute('href')
  })
})
