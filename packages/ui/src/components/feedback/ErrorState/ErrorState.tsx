import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import GppBadIcon from '@mui/icons-material/GppBad';
import BugReportIcon from '@mui/icons-material/BugReport';
import { tokens } from '@mitumba/tokens';
import type { ErrorStateProps } from './ErrorState.types';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';

const TYPE_CONFIG = {
  general: { icon: <BugReportIcon />, color: tokens.colors.error },
  '404': { icon: <SentimentVeryDissatisfiedIcon />, color: tokens.colors.earth },
  '500': { icon: <ErrorOutlineIcon />, color: tokens.colors.error },
  network: { icon: <WifiOffIcon />, color: tokens.colors.info },
  forbidden: { icon: <GppBadIcon />, color: tokens.colors.error },
} as const;

/**
 * Error state — communicates failure and provides recovery path.
 * Centered layout with type-specific icon/color, human copy, and retry/back actions.
 */
export function ErrorState({
  title = 'Something went wrong',
  subtitle = 'Please try again',
  type = 'general',
  variant = 'standard',
  onRetry,
  retryLabel = 'Try again',
  onBack,
  illustration,
}: ErrorStateProps): React.ReactElement {
  const isCompact = variant === 'compact';
  const isElevated = variant === 'elevated';
  const config = TYPE_CONFIG[type];
  const displayIcon = illustration || config.icon;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isCompact ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: isCompact ? 'left' : 'center',
        width: '100%',
        py: isCompact ? `${tokens.spacing.xl}px` : `${tokens.spacing.huge}px`,
        px: isCompact ? `${tokens.spacing.xl}px` : `${tokens.spacing.xxxl}px`,
        gap: isCompact ? `${tokens.spacing.lg}px` : `${tokens.spacing.md}px`,
        bgcolor: isElevated ? tokens.colors.surface : `${config.color}05`,
        borderRadius: `${tokens.radius.xl}px`,
        border: isElevated ? 'none' : `1px solid ${config.color}15`,
        boxShadow: isElevated ? tokens.shadows.card : 'none',
      }}
    >
      {/* Icon */}
      {displayIcon && (
        <Box
          sx={{
            width: isCompact ? 48 : 72,
            height: isCompact ? 48 : 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: config.color,
            '& svg': { fontSize: isCompact ? 24 : 32 },
          }}
        >
          {displayIcon}
        </Box>
      )}

      {/* Content */}
      <Box sx={{ flex: isCompact ? 1 : undefined }}>
        <Typography
          sx={{
            fontSize: isCompact ? tokens.typography.fontSizes.base : tokens.typography.fontSizes.lg,
            fontWeight: 700,
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: tokens.typography.lineHeights.tight,
            mb: `${tokens.spacing.xs}px`,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: isCompact ? tokens.typography.fontSizes.sm : tokens.typography.fontSizes.base,
            color: tokens.colors.textSecondary,
            fontFamily: tokens.typography.fontFamily,
            lineHeight: tokens.typography.lineHeights.normal,
            maxWidth: isCompact ? undefined : 360,
            mx: isCompact ? undefined : 'auto',
          }}
        >
          {subtitle}
        </Typography>

        {(onRetry || onBack) && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: isCompact ? `${tokens.spacing.md}px` : `${tokens.spacing.xl}px`, justifyContent: isCompact ? 'flex-start' : 'center' }}
          >
            {onBack && (
              <MitumbaPrimaryButton label="Go back" onClick={onBack} variant="outline" size={isCompact ? 'small' : 'medium'} />
            )}
            {onRetry && (
              <MitumbaPrimaryButton label={retryLabel} onClick={onRetry} variant="primary" size={isCompact ? 'small' : 'medium'} />
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default ErrorState;
