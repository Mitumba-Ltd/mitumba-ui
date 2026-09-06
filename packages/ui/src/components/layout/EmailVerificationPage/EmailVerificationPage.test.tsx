// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { EmailVerificationPage } from './EmailVerificationPage';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

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

  it('labels the verification code input', () => {
    render(<MitumbaThemeProvider><EmailVerificationPage email="a@b.com" onVerify={vi.fn()} onResend={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByLabelText('Verification code')).toBeInTheDocument();
  });

  it('keeps the monospace font on the verification code input', () => {
    render(<MitumbaThemeProvider><EmailVerificationPage email="a@b.com" onVerify={vi.fn()} onResend={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByLabelText('Verification code')).toHaveStyle({ fontFamily: 'monospace' });
  });

  it('announces resend success via role="status"', () => {
    render(<MitumbaThemeProvider><EmailVerificationPage email="a@b.com" onVerify={vi.fn()} onResend={vi.fn()} resendSuccess /></MitumbaThemeProvider>);
    expect(screen.getByRole('status')).toHaveTextContent('Code resent!');
  });

  it('calls onVerify with the 6-digit code', () => {
    const onVerify = vi.fn();
    render(<MitumbaThemeProvider><EmailVerificationPage email="a@b.com" onVerify={onVerify} onResend={vi.fn()} /></MitumbaThemeProvider>);
    fireEvent.change(screen.getByLabelText('Verification code'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));
    expect(onVerify).toHaveBeenCalledWith('123456');
  });

  it('omits titleLevel by default, rendering a non-heading title element', () => {
    render(<MitumbaThemeProvider><EmailVerificationPage email="a@b.com" onVerify={vi.fn()} onResend={vi.fn()} /></MitumbaThemeProvider>);
    expect(screen.getByText('Verify your email').tagName).toBe('P');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    render(<MitumbaThemeProvider><EmailVerificationPage email="a@b.com" onVerify={vi.fn()} onResend={vi.fn()} titleLevel={level} /></MitumbaThemeProvider>);
    expect(screen.getByText('Verify your email').tagName).toBe(`H${level}`);
  });

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <EmailVerificationPage email="a@b.com" onVerify={vi.fn()} onResend={vi.fn()} titleLevel={2} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Verify your email').style.fontFamily).toBe('');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <MitumbaThemeProvider>
        <EmailVerificationPage email="a@b.com" onVerify={vi.fn()} onResend={vi.fn()} titleLevel={2} onGoBack={vi.fn()} />
      </MitumbaThemeProvider>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
