// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { EmailVerificationPage } from './EmailVerificationPage';

afterEach(() => { cleanup(); });

describe('EmailVerificationPage', () => {
  it('renders title and email', () => {
    render(<MitumbaThemeProvider><EmailVerificationPage email="test@example.com" onVerify={vi.fn()} onResend={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByText('Verify your email')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('shows error via MitumbaTextField', () => {
    render(<MitumbaThemeProvider><EmailVerificationPage email="a@b.com" onVerify={vi.fn()} onResend={vi.fn()} error="Invalid code" /></MitumbaThemeProvider>);
    expect(screen.getByText('Invalid code')).toBeInTheDocument();
  });

  it('shows resend success message', () => {
    render(<MitumbaThemeProvider><EmailVerificationPage email="a@b.com" onVerify={vi.fn()} onResend={vi.fn()} resendSuccess /></MitumbaThemeProvider>);
    expect(screen.getByText('Code resent!')).toBeInTheDocument();
  });

  it('renders go back link when onGoBack provided', () => {
    render(<MitumbaThemeProvider><EmailVerificationPage email="a@b.com" onVerify={vi.fn()} onResend={vi.fn()} onGoBack={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByText('Wrong email? Go back')).toBeInTheDocument();
  });

  it('calls onResend when resend link clicked', () => {
    const onResend = vi.fn();
    render(<MitumbaThemeProvider><EmailVerificationPage email="a@b.com" onVerify={vi.fn()} onResend={onResend} /></MitumbaThemeProvider>);
    fireEvent.click(screen.getByText(/Didn't receive it/));
    expect(onResend).toHaveBeenCalledTimes(1);
  });
});
