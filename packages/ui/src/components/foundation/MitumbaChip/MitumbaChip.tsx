import React, { useMemo } from 'react'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircleIcon from '@mui/icons-material/Circle'
import type { SxProps, Theme } from '@mui/material/styles'
import { tokens } from '@mitumba/tokens'
import type { MitumbaChipProps, ChipStatus } from './MitumbaChip.types'

/**
 * Premium "Living" Chip primitive with tactile interaction and precision geometry.
 * Fulfills the "Badges and Chips" design benchmark with systematic status-aware styling.
 */
export function MitumbaChip({
  label,
  onClick,
  onDelete,
  selected,
  disabled = false,
  icon,
  avatar,
  badge,
  variant = 'outline',
  status = 'default',
  rounding = 'rounded',
  size = 'medium',
  color: propColor,
  sx,
}: MitumbaChipProps) {
  const isClickable = !!onClick || !!onDelete

  // Status mapping to benchmark rules
  const statusConfig = useMemo(() => {
    const config: Record<ChipStatus, { color: string; bgColor: string; borderColor: string; icon?: React.ReactNode }> = {
      default: { color: tokens.colors.textSecondary, bgColor: 'transparent', borderColor: tokens.colors.divider },
      active: { color: tokens.colors.info, bgColor: `${tokens.colors.info}10`, borderColor: tokens.colors.info, icon: <CircleIcon sx={{ fontSize: 6 }} /> },
      incomplete: { color: tokens.colors.warning, bgColor: `${tokens.colors.warning}10`, borderColor: tokens.colors.warning },
      danger: { color: tokens.colors.error, bgColor: `${tokens.colors.error}10`, borderColor: tokens.colors.error },
      success: { color: tokens.colors.green, bgColor: `${tokens.colors.green}10`, borderColor: tokens.colors.green },
      common: { color: tokens.colors.textPrimary, bgColor: 'transparent', borderColor: tokens.colors.divider },
      special: { color: tokens.colors.white, bgColor: tokens.colors.earth, borderColor: 'transparent' },
    }
    return config[status]
  }, [status])

  const activeColor = propColor ? (tokens.colors[propColor as keyof typeof tokens.colors] || propColor) : statusConfig.color
  
  // Style derivation logic (Eliminating nested ternaries for lint)
  let activeBg = 'transparent'
  if (variant === 'solid') {
    activeBg = activeColor
  } else if (variant === 'soft') {
    activeBg = `${activeColor}15`
  }
  
  if (selected) {
    activeBg = activeColor
  }

  // Border logic (Fix: no-nested-ternary)
  let activeBorder = 'transparent'
  if (variant === 'outline' && !selected) {
    activeBorder = propColor ? activeColor : statusConfig.borderColor
  }

  // Radius derivation
  let borderRadius: string | number = `${tokens.radius.md}px`
  if (rounding === 'pill') {
    borderRadius = tokens.radius.full
  } else if (rounding === 'square') {
    borderRadius = `${tokens.radius.xs}px`
  }

  const styles: SxProps<Theme> = useMemo(() => ({
    height: size === 'small' ? 22 : 28,
    borderRadius,
    backgroundColor: activeBg,
    color: (variant === 'solid' || selected) ? tokens.colors.white : activeColor,
    border: activeBorder !== 'transparent' ? `1.5px solid ${activeBorder}` : 'none',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    fontFamily: tokens.typography.fontFamily,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    
    '& .MuiChip-label': {
      px: 1.2,
      fontSize: size === 'small' ? 9 : 10,
    },
    
    '&:hover': isClickable && !disabled ? {
      transform: 'translateY(-1px)',
      boxShadow: tokens.shadows.card,
      backgroundColor: (variant === 'solid' || selected) ? activeColor : `${activeColor}20`,
    } : {},
    
    '&:active': isClickable && !disabled ? {
      transform: 'scale(0.96)',
    } : {},

    '& .MuiChip-deleteIcon': {
      fontSize: 14,
      color: 'inherit',
      opacity: 0.7,
      '&:hover': { opacity: 1 },
    },

    '& .MuiChip-icon': {
      marginLeft: '6px !important',
      marginRight: '-4px !important',
      color: 'inherit',
    }
  }), [size, borderRadius, variant, selected, activeBg, activeColor, activeBorder, isClickable, disabled])

  const displayIcon = icon || statusConfig.icon

  return (
    <Chip
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          {label}
          {badge !== undefined && (
            <Typography variant="caption" sx={{ fontSize: 9, fontWeight: 900, ml: 0.5, opacity: 0.8 }}>
              {badge}
            </Typography>
          )}
        </Box>
      }
      onClick={onClick}
      onDelete={onDelete}
      disabled={disabled}
      icon={displayIcon as React.ReactElement}
      avatar={avatar}
      sx={[styles, ...(Array.isArray(sx) ? sx : [sx])]}
      // Role logic: Use 'button' for interactive chips, 'status' for informative ones.
      role={isClickable ? 'button' : 'status'}
    />
  )
}

export default MitumbaChip
