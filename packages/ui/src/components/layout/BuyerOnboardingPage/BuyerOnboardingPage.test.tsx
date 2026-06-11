// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { BuyerOnboardingPage } from './BuyerOnboardingPage';

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
});
