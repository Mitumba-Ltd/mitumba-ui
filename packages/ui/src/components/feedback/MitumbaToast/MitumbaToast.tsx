import React, { useEffect, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import CircularProgress from '@mui/material/CircularProgress'
import type { SlideProps } from '@mui/material/Slide'
import { tokens } from '@mitumba/tokens'
import type { MitumbaToastProps } from './MitumbaToast.types'

function SlideTransition(props: SlideProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide {...props} direction="up" />
}

/**
 * Premium "Living" Toast primitive with tactile feedback.
 * Fulfills high-end benchmark standards with progress indicators and refined layouts.
 */
export function MitumbaToast({ 
  message, 
  severity, 
  open, 
  onClose, 
  duration = 4000,
  action,
  showIconProgress = false,
  showLinearProgress = false
}: MitumbaToastProps) {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (open && duration !== Infinity) {
      const startTime = Date.now()
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
        setProgress(remaining)
        if (elapsed >= duration) {
          clearInterval(timer)
          onClose()
        }
      }, 50)
      return () => clearInterval(timer)
    }
    setProgress(100)
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
      <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: `${tokens.radius.md}px` }}>
        <Alert
          severity={severity}
          onClose={onClose}
          action={action}
          variant="filled"
          icon={showIconProgress ? (
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress
                variant="determinate"
                value={progress}
                size={28}
                sx={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  position: 'absolute',
                }}
              />
              <Box sx={{ zIndex: 1, display: 'flex' }}>
                {/* MUI Alert default icon will be here if we don't provide one, 
                    but benchmark shows custom icons. Using default for now. */}
              </Box>
            </Box>
          ) : undefined}
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
              display: 'flex',
              alignItems: 'center',
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
                textTransform: 'none',
                fontSize: 14,
                borderRadius: tokens.radius.full, // Pill buttons from benchmark
                px: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.15)',
                },
              },
            },
            
            '&:hover': {
              backgroundColor: darkColor,
              transform: 'translateY(-2px)',
            }
          }}
        >
          {message}
        </Alert>

        {showLinearProgress && duration !== Infinity && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
              },
            }}
          />
        )}
      </Box>
    </Snackbar>
  )
}

export default MitumbaToast
