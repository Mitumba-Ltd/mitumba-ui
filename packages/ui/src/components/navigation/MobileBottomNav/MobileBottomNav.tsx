import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import PersonIcon from '@mui/icons-material/Person'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import type { SxProps, Theme } from '@mui/material/styles'
import { tokens } from '@mitumba/tokens'
import type { MobileBottomNavProps, MobileBottomNavItem } from './MobileBottomNav.types'

const DEFAULT_ITEMS: MobileBottomNavItem[] = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'search', label: 'Search', icon: <SearchIcon /> },
  { id: 'vazi', label: 'VAZI', icon: <AutoAwesomeIcon /> },
  { id: 'orders', label: 'Orders', icon: <LocalMallIcon /> },
  { id: 'profile', label: 'Profile', icon: <PersonIcon /> },
]

/**
 * Premium "Living" Mobile Bottom Navigation.
 * Fulfills high-end benchmark standards with 5+ visual archetypes and tactile physics.
 */
export function MobileBottomNav({
  activeTab,
  onTabChange,
  variant = 'm3',
  items = DEFAULT_ITEMS,
  sx,
}: MobileBottomNavProps) {
  return (
    <Box
      sx={[
        {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          backgroundColor: tokens.colors.surface,
          borderTop: `1px solid ${tokens.colors.divider}`,
          boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          px: 2,
          zIndex: (theme) => theme.zIndex.appBar,
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {items.map((item) => {
        const isActive = activeTab === item.id

        // Style Mapping based on Benchmark Variants
        const getStyles = (): SxProps<Theme> => {
          if (variant === 'm3') {
            return {
              flexDirection: 'column',
              gap: 0.5,
              '& .icon-wrapper': {
                width: 64,
                height: 32,
                borderRadius: tokens.radius.full,
                backgroundColor: isActive ? `${tokens.colors.green}20` : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                color: isActive ? tokens.colors.green : tokens.colors.textSecondary,
              },
              '& .label': {
                fontSize: 10,
                fontWeight: isActive ? 800 : 600,
                color: isActive ? tokens.colors.green : tokens.colors.textSecondary,
              }
            }
          }
          if (variant === 'expansive') {
            return {
              flexDirection: 'column',
              backgroundColor: isActive ? tokens.colors.green : 'transparent',
              borderRadius: `${tokens.radius.md}px`,
              py: 1,
              px: 2,
              minWidth: 70,
              transition: 'all 0.3s ease',
              color: isActive ? tokens.colors.white : tokens.colors.textSecondary,
              '& .icon-wrapper': {
                fontSize: 24,
                mb: 0.2,
              },
              '& .label': {
                fontSize: 10,
                fontWeight: 700,
              }
            }
          }
          if (variant === 'indicator') {
            return {
              flexDirection: 'column',
              position: 'relative',
              color: isActive ? tokens.colors.green : tokens.colors.textSecondary,
              '& .label': {
                fontSize: 11,
                fontWeight: 700,
                mt: 0.5,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '25%',
                width: isActive ? '50%' : 0,
                height: 3,
                backgroundColor: tokens.colors.green,
                borderRadius: '3px 3px 0 0',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }
            }
          }
          if (variant === 'pill') {
            return {
              flexDirection: 'row',
              gap: 1,
              px: isActive ? 2 : 1,
              py: 1,
              borderRadius: tokens.radius.full,
              backgroundColor: isActive ? tokens.colors.green : 'transparent',
              color: isActive ? tokens.colors.white : tokens.colors.textSecondary,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '& .label': {
                display: isActive ? 'block' : 'none',
                fontSize: 12,
                fontWeight: 800,
              }
            }
          }
          if (variant === 'standalone') {
            return {
              flexDirection: 'row',
              gap: 1,
              px: 2,
              py: 1.2,
              borderRadius: tokens.radius.full,
              border: isActive ? `1.5px solid ${tokens.colors.green}` : '1.5px solid transparent',
              color: isActive ? tokens.colors.green : tokens.colors.textSecondary,
              backgroundColor: isActive ? `${tokens.colors.green}10` : 'transparent',
              transition: 'all 0.3s ease',
              '& .label': {
                display: isActive ? 'block' : 'none',
                fontSize: 12,
                fontWeight: 800,
              }
            }
          }
          return {}
        }

        return (
          <Box
            key={item.id}
            onClick={() => onTabChange(item.id)}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              height: '100%',
              userSelect: 'none',
              ...getStyles(),
              '&:active': { transform: 'scale(0.92)' },
            }}
          >
            <Box className="icon-wrapper" sx={{ display: 'flex' }}>
              {isActive && item.activeIcon ? item.activeIcon : item.icon}
            </Box>
            <Typography className="label" sx={{ fontFamily: tokens.typography.fontFamily }}>
              {item.label}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export default MobileBottomNav
