/* eslint-disable react/jsx-no-bind, react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { colors, spacing, radius } from '@mitumba/tokens';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';
import type { TwoFactorSetupModalProps } from './TwoFactorSetupModal.types';

function StepCircle({ step, active, completed }: { step: number; active: boolean; completed: boolean }) {
  const bg = completed ? colors.green : active ? 'transparent' : colors.textDisabled;
  const border = completed || active ? colors.green : colors.textDisabled;
  const color = completed ? colors.surface : active ? colors.green : colors.surface;

  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        backgroundColor: bg,
        border: `2px solid ${border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 13,
        color,
      }}
    >
      {step}
    </Box>
  );
}

function TwoFactorSetupModal(props: TwoFactorSetupModalProps) {
  const { open, onClose, otpauthUri, secret, onVerify, backupCodes, verifying, error } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [code, setCode] = useState('');

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauthUri)}`;

  function handleVerify() {
    onVerify(code).then(() => {
      if (backupCodes && backupCodes.length > 0) {
        setActiveStep(2);
      }
    });
  }

  function handleCopyAll() {
    if (backupCodes) {
      navigator.clipboard.writeText(backupCodes.join('\n'));
    }
  }

  function handleDownload() {
    if (!backupCodes) return;
    const blob = new Blob([backupCodes.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mitumba-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} PaperProps={{ sx: { maxWidth: 480, width: '100%' } }}>
      <DialogTitle sx={{ fontWeight: 700 }}>Set Up Two-Factor Authentication</DialogTitle>
      <DialogContent>
        {/* Step indicators */}
        <Box sx={{ display: 'flex', gap: spacing.md, mb: spacing.lg }}>
          {[1, 2, 3].map((s) => (
            <Box key={s} sx={{ display: 'flex', alignItems: 'center', gap: spacing.xs }}>
              <StepCircle step={s} active={activeStep === s - 1} completed={activeStep > s - 1} />
              <Typography variant="body2" sx={{ color: activeStep === s - 1 ? colors.textPrimary : colors.textSecondary }}>
                {s === 1 ? 'Scan QR' : s === 2 ? 'Verify' : 'Backup'}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Step 1: Scan QR Code */}
        {activeStep === 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <img src={qrUrl} alt="QR Code" width={200} height={200} />
            <Button size="small" onClick={() => setShowSecret(!showSecret)} sx={{ mt: spacing.sm, color: colors.textSecondary }}>
              {showSecret ? 'Hide secret' : "Can't scan? Show secret"}
            </Button>
            <Collapse in={showSecret}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing.xs, mt: spacing.xs }}>
                <Typography sx={{ fontFamily: 'monospace', fontSize: 14, letterSpacing: 1 }}>{secret}</Typography>
                <IconButton size="small" onClick={() => navigator.clipboard.writeText(secret)} aria-label="Copy secret">
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
            </Collapse>
            <Box sx={{ mt: spacing.lg }}>
              <MitumbaPrimaryButton label="Next" onClick={() => setActiveStep(1)} />
            </Box>
          </Box>
        )}

        {/* Step 2: Verify */}
        {activeStep === 1 && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ mb: spacing.md, color: colors.textSecondary }}>
              Enter the 6-digit code from your authenticator app
            </Typography>
            <TextField
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputProps={{ maxLength: 6, inputMode: 'numeric', autoFocus: true, 'aria-label': 'Verification code' }}
              sx={{ '& input': { fontSize: 24, letterSpacing: 8, textAlign: 'center', fontFamily: 'monospace' }, maxWidth: 200 }}
            />
            {error && <Alert severity="error" sx={{ mt: spacing.sm }}>{error}</Alert>}
            <Box sx={{ mt: spacing.md }}>
              <MitumbaPrimaryButton label={verifying ? 'Verifying…' : 'Verify'} onClick={handleVerify} disabled={code.length !== 6 || verifying} />
            </Box>
          </Box>
        )}

        {/* Step 3: Backup Codes */}
        {activeStep === 2 && backupCodes && (
          <Box>
            <Alert severity="warning" sx={{ mb: spacing.md }}>
              Save these codes — each can only be used once
            </Alert>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.xs }}>
              {backupCodes.map((c) => (
                <Typography key={c} sx={{ fontFamily: 'monospace', fontSize: 14, p: spacing.xs, backgroundColor: colors.background, borderRadius: radius.sm, textAlign: 'center' }}>
                  {c}
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: spacing.sm, mt: spacing.lg, justifyContent: 'center' }}>
              <Button variant="outlined" startIcon={<ContentCopyIcon />} onClick={handleCopyAll}>Copy All</Button>
              <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleDownload}>Download</Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { TwoFactorSetupModal };
