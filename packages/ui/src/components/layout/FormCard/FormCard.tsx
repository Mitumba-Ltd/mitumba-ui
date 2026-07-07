import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { FormCardProps } from './FormCard.types'

/**
 * FormCard — reusable card wrapper for form pages.
 * Icon + title header, error alert, padded content area.
 * Matches CartItem materialness: tokens.radius.lg, shadows.card, hover-lift.
 */
export function FormCard({
  icon,
  title,
  subtitle,
  children,
  error,
  sx,
}: FormCardProps) {
  return (
    <Box
      sx={[
        { width: '100%', maxWidth: 600, mx: 'auto' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.base}px`, mb: `${tokens.spacing.xl}px` }}>
        {icon && (
          <Box sx={{ color: tokens.colors.green, display: 'flex', fontSize: 28 }}>
            {icon}
          </Box>
        )}
        <Box>
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.xl,
              fontWeight: tokens.typography.fontWeights.extrabold,
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                fontSize: tokens.typography.fontSizes.sm,
                color: tokens.colors.textSecondary,
                fontFamily: tokens.typography.fontFamily,
                mt: '2px',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Error */}
      {error && (
        <Box
          sx={{
            mb: `${tokens.spacing.lg}px`,
            p: `${tokens.spacing.base}px`,
            borderRadius: `${tokens.radius.md}px`,
            bgcolor: tokens.colors.errorLight,
            border: `1px solid ${tokens.colors.error}25`,
          }}
        >
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              color: tokens.colors.error,
              fontFamily: tokens.typography.fontFamily,
              fontWeight: tokens.typography.fontWeights.medium,
            }}
          >
            {error}
          </Typography>
        </Box>
      )}

      {/* Card body */}
      <Box
        sx={{
          bgcolor: tokens.colors.surface,
          borderRadius: `${tokens.radius.lg}px`,
          border: `1px solid ${tokens.colors.divider}`,
          boxShadow: tokens.shadows.card,
          p: `${tokens.spacing.xxl}px`,
          transition: tokens.motion.transitions.interaction,
          '&:hover': {
            boxShadow: tokens.shadows.elevated,
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default FormCard
