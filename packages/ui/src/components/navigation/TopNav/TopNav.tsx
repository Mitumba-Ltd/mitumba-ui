import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { tokens } from '@mitumba/tokens'
import { MitumbaAvatar } from '../../foundation/MitumbaAvatar'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import { MitumbaSearchBar } from '../../forms/MitumbaSearchBar'
import type { TopNavProps } from './TopNav.types'

/**
 * Premium "Living" TopNav primitive.
 * Fulfills high-end navigation benchmarks with customizable layouts and tactile feedback.
 */
export function TopNav({
  announcement,
  logo,
  links = [],
  actions,
  cta,
  sticky = true,
  transparent = false,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
  user,
  isAuthenticated = false,
  onLogoClick,
  onAuthClick,
  onProfileClick,
  onCartClick,
  cartCount = 0,
  sx,
}: TopNavProps) {
  return (
    <AppBar
      position={sticky ? 'sticky' : 'static'}
      elevation={0}
      sx={[
        {
          backgroundColor: transparent ? 'transparent' : tokens.colors.surface,
          borderBottom: transparent ? 'none' : `1px solid ${tokens.colors.divider}`,
          color: tokens.colors.textPrimary,
          zIndex: (theme) => theme.zIndex.appBar,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Announcement Bar */}
      {announcement && (
        <Box
          sx={{
            backgroundColor: tokens.colors.green,
            color: tokens.colors.white,
            py: 1,
            px: 2,
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 700,
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          {announcement}
        </Box>
      )}

      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: { xs: 64, md: 80 },
          px: { xs: 2, md: 4, lg: 6 },
          gap: 4,
        }}
      >
        {/* Logo Section */}
        <Box
          onClick={onLogoClick}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          {logo || (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                color: tokens.colors.green,
                letterSpacing: '-0.02em',
                fontFamily: tokens.typography.fontFamily,
              }}
            >
              MITUMBA
            </Typography>
          )}
        </Box>

        {/* Navigation Links (Desktop) */}
        <Stack
          direction="row"
          spacing={4}
          sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center' }}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              sx={{
                color: link.active ? tokens.colors.green : tokens.colors.textSecondary,
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 14,
                fontFamily: tokens.typography.fontFamily,
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: tokens.colors.green,
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Stack>

        {/* Search (Tablet/Desktop) */}
        {onSearchSubmit && (
          <Box sx={{ display: { xs: 'none', lg: 'block' }, width: 300 }}>
            <MitumbaSearchBar
              value={searchValue}
              onChange={onSearchChange || (() => {})}
              onSubmit={onSearchSubmit}
              placeholder="Search listings..."
            />
          </Box>
        )}

        {/* Actions Section */}
        <Stack direction="row" spacing={1} alignItems="center">
          {actions}
          
          <IconButton onClick={onCartClick} sx={{ color: tokens.colors.textPrimary }}>
            <Badge badgeContent={cartCount} color="error" sx={{ '& .MuiBadge-badge': { fontWeight: 800, fontSize: 10 } }}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {isAuthenticated && user ? (
            <Box onClick={onProfileClick} sx={{ cursor: 'pointer', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(1.05)' } }}>
              <MitumbaAvatar name={user.name} size="sm" imageUrl={user.avatarUrl} />
            </Box>
          ) : (
            <MitumbaPrimaryButton 
              label="Sign In" 
              variant="ghost" 
              onClick={onAuthClick || (() => {})} 
              size="small" 
              sx={{ fontWeight: 800 }}
            />
          )}

          {cta && (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {cta}
            </Box>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default TopNav
