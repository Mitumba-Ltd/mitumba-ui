// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { DisputeEvidenceGallery } from './DisputeEvidenceGallery';
import type { DisputeEvidenceItem } from './DisputeEvidenceGallery.types';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

afterEach(() => { cleanup(); });

const evidence: DisputeEvidenceItem[] = [
  { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/80', created_at: '2026-06-20 10:00 AM' },
  { uploader_role: 'buyer', type: 'text', content: 'Item was damaged on arrival.', created_at: '2026-06-20 10:01 AM' },
  { uploader_role: 'seller', type: 'text', content: 'Shipped in good condition.', created_at: '2026-06-19 03:00 PM' },
];

describe('DisputeEvidenceGallery', () => {
  it('renders group headers', () => {
    render(<MitumbaThemeProvider><DisputeEvidenceGallery evidence={evidence} /></MitumbaThemeProvider>);
    expect(screen.getByText('Buyer Evidence')).toBeInTheDocument();
    expect(screen.getByText('Seller Evidence')).toBeInTheDocument();
  });

  it('names each role group as a labelled region', () => {
    render(<MitumbaThemeProvider><DisputeEvidenceGallery evidence={evidence} /></MitumbaThemeProvider>);
    expect(screen.getByRole('region', { name: 'Buyer Evidence' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Seller Evidence' })).toBeInTheDocument();
  });

  it('renders images with a descriptive alt text', () => {
    render(<MitumbaThemeProvider><DisputeEvidenceGallery evidence={evidence} /></MitumbaThemeProvider>);
    const img = screen.getByAltText('Buyer Evidence item 1');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://placehold.co/80');
  });

  it('renders text evidence', () => {
    render(<MitumbaThemeProvider><DisputeEvidenceGallery evidence={evidence} /></MitumbaThemeProvider>);
    expect(screen.getByText('Item was damaged on arrival.')).toBeInTheDocument();
    expect(screen.getByText('Shipped in good condition.')).toBeInTheDocument();
  });

  it('renders evidence as semantic lists', () => {
    const { container } = render(
      <MitumbaThemeProvider><DisputeEvidenceGallery evidence={evidence} /></MitumbaThemeProvider>
    );
    const lists = container.querySelectorAll('ul');
    expect(lists.length).toBe(2);
    expect(container.querySelectorAll('li').length).toBe(3);
  });

  it('handles empty array', () => {
    const { container } = render(
      <MitumbaThemeProvider><DisputeEvidenceGallery evidence={[]} /></MitumbaThemeProvider>
    );
    expect(container.querySelector('h3')).toBeNull();
  });

  it('defaults group titles to h3 when titleLevel is omitted', () => {
    render(<MitumbaThemeProvider><DisputeEvidenceGallery evidence={evidence} /></MitumbaThemeProvider>);
    expect(screen.getByText('Buyer Evidence').tagName).toBe('H3');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits h%s group titles when titleLevel is set',
    (level) => {
      render(
        <MitumbaThemeProvider><DisputeEvidenceGallery evidence={evidence} titleLevel={level} /></MitumbaThemeProvider>
      );
      expect(screen.getByText('Buyer Evidence').tagName).toBe(`H${level}`);
    }
  );

  it('inherits host theme fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <DisputeEvidenceGallery evidence={evidence} titleLevel={2} />
      </ThemeProvider>
    );
    expect(screen.getByText('Buyer Evidence').style.fontFamily).toBe('');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider><DisputeEvidenceGallery evidence={evidence} titleLevel={2} /></MitumbaThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
