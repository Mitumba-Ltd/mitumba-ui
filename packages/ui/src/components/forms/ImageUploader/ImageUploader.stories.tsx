import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { ImageUploader } from './ImageUploader';
import type { UploadedImage } from './ImageUploader.types';

const meta: Meta<typeof ImageUploader> = {
  title: 'Forms/ImageUploader',
  component: ImageUploader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageUploader>;

const SAMPLE_IMAGES: UploadedImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', status: 'done', isPrimary: true },
  { id: '2', url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80', status: 'done', isPrimary: false },
  { id: '3', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80', status: 'done', isPrimary: false },
];

function InteractiveUploader() {
  const [images, setImages] = useState<UploadedImage[]>(SAMPLE_IMAGES);

  const handleAdd = (files: File[]) => {
    const newImages: UploadedImage[] = files.map((f, i) => ({
      id: `new-${Date.now()}-${String(i)}`,
      url: URL.createObjectURL(f),
      status: 'done' as const,
      isPrimary: false,
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 6));
  };

  const handleRemove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleReorder = (newOrder: string[]) => {
    setImages((prev) => {
      const map = new Map(prev.map((img) => [img.id, img]));
      return newOrder.map((id, i) => {
        const img = map.get(id);
        if (!img) return null;
        return { ...img, isPrimary: i === 0 };
      }).filter(Boolean) as UploadedImage[];
    });
  };

  return (
    <Box sx={{ maxWidth: 360 }}>
      <ImageUploader images={images} onAdd={handleAdd} onRemove={handleRemove} onReorder={handleReorder} maxImages={6} />
    </Box>
  );
}

export const Default: Story = {
  render: () => <InteractiveUploader />,
};

export const Empty: Story = {
  args: {
    images: [],
    onAdd: () => {},
    onRemove: () => {},
    onReorder: () => {},
    maxImages: 6,
  },
  decorators: [(Story) => <Box sx={{ maxWidth: 360 }}><Story /></Box>],
};

export const WithUploading: Story = {
  args: {
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', status: 'done', isPrimary: true },
      { id: '2', url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80', status: 'uploading', isPrimary: false },
    ],
    onAdd: () => {},
    onRemove: () => {},
    onReorder: () => {},
  },
  decorators: [(Story) => <Box sx={{ maxWidth: 360 }}><Story /></Box>],
};

export const WithError: Story = {
  args: {
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', status: 'done', isPrimary: true },
      { id: '2', url: '', status: 'error', isPrimary: false },
    ],
    onAdd: () => {},
    onRemove: () => {},
    onReorder: () => {},
  },
  decorators: [(Story) => <Box sx={{ maxWidth: 360 }}><Story /></Box>],
};

export const SingleVariant: Story = {
  args: {
    images: [],
    onAdd: () => {},
    onRemove: () => {},
    onReorder: () => {},
    variant: 'single',
    hint: 'Upload profile photo',
    aspectRatio: '1 / 1',
  },
  decorators: [(Story) => <Box sx={{ maxWidth: 200 }}><Story /></Box>],
};

export const SingleWithImage: Story = {
  args: {
    images: [{ id: '1', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', status: 'done', isPrimary: true }],
    onAdd: () => {},
    onRemove: () => {},
    onReorder: () => {},
    variant: 'single',
    aspectRatio: '16 / 9',
    hint: 'Upload banner',
  },
  decorators: [(Story) => <Box sx={{ maxWidth: 400 }}><Story /></Box>],
};

export const Mobile: Story = {
  render: () => <InteractiveUploader />,
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
