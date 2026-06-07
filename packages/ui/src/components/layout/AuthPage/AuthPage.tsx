import React from 'react';
import { Box, TextField, Typography, Checkbox, FormControlLabel, Link, Backdrop, Snackbar, Alert, Divider, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AuthPageProps } from './AuthPage.types';
import { tokens } from '@mitumba/tokens';
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton';

export const AuthPage: React.FC<AuthPageProps> = ({
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
  footerActions,
}) => {
  const [currentView, setCurrentView] = React.useState<'signin' | 'signup' | 'forgot' | 'reset'>(view);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [remember, setRemember] = React.useState(false);

  // Sync prop changes to state if needed
  React.useEffect(() => {
    setCurrentView(view);
  }, [view]);

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
  const isReset = currentView === 'reset';

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(email, password, remember);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp?.(email, password);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onForgotPassword?.(email);
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onResetPassword?.(password, confirmPassword);
  };

  const isDark = theme === 'mitumba-dark';

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: isDark ? tokens.colors.textPrimary : tokens.colors.background,
        p: `${tokens.spacing.lg}px`,
      }}
    >
      <Backdrop open={loading} sx={{ zIndex: 1000, color: tokens.colors.white }} />
      
      <Box 
        sx={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: { xs: '100%', md: 1000 }, 
          minHeight: { xs: '100vh', md: 600 },
          height: { xs: 'auto', md: 600 },
          bgcolor: isDark ? tokens.colors.textSecondary : tokens.colors.surface, 
          borderRadius: { xs: 0, md: `${tokens.radius.xl}px` }, 
          boxShadow: { xs: 'none', md: tokens.shadows.lg }, 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        
        {/* Trapezoid Gradient Panel - Hidden on mobile */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${tokens.colors.green}, ${tokens.colors.earth})`,
            clipPath: isTransitioning
              ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
              : (isSignUp || isForgot)
                ? 'polygon(0% 0%, 40% 0%, 55% 100%, 0% 100%)'
                : 'polygon(60% 0%, 100% 0%, 100% 100%, 45% 100%)',
            transition: 'clip-path 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
            flexDirection: 'column',
            alignItems: (isSignUp || isForgot) ? 'flex-start' : 'flex-end',
            justifyContent: 'center',
            color: tokens.colors.white,
            p: `${tokens.spacing.giant}px`,
            pl: (isSignUp || isForgot) ? `${tokens.spacing.xxxl}px` : `${tokens.spacing.giant}px`,
            pr: (isSignUp || isForgot) ? `${tokens.spacing.giant}px` : `${tokens.spacing.xxxl}px`,
            zIndex: 10,
          }}
        >
          <Box sx={{ 
            opacity: isTransitioning ? 0 : 1,
            transition: 'opacity 0.3s',
            textAlign: 'center',
            maxWidth: 400,
          }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: tokens.colors.white }}>
              Mitumba
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mt: `${tokens.spacing.lg}px`, color: tokens.colors.white }}>
              Your ultimate marketplace for sustainable fashion.
            </Typography>
            {illustrationUrl && (
               <Box 
                 component="img" 
                 src={illustrationUrl} 
                 alt="Mitumba Illustration" 
                 sx={{ 
                   mt: `${tokens.spacing.xxxl}px`, 
                   maxWidth: '100%', 
                   maxHeight: '200px', 
                   objectFit: 'contain' 
                 }} 
               />
            )}
          </Box>
        </Box>

        {/* Sign In Form - Left Side */}
        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            left: { xs: 'auto', md: 0 },
            top: { xs: 'auto', md: 0 },
            width: { xs: '100%', md: '50%' },
            height: '100%',
            display: currentView === 'signin' ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: `${tokens.spacing.xl}px`, md: `${tokens.spacing.giant}px` },
            opacity: currentView === 'signin' ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom color={isDark ? tokens.colors.white : tokens.colors.textPrimary}>Sign In</Typography>
          <Typography variant="body2" sx={{ mb: `${tokens.spacing.xxxl}px`, color: isDark ? tokens.colors.divider : tokens.colors.textSecondary }}>
            Welcome back! Please login to your account.
          </Typography>

          <Box component="form" onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              variant="outlined"
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: `${tokens.spacing.md}px`, mb: `${tokens.spacing.xxl}px` }}>
              <FormControlLabel
                control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} color="primary" />}
                label={<Typography variant="body2" color={isDark ? tokens.colors.white : tokens.colors.textPrimary}>Remember me</Typography>}
              />
              <Link 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleViewChange('forgot'); }} 
                variant="body2"
                sx={{ color: tokens.colors.green, '&:hover': { color: tokens.colors.greenDark } }}
              >
                Forgot password?
              </Link>
            </Box>

            <MitumbaPrimaryButton
              fullWidth
              type="submit"
              disabled={loading}
              sx={{ py: 1.5, mb: `${tokens.spacing.lg}px` }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </MitumbaPrimaryButton>

            {(onSocialAuth || socialProviders) && (
              <>
                <Divider sx={{ my: `${tokens.spacing.lg}px`, color: isDark ? tokens.colors.divider : tokens.colors.textSecondary }}>OR</Divider>

                <Box sx={{ display: 'flex', gap: `${tokens.spacing.lg}px`, justifyContent: 'center', mb: `${tokens.spacing.lg}px` }}>
                  {socialProviders ? (
                    socialProviders.map((provider) => (
                      <IconButton
                        key={provider.name}
                        onClick={() => onSocialAuth?.(provider.name, 'login')}
                        disabled={loading}
                        sx={{
                          border: 1,
                          borderColor: tokens.colors.border,
                          color: isDark ? tokens.colors.white : tokens.colors.textPrimary,
                          '&:hover': { borderColor: tokens.colors.green, bgcolor: tokens.colors.green, color: tokens.colors.white },
                        }}
                      >
                        {provider.icon}
                      </IconButton>
                    ))
                  ) : (
                    <>
                      <IconButton
                        onClick={() => onSocialAuth?.('google', 'login')}
                        disabled={loading}
                        sx={{
                          border: 1,
                          borderColor: tokens.colors.border,
                          color: isDark ? tokens.colors.white : tokens.colors.textPrimary,
                          '&:hover': { borderColor: tokens.colors.green, bgcolor: tokens.colors.green, color: tokens.colors.white },
                        }}
                      >
                        <GoogleIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => onSocialAuth?.('github', 'login')}
                        disabled={loading}
                        sx={{
                          border: 1,
                          borderColor: tokens.colors.border,
                          color: isDark ? tokens.colors.white : tokens.colors.textPrimary,
                          '&:hover': { borderColor: tokens.colors.green, bgcolor: tokens.colors.green, color: tokens.colors.white },
                        }}
                      >
                        <GitHubIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              </>
            )}

            <Box sx={{ textAlign: 'center', mt: `${tokens.spacing.lg}px` }}>
              <Typography variant="body2" color={isDark ? tokens.colors.divider : tokens.colors.textSecondary}>
                Don't have an account?{' '}
                <Link 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleViewChange('signup'); }} 
                  fontWeight="bold"
                  sx={{ color: tokens.colors.green, '&:hover': { color: tokens.colors.greenDark } }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>

            {footerActions && (
              <Box sx={{ textAlign: 'center', mt: `${tokens.spacing.lg}px` }}>
                {footerActions}
              </Box>
            )}
          </Box>
        </Box>

        {/* Sign Up Form - Right Side */}
        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            right: { xs: 'auto', md: 0 },
            top: { xs: 'auto', md: 0 },
            width: { xs: '100%', md: '50%' },
            height: '100%',
            display: currentView === 'signup' ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: `${tokens.spacing.xl}px`, md: `${tokens.spacing.giant}px` },
            opacity: currentView === 'signup' ? 1 : 0,
            transition: 'opacity 0.3s',
            transitionDelay: currentView === 'signup' ? '0.3s' : '0s',
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom color={isDark ? tokens.colors.white : tokens.colors.textPrimary}>Sign Up</Typography>
          <Typography variant="body2" sx={{ mb: `${tokens.spacing.xxxl}px`, color: isDark ? tokens.colors.divider : tokens.colors.textSecondary }}>
            Create your account to get started.
          </Typography>

          <Box component="form" onSubmit={handleSignUpSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />

            <MitumbaPrimaryButton
              fullWidth
              type="submit"
              disabled={loading}
              sx={{ py: 1.5, mt: `${tokens.spacing.xl}px`, mb: `${tokens.spacing.lg}px` }}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </MitumbaPrimaryButton>

            {(onSocialAuth || socialProviders) && (
              <>
                <Divider sx={{ my: `${tokens.spacing.lg}px`, color: isDark ? tokens.colors.divider : tokens.colors.textSecondary }}>OR</Divider>

                <Box sx={{ display: 'flex', gap: `${tokens.spacing.lg}px`, justifyContent: 'center', mb: `${tokens.spacing.lg}px` }}>
                  {socialProviders ? (
                    socialProviders.map((provider) => (
                      <IconButton
                        key={provider.name}
                        onClick={() => onSocialAuth?.(provider.name, 'signup')}
                        disabled={loading}
                        sx={{
                          border: 1,
                          borderColor: tokens.colors.border,
                          color: isDark ? tokens.colors.white : tokens.colors.textPrimary,
                          '&:hover': { borderColor: tokens.colors.green, bgcolor: tokens.colors.green, color: tokens.colors.white },
                        }}
                      >
                        {provider.icon}
                      </IconButton>
                    ))
                  ) : (
                    <>
                      <IconButton
                        onClick={() => onSocialAuth?.('google', 'signup')}
                        disabled={loading}
                        sx={{
                          border: 1,
                          borderColor: tokens.colors.border,
                          color: isDark ? tokens.colors.white : tokens.colors.textPrimary,
                          '&:hover': { borderColor: tokens.colors.green, bgcolor: tokens.colors.green, color: tokens.colors.white },
                        }}
                      >
                        <GoogleIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => onSocialAuth?.('github', 'signup')}
                        disabled={loading}
                        sx={{
                          border: 1,
                          borderColor: tokens.colors.border,
                          color: isDark ? tokens.colors.white : tokens.colors.textPrimary,
                          '&:hover': { borderColor: tokens.colors.green, bgcolor: tokens.colors.green, color: tokens.colors.white },
                        }}
                      >
                        <GitHubIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              </>
            )}

            <Box sx={{ textAlign: 'center', mt: `${tokens.spacing.lg}px` }}>
              <Typography variant="body2" color={isDark ? tokens.colors.divider : tokens.colors.textSecondary}>
                Already have an account?{' '}
                <Link 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleViewChange('signin'); }} 
                  fontWeight="bold"
                  sx={{ color: tokens.colors.green, '&:hover': { color: tokens.colors.greenDark } }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Forgot Password Form - Right Side */}
        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            right: { xs: 'auto', md: 0 },
            top: { xs: 'auto', md: 0 },
            width: { xs: '100%', md: '50%' },
            height: '100%',
            display: currentView === 'forgot' ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: `${tokens.spacing.xl}px`, md: `${tokens.spacing.giant}px` },
            opacity: currentView === 'forgot' ? 1 : 0,
            transition: 'opacity 0.3s',
            transitionDelay: currentView === 'forgot' ? '0.3s' : '0s',
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom color={isDark ? tokens.colors.white : tokens.colors.textPrimary}>Forgot Password</Typography>
          <Typography variant="body2" sx={{ mb: `${tokens.spacing.xxxl}px`, color: isDark ? tokens.colors.divider : tokens.colors.textSecondary }}>
            Enter your email and we'll send you a reset link.
          </Typography>

          <Box component="form" onSubmit={handleForgotPasswordSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />

            <MitumbaPrimaryButton
              fullWidth
              type="submit"
              disabled={loading}
              sx={{ py: 1.5, mt: `${tokens.spacing.xl}px`, mb: `${tokens.spacing.lg}px` }}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </MitumbaPrimaryButton>

            <Box sx={{ textAlign: 'center', mt: `${tokens.spacing.lg}px` }}>
              <Typography variant="body2" color={isDark ? tokens.colors.divider : tokens.colors.textSecondary}>
                Remember your password?{' '}
                <Link 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleViewChange('signin'); }} 
                  fontWeight="bold"
                  sx={{ color: tokens.colors.green, '&:hover': { color: tokens.colors.greenDark } }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Reset Password Form - Left Side */}
        <Box
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            left: { xs: 'auto', md: 0 },
            top: { xs: 'auto', md: 0 },
            width: { xs: '100%', md: '50%' },
            height: '100%',
            display: currentView === 'reset' ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: `${tokens.spacing.xl}px`, md: `${tokens.spacing.giant}px` },
            opacity: currentView === 'reset' ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom color={isDark ? tokens.colors.white : tokens.colors.textPrimary}>Reset Password</Typography>
          <Typography variant="body2" sx={{ mb: `${tokens.spacing.xxxl}px`, color: isDark ? tokens.colors.divider : tokens.colors.textSecondary }}>
            Enter your new password below.
          </Typography>

          <Box component="form" onSubmit={handleResetPasswordSubmit}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              margin="normal"
              required
            />

            <MitumbaPrimaryButton
              fullWidth
              type="submit"
              disabled={loading}
              sx={{ py: 1.5, mt: `${tokens.spacing.xl}px`, mb: `${tokens.spacing.lg}px` }}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </MitumbaPrimaryButton>

            <Box sx={{ textAlign: 'center', mt: `${tokens.spacing.lg}px` }}>
              <Typography variant="body2" color={isDark ? tokens.colors.divider : tokens.colors.textSecondary}>
                Back to{' '}
                <Link 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleViewChange('signin'); }} 
                  fontWeight="bold"
                  sx={{ color: tokens.colors.green, '&:hover': { color: tokens.colors.greenDark } }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      
      <Snackbar
        open={!!(error || success || info || warning)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={error ? 'error' : success ? 'success' : info ? 'info' : 'warning'}>
          {error || success || info || warning}
        </Alert>
      </Snackbar>
    </Box>
  );
};
