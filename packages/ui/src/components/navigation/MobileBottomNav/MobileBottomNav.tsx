import { useState } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { MobileBottomNavProps } from './MobileBottomNav.types'

const validTabs: MobileBottomNavProps['activeTab'][] = ['home', 'search', 'vazi', 'orders', 'profile']

const tabs = [
  { key: 'home', label: 'Home', icon: '🏠' },
  { key: 'search', label: 'Search', icon: '🔍' },
  { key: 'vazi', label: 'VAZI', icon: '✨' },
  { key: 'orders', label: 'Orders', icon: '📦' },
  { key: 'profile', label: 'Profile', icon: '👤' },
]

export function MobileBottomNav({ activeTab, onTabChange, vaziDotActive = false }: MobileBottomNavProps) {
  const [val, setVal] = useState(activeTab)

  return (
    <Box
      sx={{
        boxShadow: tokens.shadows.bottomSheet,
        bottom: 0,
        left: 0,
        position: 'fixed',
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <BottomNavigation
        showLabels
        value={val}
        onChange={(_, newValue) => {
          const tab = newValue as (typeof validTabs)[number]
          setVal(tab)
          onTabChange(tab)
        }}
        sx={{
          '& .MuiBottomNavigationAction-root': {
            color: tokens.colors.textSecondary,
            minWidth: 'auto',
            py: tokens.spacing.sm,
          },
          '& .Mui-selected': {
            color: tokens.colors.green,
          },
          backgroundColor: tokens.colors.surface,
        }}
      >
        {tabs.map((tab) => (
          <BottomNavigationAction
            key={tab.key}
            icon={
              <Box sx={{ position: 'relative' }}>
                <span role="img" aria-label={tab.label}>
                  {tab.icon}
                </span>
                {tab.key === 'vazi' && vaziDotActive && (
                  <Box
                    sx={{
                      backgroundColor: tokens.colors.earth,
                      borderRadius: tokens.radius.full,
                      height: 8,
                      position: 'absolute',
                      right: -6,
                      top: -2,
                      width: 8,
                    }}
                  />
                )}
              </Box>
            }
            label={tab.label}
            sx={{ color: val === tab.key ? tokens.colors.green : tokens.colors.textSecondary }}
            value={tab.key}
          />
        ))}
      </BottomNavigation>
    </Box>
  )
}

export default MobileBottomNav
