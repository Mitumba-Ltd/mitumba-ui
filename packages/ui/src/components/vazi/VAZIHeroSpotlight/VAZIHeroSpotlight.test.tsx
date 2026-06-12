// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { VAZIHeroSpotlight } from './VAZIHeroSpotlight';
import type { VAZIHeroOutfit } from './VAZIHeroSpotlight.types';

afterEach(() => { cleanup(); });

const outfits: VAZIHeroOutfit[] = [
  { id: 'o1', modelMediaUrl: 'https://placehold.co/200x400', modelMediaType: 'image', modelAlt: 'Model 1', name: 'Test Look', totalPrice: 3000, items: [{ id: 'i1', title: 'Jacket', price: 2000, imageUrl: 'https://placehold.co/50' }, { id: 'i2', title: 'Jeans', price: 1000, imageUrl: 'https://placehold.co/50' }] },
  { id: 'o2', modelMediaUrl: 'https://placehold.co/200x401', modelMediaType: 'image', modelAlt: 'Model 2', name: 'Second Look', totalPrice: 4000, items: [{ id: 'i3', title: 'Blazer', price: 2500, imageUrl: 'https://placehold.co/50' }] },
];

describe('VAZIHeroSpotlight', () => {
  it('renders VAZI header', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getByText('VAZI Featured')).toBeInTheDocument();
  });

  it('renders model images', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getByAltText('Model 1')).toBeInTheDocument();
    expect(screen.getByAltText('Model 2')).toBeInTheDocument();
  });

  it('shows popover with outfit name when model clicked', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByAltText('Model 1'));
    expect(screen.getByText('Test Look')).toBeInTheDocument();
    expect(screen.getByText('KES 3,000')).toBeInTheDocument();
  });

  it('calls onShopLook when Shop is clicked in popover', () => {
    const onShopLook = vi.fn();
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} onShopLook={onShopLook} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByAltText('Model 1'));
    fireEvent.click(screen.getByRole('button', { name: /Shop/i }));
    expect(onShopLook).toHaveBeenCalledWith('o1');
  });

  it('renders See all link when onSeeAll provided', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} onSeeAll={() => {}} /></MitumbaThemeProvider>);
    expect(screen.getByText('See all')).toBeInTheDocument();
  });
});
