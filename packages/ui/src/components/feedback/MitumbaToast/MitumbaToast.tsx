import React, { useEffect } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import type { SlideProps } from '@mui/material/Slide'
import { tokens } from '@mitumba/tokens'
import type { MitumbaToastProps } from './MitumbaToast.types'

function SlideTransition(props: SlideProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide {...props} direction="up" />
}

/**
 * Premium "Living" Toast primitive with tactile feedback.
 * Fulfills high-end feedback standards with slide-in physics and status-aware branding.
 */
export function MitumbaToast({ 
  message, 
  severity, 
  open, 
  onClose, 
  duration = 4000,
  action
}: MitumbaToastProps) {
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
  const darkColor = tokens.colors[`${severity === 'success' ? 'green' : severity}Dark` as keyof typeof tokens.colors] || baseColor

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
      sx={{
        bottom: { xs: tokens.spacing.xl, sm: tokens.spacing.xxl },
      }}
    >
      <Alert
        severity={severity}
        onClose={onClose}
        action={action}
        variant="filled"
        sx={{
          borderRadius: tokens.radius.md,
          boxShadow: tokens.shadows.deep,
          fontWeight: 700,
          fontFamily: tokens.typography.fontFamily,
          minWidth: { xs: 'calc(100vw - 32px)', sm: 380 },
          maxWidth: { xs: 'calc(100vw - 32px)', sm: 560 },
          backgroundColor: baseColor,
          color: tokens.colors.white,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          
          '& .MuiAlert-icon': {
            fontSize: 24,
            opacity: 1,
            color: tokens.colors.white,
          },
          '& .MuiAlert-message': {
            fontSize: tokens.typography.fontSizes.base,
            padding: '10px 0',
            lineHeight: 1.2,
          },
          '& .MuiAlert-action': {
            alignItems: 'center',
            paddingTop: 0,
            paddingBottom: 0,
            marginRight: '-4px',
            gap: 1,
            '& .MuiIconButton-root, & .MuiButton-root': {
              color: tokens.colors.white,
              fontWeight: 800,
              textTransform: 'uppercase',
              fontSize: 12,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.15)',
              },
            },
          },
          
          // Systematic hover interaction
          '&:hover': {
            backgroundColor: darkColor,
            transform: 'translateY(-2px)',
          }
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default MitumbaToast
