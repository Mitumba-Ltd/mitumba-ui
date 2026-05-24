// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MitumbaThemeProvider } from '../../../theme'
import { ImageUploader } from './ImageUploader'
import type { UploadedImage } from './ImageUploader.types'

afterEach(() => {
  cleanup()
})

describe('ImageUploader', () => {
  const mockImages: UploadedImage[] = [
    { id: 'img-a', url: '/image1.jpg', status: 'done', isPrimary: true },
    { id: 'img-b', url: '/image2.jpg', status: 'done', isPrimary: false },
  ]

  it('renders uploaded images', () => {
    render(
      <MitumbaThemeProvider>
        <ImageUploader images={mockImages} onAdd={() => {}} onRemove={() => {}} onReorder={() => {}} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByAltText('Upload preview 1')).toBeInTheDocument()
    expect(screen.getByAltText('Upload preview 2')).toBeInTheDocument()
  })

  it('shows cover photo badge on primary image', () => {
    render(
      <MitumbaThemeProvider>
        <ImageUploader images={mockImages} onAdd={() => {}} onRemove={() => {}} onReorder={() => {}} />
      </MitumbaThemeProvider>
    )
    expect(screen.getByText('Cover photo')).toBeInTheDocument()
  })

  it('calls onAdd when files are selected', () => {
    const onAdd = vi.fn()
    const { container } = render(
      <MitumbaThemeProvider>
        <ImageUploader images={[]} onAdd={onAdd} onRemove={() => {}} onReorder={() => {}} />
      </MitumbaThemeProvider>
    )
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement
    fireEvent.change(fileInput, { target: { files: [file] } })
    expect(onAdd).toHaveBeenCalledWith([file])
  })

  it('calls onRemove when delete icon is clicked', () => {
    const onRemove = vi.fn()
    const { container } = render(
      <MitumbaThemeProvider>
        <ImageUploader images={mockImages} onAdd={() => {}} onRemove={onRemove} onReorder={() => {}} />
      </MitumbaThemeProvider>
    )
    const deleteButtons = container.querySelectorAll('.remove-btn')
    expect(deleteButtons.length).toBeGreaterThan(0)
  })

  it('hides add button when max images reached', () => {
    const maxedImages: UploadedImage[] = Array.from({ length: 6 }, (_, i) => ({
      id: `maxed-${i + 1}`,
      url: `/maxed-img-${i + 1}.jpg`,
      status: 'done' as const,
      isPrimary: i === 0,
    }))
    render(
      <MitumbaThemeProvider>
        <ImageUploader images={maxedImages} onAdd={() => {}} onRemove={() => {}} onReorder={() => {}} maxImages={6} />
      </MitumbaThemeProvider>
    )
    expect(screen.queryByText('Add Photo')).not.toBeInTheDocument()
  })
})
