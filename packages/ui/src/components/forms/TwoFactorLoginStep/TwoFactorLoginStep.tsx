/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ButtonBase from '@mui/material/ButtonBase';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { colors, spacing, radius, shadows } from '@mitumba/tokens';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';
import type { TwoFactorLoginStepProps } from './TwoFactorLoginStep.types';

function TwoFactorLoginStep(props: TwoFactorLoginStepProps) {
  const { onSubmit, loading, error, onUseBackupCode } = props;
  const [code, setCode] = useState('');

  function handleSubmit() {
    if (code.length === 6) onSubmit(code);
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: spacing.md }}>
      <Card
        sx={{ maxWidth: 400, width: '100%', borderRadius: radius.xl, backgroundColor: colors.surface, boxShadow: shadows.elevated, p: spacing.xl, textAlign: 'center' }}
      >
        <Box sx={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: colors.background, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: spacing.md }}>
          <LockOutlinedIcon sx={{ fontSize: 32, color: colors.textDisabled }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800, mb: spacing.xs }}>Two-Factor Authentication</Typography>
        <Typography sx={{ color: colors.textSecondary, mb: spacing.lg }}>
          Enter the 6-digit code from your authenticator app
        </Typography>
        <TextField
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          inputProps={{ maxLength: 6, inputMode: 'numeric', autoFocus: true, 'aria-label': 'Authentication code' }}
          sx={{ '& input': { fontSize: 24, letterSpacing: 8, textAlign: 'center', fontFamily: 'monospace' }, width: '100%', mb: spacing.md }}
        />
        {error && <Alert severity="error" sx={{ mb: spacing.md, textAlign: 'left' }}>{error}</Alert>}
        <MitumbaPrimaryButton label={loading ? 'Verifying…' : 'Verify'} fullWidth disabled={code.length !== 6 || loading} onClick={handleSubmit} />
        {onUseBackupCode && (
          <ButtonBase onClick={onUseBackupCode} sx={{ mt: spacing.md, color: colors.green, cursor: 'pointer', fontSize: 14 }}>
            Use a backup code instead
          </ButtonBase>
        )}
      </Card>
    </Box>
  );
}

export { TwoFactorLoginStep };
