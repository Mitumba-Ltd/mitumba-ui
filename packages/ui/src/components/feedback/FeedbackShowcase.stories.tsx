import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { tokens } from '@mitumba/tokens';
import { MitumbaToast } from './MitumbaToast/MitumbaToast';
import { MitumbaModal } from './MitumbaModal/MitumbaModal';
import { MitumbaPrimaryButton } from '../foundation/MitumbaPrimaryButton/MitumbaPrimaryButton';
import { EmptyState } from './EmptyState/EmptyState';
import { ErrorState } from './ErrorState/ErrorState';
import { MitumbaSkeleton } from './MitumbaSkeleton/MitumbaSkeleton';

const meta: Meta = {
  title: 'Feedback/Showcase',
  parameters: { layout: 'centered' },
};

export default meta;

function getToastMessage(severity: string): string {
  if (severity === 'success') return 'Item added to your cart';
  if (severity === 'error') return 'Failed to save changes';
  if (severity === 'warning') return 'Your session expires in 5 minutes';
  return 'New message from seller';
}

function ShowcaseComponent() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ width: '100%', maxWidth: 680, py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: tokens.typography.fontFamily, mb: 1 }}>
        Feedback Components
      </Typography>
      <Typography variant="body1" sx={{ color: tokens.colors.textSecondary, mb: 6 }}>
        States, toasts, modals, and skeletons — the full system for communicating app state to users.
      </Typography>

      {/* Empty States */}
      <Typography variant="overline" sx={{ color: tokens.colors.textSecondary, letterSpacing: 1.5 }}>Empty States</Typography>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={3} sx={{ mb: 6 }}>
        <EmptyState
          icon={<ShoppingCartIcon />}
          title="Your cart is empty"
          subtitle="Browse listings and add items you love."
          action={{ label: 'Browse listings', onClick: () => {} }}
        />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Box sx={{ flex: 1 }}>
            <EmptyState variant="elevated" icon={<SearchOffIcon />} title="No results" subtitle="Try different keywords." action={{ label: 'Clear filters', onClick: () => {}, variant: 'outline' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <EmptyState variant="compact" icon={<WifiOffIcon />} title="Offline" subtitle="Check your connection." />
          </Box>
        </Stack>
      </Stack>

      {/* Error States */}
      <Typography variant="overline" sx={{ color: tokens.colors.textSecondary, letterSpacing: 1.5 }}>Error States</Typography>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={3} sx={{ mb: 6 }}>
        <ErrorState type="network" title="No connection" subtitle="You appear to be offline. Your data is safe." onRetry={() => {}} variant="elevated" />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Box sx={{ flex: 1 }}>
            <ErrorState type="404" variant="compact" title="Not found" subtitle="Listing removed." onBack={() => {}} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <ErrorState type="500" variant="compact" title="Server error" subtitle="Try again shortly." onRetry={() => {}} />
          </Box>
        </Stack>
      </Stack>

      {/* Toasts */}
      <Typography variant="overline" sx={{ color: tokens.colors.textSecondary, letterSpacing: 1.5 }}>Toast Notifications</Typography>
      <Divider sx={{ mb: 3 }} />
      <Stack direction="row" spacing={2} sx={{ mb: 6, flexWrap: 'wrap', gap: 2 }}>
        <MitumbaPrimaryButton label="Success" size="small" onClick={() => { setToastSeverity('success'); setToastOpen(true); }} />
        <MitumbaPrimaryButton label="Error" size="small" variant="error" onClick={() => { setToastSeverity('error'); setToastOpen(true); }} />
        <MitumbaPrimaryButton label="Warning" size="small" variant="earth" onClick={() => { setToastSeverity('warning'); setToastOpen(true); }} />
        <MitumbaPrimaryButton label="Info" size="small" variant="outline" onClick={() => { setToastSeverity('info'); setToastOpen(true); }} />
      </Stack>

      {/* Modal */}
      <Typography variant="overline" sx={{ color: tokens.colors.textSecondary, letterSpacing: 1.5 }}>Modal Dialog</Typography>
      <Divider sx={{ mb: 3 }} />
      <MitumbaPrimaryButton label="Open confirmation modal" onClick={() => setModalOpen(true)} sx={{ mb: 6 }} />

      {/* Skeletons */}
      <Typography variant="overline" sx={{ color: tokens.colors.textSecondary, letterSpacing: 1.5 }}>Loading Skeletons</Typography>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={3}>
        {/* Card skeleton */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <MitumbaSkeleton variant="rectangular" width={80} height={80} />
          <Stack spacing={1} sx={{ flex: 1 }}>
            <MitumbaSkeleton variant="rectangular" width="70%" height={14} />
            <MitumbaSkeleton variant="rectangular" width="40%" height={14} />
            <MitumbaSkeleton variant="rectangular" width="30%" height={10} />
          </Stack>
        </Box>
        {/* Profile skeleton */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <MitumbaSkeleton variant="circular" width={48} height={48} />
          <Stack spacing={1} sx={{ flex: 1 }}>
            <MitumbaSkeleton variant="rectangular" width="50%" height={14} />
            <MitumbaSkeleton variant="rectangular" width="80%" height={10} />
          </Stack>
        </Box>
        {/* Grid skeleton */}
        <Stack direction="row" spacing={2}>
          <MitumbaSkeleton variant="rectangular" width="33%" height={120} />
          <MitumbaSkeleton variant="rectangular" width="33%" height={120} />
          <MitumbaSkeleton variant="rectangular" width="33%" height={120} />
        </Stack>
      </Stack>

      {/* Controlled components */}
      <MitumbaToast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={getToastMessage(toastSeverity)}
        severity={toastSeverity}
        showIconProgress
      />

      <MitumbaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm purchase"
        actions={
          <>
            <Button onClick={() => setModalOpen(false)} color="inherit">Cancel</Button>
            <MitumbaPrimaryButton label="Pay KES 2,500" onClick={() => setModalOpen(false)} />
          </>
        }
      >
        <Typography variant="body2" sx={{ color: tokens.colors.textSecondary }}>
          You&apos;re about to purchase &quot;Nike Air Force 1 Low White&quot; from NairobiKicks. Payment will be processed via M-Pesa.
        </Typography>
      </MitumbaModal>
    </Box>
  );
}

export const Showcase: StoryObj = {
  render: () => <ShowcaseComponent />,
};
