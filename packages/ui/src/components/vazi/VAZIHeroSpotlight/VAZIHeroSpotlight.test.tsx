// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { VAZIHeroSpotlight } from './VAZIHeroSpotlight';
import type { VAZIHeroOutfit } from './VAZIHeroSpotlight.types';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

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

  it('renders See all as a native button that fires onSeeAll', () => {
    const onSeeAll = vi.fn();
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} onSeeAll={onSeeAll} /></MitumbaThemeProvider>);
    const control = screen.getByRole('button', { name: 'See all' });
    fireEvent.click(control);
    expect(onSeeAll).toHaveBeenCalledTimes(1);
  });

  it('renders See all as an anchor when seeAllHref is provided', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} onSeeAll={() => {}} seeAllHref="/vazi" /></MitumbaThemeProvider>);
    const link = screen.getByRole('link', { name: 'See all' });
    expect(link).toHaveAttribute('href', '/vazi');
  });

  it('exposes each model as a labelled native button', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.getByRole('button', { name: 'View Test Look' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View Second Look' })).toBeInTheDocument();
  });

  it('opens a labelled dialog popover when a model is activated', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'View Test Look' }));
    expect(screen.getByRole('dialog', { name: 'Test Look' })).toBeInTheDocument();
  });

  it('closes the popover on Escape and returns focus to the trigger', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    const trigger = screen.getByRole('button', { name: 'View Test Look' });
    fireEvent.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Test Look' });
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('emits an h2 heading for the title when titleLevel is set', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} titleLevel={2} /></MitumbaThemeProvider>);
    expect(screen.getByRole('heading', { level: 2, name: 'VAZI Featured' })).toBeInTheDocument();
  });

  it('keeps the title as a non-heading when titleLevel is omitted', () => {
    render(<MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} /></MitumbaThemeProvider>);
    expect(screen.queryByRole('heading', { name: 'VAZI Featured' })).not.toBeInTheDocument();
  });

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <VAZIHeroSpotlight outfits={outfits} />
      </ThemeProvider>,
    );
    expect(screen.getByText('VAZI Featured').style.fontFamily).toBe('');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider><VAZIHeroSpotlight outfits={outfits} onSeeAll={() => {}} /></MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
