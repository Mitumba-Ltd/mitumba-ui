import React from 'react';
import {
  Box, Typography, TextField, Select, MenuItem, InputLabel, FormControl, Alert,
  Backdrop, CircularProgress, InputAdornment,
} from '@mui/material';
import { tokens } from '@mitumba/tokens';
import { AuthSubmitButton } from '../../foundation/AuthSubmitButton';
import type { BuyerOnboardingPageProps } from './BuyerOnboardingPage.types';

const tfSx = { '& .MuiInputBase-root': { bgcolor: tokens.colors.surface } };

export function BuyerOnboardingPage({
  onComplete,
  loading = false,
  error,
  heroImageUrl,
  cities,
  initialData,
}: BuyerOnboardingPageProps): React.ReactElement {
  const [displayName, setDisplayName] = React.useState(initialData?.display_name ?? '');
  const [city, setCity] = React.useState(initialData?.city ?? '');
  const [phone, setPhone] = React.useState(initialData?.phone ?? '');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onComplete({ display_name: displayName, city, phone });
  };

  const panelBg = heroImageUrl
    ? `linear-gradient(135deg, ${tokens.colors.green}cc, ${tokens.colors.earth}99), url(${heroImageUrl})`
    : `linear-gradient(135deg, ${tokens.colors.green}, ${tokens.colors.earth})`;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: tokens.colors.background, p: { xs: 0, md: `${tokens.spacing.lg}px` } }}>
      <Backdrop open={loading} sx={{ zIndex: 1000, color: tokens.colors.white }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ position: 'relative', width: '100%', maxWidth: { xs: '100%', md: 900 }, height: { xs: '100vh', md: 540 }, bgcolor: tokens.colors.surface, borderRadius: { xs: 0, md: `${tokens.radius.xl}px` }, boxShadow: { xs: 'none', md: tokens.shadows.elevated }, overflow: 'hidden', display: 'flex' }}>

        {/* Hero panel — desktop only */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexShrink: 0, width: '45%', background: panelBg, backgroundSize: 'cover', backgroundPosition: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', p: `${tokens.spacing.giant}px`, color: tokens.colors.white }}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: tokens.colors.white, mb: `${tokens.spacing.lg}px` }}>
            Welcome to Mitumba
          </Typography>
          <Typography variant="body1" sx={{ color: tokens.colors.white, opacity: 0.9, mb: `${tokens.spacing.xxxl}px` }}>
            Kenya&apos;s trusted marketplace for quality secondhand fashion.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px` }}>
            {[
              'Browse thousands of verified listings',
              'Connect with trusted sellers via STI scores',
              'Secure checkout with M-Pesa integration',
            ].map((text) => (
              <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px` }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: tokens.colors.white, opacity: 0.8, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: tokens.colors.white, opacity: 0.9 }}>{text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Form panel */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto', p: { xs: `${tokens.spacing.xl}px`, md: `${tokens.spacing.giant}px` } }}>

          {/* Mobile heading */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, mb: `${tokens.spacing.xxl}px` }}>
            <Typography variant="h4" fontWeight="bold" color={tokens.colors.textPrimary} gutterBottom>
              Welcome to Mitumba
            </Typography>
            <Typography variant="body2" color={tokens.colors.textSecondary}>
              Tell us a bit about yourself to get started.
            </Typography>
          </Box>

          {/* Desktop heading */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, mb: `${tokens.spacing.xxl}px` }}>
            <Typography variant="h5" fontWeight="bold" color={tokens.colors.textPrimary} gutterBottom>
              Complete your profile
            </Typography>
            <Typography variant="body2" color={tokens.colors.textSecondary}>
              Just a few details so sellers know who they&apos;re dealing with.
            </Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: `${tokens.spacing.lg}px` }}>{error}</Alert>}

          <Box component="form" aria-label="buyer-onboarding-form" onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.lg}px` }}>
              <TextField
                sx={tfSx}
                fullWidth
                label="Display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                placeholder="e.g. Amina K."
                helperText="This is how sellers will see you"
              />

              <FormControl fullWidth required>
                <InputLabel>City</InputLabel>
                <Select
                  sx={tfSx}
                  value={city}
                  label="City"
                  onChange={(e) => setCity(e.target.value)}
                >
                  {cities.map((c) => (
                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                sx={tfSx}
                fullWidth
                label="Phone number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="712 345 678"
                helperText="For delivery updates and M-Pesa payments"
                InputProps={{
                  startAdornment: <InputAdornment position="start">+254</InputAdornment>,
                }}
              />
            </Box>

            <Box sx={{ mt: `${tokens.spacing.xxxl}px` }}>
              <AuthSubmitButton
                fullWidth
                label={loading ? 'Setting up...' : 'Continue'}
                loading={loading}
                onClick={() => handleSubmit()}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default BuyerOnboardingPage;
