// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { VAZIHeroSpotlight } from './VAZIHeroSpotlight';
import type { VAZIHeroOutfit } from './VAZIHeroSpotlight.types';

afterEach(() => { cleanup(); });

const outfits: VAZIHeroOutfit[] = [
  { id: 'o1', modelMediaUrl: 'https://placehold.co/300x600', modelMediaType: 'image', modelAlt: 'Model 1', name: 'Test Look', totalPrice: 3000, items: [{ id: 'i1', title: 'Jacket', price: 2000, imageUrl: 'https://placehold.co/50' }, { id: 'i2', title: 'Jeans', price: 1000, imageUrl: 'https://placehold.co/50' }] },
];

describe('VAZIHeroSpotlight', () => {
  it('renders VAZI header', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getByText('VAZI')).toBeInTheDocument();
  });

  it('renders outfit name', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getByText('Test Look')).toBeInTheDocument();
  });

  it('renders outfit items', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getByText('Jacket')).toBeInTheDocument();
    expect(screen.getByText('Jeans')).toBeInTheDocument();
  });

  it('renders total price', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getByText('KES 3,000')).toBeInTheDocument();
  });

  it('renders shop button', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getByRole('button', { name: /Shop this look/i })).toBeInTheDocument();
  });
});
