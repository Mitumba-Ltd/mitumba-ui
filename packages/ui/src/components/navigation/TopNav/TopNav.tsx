import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Toolbar from '@mui/material/Toolbar'
import { tokens } from '@mitumba/tokens'
import { MitumbaAvatar } from '../../foundation/MitumbaAvatar'
import type { TopNavProps } from './TopNav.types'

export function TopNav({
  onLogoClick,
  onSearchSubmit,
  searchValue = '',
  onSearchChange,
  isAuthenticated = false,
  user,
  onAuthClick,
  onProfileClick,
  cartCount = 0,
  onCartClick,
}: TopNavProps) {
  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.appBar }}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          gap: tokens.spacing.base,
          py: tokens.spacing.md,
        }}
      >
        {/* Logo */}
        <Box
          onClick={onLogoClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onLogoClick?.()
            }
          }}
          role="button"
          sx={{ cursor: onLogoClick ? 'pointer' : 'default', minWidth: 'fit-content' }}
          tabIndex={onLogoClick ? 0 : -1}
        >
          <Box
            sx={{
              backgroundColor: tokens.colors.green,
              borderRadius: tokens.radius.sm,
              color: tokens.colors.white,
              fontWeight: tokens.typography.fontWeights.bold,
              px: tokens.spacing.base,
              py: tokens.spacing.sm,
              textAlign: 'center',
            }}
          >
            Mitumba
          </Box>
        </Box>

        {/* Search */}
        <Box
          sx={{
            backgroundColor: tokens.colors.background,
            borderRadius: tokens.radius.lg,
            flex: 1,
            maxWidth: 400,
            px: tokens.spacing.base,
            py: tokens.spacing.sm,
          }}
        >
          <InputBase
            fullWidth
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearchSubmit?.(searchValue)
              }
            }}
            placeholder="Search..."
            size="small"
            value={searchValue}
          />
        </Box>

        {/* Actions */}
        <Box sx={{ alignItems: 'center', display: 'flex', gap: tokens.spacing.md }}>
          {onCartClick && (
            <IconButton onClick={onCartClick} sx={{ position: 'relative' }}>
              🛒
              {cartCount > 0 && (
                <Box
                  sx={{
                    backgroundColor: tokens.colors.earth,
                    borderRadius: tokens.radius.full,
                    color: tokens.colors.white,
                    fontSize: tokens.typography.fontSizes.xs,
                    height: 16,
                    lineHeight: '16px',
                    position: 'absolute',
                    right: -4,
                    textAlign: 'center',
                    top: -4,
                    width: 16,
                  }}
                >
                  {cartCount}
                </Box>
              )}
            </IconButton>
          )}

          {isAuthenticated && user ? (
            <Box onClick={onProfileClick} sx={{ cursor: 'pointer' }}>
              <MitumbaAvatar imageUrl={user.avatarUrl} name={user.name} size="sm" />
            </Box>
          ) : (
            onAuthClick && (
              <Box
                onClick={onAuthClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onAuthClick()
                  }
                }}
                role="button"
                sx={{ cursor: 'pointer' }}
                tabIndex={0}
              >
                Login
              </Box>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopNav
