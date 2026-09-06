// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { BuyerOnboardingPage } from './BuyerOnboardingPage';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

afterEach(() => { cleanup(); });


describe('BuyerOnboardingPage', () => {
  it('renders the welcome heading', () => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getAllByText(/Welcome to Mitumba/i)[0]).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByLabelText(/Display name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone number/i)).toBeInTheDocument();
    expect(screen.getByText('County')).toBeInTheDocument();
  });

  it('calls onComplete with form data on submit', () => {
    const onComplete = vi.fn();
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={onComplete} initialData={{ display_name: 'Test', county: 'Nairobi', phone: '712345678' }} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
    expect(onComplete).toHaveBeenCalledWith({ display_name: 'Test', county: 'Nairobi', phone: '712345678' });
  });

  it('shows error message when error prop provided', () => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} error="Something went wrong" /></MitumbaThemeProvider>);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} loading /></MitumbaThemeProvider>);
    expect(screen.getByRole('button', { name: /Setting up/i })).toBeInTheDocument();
  });

  it('associates label, helper text, and error for each field', () => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} /></MitumbaThemeProvider>);
    // Labels resolve to real form controls
    expect(screen.getByLabelText(/Display name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/County/i)).toBeInTheDocument();
    // Helper text present
    expect(screen.getByText('This is how sellers will see you')).toBeInTheDocument();
    expect(screen.getByText('Where should sellers ship to?')).toBeInTheDocument();
    expect(screen.getByText('For delivery updates and M-Pesa payments')).toBeInTheDocument();
  });

  it('keeps the page and section headings at their current levels by default', () => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} /></MitumbaThemeProvider>);
    // hero + mobile section both "Welcome to Mitumba" are h4; desktop section is h5
    expect(screen.getAllByRole('heading', { name: 'Welcome to Mitumba', level: 4 })).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Complete your profile', level: 5 })).toBeInTheDocument();
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('applies titleLevel=%s to the page/welcome title', (level) => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} titleLevel={level} /></MitumbaThemeProvider>);
    // The hero welcome heading picks up the requested level
    expect(screen.getAllByRole('heading', { name: 'Welcome to Mitumba', level }).length).toBeGreaterThan(0);
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('applies sectionTitleLevel=%s to the form section headings', (level) => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} sectionTitleLevel={level} /></MitumbaThemeProvider>);
    expect(screen.getByRole('heading', { name: 'Complete your profile', level })).toBeInTheDocument();
  });

  it('inherits the host theme typography.fontFamily on headings (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <BuyerOnboardingPage onComplete={vi.fn()} titleLevel={1} sectionTitleLevel={2} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Complete your profile' })).toHaveStyle({ fontFamily: '' });
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <BuyerOnboardingPage onComplete={vi.fn()} titleLevel={1} sectionTitleLevel={2} />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
