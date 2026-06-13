/* eslint-disable react/jsx-props-no-spreading */
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { TwoFactorLoginStep } from './TwoFactorLoginStep';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false, media: query, onchange: null,
      addListener: vi.fn(), removeListener: vi.fn(),
      addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => { cleanup(); });

const baseProps = {
  onSubmit: vi.fn(),
};

function renderStep(props = {}) {
  return render(
    <MitumbaThemeProvider>
      <TwoFactorLoginStep {...baseProps} {...props} />
    </MitumbaThemeProvider>,
  );
}

describe('TwoFactorLoginStep', () => {
  it('renders title and input', () => {
    renderStep();
    expect(screen.getByText('Two-Factor Authentication')).toBeInTheDocument();
    expect(screen.getByLabelText('Authentication code')).toBeInTheDocument();
  });

  it('calls onSubmit with code on form submit', () => {
    renderStep();
    const input = screen.getByLabelText('Authentication code');
    fireEvent.change(input, { target: { value: '654321' } });
    fireEvent.click(screen.getByText('Verify'));
    expect(baseProps.onSubmit).toHaveBeenCalledWith('654321');
  });

  it('shows error when provided', () => {
    renderStep({ error: 'Code expired' });
    expect(screen.getByText('Code expired')).toBeInTheDocument();
  });

  it('shows backup code link when callback provided', () => {
    const onUseBackupCode = vi.fn();
    renderStep({ onUseBackupCode });
    const link = screen.getByText('Use a backup code instead');
    fireEvent.click(link);
    expect(onUseBackupCode).toHaveBeenCalled();
  });

  it('does not show backup code link when no callback', () => {
    renderStep();
    expect(screen.queryByText('Use a backup code instead')).not.toBeInTheDocument();
  });
});
