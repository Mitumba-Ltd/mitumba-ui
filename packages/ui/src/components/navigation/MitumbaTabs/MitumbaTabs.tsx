import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { MitumbaTabsProps } from './MitumbaTabs.types'

/**
 * Premium "Living" Tabs primitive with tactile transitions.
 * Fulfills high-end navigation standards with Primary (Solid) and Secondary (Underline) variants.
 */
export function MitumbaTabs({
  value,
  onChange,
  tabs,
  variant = 'primary',
  sx,
}: MitumbaTabsProps) {
  const isPrimary = variant === 'primary'

  return (
    <Box sx={[{ width: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Tabs
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: 44,
          '& .MuiTabs-indicator': {
            display: isPrimary ? 'none' : 'block',
            backgroundColor: tokens.colors.green,
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
          '& .MuiTabs-flexContainer': {
            gap: isPrimary ? 1 : 4,
          }
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            icon={tab.icon as React.ReactElement}
            iconPosition="start"
            disabled={tab.disabled}
            disableRipple
            sx={{
              minHeight: 44,
              textTransform: 'none',
              fontWeight: 700,
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.fontSizes.base,
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              borderRadius: isPrimary ? `${tokens.radius.md}px` : 0,
              color: tokens.colors.textSecondary,
              px: isPrimary ? 3 : 1,
              
              '&:hover': {
                color: tokens.colors.textPrimary,
                transform: 'translateY(-1px)',
              },
              
              '&.Mui-selected': {
                color: isPrimary ? tokens.colors.white : tokens.colors.green,
                backgroundColor: isPrimary ? tokens.colors.green : 'transparent',
                boxShadow: isPrimary ? tokens.shadows.card : 'none',
              },

              '&.Mui-disabled': {
                opacity: 0.4,
              },

              // Icon styling
              '& .MuiTab-iconWrapper': {
                marginRight: '8px !important',
                fontSize: 20,
              }
            }}
          />
        ))}
      </Tabs>
    </Box>
  )
}

export default MitumbaTabs
