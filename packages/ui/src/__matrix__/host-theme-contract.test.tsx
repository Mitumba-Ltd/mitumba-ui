// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import { ThemeProvider } from '@mui/material/styles';
import { hostThemeWithDistinctFamilies } from './hostTheme';

import { SemanticTitle } from '../internal/SemanticTitle';
import { EmptyState } from '../components/feedback/EmptyState';
import { MitumbaBanner } from '../components/feedback/MitumbaBanner';
import { UnauthenticatedState } from '../components/feedback/UnauthenticatedState';
import { ListingCard } from '../components/listing/ListingCard';
import { VAZIShowcase } from '../components/vazi/VAZIShowcase';
import { VAZIHeroSpotlight } from '../components/vazi/VAZIHeroSpotlight';

/**
 * Shared host-theme CONTRACT test. Uses {@link hostThemeWithDistinctFamilies}
 * (different heading vs body families) to prove:
 *  1. `titleLevel` emits the requested h1-h6 element (semantic level is
 *     independent from visual size), so the host heading family applies.
 *  2. No component-local `fontFamily` inline override is present on the title
 *     (inline `style.fontFamily` is empty; the family comes from the theme).
 *  3. Omitting the new props preserves the previous non-heading markup
 *     (backward compatibility) and callbacks still fire.
 */

afterEach(() => { cleanup(); });

describe('host-theme contract: distinct heading vs body families', () => {
  it('SemanticTitle emits the requested heading element with no inline family override', () => {
    render(
      <ThemeProvider theme={hostThemeWithDistinctFamilies}>
        <SemanticTitle titleLevel={2}>Section</SemanticTitle>
      </ThemeProvider>,
    );
    const heading = screen.getByRole('heading', { level: 2, name: 'Section' });
    expect(heading.tagName).toBe('H2');
    expect(heading.style.fontFamily).toBe('');
  });

  it('SemanticTitle falls back to a non-heading element when titleLevel is omitted', () => {
    render(
      <ThemeProvider theme={hostThemeWithDistinctFamilies}>
        <SemanticTitle>Plain</SemanticTitle>
      </ThemeProvider>,
    );
    expect(screen.queryByRole('heading', { name: 'Plain' })).not.toBeInTheDocument();
    expect(screen.getByText('Plain').tagName).toBe('P');
  });

  it('EmptyState honours titleLevel and inherits the host font', () => {
    render(
      <ThemeProvider theme={hostThemeWithDistinctFamilies}>
        <EmptyState title="Nothing here" subtitle="Try again later" titleLevel={3} />
      </ThemeProvider>,
    );
    const heading = screen.getByRole('heading', { level: 3, name: 'Nothing here' });
    expect(heading.style.fontFamily).toBe('');
  });

  it('MitumbaBanner honours titleLevel and inherits the host font', () => {
    render(
      <ThemeProvider theme={hostThemeWithDistinctFamilies}>
        <MitumbaBanner title="Heads up" titleLevel={4} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('heading', { level: 4, name: 'Heads up' }).style.fontFamily).toBe('');
  });

  it('UnauthenticatedState honours titleLevel and inherits the host font', () => {
    render(
      <ThemeProvider theme={hostThemeWithDistinctFamilies}>
        <UnauthenticatedState title="Please sign in" subtitle="Access your orders" onSignIn={() => {}} titleLevel={2} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Please sign in' }).style.fontFamily).toBe('');
  });

  it('ListingCard honours titleLevel and inherits the host font', () => {
    render(
      <ThemeProvider theme={hostThemeWithDistinctFamilies}>
        <ListingCard id="l1" title="Denim Jacket" price={2500} media={['https://placehold.co/200']} titleLevel={3} />
      </ThemeProvider>,
    );
    expect(screen.getAllByRole('heading', { level: 3, name: 'Denim Jacket' })[0].style.fontFamily).toBe('');
  });

  it('VAZIShowcase emits h1 primary + h2 section headings under the host theme', () => {
    render(
      <ThemeProvider theme={hostThemeWithDistinctFamilies}>
        <VAZIShowcase
          outfits={[{ id: 'o1', modelMediaUrl: 'https://placehold.co/300x600', modelMediaType: 'image', modelAlt: 'Model', totalPrice: 4000, items: [{ id: 'i1', title: 'Jacket', price: 4000, imageUrl: 'https://placehold.co/50' }] }]}
          titleLevel={1}
          sectionTitleLevel={2}
        />
      </ThemeProvider>,
    );
    expect(screen.getByRole('heading', { level: 1, name: /LOOK 01/ }).style.fontFamily).toBe('');
    expect(screen.getAllByRole('heading', { level: 2, name: /This look/ })[0].style.fontFamily).toBe('');
  });

  it('VAZIHeroSpotlight emits its title heading under the host theme', () => {
    render(
      <ThemeProvider theme={hostThemeWithDistinctFamilies}>
        <VAZIHeroSpotlight
          outfits={[{ id: 'o1', modelMediaUrl: 'https://placehold.co/200x400', modelMediaType: 'image', modelAlt: 'Model', name: 'Look', totalPrice: 3000, items: [{ id: 'i1', title: 'Jacket', price: 3000, imageUrl: 'https://placehold.co/50' }] }]}
          titleLevel={2}
        />
      </ThemeProvider>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'VAZI Featured' }).style.fontFamily).toBe('');
  });
});
