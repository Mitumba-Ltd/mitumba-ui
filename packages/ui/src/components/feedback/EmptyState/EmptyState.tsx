import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { EmptyStateProps } from './EmptyState.types'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'

/**
 * Premium "Personality-Led" Empty State primitive.
 * Fulfills the "Empty States" design benchmarks with "No Dead Ends" UX and decorative geometry.
 */
export function EmptyState({ 
  illustration, 
  icon,
  title, 
  subtitle, 
  action,
  variant = 'standard',
  showBlob = true
}: EmptyStateProps) {
  const isCompact = variant === 'compact'
  const isElevated = variant === 'elevated'
  const displayIllustration = illustration || icon

  const renderIllustrationContent = () => {
    if (!displayIllustration) return null

    const isValidElement = React.isValidElement(displayIllustration)
    const isBasicTag = isValidElement && typeof (displayIllustration as React.ReactElement).type === 'string'

    if (isValidElement && isBasicTag) {
      return displayIllustration
    }

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: isCompact ? 0 : tokens.spacing.md,
          position: 'relative',
          width: isCompact ? 48 : 120,
          height: isCompact ? 48 : 120,
        }}
      >
        {/* Decorative Benchmark Blob */}
        {showBlob && !isCompact && (
          <Box 
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: tokens.colors.background,
              borderRadius: '50% 50% 50% 0', // Abstract blob shape
              transform: 'rotate(-45deg)',
              opacity: 0.6,
              zIndex: 0,
            }}
          />
        )}
        
        <Box
          sx={{
            zIndex: 1,
            color: tokens.colors.textDisabled,
            display: 'flex',
            backgroundColor: isElevated ? 'transparent' : tokens.colors.surface,
            borderRadius: tokens.radius.full,
            p: isCompact ? 0 : tokens.spacing.lg,
            '& svg': { fontSize: isCompact ? 24 : 48 }
          }}
        >
          {displayIllustration}
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
        padding: isCompact ? tokens.spacing.lg : tokens.spacing.xxxl,
        gap: isCompact ? tokens.spacing.sm : tokens.spacing.xs, // Dense spatial rhythm
        backgroundColor: isElevated ? tokens.colors.surface : tokens.colors.background,
        borderRadius: tokens.radius.xl,
        border: isElevated ? 'none' : `1px dashed ${tokens.colors.divider}`,
        boxShadow: isElevated ? tokens.shadows.card : 'none',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      {renderIllustrationContent()}

      <Typography
        sx={{
          fontSize: isCompact ? tokens.typography.fontSizes.md : tokens.typography.fontSizes.xl,
          fontWeight: 800,
          color: tokens.colors.textPrimary,
          fontFamily: tokens.typography.fontFamily,
          lineHeight: 1.1,
          maxWidth: 400,
          mt: isCompact ? 0 : 2,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: isCompact ? tokens.typography.fontSizes.xs : tokens.typography.fontSizes.base,
          color: tokens.colors.textSecondary,
          fontFamily: tokens.typography.fontFamily,
          maxWidth: isCompact ? 240 : 360,
          marginInline: 'auto',
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </Typography>

      {action && (
        <Box sx={{ mt: isCompact ? tokens.spacing.sm : tokens.spacing.lg }}>
          <MitumbaPrimaryButton
            label={action.label}
            onClick={action.onClick}
            variant={action.variant || 'primary'}
            size={isCompact ? 'small' : 'medium'}
            fullWidth={false}
          />
        </Box>
      )}
    </Box>
  )
}

export default EmptyState
