// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import {
  cleanup, render, screen, fireEvent, within, waitForElementToBeRemoved,
} from '@testing-library/react';
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

const renderGallery = ({ titleLevel }: { titleLevel?: HeadingLevel } = {}) =>
  render(
    <MitumbaThemeProvider>
      <DisputeEvidenceGallery evidence={evidence} titleLevel={titleLevel} />
    </MitumbaThemeProvider>,
  );

describe('DisputeEvidenceGallery', () => {
  it('renders group headers', () => {
    renderGallery();
    expect(screen.getByText('Buyer Evidence')).toBeInTheDocument();
    expect(screen.getByText('Seller Evidence')).toBeInTheDocument();
  });

  it('names each role group as a labelled region', () => {
    renderGallery();
    expect(screen.getByRole('region', { name: 'Buyer Evidence' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Seller Evidence' })).toBeInTheDocument();
  });

  it('renders images with a descriptive alt text', () => {
    renderGallery();
    const img = screen.getByAltText('Buyer Evidence item 1');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://placehold.co/80');
  });

  it('renders text evidence', () => {
    renderGallery();
    expect(screen.getByText('Item was damaged on arrival.')).toBeInTheDocument();
    expect(screen.getByText('Shipped in good condition.')).toBeInTheDocument();
  });

  it('renders evidence as semantic lists', () => {
    const { container } = renderGallery();
    const lists = container.querySelectorAll('ul');
    expect(lists.length).toBe(2);
    expect(container.querySelectorAll('li').length).toBe(3);
  });

  it('renders an empty state with the default text when evidence is empty', () => {
    render(
      <MitumbaThemeProvider><DisputeEvidenceGallery evidence={[]} /></MitumbaThemeProvider>,
    );
    expect(screen.getByText('No evidence has been submitted for this dispute yet.')).toBeInTheDocument();
  });

  it('renders a custom empty state message', () => {
    render(
      <MitumbaThemeProvider>
        <DisputeEvidenceGallery evidence={[]} emptyText="Nothing here for this case." />
      </MitumbaThemeProvider>,
    );
    expect(screen.getByText('Nothing here for this case.')).toBeInTheDocument();
  });

  it('defaults group titles to h3 when titleLevel is omitted', () => {
    renderGallery();
    expect(screen.getByText('Buyer Evidence').tagName).toBe('H3');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits h%s group titles when titleLevel is set',
    (level) => {
      renderGallery({ titleLevel: level });
      expect(screen.getByText('Buyer Evidence').tagName).toBe(`H${level}`);
    },
  );

  it('inherits host theme fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <DisputeEvidenceGallery evidence={evidence} titleLevel={2} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Buyer Evidence').style.fontFamily).toBe('');
  });

  it('shows a per-group count with correct pluralization', () => {
    renderGallery();
    // Buyer group has 2 items, seller group has 1 item.
    expect(screen.getByText('2 items')).toBeInTheDocument();
    expect(screen.getByText('1 item')).toBeInTheDocument();
  });

  it('distinguishes buyer/seller/admin roles by label', () => {
    render(
      <MitumbaThemeProvider>
        <DisputeEvidenceGallery
          evidence={[
            { uploader_role: 'buyer', type: 'text', content: 'B', created_at: 'x' },
            { uploader_role: 'seller', type: 'text', content: 'S', created_at: 'x' },
            { uploader_role: 'admin', type: 'text', content: 'A', created_at: 'x' },
          ]}
        />
      </MitumbaThemeProvider>,
    );
    expect(screen.getByRole('region', { name: 'Buyer Evidence' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Seller Evidence' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Admin Evidence' })).toBeInTheDocument();
  });

  it('formats an ISO timestamp for display', () => {
    render(
      <MitumbaThemeProvider>
        <DisputeEvidenceGallery
          evidence={[{ uploader_role: 'buyer', type: 'text', content: 'x', created_at: '2026-06-20T10:00:00Z' }]}
        />
      </MitumbaThemeProvider>,
    );
    // The raw ISO string must not be shown verbatim once parsed.
    expect(screen.queryByText('2026-06-20T10:00:00Z')).not.toBeInTheDocument();
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('passes an unparseable timestamp through unchanged', () => {
    render(
      <MitumbaThemeProvider>
        <DisputeEvidenceGallery
          evidence={[{ uploader_role: 'buyer', type: 'text', content: 'x', created_at: 'sometime yesterday' }]}
        />
      </MitumbaThemeProvider>,
    );
    expect(screen.getByText('sometime yesterday')).toBeInTheDocument();
  });

  it('opens a lightbox with the enlarged image on thumbnail click and closes on Escape', async () => {
    renderGallery();
    const thumb = screen.getByRole('button', { name: 'Expand Buyer Evidence item 1' });
    fireEvent.click(thumb);
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByAltText('Buyer Evidence item 1')).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a responsive grid with multiple images', () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <DisputeEvidenceGallery
          evidence={[
            { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/1', created_at: 'x' },
            { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/2', created_at: 'x' },
            { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/3', created_at: 'x' },
          ]}
        />
      </MitumbaThemeProvider>,
    );
    expect(container.querySelectorAll('img').length).toBe(3);
    expect(container.querySelectorAll('button[aria-label^="Expand"]').length).toBe(3);
  });

  it('renders file evidence as a link with href set to the content URL', () => {
    render(
      <MitumbaThemeProvider>
        <DisputeEvidenceGallery
          evidence={[{
            uploader_role: 'admin',
            type: 'file',
            content: 'https://cdn.example.com/report.pdf',
            created_at: 'x',
            fileName: 'report.pdf',
          }]}
        />
      </MitumbaThemeProvider>,
    );
    const link = screen.getByRole('link', { name: /report\.pdf/ });
    expect(link).toHaveAttribute('href', 'https://cdn.example.com/report.pdf');
  });

  it('derives a filename from the URL when fileName is omitted', () => {
    render(
      <MitumbaThemeProvider>
        <DisputeEvidenceGallery
          evidence={[{ uploader_role: 'admin', type: 'file', content: 'https://cdn.example.com/proof.docx', created_at: 'x' }]}
        />
      </MitumbaThemeProvider>,
    );
    expect(screen.getByRole('link', { name: /proof\.docx/ })).toBeInTheDocument();
  });

  it('renders video evidence and opens a playable preview', () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <DisputeEvidenceGallery
          evidence={[{ uploader_role: 'buyer', type: 'video', content: 'https://cdn.example.com/clip.mp4', created_at: 'x' }]}
        />
      </MitumbaThemeProvider>,
    );
    const thumb = screen.getByRole('button', { name: 'Expand Buyer Evidence item 1' });
    fireEvent.click(thumb);
    const dialog = screen.getByRole('dialog');
    const video = within(dialog).getByLabelText('Buyer Evidence item 1');
    expect(video.tagName).toBe('VIDEO');
    expect(video).toHaveAttribute('controls');
    expect(container).toBeTruthy();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <DisputeEvidenceGallery
          evidence={[
            { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/80', created_at: '2026-06-20T10:00:00Z' },
            { uploader_role: 'buyer', type: 'text', content: 'Damaged item.', created_at: '2026-06-20T10:01:00Z' },
            { uploader_role: 'seller', type: 'file', content: 'https://cdn.example.com/proof.pdf', created_at: '2026-06-19T15:00:00Z', fileName: 'proof.pdf' },
            { uploader_role: 'admin', type: 'video', content: 'https://cdn.example.com/clip.mp4', created_at: '2026-06-22T11:00:00Z' },
          ]}
          titleLevel={2}
        />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container, { preload: false });
    expect(results).toHaveNoViolations();
  }, 20000);
});
