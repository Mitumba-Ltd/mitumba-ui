// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { PageContainer } from './PageContainer'

afterEach(() => {
  cleanup()
})

describe('PageContainer', () => {
  it('renders children', () => {
    render(
      <MitumbaThemeProvider>
        <PageContainer maxWidth="lg">Hello</PageContainer>
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders without padding', () => {
    render(
      <MitumbaThemeProvider>
        <PageContainer noPadding>Test</PageContainer>
      </MitumbaThemeProvider>,
    )

    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
