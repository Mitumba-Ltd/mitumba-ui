// @vitest-environment jsdom
/* eslint-disable react/jsx-props-no-spreading */
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { ImageUploader } from './ImageUploader';
import type { UploadedImage } from './ImageUploader.types';

afterEach(() => { cleanup(); });

const sampleImages: UploadedImage[] = [
  { id: '1', url: 'https://placehold.co/100', status: 'done', isPrimary: true },
  { id: '2', url: 'https://placehold.co/101', status: 'done', isPrimary: false },
];

const baseProps = {
  images: sampleImages,
  onAdd: vi.fn(),
  onRemove: vi.fn(),
  onReorder: vi.fn(),
};

describe('ImageUploader', () => {
  it('renders images in grid', () => {
    render(<MitumbaThemeProvider><ImageUploader {...baseProps} /></MitumbaThemeProvider>);
    expect(screen.getByAltText('Photo 1')).toBeInTheDocument();
    expect(screen.getByAltText('Photo 2')).toBeInTheDocument();
  });

  it('shows cover badge on first image', () => {
    render(<MitumbaThemeProvider><ImageUploader {...baseProps} /></MitumbaThemeProvider>);
    expect(screen.getByText('Cover')).toBeInTheDocument();
  });

  it('calls onRemove when remove button clicked', () => {
    render(<MitumbaThemeProvider><ImageUploader {...baseProps} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Remove photo 1' }));
    expect(baseProps.onRemove).toHaveBeenCalledWith('1');
  });

  it('shows upload progress for uploading images', () => {
    const images: UploadedImage[] = [{ id: '1', url: 'https://placehold.co/100', status: 'uploading', isPrimary: true }];
    render(<MitumbaThemeProvider><ImageUploader {...baseProps} images={images} /></MitumbaThemeProvider>);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders single variant with hint text', () => {
    render(<MitumbaThemeProvider><ImageUploader {...baseProps} images={[]} variant="single" hint="Upload logo" /></MitumbaThemeProvider>);
    expect(screen.getByText('Upload logo')).toBeInTheDocument();
  });
});
