import type { Meta, StoryObj } from '@storybook/react'
import { ListingImageGallery } from './ListingImageGallery'

const meta: Meta<typeof ListingImageGallery> = {
  title: 'Listing/ListingImageGallery',
  component: ListingImageGallery,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ListingImageGallery>

const sampleImages = [
  'https://images.unsplash.com/photo-1542291026-7bbc19228738?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556905055-8f2fad25b37e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1520256862855-398b796c8195?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517836357463-d25e3de9d59c?auto=format&fit=crop&w=800&q=80',
]

export const Default: Story = {
  args: {
    images: sampleImages,
    title: 'Vintage Leather Jacket',
  },
}

export const SingleImage: Story = {
  args: {
    images: [sampleImages[0]!],
    title: 'Single Image Item',
  },
}

export const Empty: Story = {
  args: {
    images: [],
    title: 'No Images Item',
  },
}
