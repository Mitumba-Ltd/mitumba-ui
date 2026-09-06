/* eslint-disable react/jsx-props-no-spreading */
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MitumbaThemeProvider } from '../../../theme';
import { SearchFilterSheet } from './SearchFilterSheet';
import type { FilterState } from './SearchFilterSheet.types';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

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

  it('keeps the showVaziFilter contract unchanged (default renders, false hides, no behavior change)', () => {
    // Default (prop omitted) -> toggle shown
    const { unmount } = render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} /></MitumbaThemeProvider>);
    expect(screen.getByText('VAZI Eligible Only')).toBeInTheDocument();
    unmount();
    cleanup();
    // Explicit true -> toggle shown
    const { unmount: unmount2 } = render(
      <MitumbaThemeProvider><SearchFilterSheet {...baseProps} showVaziFilter /></MitumbaThemeProvider>
    );
    expect(screen.getByText('VAZI Eligible Only')).toBeInTheDocument();
    unmount2();
    cleanup();
    // Explicit false -> toggle hidden, and toggling still calls onFiltersChange when present
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} showVaziFilter={false} /></MitumbaThemeProvider>);
    expect(screen.queryByText('VAZI Eligible Only')).not.toBeInTheDocument();
  });

  it('toggling the VAZI switch updates filters (contract behavior preserved)', () => {
    const onFiltersChange = vi.fn();
    render(
      <MitumbaThemeProvider>
        <SearchFilterSheet {...baseProps} onFiltersChange={onFiltersChange} />
      </MitumbaThemeProvider>
    );
    const label = screen.getByText('VAZI Eligible Only');
    const toggle = label.closest('label')?.querySelector('input[type="checkbox"]') as HTMLElement;
    fireEvent.click(toggle);
    expect(onFiltersChange).toHaveBeenCalledWith({ ...defaultFilters, vaziOnly: true });
  });

  it('exposes a named region for the sheet', () => {
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} /></MitumbaThemeProvider>);
    // Mobile drawer is a dialog labelled by the region label
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Search filters');
  });

  it('uses the title as the accessible region name when provided', () => {
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} title="Refine results" /></MitumbaThemeProvider>);
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Refine results');
  });

  it('omits sectionTitleLevel by default (non-heading section labels)', () => {
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} /></MitumbaThemeProvider>);
    expect(screen.getByText('Sort By').tagName).toBe('P');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits h%s section labels when sectionTitleLevel is set',
    (level) => {
      render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} sectionTitleLevel={level} /></MitumbaThemeProvider>);
      expect(screen.getByText('Sort By').tagName).toBe(`H${level}`);
      expect(screen.getByText('Categories').tagName).toBe(`H${level}`);
    }
  );

  it('emits the sheet title heading with titleLevel', () => {
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} title="Refine results" titleLevel={2} /></MitumbaThemeProvider>);
    expect(screen.getByText('Refine results').tagName).toBe('H2');
  });

  it('closes on Escape and calls onClose', () => {
    const onClose = vi.fn();
    render(<MitumbaThemeProvider><SearchFilterSheet {...baseProps} onClose={onClose} /></MitumbaThemeProvider>);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('restores focus to the trigger after the drawer closes', async () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    function Wrapper({ open }: { open: boolean }) {
      return (
        <MitumbaThemeProvider>
          <SearchFilterSheet {...baseProps} open={open} />
        </MitumbaThemeProvider>
      );
    }

    const { rerender } = render(<Wrapper open />);
    await waitFor(() => expect(document.activeElement).not.toBe(trigger));
    rerender(<Wrapper open={false} />);
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    trigger.remove();
  });

  it('has no axe violations', async () => {
    const { baseElement } = render(
      <MitumbaThemeProvider>
        <SearchFilterSheet {...baseProps} title="Refine results" titleLevel={2} sectionTitleLevel={3} />
      </MitumbaThemeProvider>
    );
    const results = await axe(baseElement);
    expect(results).toHaveNoViolations();
  });
});
