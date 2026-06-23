import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { tokens } from '@mitumba/tokens'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import { MitumbaTextField } from '../../foundation/MitumbaTextField'
import type { SellerDisputeResponseCardProps } from './SellerDisputeResponseCard.types'

export function SellerDisputeResponseCard({
  reason,
  description,
  onAccept,
  onContest,
  submitting = false,
}: SellerDisputeResponseCardProps) {
  const [contestMode, setContestMode] = useState(false)
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])

  return (
    <Box
      sx={{
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: `${tokens.radius.lg}px`,
        p: `${tokens.spacing.xxl}px`,
        backgroundColor: tokens.colors.surface,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.md}px`, mb: `${tokens.spacing.lg}px` }}>
        <WarningAmberIcon sx={{ color: tokens.colors.warning }} />
        <Typography sx={{ fontWeight: 700, fontSize: tokens.typography.fontSizes.lg }}>Dispute Filed</Typography>
      </Box>

      <Typography sx={{ fontWeight: 600, mb: `${tokens.spacing.xs}px` }}>{reason}</Typography>
      <Typography sx={{ color: tokens.colors.textSecondary, mb: `${tokens.spacing.xl}px` }}>{description}</Typography>

      {!contestMode ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.base}px` }}>
          <Box>
            <MitumbaPrimaryButton
              label="Accept & Refund"
              variant="primary"
              onClick={onAccept}
              loading={submitting}
              fullWidth
            />
            <Typography sx={{ color: tokens.colors.textSecondary, fontSize: 12, mt: `${tokens.spacing.xs}px`, textAlign: 'center' }}>
              No impact on your trust score
            </Typography>
          </Box>
          <MitumbaPrimaryButton
            label="Respond with Evidence"
            variant="outline"
            onClick={() => setContestMode(true)}
            disabled={submitting}
            fullWidth
          />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.lg}px` }}>
          <MitumbaTextField
            label="Your response"
            hint="Explain why you believe this dispute is invalid..."
            multiline
            rows={4}
            value={message}
            onChange={(val) => setMessage(val)}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            aria-label="Upload evidence"
          />
          <MitumbaPrimaryButton
            label="Submit Response"
            variant="primary"
            onClick={() => onContest(message, files)}
            loading={submitting}
            disabled={!message.trim()}
            fullWidth
          />
        </Box>
      )}
    </Box>
  )
}

export default SellerDisputeResponseCard
