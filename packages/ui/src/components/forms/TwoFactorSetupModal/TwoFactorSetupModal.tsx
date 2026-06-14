/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { tokens } from '@mitumba/tokens';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';
import { MitumbaTextField } from '../../foundation/MitumbaTextField';
import type { TwoFactorSetupModalProps } from './TwoFactorSetupModal.types';

const STEP_LABELS = ['Scan QR Code', 'Verify Code', 'Backup Codes'];

/**
 * TwoFactorSetupModal — dialog for enabling 2FA from settings.
 * 3-step flow: scan QR → verify code → save backup codes.
 */
export function TwoFactorSetupModal({
  open,
  onClose,
  otpauthUri,
  secret,
  onVerify,
  backupCodes,
  verifying,
  error,
}: TwoFactorSetupModalProps): React.ReactElement {
  const [activeStep, setActiveStep] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [code, setCode] = useState('');

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauthUri)}`;

  const handleVerify = () => {
    onVerify(code).then(() => {
      if (backupCodes && backupCodes.length > 0) {
        setActiveStep(2);
      }
    });
  };

  const handleCopyAll = () => {
    if (backupCodes) navigator.clipboard.writeText(backupCodes.join('\n'));
  };

  const handleDownload = () => {
    if (!backupCodes) return;
    const blob = new Blob([backupCodes.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mitumba-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} PaperProps={{ sx: { maxWidth: 480, width: '100%', borderRadius: `${tokens.radius.xl}px`, p: 0 } }}>
      <DialogContent sx={{ p: { xs: `${tokens.spacing.xl}px`, md: `${tokens.spacing.xxxl}px` } }}>

        {/* Title */}
        <Typography sx={{ fontSize: tokens.typography.fontSizes.lg, fontWeight: 800, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily, mb: `${tokens.spacing.xxl}px`, textAlign: 'center' }}>
          Set Up Two-Factor Authentication
        </Typography>

        {/* Step indicators */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: `${tokens.spacing.xl}px`, mb: `${tokens.spacing.xxxl}px` }}>
          {STEP_LABELS.map((label, i) => (
            <Box key={label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${tokens.spacing.xs}px` }}>
              <Box sx={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, fontFamily: tokens.typography.fontFamily,
                bgcolor: (() => { if (activeStep > i) return tokens.colors.green; if (activeStep === i) return tokens.colors.greenLight; return tokens.colors.background; })(),
                color: (() => { if (activeStep > i) return tokens.colors.white; if (activeStep === i) return tokens.colors.green; return tokens.colors.textDisabled; })(),
                border: activeStep === i ? `2px solid ${tokens.colors.green}` : 'none',
              }}>
                {activeStep > i ? <CheckCircleIcon sx={{ fontSize: 18 }} /> : i + 1}
              </Box>
              <Typography sx={{ fontSize: 10, fontWeight: 600, color: activeStep >= i ? tokens.colors.textPrimary : tokens.colors.textDisabled }}>{label}</Typography>
            </Box>
          ))}
        </Box>

        {/* ── Step 1: Scan QR ── */}
        {activeStep === 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ bgcolor: tokens.colors.background, borderRadius: `${tokens.radius.lg}px`, p: `${tokens.spacing.xl}px`, display: 'inline-block', mb: `${tokens.spacing.xl}px` }}>
              <Box component="img" src={qrUrl} alt="QR Code for authenticator app" sx={{ width: 180, height: 180, display: 'block' }} />
            </Box>

            <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, color: tokens.colors.textSecondary, mb: `${tokens.spacing.md}px` }}>
              Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
            </Typography>

            <Button size="small" onClick={() => setShowSecret(!showSecret)} sx={{ color: tokens.colors.green, fontWeight: 600, textTransform: 'none', mb: `${tokens.spacing.sm}px` }}>
              {showSecret ? 'Hide manual key' : "Can't scan? Enter key manually"}
            </Button>

            <Collapse in={showSecret}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: `${tokens.spacing.sm}px`, bgcolor: tokens.colors.background, borderRadius: `${tokens.radius.md}px`, p: `${tokens.spacing.md}px`, mt: `${tokens.spacing.sm}px` }}>
                <Typography sx={{ fontFamily: 'monospace', fontSize: 14, letterSpacing: 1.5, fontWeight: 600, color: tokens.colors.textPrimary }}>{secret}</Typography>
                <IconButton size="small" onClick={() => navigator.clipboard.writeText(secret)} aria-label="Copy secret key">
                  <ContentCopyIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Collapse>

            <Box sx={{ mt: `${tokens.spacing.xxl}px` }}>
              <MitumbaPrimaryButton label="Next" fullWidth onClick={() => setActiveStep(1)} />
            </Box>
          </Box>
        )}

        {/* ── Step 2: Verify ── */}
        {activeStep === 1 && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: tokens.typography.fontSizes.base, color: tokens.colors.textSecondary, mb: `${tokens.spacing.xxl}px` }}>
              Enter the 6-digit code from your authenticator app to confirm setup
            </Typography>

            <MitumbaTextField
              label="Verification code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              fullWidth
              sx={{
                mb: `${tokens.spacing.lg}px`,
                maxWidth: 240,
                mx: 'auto',
                '& input': { fontSize: 28, letterSpacing: '10px', textAlign: 'center', fontFamily: 'monospace', fontWeight: 700 },
              }}
            />

            {error && <Alert severity="error" sx={{ mb: `${tokens.spacing.lg}px`, textAlign: 'left' }}>{error}</Alert>}

            <MitumbaPrimaryButton
              label={verifying ? 'Verifying...' : 'Verify & Enable'}
              fullWidth
              disabled={code.length !== 6 || verifying}
              loading={verifying}
              onClick={handleVerify}
            />
          </Box>
        )}

        {/* ── Step 3: Backup Codes ── */}
        {activeStep === 2 && backupCodes && (
          <Box>
            <Alert severity="warning" sx={{ mb: `${tokens.spacing.xl}px` }}>
              Save these recovery codes in a safe place. Each code can only be used once if you lose access to your authenticator app.
            </Alert>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: `${tokens.spacing.sm}px`, mb: `${tokens.spacing.xl}px` }}>
              {backupCodes.map((c) => (
                <Box key={c} sx={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 600, p: `${tokens.spacing.md}px`, bgcolor: tokens.colors.background, borderRadius: `${tokens.radius.md}px`, textAlign: 'center', color: tokens.colors.textPrimary, letterSpacing: 1 }}>
                  {c}
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: `${tokens.spacing.md}px`, justifyContent: 'center' }}>
              <MitumbaPrimaryButton label="Copy All" variant="outline" icon={<ContentCopyIcon />} onClick={handleCopyAll} />
              <MitumbaPrimaryButton label="Download" variant="outline" icon={<DownloadIcon />} onClick={handleDownload} />
            </Box>

            <Box sx={{ mt: `${tokens.spacing.xxl}px` }}>
              <MitumbaPrimaryButton label="Done" fullWidth onClick={onClose} />
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TwoFactorSetupModal;
