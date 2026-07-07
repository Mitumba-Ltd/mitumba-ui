// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import React from 'react'
import { MitumbaThemeProvider } from '../../../theme'
import { FormCard } from './FormCard'

afterEach(cleanup)

describe('FormCard', () => {
  it('renders title', () => {
    render(<MitumbaThemeProvider><FormCard title="Create Store"><div>form</div></FormCard></MitumbaThemeProvider>)
    expect(screen.getByText('Create Store')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<MitumbaThemeProvider><FormCard title="Test" subtitle="Sub text"><div>form</div></FormCard></MitumbaThemeProvider>)
    expect(screen.getByText('Sub text')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<MitumbaThemeProvider><FormCard title="Test"><span>My form content</span></FormCard></MitumbaThemeProvider>)
    expect(screen.getByText('My form content')).toBeInTheDocument()
  })

  it('renders error', () => {
    render(<MitumbaThemeProvider><FormCard title="Test" error="Something failed"><div>form</div></FormCard></MitumbaThemeProvider>)
    expect(screen.getByText('Something failed')).toBeInTheDocument()
  })

  it('renders icon', () => {
    render(<MitumbaThemeProvider><FormCard title="Test" icon={<span data-testid="icon">🏪</span>}><div>form</div></FormCard></MitumbaThemeProvider>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
