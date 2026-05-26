import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import WifiOffIcon from '@mui/icons-material/WifiOff'
import GppBadIcon from '@mui/icons-material/GppBad'
import BugReportIcon from '@mui/icons-material/BugReport'
import { tokens } from '@mitumba/tokens'
import type { ErrorStateProps } from './ErrorState.types'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'

/**
 * Premium "Personality-Led" Error State primitive.
 * Engineered for urgent recovery and world-class visual depth.
 */
export function ErrorState({
  title = 'Something went wrong',
  subtitle = 'Please try again',
  type = 'general',
  variant = 'standard',
  onRetry,
  retryLabel = 'Try Again',
  onBack,
  illustration,
  showBlob = true,
}: ErrorStateProps) {
  const isCompact = variant === 'compact'
  const isElevated = variant === 'elevated'

  const typeConfig = {
    general: { icon: <BugReportIcon />, color: tokens.colors.error },
    '404': { icon: <SentimentVeryDissatisfiedIcon />, color: tokens.colors.earth },
    '500': { icon: <ErrorOutlineIcon />, color: tokens.colors.error },
    network: { icon: <WifiOffIcon />, color: tokens.colors.info },
    forbidden: { icon: <GppBadIcon />, color: tokens.colors.error },
  }

  const activeConfig = typeConfig[type]
  const displayIllustration = illustration || activeConfig.icon

  const renderIllustrationContent = () => {
    if (!displayIllustration) return null

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
        {/* Decorative Error Blob */}
        {showBlob && !isCompact && (
          <Box 
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: `${activeConfig.color}15`,
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', // Asymmetric blob
              animation: 'blob-morph 8s ease-in-out infinite',
              zIndex: 0,
              '@keyframes blob-morph': {
                '0%, 100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
                '50%': { borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%' },
              }
            }}
          />
        )}
        
        <Box
          sx={{
            zIndex: 1,
            color: activeConfig.color,
            display: 'flex',
            backgroundColor: tokens.colors.surface,
            borderRadius: tokens.radius.full,
            boxShadow: tokens.shadows.card,
            p: isCompact ? 1 : tokens.spacing.lg,
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
        padding: isCompact ? tokens.spacing.xl : tokens.spacing.xxxl,
        gap: isCompact ? tokens.spacing.sm : tokens.spacing.base,
        backgroundColor: isElevated ? tokens.colors.surface : `${activeConfig.color}05`,
        borderRadius: tokens.radius.xl,
        border: isElevated ? 'none' : `1px solid ${activeConfig.color}20`,
        boxShadow: isElevated ? tokens.shadows.deep : 'none',
        perspective: '1000px',
        '&:hover .error-content': {
          transform: 'rotateY(10deg) rotateX(-2deg) scale(1.02)',
        }
      }}
    >
      <Box 
        className="error-content"
        sx={{ 
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transformStyle: 'preserve-3d',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {renderIllustrationContent()}

        <Typography
          sx={{
            fontSize: isCompact ? tokens.typography.fontSizes.md : tokens.typography.fontSizes.xl,
            fontWeight: 800,
            color: activeConfig.color,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: 1.1,
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
            maxWidth: isCompact ? 240 : 400,
            marginInline: 'auto',
            lineHeight: 1.4,
            mt: 1,
          }}
        >
          {subtitle}
        </Typography>

        {(onRetry || onBack) && (
          <Stack 
            direction={isCompact ? 'column' : 'row'} 
            spacing={2} 
            sx={{ mt: isCompact ? 2 : 4, width: { xs: '100%', sm: 'auto' } }}
          >
            {onBack && (
              <MitumbaPrimaryButton
                label="Go Back"
                onClick={onBack}
                variant="outline"
                size={isCompact ? 'small' : 'medium'}
              />
            )}
            {onRetry && (
              <MitumbaPrimaryButton
                label={retryLabel}
                onClick={onRetry}
                variant={type === '404' ? 'earth' : 'primary'}
                size={isCompact ? 'small' : 'medium'}
                sx={{
                  ...(type !== '404' && {
                    backgroundColor: activeConfig.color,
                    '&:hover': {
                      backgroundColor: tokens.colors[`${type === 'network' ? 'info' : 'error'}Dark` as keyof typeof tokens.colors] || activeConfig.color,
                    }
                  })
                }}
              />
            )}
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default ErrorState
