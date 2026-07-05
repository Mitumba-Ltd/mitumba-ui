/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SmsIcon from '@mui/icons-material/Sms';
import EmailIcon from '@mui/icons-material/Email';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { tokens } from '@mitumba/tokens';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';
import { MitumbaTextField } from '../../foundation/MitumbaTextField';
import type { TwoFactorLoginStepProps, TwoFactorLoginMethod } from './TwoFactorLoginStep.types';
import type { TwoFactorMethodType } from '../TwoFactorMethodList/TwoFactorMethodList.types';

const TYPE_ICONS: Record<TwoFactorMethodType, React.ReactNode> = {
  totp: <QrCode2Icon sx={{ fontSize: 16 }} />,
  sms: <SmsIcon sx={{ fontSize: 16 }} />,
  email: <EmailIcon sx={{ fontSize: 16 }} />,
  passkey: <FingerprintIcon sx={{ fontSize: 16 }} />,
};

const TYPE_LABELS: Record<TwoFactorMethodType, string> = {
  totp: 'Authenticator',
  sms: 'SMS',
  email: 'Email',
  passkey: 'Passkey',
};

function getSubtitle(method?: TwoFactorLoginMethod): string {
  if (!method) return 'Enter the 6-digit code from your authenticator app';
  switch (method.type) {
    case 'totp': return 'Enter the 6-digit code from your authenticator app';
    case 'sms': return `Enter the code sent to your phone${method.label ? ` (${method.label})` : ''}`;
    case 'email': return `Enter the code sent to your email${method.label ? ` (${method.label})` : ''}`;
    case 'passkey': return 'Use your fingerprint, face, or security key to verify';
    default: return 'Enter your verification code';
  }
}

/**
 * TwoFactorLoginStep — standalone centered view for 2FA verification during login.
 * Supports method chooser when account has multiple enabled methods.
 */
export function TwoFactorLoginStep({
  onSubmit,
  loading,
  error,
  onUseBackupCode,
  methods,
  activeMethodId,
  onMethodChange,
  onSendCode,
  onUsePasskey,
}: TwoFactorLoginStepProps): React.ReactElement {
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const hasMultipleMethods = methods && methods.length > 1;
  const activeMethod = methods?.find((m) => m.id === activeMethodId) ?? methods?.[0];
  const needsSend = activeMethod && (activeMethod.type === 'sms' || activeMethod.type === 'email');
  const isPasskey = activeMethod?.type === 'passkey';

  const handleSubmit = () => {
    if (code.length === 6) onSubmit(code);
  };

  const handleMethodSwitch = (m: TwoFactorLoginMethod) => {
    onMethodChange?.(m.id);
    setCode('');
    setCodeSent(false);
  };

  const handleSendCode = () => {
    if (activeMethod && onSendCode) {
      onSendCode(activeMethod.id);
      setCodeSent(true);
    }
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
        <Typography sx={{ fontSize: tokens.typography.fontSizes.base, color: tokens.colors.textSecondary, fontFamily: tokens.typography.fontFamily, mb: `${tokens.spacing.xxl}px`, maxWidth: 320, mx: 'auto' }}>
          {getSubtitle(activeMethod)}
        </Typography>

        {/* Method chooser */}
        {hasMultipleMethods && (
          <Box sx={{ display: 'flex', gap: `${tokens.spacing.xs}px`, justifyContent: 'center', mb: `${tokens.spacing.xl}px`, flexWrap: 'wrap' }}>
            {methods.map((m) => {
              const isActive = m.id === (activeMethod?.id ?? '');
              return (
                <Button
                  key={m.id}
                  onClick={() => handleMethodSwitch(m)}
                  startIcon={TYPE_ICONS[m.type]}
                  sx={{
                    textTransform: 'none',
                    borderRadius: `${tokens.radius.full}px`,
                    fontFamily: tokens.typography.fontFamily,
                    fontSize: tokens.typography.fontSizes.sm,
                    fontWeight: isActive ? 700 : 500,
                    px: 2,
                    py: 0.5,
                    border: `1.5px solid ${isActive ? tokens.colors.green : tokens.colors.divider}`,
                    bgcolor: isActive ? tokens.colors.greenLight : 'transparent',
                    color: isActive ? tokens.colors.green : tokens.colors.textSecondary,
                    '&:hover': { bgcolor: tokens.colors.greenLight, borderColor: tokens.colors.green },
                  }}
                >
                  {m.label || TYPE_LABELS[m.type]}
                </Button>
              );
            })}
          </Box>
        )}

        {/* Send code button for SMS/email */}
        {!isPasskey && needsSend && !codeSent && onSendCode && (
          <Box sx={{ mb: `${tokens.spacing.xl}px` }}>
            <MitumbaPrimaryButton
              label={`Send code via ${TYPE_LABELS[activeMethod.type]}`}
              onClick={handleSendCode}
              variant="outline"
              fullWidth
            />
          </Box>
        )}

        {/* Passkey button */}
        {isPasskey && onUsePasskey && activeMethod && (
          <Box sx={{ mb: `${tokens.spacing.xl}px` }}>
            <MitumbaPrimaryButton
              label="Use a passkey"
              onClick={() => onUsePasskey(activeMethod.id)}
              loading={loading}
              icon={<FingerprintIcon sx={{ fontSize: 20 }} />}
              fullWidth
            />
            {error && (
              <Typography sx={{ color: tokens.colors.error, fontSize: tokens.typography.fontSizes.xs, mt: `${tokens.spacing.sm}px`, textAlign: 'center' }}>
                {error}
              </Typography>
            )}
          </Box>
        )}

        {/* Code input */}
        {!isPasskey && (!needsSend || codeSent || !onSendCode) && (
          <>
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
          </>
        )}

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
