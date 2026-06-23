// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import { DisputeEvidenceGallery } from './DisputeEvidenceGallery';
import type { DisputeEvidenceItem } from './DisputeEvidenceGallery.types';

afterEach(() => { cleanup(); });

const evidence: DisputeEvidenceItem[] = [
  { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/80', created_at: '2026-06-20 10:00 AM' },
  { uploader_role: 'buyer', type: 'text', content: 'Item was damaged on arrival.', created_at: '2026-06-20 10:01 AM' },
  { uploader_role: 'seller', type: 'text', content: 'Shipped in good condition.', created_at: '2026-06-19 03:00 PM' },
];

describe('DisputeEvidenceGallery', () => {
  it('renders group headers', () => {
    render(<DisputeEvidenceGallery evidence={evidence} />);
    expect(screen.getByText('Buyer Evidence')).toBeInTheDocument();
    expect(screen.getByText('Seller Evidence')).toBeInTheDocument();
  });

  it('renders images', () => {
    render(<DisputeEvidenceGallery evidence={evidence} />);
    const img = screen.getByAltText('Evidence');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://placehold.co/80');
  });

  it('renders text evidence', () => {
    render(<DisputeEvidenceGallery evidence={evidence} />);
    expect(screen.getByText('Item was damaged on arrival.')).toBeInTheDocument();
    expect(screen.getByText('Shipped in good condition.')).toBeInTheDocument();
  });

  it('handles empty array', () => {
    const { container } = render(<DisputeEvidenceGallery evidence={[]} />);
    expect(container.querySelector('h3')).toBeNull();
  });
});
