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

  const severityColors = {
    success: tokens.colors.green,
    error: tokens.colors.error,
    warning: tokens.colors.warning,
    info: tokens.colors.info,
  }

  const baseColor = severityColors[severity]

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        bottom: { xs: tokens.spacing.xl, sm: tokens.spacing.xxl },
      }}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        variant="filled"
        sx={{
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.shadows.elevated,
          fontWeight: tokens.typography.fontWeights.semibold,
          fontFamily: tokens.typography.fontFamily,
          minWidth: { xs: 'calc(100vw - 32px)', sm: 380 },
          maxWidth: { xs: 'calc(100vw - 32px)', sm: 560 },
          backgroundColor: baseColor,
          color: tokens.colors.white,
          '& .MuiAlert-icon': {
            fontSize: 24,
            opacity: 1,
            color: tokens.colors.white,
          },
          '& .MuiAlert-message': {
            fontSize: tokens.typography.fontSizes.base,
            padding: '8px 0',
          },
          '& .MuiAlert-action': {
            paddingTop: 0,
            paddingBottom: 0,
            marginRight: '-4px',
            '& .MuiIconButton-root': {
              color: tokens.colors.white,
              opacity: 0.7,
              '&:hover': {
                opacity: 1,
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            },
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default MitumbaToast
