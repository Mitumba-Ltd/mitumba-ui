import React from 'react';
import {
  Box, Typography, TextField, Radio, RadioGroup, FormControlLabel,
  Chip, Slider, LinearProgress, Alert, Backdrop, CircularProgress,
  Select, MenuItem, InputLabel, FormControl, Avatar,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { tokens } from '@mitumba/tokens';
import { AuthSubmitButton } from '../../foundation/AuthSubmitButton';
import type { SellerOnboardingPageProps, SellerOnboardingData } from './SellerOnboardingPage.types';

const TOTAL_STEPS = 5; // welcome(0) identity(1) business(2) sells(3) store(4) confirm(5)

const COUNTIES = [
  'Baringo','Bomet','Bungoma','Busia','Elgeyo-Marakwet','Embu','Garissa',
  'Homa Bay','Isiolo','Kajiado','Kakamega','Kericho','Kiambu','Kilifi',
  'Kirinyaga','Kisii','Kisumu','Kitui','Kwale','Laikipia','Lamu','Machakos',
  'Makueni','Mandera','Marsabit','Meru','Migori','Mombasa','Murang\'a',
  'Nairobi','Nakuru','Nandi','Narok','Nyamira','Nyandarua','Nyeri',
  'Samburu','Siaya','Taita-Taveta','Tana River','Tharaka-Nithi','Trans Nzoia',
  'Turkana','Uasin Gishu','Vihiga','Wajir','West Pokot',
];

const CATEGORIES = [
  "Women's Wear", "Men's Wear", "Kids & Baby", 'Shoes', 'Bags & Accessories',
  'Sportswear', 'Traditional & Cultural', 'Vintage & Retro',
];

const CONDITION_LABELS: Record<string, string> = {
  A: 'Grade A — Like new',
  B: 'Grade B — Good condition',
  C: 'Grade C — Fair / visible wear',
};

// STI score calculation based on data completeness
function computeStiScore(data: Partial<SellerOnboardingData>): number {
  let score = 0;
  if (data.fullName) score += 8;
  if (data.phone) score += 10;
  if (data.idNumber) score += 12;
  if (data.profilePhotoUrl) score += 8;
  if (data.county) score += 5;
  if (data.kraPin) score += 10;
  if (data.businessDescription) score += 4;
  if (data.categories?.length) score += 5;
  if (data.conditionGrades?.length) score += 3;
  if (data.storeName) score += 8;
  if (data.storeLogoUrl) score += 4;
  if (data.storeBannerUrl) score += 3;
  // min 35 for completing all required steps
  return Math.max(score, 35);
}

const tfSx = { '& .MuiInputBase-root': { bgcolor: tokens.colors.surface } };

export function SellerOnboardingPage({
  currentStep = 0,
  onStepChange,
  onComplete,
  loading = false,
  error,
  initialData,
  theme = 'mitumba-light',
  heroImageUrl,
}: SellerOnboardingPageProps): React.ReactElement {
  const isDark = theme === 'mitumba-dark';

  const [step, setStep] = React.useState(currentStep);
  const [data, setData] = React.useState<Partial<SellerOnboardingData>>(initialData ?? {});

  React.useEffect(() => { setStep(currentStep); }, [currentStep]);

  const set = (patch: Partial<SellerOnboardingData>) =>
    setData((prev) => ({ ...prev, ...patch }));

  const advance = () => {
    const next = step + 1;
    setStep(next);
    onStepChange?.(next);
  };

  const back = () => {
    const prev = step - 1;
    setStep(prev);
    onStepChange?.(prev);
  };

  const finish = () => {
    onComplete?.(data as SellerOnboardingData);
  };

  const bgColor = isDark ? tokens.colors.textPrimary : tokens.colors.background;
  const surface = isDark ? '#2a2a2a' : tokens.colors.surface;
  const textColor = isDark ? tokens.colors.white : tokens.colors.textPrimary;
  const subtitleColor = isDark ? tokens.colors.divider : tokens.colors.textSecondary;

  const panelBg = heroImageUrl
    ? `linear-gradient(135deg, ${tokens.colors.green}cc, ${tokens.colors.earth}99), url(${heroImageUrl})`
    : `linear-gradient(135deg, ${tokens.colors.green}, ${tokens.colors.earth})`;

  const stiScore = computeStiScore(data);

  // Progress bar — only shown on steps 1-4
  const progressPct = step >= 1 && step <= 4 ? (step / TOTAL_STEPS) * 100 : 0;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 0, md: `${tokens.spacing.lg}px` } }}>
      <Backdrop open={loading} sx={{ zIndex: 1000, color: tokens.colors.white }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ position: 'relative', width: '100%', maxWidth: { xs: '100%', md: 1000 }, height: { xs: '100vh', md: 640 }, bgcolor: surface, borderRadius: { xs: 0, md: `${tokens.radius.xl}px` }, boxShadow: { xs: 'none', md: tokens.shadows.elevated }, overflow: 'hidden', display: 'flex' }}>

        {/* Side panel — desktop only */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexShrink: 0, width: '38%', background: panelBg, backgroundSize: 'cover', backgroundPosition: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', p: `${tokens.spacing.xxxl}px`, color: tokens.colors.white, zIndex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: tokens.colors.white }}>
            {step === 0 ? 'Start selling on Mitumba' : step === 5 ? 'You\'re all set!' : 'Almost there'}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, color: tokens.colors.white, mb: `${tokens.spacing.xxxl}px` }}>
            {step === 0
              ? 'Join thousands of Kenyan sellers building trusted businesses on Mitumba.'
              : step === 5
              ? 'Your store is ready. Start listing your items and grow your STI score.'
              : 'Your information builds your Seller Trust Index — the foundation of buyer confidence.'}
          </Typography>
          {step === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.lg}px` }}>
              {[
                { icon: <StorefrontIcon />, text: 'Reach buyers across Kenya' },
                { icon: <VerifiedUserIcon />, text: 'Build your STI trust score' },
                { icon: <LocalShippingIcon />, text: 'Get paid via M-Pesa' },
              ].map(({ icon, text }) => (
                <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.md}px` }}>
                  <Box sx={{ color: tokens.colors.white, opacity: 0.9 }}>{icon}</Box>
                  <Typography variant="body2" sx={{ color: tokens.colors.white }}>{text}</Typography>
                </Box>
              ))}
            </Box>
          )}
          {step >= 1 && step <= 4 && (
            <Box sx={{ width: '100%', mt: 'auto' }}>
              <Typography variant="caption" sx={{ color: tokens.colors.white, opacity: 0.8 }}>
                Step {step} of {TOTAL_STEPS}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progressPct}
                sx={{ mt: 1, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.2)', '& .MuiLinearProgress-bar': { bgcolor: tokens.colors.white } }}
              />
            </Box>
          )}
          {step === 5 && (
            <Box sx={{ mt: `${tokens.spacing.xl}px`, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: `${tokens.radius.lg}px`, p: `${tokens.spacing.xl}px` }}>
              <Typography variant="h2" fontWeight="bold" sx={{ color: tokens.colors.white }}>{stiScore}</Typography>
              <Typography variant="body2" sx={{ color: tokens.colors.white, opacity: 0.9 }}>Your starting STI score</Typography>
            </Box>
          )}
        </Box>

        {/* Main content area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', p: { xs: `${tokens.spacing.xl}px`, md: `${tokens.spacing.giant}px` } }}>

          {/* Mobile progress bar */}
          {step >= 1 && step <= 4 && (
            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: `${tokens.spacing.lg}px` }}>
              <Typography variant="caption" color={subtitleColor}>Step {step} of {TOTAL_STEPS}</Typography>
              <LinearProgress variant="determinate" value={progressPct} sx={{ mt: 0.5, borderRadius: 4, bgcolor: tokens.colors.greenLight, '& .MuiLinearProgress-bar': { bgcolor: tokens.colors.green } }} />
            </Box>
          )}

          {error && <Alert severity="error" sx={{ mb: `${tokens.spacing.lg}px` }}>{error}</Alert>}

          {/* ── Step 0: Welcome ── */}
          {step === 0 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" fontWeight="bold" color={textColor} gutterBottom>
                Start selling on Mitumba
              </Typography>
              <Typography variant="body1" color={subtitleColor} sx={{ mb: `${tokens.spacing.xxxl}px` }}>
                Set up your seller profile in 5 quick steps. Your information builds your STI (Seller Trust Index) — the score that makes buyers confident to purchase from you.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.md}px`, mb: `${tokens.spacing.xxxl}px` }}>
                {[
                  { step: 1, label: 'Your identity — name, phone, ID, location' },
                  { step: 2, label: 'Your business — type and KRA PIN' },
                  { step: 3, label: 'What you sell — categories and grades' },
                  { step: 4, label: 'Your store — name, logo, banner' },
                ].map(({ step: n, label }) => (
                  <Box key={n} sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.md}px` }}>
                    <Box sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: tokens.colors.greenLight, color: tokens.colors.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{n}</Box>
                    <Typography variant="body2" color={subtitleColor}>{label}</Typography>
                  </Box>
                ))}
              </Box>
              <AuthSubmitButton fullWidth label="Let's get started" onClick={advance} />
            </Box>
          )}

          {/* ── Step 1: Identity ── */}
          {step === 1 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" color={textColor} gutterBottom>Your identity</Typography>
              <Typography variant="body2" color={subtitleColor} sx={{ mb: `${tokens.spacing.xxl}px` }}>This information is used for KYC verification and is never shown publicly.</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.lg}px` }}>
                <TextField sx={tfSx} fullWidth label="Full name" value={data.fullName ?? ''} onChange={(e) => set({ fullName: e.target.value })} required />
                <TextField sx={tfSx} fullWidth label="Phone number (M-Pesa)" type="tel" value={data.phone ?? ''} onChange={(e) => set({ phone: e.target.value })} required placeholder="e.g. 0712 345 678" />
                <TextField sx={tfSx} fullWidth label="National ID / Passport number" value={data.idNumber ?? ''} onChange={(e) => set({ idNumber: e.target.value })} required />
                <TextField sx={tfSx} fullWidth label="Profile photo URL" value={data.profilePhotoUrl ?? ''} onChange={(e) => set({ profilePhotoUrl: e.target.value })} placeholder="Upload via your app and paste the URL" helperText="Shows on your listings and seller card" />
                <FormControl fullWidth required>
                  <InputLabel>County</InputLabel>
                  <Select sx={tfSx} value={data.county ?? ''} label="County" onChange={(e) => set({ county: e.target.value })}>
                    {COUNTIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </FormControl>
                <TextField sx={tfSx} fullWidth label="Town / area" value={data.town ?? ''} onChange={(e) => set({ town: e.target.value })} placeholder="e.g. Westlands, Kisumu CBD" />
              </Box>
            </Box>
          )}

          {/* ── Step 2: Business ── */}
          {step === 2 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" color={textColor} gutterBottom>Your business</Typography>
              <Typography variant="body2" color={subtitleColor} sx={{ mb: `${tokens.spacing.xxl}px` }}>Tell buyers who they&apos;re buying from.</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.lg}px` }}>
                <Box>
                  <Typography variant="body2" fontWeight={600} color={textColor} sx={{ mb: `${tokens.spacing.sm}px` }}>I am selling as *</Typography>
                  <RadioGroup row value={data.sellerType ?? 'individual'} onChange={(e) => set({ sellerType: e.target.value as 'individual' | 'business' })}>
                    <FormControlLabel value="individual" control={<Radio color="primary" />} label="Individual" />
                    <FormControlLabel value="business" control={<Radio color="primary" />} label="Registered business" />
                  </RadioGroup>
                </Box>
                {data.sellerType === 'business' && (
                  <TextField sx={tfSx} fullWidth label="Business / trading name" value={data.businessName ?? ''} onChange={(e) => set({ businessName: e.target.value })} required />
                )}
                <TextField
                  sx={tfSx}
                  fullWidth
                  label="KRA PIN (optional)"
                  value={data.kraPin ?? ''}
                  onChange={(e) => set({ kraPin: e.target.value })}
                  helperText="Optional — adding your KRA PIN boosts your STI score by +10 points"
                />
                <TextField
                  sx={tfSx}
                  fullWidth
                  multiline
                  rows={3}
                  label="About your business (optional)"
                  value={data.businessDescription ?? ''}
                  onChange={(e) => set({ businessDescription: e.target.value.slice(0, 300) })}
                  helperText={`${(data.businessDescription ?? '').length}/300`}
                  placeholder="e.g. We source premium secondhand clothing from Japan and Europe..."
                />
              </Box>
            </Box>
          )}

          {/* ── Step 3: What you sell ── */}
          {step === 3 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" color={textColor} gutterBottom>What you sell</Typography>
              <Typography variant="body2" color={subtitleColor} sx={{ mb: `${tokens.spacing.xxl}px` }}>Helps buyers find you. Select everything that applies.</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.xxl}px` }}>
                <Box>
                  <Typography variant="body2" fontWeight={600} color={textColor} sx={{ mb: `${tokens.spacing.md}px` }}>Categories *</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: `${tokens.spacing.sm}px` }}>
                    {CATEGORIES.map((cat) => {
                      const selected = data.categories?.includes(cat);
                      return (
                        <Chip
                          key={cat}
                          label={cat}
                          onClick={() => set({ categories: selected ? (data.categories ?? []).filter((c) => c !== cat) : [...(data.categories ?? []), cat] })}
                          color={selected ? 'primary' : 'default'}
                          variant={selected ? 'filled' : 'outlined'}
                        />
                      );
                    })}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600} color={textColor} sx={{ mb: `${tokens.spacing.md}px` }}>Condition grades you typically sell *</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.sm}px` }}>
                    {(['A', 'B', 'C'] as const).map((grade) => {
                      const selected = data.conditionGrades?.includes(grade);
                      return (
                        <Chip
                          key={grade}
                          label={CONDITION_LABELS[grade]}
                          onClick={() => set({ conditionGrades: selected ? (data.conditionGrades ?? []).filter((g) => g !== grade) : [...(data.conditionGrades ?? []), grade] })}
                          color={selected ? 'primary' : 'default'}
                          variant={selected ? 'filled' : 'outlined'}
                          sx={{ justifyContent: 'flex-start', width: 'fit-content' }}
                        />
                      );
                    })}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600} color={textColor} sx={{ mb: `${tokens.spacing.md}px` }}>Delivery method *</Typography>
                  <RadioGroup value={data.deliveryMethod ?? 'self'} onChange={(e) => set({ deliveryMethod: e.target.value as 'self' | 'mitumba-logistics' })}>
                    <FormControlLabel value="self" control={<Radio color="primary" />} label="I arrange my own delivery" />
                    <FormControlLabel value="mitumba-logistics" disabled control={<Radio />} label="Mitumba Logistics (coming soon)" />
                  </RadioGroup>
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={600} color={textColor} sx={{ mb: `${tokens.spacing.md}px` }}>
                    Typical price range (KES) — optional
                  </Typography>
                  <Slider
                    value={[data.priceRangeMin ?? 200, data.priceRangeMax ?? 5000]}
                    onChange={(_, val) => { const [min, max] = val as number[]; set({ priceRangeMin: min, priceRangeMax: max }); }}
                    min={0}
                    max={50000}
                    step={100}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => `KES ${v.toLocaleString()}`}
                    sx={{ color: tokens.colors.green }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color={subtitleColor}>KES {(data.priceRangeMin ?? 200).toLocaleString()}</Typography>
                    <Typography variant="caption" color={subtitleColor}>KES {(data.priceRangeMax ?? 5000).toLocaleString()}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* ── Step 4: Store setup ── */}
          {step === 4 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" color={textColor} gutterBottom>Your store</Typography>
              <Typography variant="body2" color={subtitleColor} sx={{ mb: `${tokens.spacing.xxl}px` }}>This is your public face on Mitumba.</Typography>
              {data.storeLogoUrl && (
                <Avatar src={data.storeLogoUrl} sx={{ width: 72, height: 72, mb: `${tokens.spacing.xl}px`, border: `2px solid ${tokens.colors.green}` }} />
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.lg}px` }}>
                <TextField sx={tfSx} fullWidth label="Store name *" value={data.storeName ?? ''} onChange={(e) => set({ storeName: e.target.value })} required placeholder="e.g. NairobiKicks" />
                <TextField
                  sx={tfSx}
                  fullWidth
                  label="Store tagline (optional)"
                  value={data.storeTagline ?? ''}
                  onChange={(e) => set({ storeTagline: e.target.value.slice(0, 60) })}
                  helperText={`${(data.storeTagline ?? '').length}/60`}
                  placeholder='e.g. "Premium thrift in Nairobi"'
                />
                <TextField sx={tfSx} fullWidth label="Store logo URL (optional)" value={data.storeLogoUrl ?? ''} onChange={(e) => set({ storeLogoUrl: e.target.value })} helperText="Square image — shown on your seller card" />
                <TextField sx={tfSx} fullWidth label="Store banner URL (optional)" value={data.storeBannerUrl ?? ''} onChange={(e) => set({ storeBannerUrl: e.target.value })} helperText="Wide image — shown on your seller profile page" />
              </Box>
            </Box>
          )}

          {/* ── Step 5: Confirmation ── */}
          {step === 5 && (
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <CheckCircleIcon sx={{ fontSize: 72, color: tokens.colors.green, mb: `${tokens.spacing.xl}px` }} />
              <Typography variant="h4" fontWeight="bold" color={textColor} gutterBottom>You&apos;re all set!</Typography>
              <Typography variant="body1" color={subtitleColor} sx={{ mb: `${tokens.spacing.xxxl}px` }}>
                Your seller profile is ready. Here&apos;s your starting STI score:
              </Typography>
              <Box sx={{ bgcolor: tokens.colors.greenLight, borderRadius: `${tokens.radius.xl}px`, p: `${tokens.spacing.xxxl}px`, mb: `${tokens.spacing.xxxl}px`, width: '100%', maxWidth: 280 }}>
                <Typography variant="h2" fontWeight="bold" color={tokens.colors.green}>{stiScore}</Typography>
                <Typography variant="body2" color={tokens.colors.green} fontWeight={600}>/ 100 — Starting STI Score</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.sm}px`, mb: `${tokens.spacing.xxxl}px`, width: '100%', maxWidth: 320, textAlign: 'left' }}>
                {[
                  { label: 'Identity verified', pts: 38, done: !!(data.fullName && data.phone && data.idNumber) },
                  { label: 'Profile photo added', pts: 8, done: !!data.profilePhotoUrl },
                  { label: 'KRA PIN provided', pts: 10, done: !!data.kraPin },
                  { label: 'Store set up', pts: 8, done: !!data.storeName },
                  { label: 'Logo uploaded', pts: 4, done: !!data.storeLogoUrl },
                  { label: 'Banner uploaded', pts: 3, done: !!data.storeBannerUrl },
                ].map(({ label, pts, done }) => (
                  <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.sm}px` }}>
                      <CheckCircleIcon sx={{ fontSize: 16, color: done ? tokens.colors.green : tokens.colors.border }} />
                      <Typography variant="body2" color={done ? textColor : subtitleColor}>{label}</Typography>
                    </Box>
                    <Typography variant="caption" color={done ? tokens.colors.green : subtitleColor} fontWeight={600}>+{pts} pts</Typography>
                  </Box>
                ))}
              </Box>
              <AuthSubmitButton fullWidth label="Start listing my items →" onClick={finish} loading={loading} />
            </Box>
          )}

          {/* Navigation buttons */}
          {step > 0 && step < 5 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: `${tokens.spacing.xxxl}px`, pt: `${tokens.spacing.xl}px`, borderTop: `1px solid ${tokens.colors.border}` }}>
              <AuthSubmitButton label="Back" onClick={back} />
              <AuthSubmitButton
                label={step === 4 ? 'Finish setup' : 'Continue'}
                onClick={advance}
                loading={loading}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default SellerOnboardingPage;
