/* eslint-disable react/jsx-props-no-spreading */
// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import { MitumbaThemeProvider } from '../../../theme';
import { TwoFactorSetupModal } from './TwoFactorSetupModal';

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
});
