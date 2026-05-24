import { useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { tokens } from '@mitumba/tokens'
import type { MitumbaToastProps } from './MitumbaToast.types'

/**
 * Toast notification component with Mitumba styling.
 */
export function MitumbaToast({ message, severity, open, onClose, duration = 4000 }: MitumbaToastProps) {
  useEffect(() => {
    if (open && duration !== Infinity) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [open, onClose, duration])

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        '& .MuiSnackbar-root': {
          bottom: tokens.spacing.lg,
        },
      }}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        sx={{
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.shadows.elevated,
          fontWeight: tokens.typography.fontWeights.semibold,
          minWidth: { xs: '90vw', sm: 360 },
          maxWidth: { xs: '90vw', sm: 480 },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default MitumbaToast
