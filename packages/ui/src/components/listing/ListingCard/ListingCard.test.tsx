// @vitest-environment jsdom
/* eslint-disable react/jsx-props-no-spreading */
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { ListingCard } from './ListingCard';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

afterEach(() => { cleanup(); });

const defaultProps = {
  id: 'abc123',
  title: 'Nike Air Force 1 Low White',
  price: 2500,
  media: ['https://placehold.co/300x400'],
};

describe('ListingCard', () => {
  it('renders title and price', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} /></MitumbaThemeProvider>);
    expect(screen.getByText('Nike Air Force 1 Low White')).toBeInTheDocument();
    expect(screen.getByText('KES 2,500')).toBeInTheDocument();
  });

  it('renders as a named article region', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} /></MitumbaThemeProvider>);
    expect(screen.getByRole('article', { name: 'Nike Air Force 1 Low White' })).toBeInTheDocument();
  });

  it('renders store name when provided', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} storeName="NairobiKicks" /></MitumbaThemeProvider>);
    expect(screen.getByText('NairobiKicks')).toBeInTheDocument();
  });

  it('renders condition chip when provided', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} condition="like_new" /></MitumbaThemeProvider>);
    expect(screen.getByText('Like New')).toBeInTheDocument();
  });

  // --- Destination branch matrix ---

  it('renders a link surface when href is provided', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} href="/listings/abc123" /></MitumbaThemeProvider>);
    const link = screen.getByRole('link', { name: 'Nike Air Force 1 Low White' });
    expect(link).toHaveAttribute('href', '/listings/abc123');
  });

  it('renders a button surface when only onClick is provided', () => {
    const onClick = vi.fn();
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} onClick={onClick} /></MitumbaThemeProvider>);
    const button = screen.getByRole('button', { name: 'Nike Air Force 1 Low White' });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledWith('abc123');
  });

  it('renders no interactive surface when neither href nor onClick is provided', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} /></MitumbaThemeProvider>);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Nike Air Force 1 Low White' })).not.toBeInTheDocument();
  });

  it('exposes the surface as a native, keyboard-operable button', () => {
    const onClick = vi.fn();
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} onClick={onClick} /></MitumbaThemeProvider>);
    const button = screen.getByRole('button', { name: 'Nike Air Force 1 Low White' });
    // Native <button> is inherently focusable/keyboard-operable (Enter/Space).
    expect(button.tagName).toBe('BUTTON');
    button.focus();
    expect(button).toHaveFocus();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledWith('abc123');
  });

  // --- Nested-action isolation ---

  it('calls onSaveToggle with id when heart is clicked, without triggering the surface', () => {
    const onSaveToggle = vi.fn();
    const onClick = vi.fn();
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} onSaveToggle={onSaveToggle} onClick={onClick} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: /Save to wishlist/i }));
    expect(onSaveToggle).toHaveBeenCalledWith('abc123');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('calls onAddToCart with id when cart button is clicked, without triggering the surface', () => {
    const onAddToCart = vi.fn();
    const onClick = vi.fn();
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} onAddToCart={onAddToCart} onClick={onClick} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: /Add to cart/i }));
    expect(onAddToCart).toHaveBeenCalledWith('abc123');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows filled heart when isSaved is true', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} isSaved onSaveToggle={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByRole('button', { name: /Remove from wishlist/i })).toBeInTheDocument();
  });

  it('renders carousel dots when multiple media items', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} media={['https://placehold.co/300x400', 'https://placehold.co/300x401', 'https://placehold.co/300x402']} /></MitumbaThemeProvider>);
    const dots = document.querySelectorAll('[class*="MuiBox-root"]');
    expect(dots.length).toBeGreaterThan(3);
  });

  // --- titleLevel matrix ---

  it('omits titleLevel by default, rendering a non-heading title element', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} /></MitumbaThemeProvider>);
    expect(screen.getByText('Nike Air Force 1 Low White').tagName).toBe('P');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} titleLevel={level} /></MitumbaThemeProvider>);
    const title = screen.getByText('Nike Air Force 1 Low White');
    expect(title.tagName).toBe(`H${level}`);
    expect(title).toHaveStyle({ fontWeight: '600' });
  });

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <ListingCard {...defaultProps} titleLevel={2} storeName="NairobiKicks" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Nike Air Force 1 Low White').style.fontFamily).toBe('');
    expect(screen.getByText('KES 2,500').style.fontFamily).toBe('');
    expect(screen.getByText('NairobiKicks').style.fontFamily).toBe('');
  });

  it('has no axe violations with nested actions and a link surface', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <ListingCard
          {...defaultProps}
          href="/listings/abc123"
          titleLevel={2}
          storeName="NairobiKicks"
          condition="like_new"
          isSaved
          onSaveToggle={vi.fn()}
          onAddToCart={vi.fn()}
          media={['https://placehold.co/300x400', 'https://placehold.co/300x401']}
        />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
