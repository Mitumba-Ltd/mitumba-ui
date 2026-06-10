// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { BuyerOnboardingPage } from './BuyerOnboardingPage';

afterEach(() => { cleanup(); });

const cities = [
  { id: 'nairobi', name: 'Nairobi' },
  { id: 'mombasa', name: 'Mombasa' },
  { id: 'kisumu', name: 'Kisumu' },
];

describe('BuyerOnboardingPage', () => {
  it('renders the welcome heading', () => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} cities={cities} /></MitumbaThemeProvider>);
    expect(screen.getAllByText(/Welcome to Mitumba/i)[0]).toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} cities={cities} /></MitumbaThemeProvider>);
    expect(screen.getByLabelText(/Display name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone number/i)).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
  });

  it('calls onComplete with form data on submit', () => {
    const onComplete = vi.fn();
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={onComplete} cities={cities} initialData={{ display_name: 'Test', city: 'nairobi', phone: '712345678' }} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
    expect(onComplete).toHaveBeenCalledWith({ display_name: 'Test', city: 'nairobi', phone: '712345678' });
  });

  it('shows error message when error prop provided', () => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} cities={cities} error="Something went wrong" /></MitumbaThemeProvider>);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<MitumbaThemeProvider><BuyerOnboardingPage onComplete={vi.fn()} cities={cities} loading /></MitumbaThemeProvider>);
    expect(screen.getByRole('button', { name: /Setting up/i })).toBeInTheDocument();
  });
});
