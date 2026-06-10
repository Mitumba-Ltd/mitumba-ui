// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { ListingCard } from './ListingCard';

afterEach(() => { cleanup(); });

const defaultProps = {
  id: 'abc123',
  title: 'Nike Air Force 1 Low White',
  price: 2500,
  imageUrl: 'https://placehold.co/300x400',
};

describe('ListingCard', () => {
  it('renders title and price', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} /></MitumbaThemeProvider>);
    expect(screen.getByText('Nike Air Force 1 Low White')).toBeInTheDocument();
    expect(screen.getByText('KES 2,500')).toBeInTheDocument();
  });

  it('renders store name when provided', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} storeName="NairobiKicks" /></MitumbaThemeProvider>);
    expect(screen.getByText('NairobiKicks')).toBeInTheDocument();
  });

  it('renders condition chip when provided', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} condition="like_new" /></MitumbaThemeProvider>);
    expect(screen.getByText('Like New')).toBeInTheDocument();
  });

  it('calls onClick with id when card is clicked', () => {
    const onClick = vi.fn();
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} onClick={onClick} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByText('Nike Air Force 1 Low White'));
    expect(onClick).toHaveBeenCalledWith('abc123');
  });

  it('calls onSaveToggle with id when heart is clicked', () => {
    const onSaveToggle = vi.fn();
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} onSaveToggle={onSaveToggle} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: /Save to wishlist/i }));
    expect(onSaveToggle).toHaveBeenCalledWith('abc123');
  });

  it('shows filled heart when isSaved is true', () => {
    render(<MitumbaThemeProvider><ListingCard {...defaultProps} isSaved onSaveToggle={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByRole('button', { name: /Remove from wishlist/i })).toBeInTheDocument();
  });
});
