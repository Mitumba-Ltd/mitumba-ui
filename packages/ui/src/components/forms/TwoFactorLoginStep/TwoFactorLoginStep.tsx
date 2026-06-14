/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { tokens } from '@mitumba/tokens';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';
import { MitumbaTextField } from '../../foundation/MitumbaTextField';
import type { TwoFactorLoginStepProps } from './TwoFactorLoginStep.types';

/**
 * TwoFactorLoginStep — standalone centered view for 2FA verification during login.
 * Matches AuthPage visual language — clean, spacious, professional.
 */
export function TwoFactorLoginStep({
  onSubmit,
  loading,
  error,
  onUseBackupCode,
}: TwoFactorLoginStepProps): React.ReactElement {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    if (code.length === 6) onSubmit(code);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: tokens.colors.background, p: { xs: `${tokens.spacing.lg}px`, md: `${tokens.spacing.xl}px` } }}>
      <Box
        sx={{
          maxWidth: 420,
          width: '100%',
          bgcolor: tokens.colors.surface,
          borderRadius: `${tokens.radius.xl}px`,
          boxShadow: tokens.shadows.elevated,
          p: { xs: `${tokens.spacing.xl}px`, md: `${tokens.spacing.huge}px` },
          textAlign: 'center',
        }}
      >
        {/* Icon */}
        <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: tokens.colors.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: `${tokens.spacing.xl}px` }}>
          <LockOutlinedIcon sx={{ fontSize: 36, color: tokens.colors.green }} />
        </Box>

        {/* Title */}
        <Typography sx={{ fontSize: tokens.typography.fontSizes.xl, fontWeight: 800, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily, mb: `${tokens.spacing.sm}px` }}>
          Two-Factor Authentication
        </Typography>

        {/* Subtitle */}
        <Typography sx={{ fontSize: tokens.typography.fontSizes.base, color: tokens.colors.textSecondary, fontFamily: tokens.typography.fontFamily, mb: `${tokens.spacing.xxxl}px`, maxWidth: 320, mx: 'auto' }}>
          Enter the 6-digit code from your authenticator app
        </Typography>

        {/* Code input */}
        <MitumbaTextField
          label="Verification code"
          value={code}
          onChange={(val) => setCode(val.replace(/\D/g, '').slice(0, 6))}
          hint="000000"
          error={error}
          sx={{
            mb: `${tokens.spacing.xl}px`,
            '& input': { fontSize: 28, letterSpacing: '10px', textAlign: 'center', fontFamily: 'monospace', fontWeight: 700 },
          }}
        />

        {/* Submit */}
        <MitumbaPrimaryButton fullWidth
          label={loading ? 'Verifying...' : 'Verify'}
          disabled={code.length !== 6 || loading}
          loading={loading}
          onClick={handleSubmit}
        />

        {/* Backup code link */}
        {onUseBackupCode && (
          <ButtonBase
            onClick={onUseBackupCode}
            sx={{ mt: `${tokens.spacing.xl}px`, color: tokens.colors.green, fontSize: tokens.typography.fontSizes.sm, fontWeight: 600, fontFamily: tokens.typography.fontFamily, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            Use a backup code instead
          </ButtonBase>
        )}
      </Box>
    </Box>
  );
}

export default TwoFactorLoginStep;
