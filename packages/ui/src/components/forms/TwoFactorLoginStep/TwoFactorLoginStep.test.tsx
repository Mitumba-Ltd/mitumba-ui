/* eslint-disable react/jsx-props-no-spreading */
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { TwoFactorLoginStep } from './TwoFactorLoginStep';
import type { HeadingLevel } from '../../../types/semantic';

expect.extend(toHaveNoViolations);

const HOST_FONT = '"Comic Sans MS", cursive';

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
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onSubmit with code on form submit', () => {
    renderStep();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '654321' } });
    fireEvent.click(screen.getByRole('button', { name: /Verify/ }));
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

  it('labels the verification code input and keeps its monospace font', () => {
    renderStep();
    const input = screen.getByLabelText('Verification code');
    expect(input).toBeInTheDocument();
    expect(input).toHaveStyle({ fontFamily: 'monospace' });
  });

  it('announces errors via role="alert" in passkey mode', () => {
    renderStep({
      methods: [{ id: 'pk', type: 'passkey', label: 'My Passkey' }],
      activeMethodId: 'pk',
      onUsePasskey: vi.fn(),
      error: 'Passkey failed',
    });
    expect(screen.getByRole('alert')).toHaveTextContent('Passkey failed');
  });

  it('renders the method chooser as a labelled group with pressed state', () => {
    renderStep({
      methods: [
        { id: 'totp', type: 'totp', label: 'Authenticator' },
        { id: 'sms', type: 'sms', label: 'SMS' },
      ],
      activeMethodId: 'totp',
      onMethodChange: vi.fn(),
    });
    expect(screen.getByRole('group', { name: 'Choose a verification method' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Authenticator/ })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: /SMS/ })).toHaveAttribute('aria-pressed', 'false');
  });

  it('exposes a labelled passkey action', () => {
    renderStep({
      methods: [{ id: 'pk', type: 'passkey', label: 'My Passkey' }],
      activeMethodId: 'pk',
      onUsePasskey: vi.fn(),
    });
    expect(screen.getByRole('button', { name: 'Use a passkey' })).toBeInTheDocument();
  });

  it('omits titleLevel by default, rendering a non-heading title element', () => {
    renderStep();
    expect(screen.getByText('Two-Factor Authentication').tagName).toBe('P');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])('emits an h%s element when titleLevel is set', (level) => {
    renderStep({ titleLevel: level });
    expect(screen.getByText('Two-Factor Authentication').tagName).toBe(`H${level}`);
  });

  it('inherits the host theme typography.fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <TwoFactorLoginStep {...baseProps} titleLevel={2} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Two-Factor Authentication').style.fontFamily).toBe('');
  });

  it('has no axe violations', async () => {
    const { container } = renderStep({
      titleLevel: 2,
      onUseBackupCode: vi.fn(),
      methods: [
        { id: 'totp', type: 'totp', label: 'Authenticator' },
        { id: 'sms', type: 'sms', label: 'SMS' },
      ],
      activeMethodId: 'totp',
      onMethodChange: vi.fn(),
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
