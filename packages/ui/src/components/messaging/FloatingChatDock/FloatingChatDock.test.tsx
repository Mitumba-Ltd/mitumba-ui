// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { FloatingChatDock } from './FloatingChatDock'

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

  it('renders children when expanded', () => {
    renderDock()
    expect(screen.getByText('Chat content')).toBeInTheDocument()
  })

  it('hides children when minimized', () => {
    renderDock({ minimized: true })
    expect(screen.queryByText('Chat content')).not.toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    const { onClose } = renderDock()
    fireEvent.click(screen.getByLabelText('Close chat'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onToggleMinimize when minimize button clicked', () => {
    const { onToggleMinimize } = renderDock()
    fireEvent.click(screen.getByLabelText('Minimize chat'))
    expect(onToggleMinimize).toHaveBeenCalled()
  })

  it('renders nothing when open is false', () => {
    renderDock({ open: false })
    expect(screen.queryByText('KisumuKicks')).not.toBeInTheDocument()
  })

  it('shows subtitle', () => {
    renderDock({ subtitle: 'typing…' })
    expect(screen.getByText('typing…')).toBeInTheDocument()
  })
})
