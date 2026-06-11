// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { VAZIShowcase } from './VAZIShowcase';
import type { VAZIShowcaseOutfit } from './VAZIShowcase.types';

afterEach(() => { cleanup(); });

const outfits: VAZIShowcaseOutfit[] = [
  { id: 'o1', modelMediaUrl: 'https://placehold.co/300x600', modelMediaType: 'image', modelAlt: 'Model 1', totalPrice: 4000, items: [{ id: 'i1', title: 'Jacket', price: 2000, imageUrl: 'https://placehold.co/50' }, { id: 'i2', title: 'Jeans', price: 2000, imageUrl: 'https://placehold.co/50' }] },
  { id: 'o2', modelMediaUrl: 'https://placehold.co/300x601', modelMediaType: 'image', modelAlt: 'Model 2', totalPrice: 3000, items: [{ id: 'i3', title: 'Top', price: 1000, imageUrl: 'https://placehold.co/50' }, { id: 'i4', title: 'Skirt', price: 2000, imageUrl: 'https://placehold.co/50' }] },
];

describe('VAZIShowcase', () => {
  it('renders outfit items for active outfit', () => {
    render(<MitumbaThemeProvider><VAZIShowcase outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getAllByText('Jacket')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Jeans')[0]).toBeInTheDocument();
  });

  it('shows total price', () => {
    render(<MitumbaThemeProvider><VAZIShowcase outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getAllByText('KES 4,000')[0]).toBeInTheDocument();
  });

  it('shows VAZI branding', () => {
    render(<MitumbaThemeProvider><VAZIShowcase outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getAllByText('VAZI')[0]).toBeInTheDocument();
  });

  it('renders shop this look button', () => {
    render(<MitumbaThemeProvider><VAZIShowcase outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getAllByRole('button', { name: /Shop this look/i })[0]).toBeInTheDocument();
  });

  it('renders look counter', () => {
    render(<MitumbaThemeProvider><VAZIShowcase outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getAllByText(/1/)[0]).toBeInTheDocument();
  });
});
