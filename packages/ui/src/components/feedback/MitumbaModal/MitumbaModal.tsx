import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import Slide from '@mui/material/Slide'
import type { TransitionProps } from '@mui/material/transitions'
import CloseIcon from '@mui/icons-material/Close'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { tokens } from '@mitumba/tokens'
import { SemanticTitle } from '../../../internal/SemanticTitle'
import type { MitumbaModalProps } from './MitumbaModal.types'

let modalIdCounter = 0

// eslint-disable-next-line prefer-arrow-callback
const SlideUp = React.forwardRef(function SlideUp(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />
})

/**
 * Universal modal base — all modals in the app extend this.
 * Desktop: centered dialog with backdrop blur.
 * Mobile (<600px): full-width bottom sheet that slides up.
 */
export function MitumbaModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  actions,
  maxWidth = 500,
  showClose = true,
  closeOnBackdrop = true,
  loading = false,
  titleLevel,
}: MitumbaModalProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const baseId = React.useMemo(() => {
    modalIdCounter += 1
    return `mitumba-modal-${modalIdCounter}`
  }, [])
  const titleId = `${baseId}-title`
  const descriptionId = `${baseId}-description`

  return (
    <Dialog
      open={open}
      onClose={closeOnBackdrop ? onClose : undefined}
      fullScreen={isMobile}
      aria-labelledby={titleId}
      aria-describedby={subtitle ? descriptionId : undefined}
      TransitionComponent={isMobile ? SlideUp : undefined}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.45)', backdropFilter: 'blur(4px)' },
        },
      }}
      PaperProps={{
        sx: {
          ...(isMobile
            ? {
                borderRadius: 0,
                borderTopLeftRadius: `${tokens.radius.xl}px`,
                borderTopRightRadius: `${tokens.radius.xl}px`,
                position: 'fixed',
                bottom: 0,
                m: 0,
                maxHeight: '92vh',
                width: '100%',
              }
            : {
                borderRadius: `${tokens.radius.xl}px`,
                maxWidth,
                width: '100%',
                m: `${tokens.spacing.lg}px`,
              }),
          boxShadow: tokens.shadows.deep,
          backgroundColor: tokens.colors.surface,
          backgroundImage: 'none',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Drag handle — mobile only */}
      {isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: `${tokens.spacing.sm}px` }}>
          <Box
            sx={{
              width: 36,
              height: 4,
              borderRadius: tokens.radius.full,
              bgcolor: tokens.colors.divider,
            }}
          />
        </Box>
      )}

      {/* Header */}
      <DialogTitle
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          px: 3,
          pt: isMobile ? 2 : 3,
          pb: 1,
        }}
      >
        <Box sx={{ flex: 1, mr: showClose ? 1 : 0 }}>
          <SemanticTitle
            titleLevel={titleLevel}
            id={titleId}
            sx={{
              fontSize: tokens.typography.fontSizes.lg,
              fontWeight: tokens.typography.fontWeights.bold,
              color: tokens.colors.textPrimary,
              lineHeight: 1.2,
              m: 0,
            }}
          >
            {title}
          </SemanticTitle>
          {subtitle && (
            <Typography
              id={descriptionId}
              sx={{
                fontSize: tokens.typography.fontSizes.sm,
                color: tokens.colors.textSecondary,
                mt: '4px',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {showClose && (
          <IconButton
            aria-label="Close modal"
            onClick={onClose}
            sx={{
              color: tokens.colors.textDisabled,
              backgroundColor: tokens.colors.background,
              p: 0.75,
              transition: tokens.motion.transitions.interaction,
              '&:hover': {
                color: tokens.colors.error,
                backgroundColor: tokens.colors.errorLight,
                transform: 'rotate(90deg)',
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </DialogTitle>

      {/* Body — scrollable */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 3,
          py: 2,
          position: 'relative',
        }}
      >
        {children}

        {/* Loading overlay */}
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              borderRadius: `${tokens.radius.md}px`,
            }}
          >
            <CircularProgress size={28} sx={{ color: tokens.colors.green }} />
          </Box>
        )}
      </Box>

      {/* Footer */}
      {actions && (
        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: `1px solid ${tokens.colors.divider}`,
            display: 'flex',
            gap: `${tokens.spacing.base}px`,
            justifyContent: 'flex-end',
          }}
        >
          {actions}
        </Box>
      )}
    </Dialog>
  )
}

export default MitumbaModal
