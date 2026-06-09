// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { SellerOnboardingPage } from './SellerOnboardingPage';

afterEach(() => { cleanup(); });

const wrap = (props = {}) =>
  render(<MitumbaThemeProvider><SellerOnboardingPage {...props} /></MitumbaThemeProvider>);

describe('SellerOnboardingPage', () => {
  it('renders welcome step by default', () => {
    wrap();
    expect(screen.getByRole('heading', { name: /Start selling on Mitumba/i })).toBeInTheDocument();
  });

  it('renders identity step when currentStep=1', () => {
    wrap({ currentStep: 1 });
    expect(screen.getByRole('heading', { name: /Your identity/i })).toBeInTheDocument();
  });

  it('renders business step when currentStep=2', () => {
    wrap({ currentStep: 2 });
    expect(screen.getByRole('heading', { name: /Your business/i })).toBeInTheDocument();
  });

  it('renders store step when currentStep=4', () => {
    wrap({ currentStep: 4 });
    expect(screen.getByRole('heading', { name: /Your store/i })).toBeInTheDocument();
  });

  it('calls onStepChange when continuing from welcome', () => {
    const onStepChange = vi.fn();
    wrap({ onStepChange });
    fireEvent.click(screen.getByRole('button', { name: /Let's get started/i }));
    expect(onStepChange).toHaveBeenCalledWith(1);
  });

  it('shows error message when error prop provided', () => {
    wrap({ currentStep: 1, error: 'Phone already registered' });
    expect(screen.getByText('Phone already registered')).toBeInTheDocument();
  });

  it('renders confirmation step with STI score when currentStep=5', () => {
    wrap({ currentStep: 5, initialData: { fullName: 'Test', phone: '0712345678', idNumber: 'A123', storeName: 'TestStore' } });
    expect(screen.getByRole('heading', { name: /You're all set/i })).toBeInTheDocument();
    expect(screen.getByText(/Starting STI Score/i)).toBeInTheDocument();
  });
});
