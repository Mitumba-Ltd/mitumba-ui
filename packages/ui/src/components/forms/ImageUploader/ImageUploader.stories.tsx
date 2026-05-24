import type { Meta, StoryObj } from '@storybook/react'
import { ImageUploader } from './ImageUploader'

const meta: Meta<typeof ImageUploader> = {
  title: 'Forms/ImageUploader',
  component: ImageUploader,
  tags: ['autodocs'],
}

export default meta
export type Story = StoryObj<typeof ImageUploader>

const defaultImages = [
  { id: '1', url: 'https://picsum.photos/200', status: 'done' as const, isPrimary: true },
  { id: '2', url: 'https://picsum.photos/201', status: 'done' as const, isPrimary: false },
]

export const Default: Story = {
  args: {
    images: defaultImages,
    maxImages: 6,
  },
}

export const Uploading: Story = {
  args: {
    images: [
      { id: '1', url: 'https://picsum.photos/200', status: 'uploading' as const, isPrimary: true },
      { id: '2', url: 'https://picsum.photos/201', status: 'done' as const, isPrimary: false },
    ],
    maxImages: 6,
  },
}

export const WithError: Story = {
  args: {
    images: [
      { id: '1', url: 'https://picsum.photos/200', status: 'error' as const, isPrimary: true },
      { id: '2', url: 'https://picsum.photos/201', status: 'done' as const, isPrimary: false },
    ],
    maxImages: 6,
  },
}
