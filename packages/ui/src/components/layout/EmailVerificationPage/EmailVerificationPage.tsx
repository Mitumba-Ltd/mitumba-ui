/* eslint-disable react/jsx-no-bind */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ButtonBase from '@mui/material/ButtonBase';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import { tokens } from '@mitumba/tokens';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';
import { MitumbaTextField } from '../../foundation/MitumbaTextField';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import type { EmailVerificationPageProps } from './EmailVerificationPage.types';

/**
 * EmailVerificationPage — standalone page for email verification after signup.
 * Split layout on desktop (hero left, form right), form-only on mobile.
 * Same visual language as AuthPage and TwoFactorLoginStep.
 */
export function EmailVerificationPage({
  email,
  onVerify,
  onResend,
  loading,
  error,
  resendSuccess,
  heroImageUrl,
  onGoBack,
  titleLevel,
}: EmailVerificationPageProps): React.ReactElement {
  const [code, setCode] = React.useState('');
  const [countdown, setCountdown] = React.useState(0);

  // Countdown timer after resend
  React.useEffect(() => {
    if (countdown <= 0) return undefined;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    onResend();
    setCountdown(60);
  };

  const handleVerify = () => {
    if (code.length === 6) onVerify(code);
  };

  const panelBg = heroImageUrl
    ? `linear-gradient(135deg, ${tokens.colors.green}cc, ${tokens.colors.earth}99), url(${heroImageUrl})`
    : `linear-gradient(135deg, ${tokens.colors.green}, ${tokens.colors.earth})`;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: tokens.colors.background, p: { xs: 0, md: `${tokens.spacing.lg}px` } }}>
      <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: 900 }, height: { xs: '100vh', md: 540 }, bgcolor: tokens.colors.surface, borderRadius: { xs: 0, md: `${tokens.radius.xl}px` }, boxShadow: { xs: 'none', md: tokens.shadows.elevated }, overflow: 'hidden', display: 'flex' }}>

        {/* Hero panel — desktop only */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexShrink: 0, width: '42%', background: panelBg, backgroundSize: 'cover', backgroundPosition: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', p: `${tokens.spacing.giant}px`, color: tokens.colors.white }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: tokens.colors.white, mb: `${tokens.spacing.lg}px` }}>
            Almost there!
          </Typography>
          <Typography variant="body1" sx={{ color: tokens.colors.white, opacity: 0.9 }}>
            Verify your email to unlock the full Mitumba experience — buy, sell, and connect with trusted sellers across Kenya.
          </Typography>
        </Box>

        {/* Form panel */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto', p: { xs: `${tokens.spacing.xl}px`, md: `${tokens.spacing.huge}px` }, textAlign: 'center' }}>

          {/* Icon */}
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: tokens.colors.greenLight, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: `${tokens.spacing.xl}px` }}>
            <MarkEmailReadOutlinedIcon sx={{ fontSize: 36, color: tokens.colors.green }} />
          </Box>

          {/* Title */}
          <SemanticTitle titleLevel={titleLevel} sx={{ fontSize: tokens.typography.fontSizes.xl, fontWeight: 800, color: tokens.colors.textPrimary, mb: `${tokens.spacing.sm}px` }}>
            Verify your email
          </SemanticTitle>

          {/* Subtitle */}
          <Typography sx={{ fontSize: tokens.typography.fontSizes.base, color: tokens.colors.textSecondary, mb: `${tokens.spacing.xxxl}px`, maxWidth: 340, mx: 'auto' }}>
            We sent a 6-digit code to <strong>{email}</strong>
          </Typography>

          {/* Code input — documented monospace exception retained */}
          <MitumbaTextField
            label="Verification code"
            value={code}
            onChange={(val) => setCode(val.replace(/\D/g, '').slice(0, 6))}
            hint="000000"
            error={error}
            sx={{
              mb: `${tokens.spacing.xl}px`,
              maxWidth: 280,
              mx: 'auto',
              '& input': { fontSize: 28, letterSpacing: '10px', textAlign: 'center', fontFamily: 'monospace', fontWeight: 700 },
            }}
          />

          {/* Resend success — announced politely */}
          {resendSuccess && <Alert severity="success" role="status" sx={{ mb: `${tokens.spacing.lg}px`, maxWidth: 280, mx: 'auto' }}>Code resent!</Alert>}

          {/* Verify button */}
          <Box sx={{ maxWidth: 280, mx: 'auto', width: '100%', mb: `${tokens.spacing.xl}px` }}>
            <MitumbaPrimaryButton
              label={loading ? 'Verifying...' : 'Verify'}
              fullWidth
              disabled={code.length !== 6 || loading}
              loading={loading}
              onClick={handleVerify}
            />
          </Box>

          {/* Resend link */}
          <ButtonBase
            onClick={countdown > 0 ? undefined : handleResend}
            disabled={countdown > 0}
            sx={{ color: countdown > 0 ? tokens.colors.textDisabled : tokens.colors.green, fontSize: tokens.typography.fontSizes.sm, fontWeight: 600, cursor: countdown > 0 ? 'default' : 'pointer', '&:hover': countdown > 0 ? {} : { textDecoration: 'underline' } }}
          >
            {countdown > 0 ? `Resend available in ${countdown}s` : "Didn\u0027t receive it? Resend"}
          </ButtonBase>

          {/* Go back link */}
          {onGoBack && (
            <ButtonBase
              onClick={onGoBack}
              sx={{ mt: `${tokens.spacing.lg}px`, color: tokens.colors.textSecondary, fontSize: tokens.typography.fontSizes.sm, cursor: 'pointer', '&:hover': { color: tokens.colors.textPrimary } }}
            >
              Wrong email? Go back
            </ButtonBase>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default EmailVerificationPage;
