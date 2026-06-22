import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { OrderMessageAttachmentProps } from './OrderMessageAttachment.types'

/**
 * Compact order context card for chat messages.
 * Shows order info inline so the seller knows which order the conversation is about.
 */
export function OrderMessageAttachment({
  orderShortId,
  listingTitle,
  listingImageUrl,
  amount,
  status,
}: OrderMessageAttachmentProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: `${tokens.spacing.base}px`,
        p: `${tokens.spacing.md}px`,
        borderRadius: `${tokens.radius.md}px`,
        bgcolor: 'rgba(0,0,0,0.04)',
        border: `1px solid ${tokens.colors.divider}`,
        mb: `${tokens.spacing.sm}px`,
      }}
    >
      {listingImageUrl && (
        <Box
          component="img"
          src={listingImageUrl}
          alt={listingTitle}
          sx={{
            width: 48,
            height: 48,
            borderRadius: `${tokens.radius.sm}px`,
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
      )}
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.xs,
            fontWeight: tokens.typography.fontWeights.bold,
            color: tokens.colors.textSecondary,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: 1.2,
          }}
        >
          Order #{orderShortId}
        </Typography>
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.sm,
            fontWeight: tokens.typography.fontWeights.semibold,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {listingTitle}
        </Typography>
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.xs,
            color: tokens.colors.textSecondary,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          KES {amount.toLocaleString()} · {status}
        </Typography>
      </Box>
    </Box>
  )
}

export default OrderMessageAttachment
