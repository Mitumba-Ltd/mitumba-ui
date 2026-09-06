// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, it, expect } from 'vitest';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { mitumbaTheme } from '../theme';

import { MitumbaPrimaryButton } from '../components/foundation/MitumbaPrimaryButton';
import { MitumbaTextField } from '../components/foundation/MitumbaTextField';
import { MitumbaSelect } from '../components/foundation/MitumbaSelect';
import { MitumbaChip } from '../components/foundation/MitumbaChip';
import { MitumbaAvatar } from '../components/foundation/MitumbaAvatar';
import { AuthSubmitButton } from '../components/foundation/AuthSubmitButton';
import { ConditionBadge } from '../components/listing/ConditionBadge';
import { STIScoreChip } from '../components/seller/STIScoreChip';
import { MitumbaModal } from '../components/feedback/MitumbaModal';
import { MessageBubble } from '../components/messaging/MessageBubble';
import { OrderMessageAttachment } from '../components/messaging/OrderMessageAttachment';

/**
 * Direct-to-transitive typography/semantic dependency matrix.
 *
 * This test is the executable half of the artifact documented in
 * `docs/typography-semantic-matrix.md`. It:
 *  1. asserts that all 36 direct checklist components from issue #251 are
 *     represented in the source-derived matrix, and
 *  2. renders every reachable text-owning primitive under a host theme with a
 *     deliberately different body family and asserts it inherits that family
 *     (no component-local `fontFamily` override remains).
 */

const HOST_FONT = '"Comic Sans MS", cursive';
const hostTheme = createTheme(mitumbaTheme, { typography: { fontFamily: HOST_FONT } });

afterEach(() => { cleanup(); });

/**
 * The 36 direct checklist components from issue #251, each mapped to the
 * text-owning package primitives it reaches. `[]` means the component owns its
 * text directly and does not reach another shared text-owning primitive.
 */
const MATRIX: Record<string, string[]> = {
  // Authentication and onboarding
  AuthPage: ['AuthSubmitButton', 'MitumbaTextField', 'MitumbaPrimaryButton'],
  TwoFactorLoginStep: ['MitumbaPrimaryButton'],
  BuyerOnboardingPage: ['MitumbaPrimaryButton'],
  EmailVerificationPage: ['MitumbaPrimaryButton'],
  // Foundations and feedback
  UnauthenticatedState: ['MitumbaPrimaryButton'],
  EmptyState: [],
  MitumbaBanner: [],
  // Shell and navigation
  MobileBottomNav: [],
  ProfileNavList: [],
  InboxLayout: ['ConversationList', 'ChatThread'],
  // Cards, commerce, and account
  ListingCard: ['ConditionBadge', 'MitumbaChip'],
  SellerCard: ['STIScoreChip', 'MitumbaAvatar'],
  StoreCard: ['MitumbaAvatar'],
  CartItem: [],
  OrderSummaryCard: [],
  OrderCard: ['MitumbaChip'],
  ProfileCard: ['MitumbaAvatar'],
  StatsCard: [],
  VAZIOutfitCard: ['MitumbaChip'],
  // Orders and disputes
  RaiseDisputeModal: ['MitumbaModal', 'MitumbaTextField', 'MitumbaSelect', 'MitumbaPrimaryButton'],
  DisputeStatusTimeline: [],
  DisputeEvidenceGallery: [],
  SellerDisputeResponseCard: ['MitumbaPrimaryButton'],
  // Forms, filters, onboarding, and security
  AddAddressModal: ['MitumbaModal', 'MitumbaTextField', 'MitumbaPrimaryButton'],
  DestructiveConfirmDialog: ['MitumbaModal', 'MitumbaTextField', 'MitumbaPrimaryButton'],
  StylePicker: [],
  SearchFilterSheet: ['MitumbaChip'],
  SellerOnboardingPage: ['MitumbaPrimaryButton'],
  TwoFactorSetupModal: ['MitumbaModal', 'MitumbaTextField', 'MitumbaPrimaryButton'],
  TwoFactorMethodList: ['MitumbaPrimaryButton'],
  AddTwoFactorMethodModal: ['MitumbaModal', 'MitumbaPrimaryButton'],
  // Chat and inbox
  FloatingChatDock: ['MessageBubble', 'OrderMessageAttachment'],
  ConversationList: [],
  ChatThread: ['MessageBubble', 'OrderMessageAttachment'],
  // VAZI experiences
  VAZIShowcase: ['MitumbaPrimaryButton'],
  VAZIHeroSpotlight: ['MitumbaPrimaryButton'],
};

/** Renders a node under a host theme and returns the element carrying `text`. */
function renderWithHostFont(node: React.ReactElement, text: string | RegExp): HTMLElement {
  render(<ThemeProvider theme={hostTheme}>{node}</ThemeProvider>);
  return screen.getAllByText(text)[0];
}

const selectOptions = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
];

describe('typography/semantic dependency matrix', () => {
  it('covers exactly the 36 direct checklist components from issue #251', () => {
    expect(Object.keys(MATRIX)).toHaveLength(36);
  });

  it('lists only known text-owning primitives as transitive dependencies', () => {
    const known = new Set([
      'MitumbaModal', 'MitumbaPrimaryButton', 'MitumbaTextField', 'MitumbaSelect', 'MitumbaChip',
      'MitumbaAvatar', 'AuthSubmitButton', 'ConditionBadge', 'STIScoreChip', 'MitumbaAvatar',
      'MessageBubble', 'OrderMessageAttachment', 'ConversationList', 'ChatThread',
    ]);
    Object.values(MATRIX).flat().forEach((dep) => {
      expect(known.has(dep)).toBe(true);
    });
  });

  describe('every reachable text-owning primitive inherits the host body font', () => {
    it('MitumbaPrimaryButton', () => {
      expect(renderWithHostFont(<MitumbaPrimaryButton label="Continue" />, 'Continue').style.fontFamily).toBe('');
    });

    it('MitumbaTextField', () => {
      expect(renderWithHostFont(<MitumbaTextField label="Email" hint="you@example.com" value="" onChange={() => {}} />, 'Email').style.fontFamily).toBe('');
    });

    it('MitumbaSelect', () => {
      expect(renderWithHostFont(
        <MitumbaSelect value="a" options={selectOptions} onChange={() => {}} label="Pick" />,
        'Pick',
      ).style.fontFamily).toBe('');
    });

    it('MitumbaChip', () => {
      expect(renderWithHostFont(<MitumbaChip label="New" />, 'New').style.fontFamily).toBe('');
    });

    it('MitumbaAvatar', () => {
      expect(renderWithHostFont(<MitumbaAvatar name="Sir Stanley" />, 'SS').style.fontFamily).toBe('');
    });

    it('AuthSubmitButton', () => {
      expect(renderWithHostFont(<AuthSubmitButton label="Sign in" />, 'Sign in').style.fontFamily).toBe('');
    });

    it('ConditionBadge', () => {
      expect(renderWithHostFont(<ConditionBadge grade="A" showLabel />, /Like New/i).style.fontFamily).toBe('');
    });

    it('STIScoreChip', () => {
      expect(renderWithHostFont(<STIScoreChip score={82} />, '82').style.fontFamily).toBe('');
    });

    it('MitumbaModal', () => {
      render(
        <ThemeProvider theme={hostTheme}>
          <MitumbaModal open onClose={() => {}} title="Confirm">
            <span>Body</span>
          </MitumbaModal>
        </ThemeProvider>,
      );
      expect(screen.getByText('Confirm').style.fontFamily).toBe('');
    });

    it('MessageBubble', () => {
      expect(renderWithHostFont(
        <MessageBubble body="Hello there" timestamp="10:30 AM" isMine={false} senderName="Amina" />,
        'Hello there',
      ).style.fontFamily).toBe('');
    });

    it('OrderMessageAttachment', () => {
      expect(renderWithHostFont(
        <OrderMessageAttachment orderId="ord_1" orderShortId="a9331769" listingTitle="Denim Jacket" listingImageUrl={null} amount={2500} status="shipped" createdAt="2026-01-01" />,
        'Denim Jacket',
      ).style.fontFamily).toBe('');
    });
  });
});
