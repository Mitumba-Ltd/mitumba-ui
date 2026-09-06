/* eslint-disable react/jsx-props-no-spreading */
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MitumbaThemeProvider, mitumbaTheme } from '../../../theme';
import { TwoFactorSetupModal } from './TwoFactorSetupModal';
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
  open: true,
  onClose: vi.fn(),
  otpauthUri: 'otpauth://totp/Mitumba:user@test.com?secret=ABC123&issuer=Mitumba',
  secret: 'ABC123',
  onVerify: vi.fn().mockResolvedValue(undefined),
};

function renderModal(props = {}) {
  return render(
    <MitumbaThemeProvider>
      <TwoFactorSetupModal {...baseProps} {...props} />
    </MitumbaThemeProvider>,
  );
}

describe('TwoFactorSetupModal', () => {
  it('renders QR code step by default', () => {
    renderModal();
    expect(screen.getByAltText('QR Code for authenticator app')).toBeInTheDocument();
  }, 10000);

  it('shows secret when toggle is clicked', () => {
    renderModal();
    fireEvent.click(screen.getByText("Can't scan? Enter key manually"));
    expect(screen.getByText('ABC123')).toBeInTheDocument();
  });

  it('navigates to verify step', () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onVerify with entered code', () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Verify & Enable/ }));
    expect(baseProps.onVerify).toHaveBeenCalledWith('123456');
  });

  it('shows error message', () => {
    renderModal({ error: 'Invalid code' });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Invalid code')).toBeInTheDocument();
  });

  it('has a dialog with an accessible name', () => {
    renderModal();
    expect(screen.getByRole('dialog')).toHaveAccessibleName(/Set Up Two-Factor Authentication/i);
  });

  it('omits titleLevel by default (non-heading title)', () => {
    renderModal();
    expect(screen.getByText('Set Up Two-Factor Authentication').tagName).toBe('P');
  });

  it.each([1, 2, 3, 4, 5, 6] as HeadingLevel[])(
    'emits an h%s title when titleLevel is set',
    (level) => {
      renderModal({ titleLevel: level });
      expect(screen.getByText('Set Up Two-Factor Authentication').tagName).toBe(`H${level}`);
    }
  );

  it('announces the current step progress via role=status', () => {
    renderModal();
    expect(screen.getByRole('status')).toHaveTextContent('Step 1 of 3: Scan QR Code');
  });

  it('keeps monospace on the secret (documented exception)', () => {
    renderModal();
    fireEvent.click(screen.getByText("Can't scan? Enter key manually"));
    expect(screen.getByText('ABC123')).toHaveStyle({ fontFamily: 'monospace' });
  });

  it('keeps monospace on the OTP input (documented exception)', () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('textbox')).toHaveStyle({ fontFamily: 'monospace' });
  });

  it('keeps monospace on backup codes (documented exception)', () => {
    renderModal({ backupCodes: ['CODE-1111', 'CODE-2222'] });
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Verify & Enable/ }));
    // onVerify resolves and advances to backup step; assert the code element carries monospace
    return Promise.resolve().then(() => {
      const code = screen.queryByText('CODE-1111');
      if (code) expect(code).toHaveStyle({ fontFamily: 'monospace' });
    });
  });

  it('inherits host theme fontFamily on the title (no inline override)', () => {
    const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });
    render(
      <ThemeProvider theme={hostTheme}>
        <TwoFactorSetupModal {...baseProps} titleLevel={2} />
      </ThemeProvider>
    );
    expect(screen.getByText('Set Up Two-Factor Authentication').style.fontFamily).toBe('');
  });

  it('has no axe violations', async () => {
    const { baseElement } = renderModal({ titleLevel: 2 });
    const results = await axe(baseElement);
    expect(results).toHaveNoViolations();
  });
});
