import React from 'react';
import { Box, TextField, Typography, Checkbox, FormControlLabel, Backdrop, Snackbar, Alert, Divider, IconButton, ButtonBase } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { tokens } from '@mitumba/tokens';
import { AuthPageProps } from './AuthPage.types';
import { AuthSubmitButton } from '../../foundation/AuthSubmitButton';

export function AuthPage({
  onLogin,
  onSignUp,
  onForgotPassword,
  onResetPassword,
  onSocialAuth,
  onViewChange,
  loading = false,
  error,
  success,
  info,
  warning,
  view = 'signin',
  socialProviders,
  theme = 'mitumba-light',
  illustrationUrl,
  heroImageUrl,
  footerActions,
}: AuthPageProps): React.ReactElement {
  const [currentView, setCurrentView] = React.useState<'signin' | 'signup' | 'forgot' | 'reset'>(view);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);

  React.useEffect(() => { setCurrentView(view); }, [view]);

  const handleViewChange = (newView: 'signin' | 'signup' | 'forgot' | 'reset') => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentView(newView);
      onViewChange?.(newView);
      setTimeout(() => setIsTransitioning(false), 800);
    }, 0);
  };

  const isSignUp = currentView === 'signup';
  const isForgot = currentView === 'forgot';
  const isDark = theme === 'mitumba-dark';

  const handleLoginSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    onLogin?.(email, password, remember);
  };

  const handleSignUpSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    onSignUp?.(email, password);
  };

  const handleForgotPasswordSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    onForgotPassword?.(email);
  };

  const handleResetPasswordSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    onResetPassword?.(password, confirmPassword);
  };

  const panelSx = (active: boolean) => ({
    opacity: active ? 1 : 0,
    pointerEvents: active ? 'auto' : 'none',
    transition: 'opacity 0.3s',
  } as const);

  // Gradient panel side logic — no nested ternary
  const gradientLeft = isSignUp || isForgot;
  const gradientClipPath = (() => {
    if (isTransitioning) return 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    if (gradientLeft) return 'polygon(0% 0%, 40% 0%, 55% 100%, 0% 100%)';
    return 'polygon(60% 0%, 100% 0%, 100% 100%, 45% 100%)';
  })();

  const snackbarSeverity = (() => {
    if (error) return 'error' as const;
    if (success) return 'success' as const;
    if (info) return 'info' as const;
    return 'warning' as const;
  })();

  const textColor = isDark ? tokens.colors.white : tokens.colors.textPrimary;
  const subtitleColor = isDark ? tokens.colors.divider : tokens.colors.textSecondary;

  const socialButtons = (mode: 'login' | 'signup') => (
    <>
      <Divider sx={{ my: `${tokens.spacing.lg}px`, color: subtitleColor }}>OR</Divider>
      <Box sx={{ display: 'flex', gap: `${tokens.spacing.lg}px`, justifyContent: 'center', mb: `${tokens.spacing.lg}px` }}>
        {socialProviders ? (
          socialProviders.map((provider) => (
            <IconButton
              key={provider.name}
              onClick={() => onSocialAuth?.(provider.name, mode)}
              disabled={loading}
              sx={{ border: 1, borderColor: tokens.colors.border, color: textColor, '&:hover': { borderColor: tokens.colors.green, bgcolor: tokens.colors.green, color: tokens.colors.white } }}
            >
              {provider.icon}
            </IconButton>
          ))
        ) : (
          <>
            <IconButton onClick={() => onSocialAuth?.('google', mode)} disabled={loading} sx={{ border: 1, borderColor: tokens.colors.border, '&:hover': { borderColor: tokens.colors.green, bgcolor: tokens.colors.green, color: tokens.colors.white } }}>
              <GoogleIcon />
            </IconButton>
            <IconButton onClick={() => onSocialAuth?.('github', mode)} disabled={loading} sx={{ border: 1, borderColor: tokens.colors.border, '&:hover': { borderColor: tokens.colors.green, bgcolor: tokens.colors.green, color: tokens.colors.white } }}>
              <GitHubIcon />
            </IconButton>
          </>
        )}
      </Box>
    </>
  );

  const formPadding = { xs: `${tokens.spacing.xl}px`, md: `${tokens.spacing.giant}px` };

  // Inline link-as-button style — satisfies jsx-a11y/anchor-is-valid
  const linkBtnSx = { color: tokens.colors.green, fontWeight: 'bold', cursor: 'pointer', background: 'none', border: 'none', padding: 0, font: 'inherit', textDecoration: 'underline', '&:hover': { color: tokens.colors.greenDark } };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: isDark ? tokens.colors.textPrimary : tokens.colors.background, p: `${tokens.spacing.lg}px` }}>
      <Backdrop open={loading} sx={{ zIndex: 1000, color: tokens.colors.white }} />

      <Box sx={{ position: 'relative', width: '100%', maxWidth: { xs: '100%', md: 1000 }, minHeight: { xs: '100vh', md: 600 }, height: { xs: 'auto', md: 600 }, bgcolor: isDark ? tokens.colors.textSecondary : tokens.colors.surface, borderRadius: { xs: 0, md: `${tokens.radius.xl}px` }, boxShadow: { xs: 'none', md: tokens.shadows.elevated }, overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>

        {/* Gradient panel */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: heroImageUrl ? `linear-gradient(135deg, ${tokens.colors.green}cc, ${tokens.colors.earth}99), url(${heroImageUrl})` : `linear-gradient(135deg, ${tokens.colors.green}, ${tokens.colors.earth})`, backgroundSize: 'cover', backgroundPosition: 'center', clipPath: gradientClipPath, transition: 'clip-path 0.8s cubic-bezier(0.65, 0, 0.35, 1)', flexDirection: 'column', alignItems: gradientLeft ? 'flex-start' : 'flex-end', justifyContent: 'center', color: tokens.colors.white, p: `${tokens.spacing.giant}px`, pl: gradientLeft ? `${tokens.spacing.xxxl}px` : `${tokens.spacing.giant}px`, pr: gradientLeft ? `${tokens.spacing.giant}px` : `${tokens.spacing.xxxl}px`, zIndex: 10 }}>
          <Box sx={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.3s', textAlign: 'center', maxWidth: 400 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: tokens.colors.white }}>Mitumba</Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mt: `${tokens.spacing.lg}px`, color: tokens.colors.white }}>Your ultimate marketplace for sustainable fashion.</Typography>
            {illustrationUrl && <Box component="img" src={illustrationUrl} alt="Mitumba Illustration" sx={{ mt: `${tokens.spacing.xxxl}px`, maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} />}
          </Box>
        </Box>

        {/* Sign In — left */}
        <Box sx={{ position: { xs: 'relative', md: 'absolute' }, left: { xs: 'auto', md: 0 }, top: { xs: 'auto', md: 0 }, width: { xs: '100%', md: '50%' }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: formPadding, ...panelSx(currentView === 'signin') }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color={textColor}>Sign In</Typography>
          <Typography variant="body2" sx={{ mb: `${tokens.spacing.xxxl}px`, color: subtitleColor }}>Welcome back! Please login to your account.</Typography>
          <Box component="form" aria-label="sign-in-form" onSubmit={handleLoginSubmit}>
            <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: `${tokens.spacing.md}px`, mb: `${tokens.spacing.xxl}px` }}>
              <FormControlLabel control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} color="primary" />} label={<Typography variant="body2" color={textColor}>Remember me</Typography>} />
              <ButtonBase onClick={() => handleViewChange('forgot')} sx={{ ...linkBtnSx, fontWeight: 'normal' }}>Forgot password?</ButtonBase>
            </Box>
            <AuthSubmitButton fullWidth loading={loading} label={loading ? 'Signing in...' : 'Sign In'} sx={{ py: 1.5, mb: `${tokens.spacing.lg}px` }} onClick={() => handleLoginSubmit()} />
            {(onSocialAuth || socialProviders) && socialButtons('login')}
            <Box sx={{ textAlign: 'center', mt: `${tokens.spacing.lg}px` }}>
              <Typography variant="body2" color={subtitleColor} component="span">
                {'Don\'t have an account? '}
                <ButtonBase onClick={() => handleViewChange('signup')} sx={linkBtnSx}>Sign Up</ButtonBase>
              </Typography>
            </Box>
            {footerActions && <Box sx={{ textAlign: 'center', mt: `${tokens.spacing.lg}px` }}>{footerActions}</Box>}
          </Box>
        </Box>

        {/* Sign Up — right */}
        <Box sx={{ position: { xs: 'relative', md: 'absolute' }, right: { xs: 'auto', md: 0 }, top: { xs: 'auto', md: 0 }, width: { xs: '100%', md: '50%' }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: formPadding, transitionDelay: currentView === 'signup' ? '0.3s' : '0s', ...panelSx(currentView === 'signup') }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color={textColor}>Sign Up</Typography>
          <Typography variant="body2" sx={{ mb: `${tokens.spacing.xxxl}px`, color: subtitleColor }}>Create your account to get started.</Typography>
          <Box component="form" onSubmit={handleSignUpSubmit}>
            <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
            <AuthSubmitButton fullWidth loading={loading} label={loading ? 'Creating account...' : 'Sign Up'} sx={{ py: 1.5, mt: `${tokens.spacing.xl}px`, mb: `${tokens.spacing.lg}px` }} />
            {(onSocialAuth || socialProviders) && socialButtons('signup')}
            <Box sx={{ textAlign: 'center', mt: `${tokens.spacing.lg}px` }}>
              <Typography variant="body2" color={subtitleColor} component="span">
                Already have an account?{' '}
                <ButtonBase onClick={() => handleViewChange('signin')} sx={linkBtnSx}>Sign In</ButtonBase>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Forgot Password — right */}
        <Box sx={{ position: { xs: 'relative', md: 'absolute' }, right: { xs: 'auto', md: 0 }, top: { xs: 'auto', md: 0 }, width: { xs: '100%', md: '50%' }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: formPadding, transitionDelay: currentView === 'forgot' ? '0.3s' : '0s', ...panelSx(currentView === 'forgot') }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color={textColor}>Forgot Password</Typography>
          <Typography variant="body2" sx={{ mb: `${tokens.spacing.xxxl}px`, color: subtitleColor }}>Enter your email and we&apos;ll send you a reset link.</Typography>
          <Box component="form" onSubmit={handleForgotPasswordSubmit}>
            <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" required />
            <AuthSubmitButton fullWidth loading={loading} label={loading ? 'Sending...' : 'Send Reset Link'} sx={{ py: 1.5, mt: `${tokens.spacing.xl}px`, mb: `${tokens.spacing.lg}px` }} />
            <Box sx={{ textAlign: 'center', mt: `${tokens.spacing.lg}px` }}>
              <Typography variant="body2" color={subtitleColor} component="span">
                Remember your password?{' '}
                <ButtonBase onClick={() => handleViewChange('signin')} sx={linkBtnSx}>Sign In</ButtonBase>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Reset Password — left */}
        <Box sx={{ position: { xs: 'relative', md: 'absolute' }, left: { xs: 'auto', md: 0 }, top: { xs: 'auto', md: 0 }, width: { xs: '100%', md: '50%' }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: formPadding, ...panelSx(currentView === 'reset') }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color={textColor}>Reset Password</Typography>
          <Typography variant="body2" sx={{ mb: `${tokens.spacing.xxxl}px`, color: subtitleColor }}>Enter your new password below.</Typography>
          <Box component="form" onSubmit={handleResetPasswordSubmit}>
            <TextField fullWidth label="New Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} margin="normal" required />
            <AuthSubmitButton fullWidth loading={loading} label={loading ? 'Resetting...' : 'Reset Password'} sx={{ py: 1.5, mt: `${tokens.spacing.xl}px`, mb: `${tokens.spacing.lg}px` }} />
            <Box sx={{ textAlign: 'center', mt: `${tokens.spacing.lg}px` }}>
              <Typography variant="body2" color={subtitleColor} component="span">
                Back to{' '}
                <ButtonBase onClick={() => handleViewChange('signin')} sx={linkBtnSx}>Sign In</ButtonBase>
              </Typography>
            </Box>
          </Box>
        </Box>

      </Box>

      <Snackbar open={!!(error || success || info || warning)} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbarSeverity}>
          {error || success || info || warning}
        </Alert>
      </Snackbar>
    </Box>
  );
}
