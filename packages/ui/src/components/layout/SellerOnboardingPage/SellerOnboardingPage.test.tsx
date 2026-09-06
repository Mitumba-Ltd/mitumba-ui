// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { SellerOnboardingPage } from './SellerOnboardingPage';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

afterEach(() => { cleanup(); });

describe('SellerOnboardingPage', () => {
  it('renders welcome step by default', () => {
    render(<MitumbaThemeProvider><SellerOnboardingPage /></MitumbaThemeProvider>);
    expect(screen.getAllByText(/Start selling on Mitumba/i)[0]).toBeInTheDocument();
  });

  it('renders identity step when currentStep=1', () => {
    render(<MitumbaThemeProvider><SellerOnboardingPage currentStep={1} /></MitumbaThemeProvider>);
    expect(screen.getByRole('heading', { name: /Your identity/i })).toBeInTheDocument();
  });

  it('renders business step when currentStep=2', () => {
    render(<MitumbaThemeProvider><SellerOnboardingPage currentStep={2} /></MitumbaThemeProvider>);
    expect(screen.getByRole('heading', { name: /Your business/i })).toBeInTheDocument();
  });

  it('renders store step when currentStep=4', () => {
    render(<MitumbaThemeProvider><SellerOnboardingPage currentStep={4} /></MitumbaThemeProvider>);
    expect(screen.getByRole('heading', { name: /Your store/i })).toBeInTheDocument();
  });

  it('calls onStepChange when continuing from welcome', () => {
    const onStepChange = vi.fn();
    render(<MitumbaThemeProvider><SellerOnboardingPage onStepChange={onStepChange} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: /Let's get started/i }));
    expect(onStepChange).toHaveBeenCalledWith(1);
  });

  it('shows error message when error prop provided', () => {
    render(<MitumbaThemeProvider><SellerOnboardingPage currentStep={1} error="Phone already registered" /></MitumbaThemeProvider>);
    expect(screen.getByText('Phone already registered')).toBeInTheDocument();
  });

  it('renders confirmation step with STI score when currentStep=5', () => {
    render(
      <MitumbaThemeProvider>
        <SellerOnboardingPage
          currentStep={5}
          initialData={{ fullName: 'Test', phone: '0712345678', idNumber: 'A123', storeName: 'TestStore' }}
        />
      </MitumbaThemeProvider>
    );
    expect(screen.getAllByText(/You're all set/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Starting STI Score/i)[0]).toBeInTheDocument();
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s step title when stepTitleLevel is set',
    (level) => {
      render(<MitumbaThemeProvider><SellerOnboardingPage currentStep={1} stepTitleLevel={level} /></MitumbaThemeProvider>);
      expect(screen.getByText('Your identity').tagName).toBe(`H${level}`);
    }
  );

  it('defaults the step title to its MUI variant heading (h5) when stepTitleLevel omitted', () => {
    render(<MitumbaThemeProvider><SellerOnboardingPage currentStep={1} /></MitumbaThemeProvider>);
    expect(screen.getByText('Your identity').tagName).toBe('H5');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits h%s section labels when sectionTitleLevel is set',
    (level) => {
      render(<MitumbaThemeProvider><SellerOnboardingPage currentStep={3} sectionTitleLevel={level} /></MitumbaThemeProvider>);
      expect(screen.getByText('Categories *').tagName).toBe(`H${level}`);
      expect(screen.getByText('Delivery method *').tagName).toBe(`H${level}`);
    }
  );

  it('keeps section labels as non-heading text when sectionTitleLevel omitted', () => {
    render(<MitumbaThemeProvider><SellerOnboardingPage currentStep={3} /></MitumbaThemeProvider>);
    expect(screen.getByText('Categories *').tagName).toBe('P');
  });

  it('renders the STI score as non-heading text (never a heading)', () => {
    render(
      <MitumbaThemeProvider>
        <SellerOnboardingPage
          currentStep={5}
          stepTitleLevel={2}
          initialData={{ fullName: 'Test', phone: '0712345678', idNumber: 'A123', storeName: 'TestStore' }}
        />
      </MitumbaThemeProvider>
    );
    const headings = screen.getAllByRole('heading');
    headings.forEach((h) => expect(h.textContent).not.toMatch(/^\d+$/));
  });

  it('inherits host theme fontFamily on the step title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <SellerOnboardingPage currentStep={1} stepTitleLevel={2} />
      </ThemeProvider>
    );
    expect(screen.getByText('Your identity').style.fontFamily).toBe('');
  });

  it('has no axe violations on the identity step', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <SellerOnboardingPage currentStep={1} stepTitleLevel={2} sectionTitleLevel={3} />
      </MitumbaThemeProvider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
