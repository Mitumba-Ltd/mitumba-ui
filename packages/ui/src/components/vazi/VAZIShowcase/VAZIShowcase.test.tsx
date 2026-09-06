// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { VAZIShowcase } from './VAZIShowcase';
import type { VAZIShowcaseOutfit } from './VAZIShowcase.types';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

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

  it('exposes the feed as a labelled carousel region', () => {
    render(<MitumbaThemeProvider><VAZIShowcase outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getByRole('region', { name: 'VAZI outfit showcase' })).toBeInTheDocument();
  });

  it('advances to the next look with ArrowDown', () => {
    const onIndexChange = vi.fn();
    render(<MitumbaThemeProvider><VAZIShowcase outfits={outfits} onIndexChange={onIndexChange} /></MitumbaThemeProvider>);
    fireEvent.keyDown(screen.getByRole('region', { name: 'VAZI outfit showcase' }), { key: 'ArrowDown' });
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it('renders outfit items as labelled native buttons', () => {
    const onItemClick = vi.fn();
    render(<MitumbaThemeProvider><VAZIShowcase outfits={outfits} onItemClick={onItemClick} /></MitumbaThemeProvider>);
    const jacketButton = screen.getAllByRole('button', { name: 'View Jacket' })[0];
    fireEvent.click(jacketButton);
    expect(onItemClick).toHaveBeenCalledWith('i1');
  });

  it('toggles the mobile sheet via a native button that reports expanded state', () => {
    render(<MitumbaThemeProvider><VAZIShowcase outfits={outfits} /></MitumbaThemeProvider>);
    const toggle = screen.getByRole('button', { name: 'Expand outfit details' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: 'Collapse outfit details' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('emits an h1 primary title and h2 section title when levels are set', () => {
    render(<MitumbaThemeProvider><VAZIShowcase outfits={outfits} titleLevel={1} sectionTitleLevel={2} /></MitumbaThemeProvider>);
    expect(screen.getByRole('heading', { level: 1, name: /LOOK 01/ })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2, name: /This look/ }).length).toBeGreaterThan(0);
  });

  it('keeps titles as non-headings when levels are omitted (backward compatible)', () => {
    render(<MitumbaThemeProvider><VAZIShowcase outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.queryByRole('heading', { name: /LOOK 01/ })).not.toBeInTheDocument();
  });

  it('inherits the host theme typography.fontFamily (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <VAZIShowcase outfits={outfits} />
      </ThemeProvider>,
    );
    expect(screen.getByText(/LOOK 01/).style.fontFamily).toBe('');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider><VAZIShowcase outfits={outfits} onItemClick={() => {}} onShopAll={() => {}} /></MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
