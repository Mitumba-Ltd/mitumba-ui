import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { tokens } from '@mitumba/tokens'
import type { MitumbaModalProps } from './MitumbaModal.types'

/**
 * Modal dialog with Mitumba styling.
 */
export function MitumbaModal({ open, onClose, title, children, actions, maxWidth = 'sm' }: MitumbaModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.shadows.bottomSheet,
          margin: tokens.spacing.base,
          backgroundColor: tokens.colors.surface,
          backgroundImage: 'none',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: tokens.spacing.lg,
          paddingTop: tokens.spacing.lg,
          paddingBottom: tokens.spacing.base,
          fontSize: tokens.typography.fontSizes.lg,
          fontWeight: tokens.typography.fontWeights.bold,
          color: tokens.colors.textPrimary,
          fontFamily: tokens.typography.fontFamily,
          lineHeight: 1.2,
        }}
      >
        {title}
        <IconButton
          onClick={onClose}
          sx={{
            color: tokens.colors.textDisabled,
            transition: 'all 200ms ease',
            padding: tokens.spacing.xs,
            '&:hover': {
              color: tokens.colors.error,
              backgroundColor: tokens.colors.errorLight,
            },
          }}
          aria-label="Close modal"
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          paddingInline: tokens.spacing.lg,
          paddingBottom: actions ? tokens.spacing.sm : tokens.spacing.lg,
          color: tokens.colors.textPrimary,
          fontSize: tokens.typography.fontSizes.base,
          fontFamily: tokens.typography.fontFamily,
        }}
      >
        {children}
      </DialogContent>
      {actions && (
        <DialogActions
          sx={{
            paddingInline: tokens.spacing.lg,
            paddingBottom: tokens.spacing.lg,
            paddingTop: tokens.spacing.base,
            gap: tokens.spacing.sm,
            justifyContent: 'flex-end',
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default MitumbaModal
