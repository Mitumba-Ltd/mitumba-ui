import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { tokens } from '@mitumba/tokens'
import { MitumbaModal } from '../MitumbaModal'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import type { DestructiveConfirmDialogProps } from './DestructiveConfirmDialog.types'

/**
 * Destructive action confirmation dialog.
 * Red/danger styling with optional blockers, confirm phrase, and TOTP verification.
 */
export function DestructiveConfirmDialog({
  open,
  onClose,
  title,
  description,
  blockers = [],
  confirmPhrase,
  requireTotp = false,
  onConfirm,
  submitting = false,
  confirmLabel = 'Delete',
}: DestructiveConfirmDialogProps) {
  const [phrase, setPhrase] = useState('')
  const [code, setCode] = useState('')

  const hasBlockers = blockers.length > 0
  const phraseMatch = !confirmPhrase || phrase === confirmPhrase
  const codeValid = !requireTotp || code.replace(/\s/g, '').length === 6
  const canConfirm = !hasBlockers && phraseMatch && codeValid && !submitting

  const handleConfirm = () => {
    if (!canConfirm) return
    onConfirm({ code: requireTotp ? code.replace(/\s/g, '') : undefined })
  }

  return (
    <MitumbaModal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth={440}
      actions={
        <Box sx={{ display: 'flex', gap: `${tokens.spacing.base}px`, width: '100%' }}>
          <MitumbaPrimaryButton
            label="Cancel"
            variant="outline"
            onClick={onClose}
            disabled={submitting}
            fullWidth
          />
          <MitumbaPrimaryButton
            label={confirmLabel}
            variant="error"
            onClick={handleConfirm}
            disabled={!canConfirm}
            loading={submitting}
            fullWidth
          />
        </Box>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.lg}px` }}>
        {/* Warning icon + description */}
        <Box sx={{ display: 'flex', gap: `${tokens.spacing.base}px`, alignItems: 'flex-start' }}>
          <ErrorOutlineIcon sx={{ color: tokens.colors.error, fontSize: 24, mt: '2px', flexShrink: 0 }} />
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              color: tokens.colors.textSecondary,
              fontFamily: tokens.typography.fontFamily,
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Blockers */}
        {hasBlockers && (
          <Box
            sx={{
              bgcolor: tokens.colors.errorLight,
              borderRadius: `${tokens.radius.md}px`,
              p: `${tokens.spacing.base}px`,
              border: `1px solid ${tokens.colors.error}25`,
            }}
          >
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.sm,
                fontWeight: tokens.typography.fontWeights.bold,
                color: tokens.colors.error,
                mb: `${tokens.spacing.sm}px`,
              }}
            >
              You must resolve these first:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: `${tokens.spacing.lg}px` }}>
              {blockers.map((b) => (
                <Typography
                  component="li"
                  key={b}
                  sx={{
                    fontSize: tokens.typography.fontSizes.sm,
                    color: tokens.colors.textPrimary,
                    fontFamily: tokens.typography.fontFamily,
                    mb: '4px',
                  }}
                >
                  {b}
                </Typography>
              ))}
            </Box>
          </Box>
        )}

        {/* Confirm phrase input */}
        {confirmPhrase && !hasBlockers && (
          <Box>
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.sm,
                color: tokens.colors.textSecondary,
                fontFamily: tokens.typography.fontFamily,
                mb: `${tokens.spacing.xs}px`,
              }}
            >
              Type <strong>{confirmPhrase}</strong> to confirm:
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder={confirmPhrase}
              autoComplete="off"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: `${tokens.radius.md}px`,
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: phraseMatch && phrase ? tokens.colors.error : tokens.colors.border,
                  },
                },
              }}
              inputProps={{ 'aria-label': 'Confirmation phrase' }}
            />
          </Box>
        )}

        {/* TOTP input */}
        {requireTotp && !hasBlockers && (
          <Box>
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.sm,
                color: tokens.colors.textSecondary,
                fontFamily: tokens.typography.fontFamily,
                mb: `${tokens.spacing.xs}px`,
              }}
            >
              Enter your 6-digit authentication code:
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              placeholder="000000"
              autoComplete="one-time-code"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: `${tokens.radius.md}px`,
                  fontFamily: 'monospace',
                  letterSpacing: '0.3em',
                  textAlign: 'center',
                },
              }}
              inputProps={{ 'aria-label': 'Authentication code', maxLength: 6 }}
            />
          </Box>
        )}
      </Box>
    </MitumbaModal>
  )
}

export default DestructiveConfirmDialog
