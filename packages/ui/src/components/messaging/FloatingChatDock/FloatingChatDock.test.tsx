// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme'
import { FloatingChatDock } from './FloatingChatDock'
import type { HeadingLevel } from '../../../types/semantic'

expect.extend(toHaveNoViolations)

const HOST_FONT = '"Comic Sans MS", cursive'

// Mock useMediaQuery to return false (desktop)
vi.mock('@mui/material/useMediaQuery', () => ({ default: () => false }))

afterEach(cleanup)

function renderDock(props: Partial<Parameters<typeof FloatingChatDock>[0]> = {}) {
  const defaults = {
    open: true,
    title: 'KisumuKicks',
    minimized: false,
    onToggleMinimize: vi.fn(),
    onClose: vi.fn(),
    children: <div>Chat content</div>,
  }
  const merged = { ...defaults, ...props }
  return {
    onToggleMinimize: merged.onToggleMinimize,
    onClose: merged.onClose,
    ...render(
      <MitumbaThemeProvider>
        <FloatingChatDock
          open={merged.open}
          title={merged.title}
          subtitle={merged.subtitle}
          avatarUrl={merged.avatarUrl}
          minimized={merged.minimized}
          onToggleMinimize={merged.onToggleMinimize}
          onClose={merged.onClose}
          unreadCount={merged.unreadCount}
          onBack={merged.onBack}
          titleLevel={merged.titleLevel}
          announcement={merged.announcement}
        >
          {merged.children}
        </FloatingChatDock>
      </MitumbaThemeProvider>,
    ),
  }
}

describe('FloatingChatDock', () => {
  it('renders title in header', () => {
    renderDock()
    expect(screen.getByText('KisumuKicks')).toBeInTheDocument()
  })

  it('exposes a labelled non-modal dialog region', () => {
    renderDock()
    const dialog = screen.getByRole('dialog', { name: 'Chat with KisumuKicks' })
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-modal', 'false')
  })

  it('renders children when expanded', () => {
    renderDock()
    expect(screen.getByText('Chat content')).toBeInTheDocument()
  })

  it('hides children when minimized', () => {
    renderDock({ minimized: true })
    expect(screen.queryByText('Chat content')).not.toBeInTheDocument()
  })

  it('exposes expanded state via aria-expanded on the minimize control', () => {
    renderDock()
    expect(screen.getByRole('button', { name: 'Minimize chat' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('exposes collapsed state via aria-expanded on the expand control', () => {
    renderDock({ minimized: true })
    expect(screen.getByRole('button', { name: 'Expand chat' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('calls onClose when the named close control is clicked', () => {
    const { onClose } = renderDock()
    fireEvent.click(screen.getByRole('button', { name: 'Close chat' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onToggleMinimize when the named minimize control is clicked', () => {
    const { onToggleMinimize } = renderDock()
    fireEvent.click(screen.getByRole('button', { name: 'Minimize chat' }))
    expect(onToggleMinimize).toHaveBeenCalled()
  })

  it('renders a named back control and fires onBack', () => {
    const onBack = vi.fn()
    renderDock({ onBack })
    fireEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(onBack).toHaveBeenCalled()
  })

  it('renders nothing when open is false', () => {
    renderDock({ open: false })
    expect(screen.queryByText('KisumuKicks')).not.toBeInTheDocument()
  })

  it('shows subtitle', () => {
    renderDock({ subtitle: 'typing…' })
    expect(screen.getByText('typing…')).toBeInTheDocument()
  })

  it('surfaces a controlled announcement once via a single status region', () => {
    renderDock({ announcement: '3 new messages' })
    const statuses = screen.getAllByRole('status')
    expect(statuses).toHaveLength(1)
    expect(statuses[0]).toHaveTextContent('3 new messages')
  })

  it('does not duplicate the live region when the announcement is unchanged on re-render', () => {
    const { rerender } = renderDock({ announcement: 'New message' })
    rerender(
      <MitumbaThemeProvider>
        <FloatingChatDock open title="KisumuKicks" minimized={false} onToggleMinimize={vi.fn()} onClose={vi.fn()} announcement="New message">
          <div>Chat content</div>
        </FloatingChatDock>
      </MitumbaThemeProvider>,
    )
    expect(screen.getAllByRole('status')).toHaveLength(1)
  })

  it('omits titleLevel by default, rendering a non-heading title element', () => {
    renderDock()
    expect(screen.getByText('KisumuKicks').tagName).toBe('P')
  })

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s title element when titleLevel is set', (level) => {
    renderDock({ titleLevel: level })
    expect(screen.getByText('KisumuKicks').tagName).toBe(`H${level}`)
  })

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } })
    render(
      <ThemeProvider theme={hostTheme}>
        <FloatingChatDock open title="KisumuKicks" subtitle="online" minimized={false} onToggleMinimize={vi.fn()} onClose={vi.fn()} titleLevel={2}>
          <div>Chat content</div>
        </FloatingChatDock>
      </ThemeProvider>,
    )
    expect(screen.getByText('KisumuKicks').style.fontFamily).toBe('')
    expect(screen.getByText('online').style.fontFamily).toBe('')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <FloatingChatDock open title="KisumuKicks" subtitle="online" minimized={false} onToggleMinimize={vi.fn()} onClose={vi.fn()} onBack={vi.fn()} titleLevel={2} announcement="New message">
          <div>Chat content</div>
        </FloatingChatDock>
      </MitumbaThemeProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
