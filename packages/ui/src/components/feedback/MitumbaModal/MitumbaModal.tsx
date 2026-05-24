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
          borderRadius: tokens.radius.xl,
          boxShadow: tokens.shadows.bottomSheet,
          margin: tokens.spacing.base,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: tokens.spacing.lg,
          paddingBlock: tokens.spacing.base,
          fontSize: tokens.typography.fontSizes.lg,
          fontWeight: tokens.typography.fontWeights.bold,
          color: tokens.colors.textPrimary,
        }}
      >
        {title}
        <IconButton
          onClick={onClose}
          sx={{
            color: tokens.colors.textSecondary,
            '&:hover': {
              color: tokens.colors.textPrimary,
            },
          }}
          aria-label="Close modal"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          paddingInline: tokens.spacing.lg,
          paddingBlock: tokens.spacing.base,
        }}
      >
        {children}
      </DialogContent>
      {actions && (
        <DialogActions
          sx={{
            paddingInline: tokens.spacing.lg,
            paddingBlock: tokens.spacing.base,
            gap: tokens.spacing.sm,
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default MitumbaModal
