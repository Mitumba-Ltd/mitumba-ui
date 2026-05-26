import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { MitumbaToast } from './MitumbaToast/MitumbaToast'
import { MitumbaModal } from './MitumbaModal/MitumbaModal'
import { MitumbaPrimaryButton } from '../foundation/MitumbaPrimaryButton/MitumbaPrimaryButton'
import { EmptyState } from './EmptyState/EmptyState'
import { MitumbaSkeleton } from './MitumbaSkeleton/MitumbaSkeleton'

const meta: Meta = {
  title: 'Feedback/Feedback Showcase',
  parameters: {
    layout: 'centered',
  },
}

export default meta

function FeedbackShowcaseComponent() {
  const [toastOpen, setToastOpen] = useState(false)
  const [toastType, setToastType] = useState<{
    showIcon?: boolean,
    showLinear?: boolean,
    hasAction?: boolean,
    severity: 'success' | 'error' | 'warning' | 'info'
  }>({ severity: 'success' })
  
  const [modalOpen, setModalOpen] = useState(false)

  const triggerToast = (config: typeof toastType) => {
    setToastType(config)
    setToastOpen(true)
  }

  return (
    <Stack spacing={8} sx={{ width: 600, py: 4 }}>
      <Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 800 }}>Premium Feedback Suite</Typography>
        <Typography variant="body2" color="text.secondary">Tactile responses and personality-led states.</Typography>
      </Box>

      {/* Empty States */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>1. Personality Empty State</Typography>
        <EmptyState 
          icon={<ShoppingCartIcon />}
          title="Your cart is lonely"
          subtitle="Add some amazing finds to your cart and they will appear here."
          action={{
            label: 'Start Shopping',
            onClick: () => alert('Shop'),
          }}
        />
      </Box>

      {/* Interaction Triggers */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>2. Benchmark Toast Variants</Typography>
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
          <MitumbaPrimaryButton 
            label="Simple Success" 
            onClick={() => triggerToast({ severity: 'success' })} 
          />
          <MitumbaPrimaryButton 
            label="Icon Progress (Variant 2)" 
            variant="error"
            onClick={() => triggerToast({ severity: 'error', showIcon: true })} 
          />
          <MitumbaPrimaryButton 
            label="Linear Progress (Variant 4)" 
            variant="earth"
            onClick={() => triggerToast({ severity: 'success', showLinear: true })} 
          />
          <MitumbaPrimaryButton 
            label="Pill Action (Variant 5)" 
            onClick={() => triggerToast({ severity: 'info', hasAction: true, showIcon: true })} 
          />
        </Stack>
      </Box>

      {/* Skeleton */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>3. Premium Shimmer Skeletons</Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <MitumbaSkeleton variant="circular" width={48} height={48} />
            <Stack spacing={1}>
              <MitumbaSkeleton variant="rectangular" width={200} height={16} />
              <MitumbaSkeleton variant="rectangular" width={140} height={12} />
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* Toast component (Controlled) */}
      <MitumbaToast 
        open={toastOpen} 
        onClose={() => setToastOpen(false)} 
        message={
          toastType.showIcon ? "This is a high-fidelity animated toast message." : "This is a clean & simple message."
        } 
        severity={toastType.severity}
        showIconProgress={toastType.showIcon}
        showLinearProgress={toastType.showLinear}
        action={toastType.hasAction ? <Button size="small">Action</Button> : undefined}
      />

      {/* Modal component (Controlled) */}
      <MitumbaModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Your Order"
        actions={
          <>
            <Button onClick={() => setModalOpen(false)} color="inherit">Cancel</Button>
            <MitumbaPrimaryButton label="Pay Now" onClick={() => setModalOpen(false)} />
          </>
        }
      >
        <Typography variant="body2">
          You are about to purchase the vintage denim jacket. Please confirm your delivery address and payment method to proceed.
        </Typography>
      </MitumbaModal>
    </Stack>
  )
}

export const Showcase: StoryObj = {
  render: () => <FeedbackShowcaseComponent />,
}
