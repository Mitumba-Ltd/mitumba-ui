/* eslint-disable react/jsx-props-no-spreading */
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { SearchFilterSheet } from './SearchFilterSheet';
import type { FilterState } from './SearchFilterSheet.types';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => { cleanup(); });

const defaultFilters: FilterState = {
  categories: [],
  conditions: [],
  priceRange: null,
  city: null,
  sort: 'relevant',
  vaziOnly: false,
};

const baseProps = {
  filters: defaultFilters,
  onFiltersChange: vi.fn(),
  onApply: vi.fn(),
  onClear: vi.fn(),
  onClose: vi.fn(),
  open: true,
  resultCount: 42,
};

describe('SearchFilterSheet', () => {
  it('renders filter sections', { timeout: 15000 }, () => {
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} /></MitumbaThemeProvider>);
    expect(document.body.textContent).toContain('Sort By');
    expect(document.body.textContent).toContain('Categories');
    expect(document.body.textContent).toContain('Condition');
    expect(document.body.textContent).toContain('Price Range');
    expect(document.body.textContent).toContain('Location');
    expect(document.body.textContent).toContain('VAZI Eligible Only');
  });

  it('calls onFiltersChange when chip clicked', () => {
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByText('Tops'));
    expect(baseProps.onFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      categories: ['Tops'],
    });
  });

  it('calls onApply when button clicked', () => {
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByText('Show 42 Results'));
    expect(baseProps.onApply).toHaveBeenCalled();
  });

  it('calls onClear', () => {
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByText('Clear All'));
    expect(baseProps.onClear).toHaveBeenCalled();
  });

  it('renders the VAZI toggle by default', () => {
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} /></MitumbaThemeProvider>);
    expect(screen.getByText('VAZI Eligible Only')).toBeInTheDocument();
  });

  it('hides the VAZI toggle when showVaziFilter is false', () => {
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} showVaziFilter={false} /></MitumbaThemeProvider>);
    expect(screen.queryByText('VAZI Eligible Only')).not.toBeInTheDocument();
  });
});
