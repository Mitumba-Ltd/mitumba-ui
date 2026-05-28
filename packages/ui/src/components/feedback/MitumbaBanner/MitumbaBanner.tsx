import React, { useMemo } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'
import InfoIcon from '@mui/icons-material/Info'
import HelpIcon from '@mui/icons-material/Help'
import { tokens } from '@mitumba/tokens'
import type { MitumbaBannerProps, BannerSeverity } from './MitumbaBanner.types'

/**
 * Premium "Passive Alert" Banner primitive.
 * Engineered for high-fidelity notifications with systematic status colors and precision geometry.
 */
export function MitumbaBanner({
  title,
  children,
  severity = 'info',
  icon: propIcon,
  onClose,
  action,
  sx,
}: MitumbaBannerProps) {
  const config = useMemo(() => {
    const map: Record<BannerSeverity, { color: string; bgColor: string; icon: React.ReactNode }> = {
      success: { color: tokens.colors.green, bgColor: `${tokens.colors.green}12`, icon: <CheckCircleIcon /> },
      error: { color: tokens.colors.error, bgColor: `${tokens.colors.error}12`, icon: <ErrorIcon /> },
      warning: { color: tokens.colors.warning, bgColor: `${tokens.colors.warning}12`, icon: <WarningIcon /> },
      info: { color: tokens.colors.info, bgColor: `${tokens.colors.info}12`, icon: <InfoIcon /> },
      neutral: { color: tokens.colors.textSecondary, bgColor: tokens.colors.background, icon: <HelpIcon /> },
    }
    return map[severity]
  }, [severity])

  return (
    <Box
      sx={[
        {
          width: '100%',
          display: 'flex',
          gap: 2,
          p: { xs: 2, sm: 2.5 },
          borderRadius: `${tokens.radius.md}px`,
          backgroundColor: config.bgColor,
          // High-fidelity top-border accent from benchmark
          borderTop: `4px solid ${config.color}`,
          borderLeft: `1px solid ${tokens.colors.divider}`,
          borderRight: `1px solid ${tokens.colors.divider}`,
          borderBottom: `1px solid ${tokens.colors.divider}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          position: 'relative',
          boxSizing: 'border-box',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Leading Icon */}
      <Box sx={{ color: config.color, mt: 0.2, flexShrink: 0 }}>
        {propIcon || config.icon}
      </Box>

      {/* Text Content */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: 800,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: 1.2,
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        {children && (
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              color: tokens.colors.textSecondary,
              fontFamily: tokens.typography.fontFamily,
              lineHeight: 1.5,
            }}
          >
            {children}
          </Typography>
        )}
      </Box>

      {/* Action Row / Close */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        {action}
        {onClose && (
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: tokens.colors.textDisabled,
              p: 0.5,
              '&:hover': { color: tokens.colors.textPrimary, backgroundColor: 'rgba(0,0,0,0.05)' }
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

export default MitumbaBanner
