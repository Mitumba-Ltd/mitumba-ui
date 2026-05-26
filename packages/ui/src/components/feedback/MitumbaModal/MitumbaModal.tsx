import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { tokens } from '@mitumba/tokens'
import type { MitumbaModalProps } from './MitumbaModal.types'

/**
 * Premium "High-Depth" Modal primitive.
 * Fulfills professional standards with 32px rounding and scale-fade entry.
 */
export function MitumbaModal({ 
  open, 
  onClose, 
  title, 
  children, 
  actions, 
  maxWidth = 'sm' 
}: MitumbaModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }
        }
      }}
      PaperProps={{
        sx: {
          borderRadius: `${tokens.radius.xxxl}px`,
          boxShadow: tokens.shadows.deep,
          margin: tokens.spacing.base,
          backgroundColor: tokens.colors.surface,
          backgroundImage: 'none',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 4,
          pt: 4,
          pb: 2,
          fontSize: tokens.typography.fontSizes.xl,
          fontWeight: 800,
          color: tokens.colors.textPrimary,
          fontFamily: tokens.typography.fontFamily,
          lineHeight: 1.1,
        }}
      >
        {title}
        <IconButton
          onClick={onClose}
          sx={{
            color: tokens.colors.textDisabled,
            transition: 'all 0.2s ease',
            backgroundColor: tokens.colors.background,
            p: 1,
            '&:hover': {
              color: tokens.colors.error,
              backgroundColor: tokens.colors.errorLight,
              transform: 'rotate(90deg)',
            },
          }}
          aria-label="Close modal"
        >
          <CloseIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 4,
          pb: actions ? 2 : 4,
          color: tokens.colors.textSecondary,
          fontSize: tokens.typography.fontSizes.base,
          fontFamily: tokens.typography.fontFamily,
          lineHeight: 1.5,
        }}
      >
        {children}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{
            px: 4,
            pb: 4,
            pt: 2,
            gap: 2,
            justifyContent: 'flex-end',
            '& .MuiButton-root': {
               minWidth: 100,
            }
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default MitumbaModal
