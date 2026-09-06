import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { tokens } from '@mitumba/tokens';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import type { UnauthenticatedStateProps } from './UnauthenticatedState.types';

/**
 * UnauthenticatedState — shown on pages that require login when the user
 * is not authenticated. Centered on page with icon, title, subtitle, and
 * sign-in CTA. Follows EmptyState visual pattern.
 */
export function UnauthenticatedState({
  title,
  subtitle,
  icon,
  signInLabel = 'Sign In',
  onSignIn,
  secondaryAction,
  titleLevel,
}: UnauthenticatedStateProps): React.ReactElement {
  const displayIcon = icon || <LockOutlinedIcon />;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '60vh',
        px: `${tokens.spacing.xl}px`,
        py: `${tokens.spacing.huge}px`,
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          bgcolor: tokens.colors.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: tokens.colors.textDisabled,
          mb: `${tokens.spacing.xl}px`,
          '& svg': { fontSize: 32 },
        }}
      >
        {displayIcon}
      </Box>

      {/* Title */}
      <SemanticTitle
        titleLevel={titleLevel}
        sx={{
          fontSize: tokens.typography.fontSizes.lg,
          fontWeight: 800,
          color: tokens.colors.textPrimary,
          lineHeight: tokens.typography.lineHeights.tight,
          mb: `${tokens.spacing.sm}px`,
        }}
      >
        {title}
      </SemanticTitle>

      {/* Subtitle */}
      <Typography
        sx={{
          fontSize: tokens.typography.fontSizes.base,
          color: tokens.colors.textSecondary,
          lineHeight: tokens.typography.lineHeights.normal,
          maxWidth: 400,
          mb: `${tokens.spacing.xxl}px`,
        }}
      >
        {subtitle}
      </Typography>

      {/* Sign In button */}
      <Box sx={{ width: '100%', maxWidth: 300, mb: secondaryAction ? `${tokens.spacing.lg}px` : 0 }}>
        <MitumbaPrimaryButton fullWidth label={signInLabel} onClick={onSignIn} />
      </Box>

      {/* Secondary action */}
      {secondaryAction && (
        <ButtonBase
          onClick={secondaryAction.onClick}
          sx={{
            color: tokens.colors.green,
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: 600,
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {secondaryAction.label}
        </ButtonBase>
      )}
    </Box>
  );
}

export default UnauthenticatedState;
