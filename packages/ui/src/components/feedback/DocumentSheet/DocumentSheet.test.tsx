// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { DocumentSheet } from './DocumentSheet'
import type { DocumentSheetProps } from './DocumentSheet.types'

afterEach(() => {
  cleanup()
})

function renderSheet(props: Partial<DocumentSheetProps> = {}) {
  const onClose = vi.fn()
  render(
    <MitumbaThemeProvider>
      <DocumentSheet
        open
        onClose={onClose}
        title="Receipt"
        subtitle={props.subtitle}
        src={props.src}
        filename={props.filename}
        loading={props.loading}
        error={props.error}
        onRetry={props.onRetry}
        titleLevel={props.titleLevel}
      />
    </MitumbaThemeProvider>,
  )
  return { onClose }
}

describe('DocumentSheet', () => {
  it('shows the document in a frame, labelled by its title and subtitle', () => {
    renderSheet({ subtitle: 'RCT-20261110-C0FFEE00', src: 'blob:https://app.example/1', filename: 'Mitumba-Receipt.pdf', titleLevel: 2 })

    const dialog = screen.getByRole('dialog', { name: 'Receipt' })
    expect(dialog).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Receipt' })).toBeInTheDocument()
    expect(screen.getByText('RCT-20261110-C0FFEE00')).toBeInTheDocument()
    expect(screen.getByTitle('Receipt RCT-20261110-C0FFEE00')).toHaveAttribute('src', 'blob:https://app.example/1')
    expect(screen.queryByTestId('document-sheet-loading')).not.toBeInTheDocument()
  })

  it('downloads under its file name and opens in a new tab', () => {
    renderSheet({ src: 'blob:https://app.example/1', filename: 'Mitumba-Receipt.pdf' })

    const download = screen.getByRole('link', { name: 'Download Receipt' })
    expect(download).toHaveAttribute('href', 'blob:https://app.example/1')
    expect(download).toHaveAttribute('download', 'Mitumba-Receipt.pdf')

    const newTab = screen.getByRole('link', { name: 'Open Receipt in a new tab' })
    expect(newTab).toHaveAttribute('target', '_blank')
    expect(newTab).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('lets the browser name the download when no file name is given, and titles a frame without a subtitle', () => {
    renderSheet({ src: 'https://cdn.example/doc.pdf' })
    expect(screen.getByRole('link', { name: 'Download Receipt' })).toHaveAttribute('download')
    expect(screen.getByTitle('Receipt')).toBeInTheDocument()
  })

  it('closes from its Close button and from Escape', () => {
    const { onClose } = renderSheet({ src: 'blob:x' })
    fireEvent.click(screen.getByRole('button', { name: 'Close Receipt' }))
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(2)
  })

  it('shows a skeleton while loading, and no document or actions', () => {
    renderSheet({ loading: true, src: 'blob:stale' })
    expect(screen.getByTestId('document-sheet-loading')).toHaveAttribute('aria-busy', 'true')
    expect(screen.queryByTitle('Receipt')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Download Receipt' })).not.toBeInTheDocument()
  })

  it('shows the skeleton until a document is given', () => {
    renderSheet()
    expect(screen.getByTestId('document-sheet-loading')).toBeInTheDocument()
  })

  it('shows the error with a Retry, and no document', () => {
    const onRetry = vi.fn()
    renderSheet({ error: 'Check your connection and try again.', onRetry, src: 'blob:stale' })
    expect(screen.getByText('Check your connection and try again.')).toBeInTheDocument()
    expect(screen.queryByTitle('Receipt')).not.toBeInTheDocument()
    expect(screen.queryByTestId('document-sheet-loading')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('renders nothing while closed', () => {
    render(
      <MitumbaThemeProvider>
        <DocumentSheet open={false} onClose={() => {}} title="Invoice" src="blob:x" />
      </MitumbaThemeProvider>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
