import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import type { EmptyStateProps } from './EmptyState.types';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';
import { SemanticTitle } from '../../../internal/SemanticTitle';

/**
 * Empty state — communicates absence of content and guides users to a next action.
 * Follows Google/Airbnb patterns: centered illustration, clear headline, single CTA.
 */
export function EmptyState({
  illustration,
  icon,
  title,
  subtitle,
  action,
  variant = 'standard',
  titleLevel,
}: EmptyStateProps): React.ReactElement {
  const isCompact = variant === 'compact';
  const isElevated = variant === 'elevated';
  const displayIcon = illustration || icon;

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
        bgcolor: isElevated ? tokens.colors.surface : 'transparent',
        borderRadius: `${tokens.radius.xl}px`,
        border: isElevated ? 'none' : `1px solid ${tokens.colors.divider}`,
        boxShadow: isElevated ? tokens.shadows.card : 'none',
      }}
    >
      {/* Icon/illustration */}
      {displayIcon && (
        <Box
          sx={{
            width: isCompact ? 48 : 72,
            height: isCompact ? 48 : 72,
            borderRadius: '50%',
            bgcolor: tokens.colors.background,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: tokens.colors.textDisabled,
            '& svg': { fontSize: isCompact ? 24 : 32 },
          }}
        >
          {displayIcon}
        </Box>
      )}

      {/* Text content */}
      <Box sx={{ flex: isCompact ? 1 : undefined }}>
        <SemanticTitle
          titleLevel={titleLevel}
          sx={{
            fontSize: isCompact ? tokens.typography.fontSizes.base : tokens.typography.fontSizes.lg,
            fontWeight: 700,
            color: tokens.colors.textPrimary,
            lineHeight: tokens.typography.lineHeights.tight,
            mb: `${tokens.spacing.xs}px`,
          }}
        >
          {title}
        </SemanticTitle>

        <Typography
          sx={{
            fontSize: isCompact ? tokens.typography.fontSizes.sm : tokens.typography.fontSizes.base,
            color: tokens.colors.textSecondary,
            lineHeight: tokens.typography.lineHeights.normal,
            maxWidth: isCompact ? undefined : 320,
            mx: isCompact ? undefined : 'auto',
          }}
        >
          {subtitle}
        </Typography>

        {action && (
          <Box sx={{ mt: isCompact ? `${tokens.spacing.md}px` : `${tokens.spacing.xl}px` }}>
            <MitumbaPrimaryButton
              label={action.label}
              onClick={action.onClick}
              variant={action.variant || 'primary'}
              size={isCompact ? 'small' : 'medium'}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default EmptyState;
