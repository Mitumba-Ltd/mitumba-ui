import React, { useMemo } from 'react'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { SxProps, Theme } from '@mui/material/styles'
import { tokens } from '@mitumba/tokens'
import type { MitumbaChipProps } from './MitumbaChip.types'

/**
 * Premium "Living" Chip primitive with tactile interaction and precision geometry.
 * Fulfills the versatile design benchmark with multiple shapes, states, and elevations.
 */
export function MitumbaChip({
  label,
  onClick,
  onDelete,
  selected = false,
  disabled = false,
  icon,
  avatar,
  badge,
  variant = 'solid',
  rounding = 'pill',
  elevation = 'flat',
  size = 'medium',
  color = 'primary',
  sx,
}: MitumbaChipProps) {
  const isClickable = !!onClick || !!onDelete
  const isDisabled = disabled

  // Logic for systematic color derived from tokens
  const isPrimary = color === 'primary'
  const colorKey = isPrimary ? 'green' : color
  const mainColor = tokens.colors[colorKey as keyof typeof tokens.colors]
  const darkColor = tokens.colors[`${colorKey}Dark` as keyof typeof tokens.colors] || mainColor

  // Base Styles (Pill, Scale, Physics)
  const baseStyles: SxProps<Theme> = useMemo(() => {
    // Geometry Mapping
    const radiusMap = {
      pill: tokens.radius.full,
      rounded: tokens.radius.md,
      square: tokens.radius.xs,
    }

    // Elevation Mapping
    const shadowMap = {
      flat: 'none',
      tiny: tokens.shadows.card,
      elevated: tokens.shadows.elevated,
    }

    return {
      height: size === 'small' ? 24 : 32,
      borderRadius: `${radiusMap[rounding]}px`,
      boxShadow: shadowMap[elevation],
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontWeight: tokens.typography.fontWeights.semibold,
      fontFamily: tokens.typography.fontFamily,
      border: 'none',
      bgcolor: isPrimary ? tokens.colors.green : mainColor,
      color: tokens.colors.white,
      
      '&:hover': isClickable && !isDisabled ? {
        transform: 'translateY(-1px)',
        boxShadow: tokens.shadows.card,
        bgcolor: isPrimary ? tokens.colors.greenDark : darkColor,
      } : {},
      
      '&:active': isClickable && !isDisabled ? {
        transform: 'scale(0.96)',
      } : {},

      '& .MuiChip-label': {
        px: 1.5,
        fontSize: size === 'small' ? tokens.typography.fontSizes.xs : tokens.typography.fontSizes.sm,
      },
      
      '& .MuiChip-deleteIcon': {
        fontSize: 16,
        color: 'inherit',
        opacity: 0.7,
        '&:hover': { opacity: 1 },
      },
    }
  }, [size, rounding, elevation, isPrimary, mainColor, darkColor, isClickable, isDisabled])

  // Variant Specific Overrides
  const variantStyles: SxProps<Theme> = useMemo(() => {
    if (variant === 'outline') {
      return {
        border: `2px solid ${tokens.colors.border}`,
        bgcolor: 'transparent',
        color: tokens.colors.textPrimary,
        '&:hover': {
          borderColor: mainColor,
          color: mainColor,
          bgcolor: 'transparent',
        },
      }
    }
    if (variant === 'shaded') {
      return {
        bgcolor: `${mainColor}20`,
        color: darkColor,
        '&:hover': {
          bgcolor: `${mainColor}30`,
        },
      }
    }
    if (variant === 'dashed') {
      return {
        border: `2px dashed ${tokens.colors.border}`,
        bgcolor: 'transparent',
        color: tokens.colors.textSecondary,
        '&:hover': {
          borderColor: mainColor,
          color: mainColor,
          bgcolor: 'transparent',
        },
      }
    }
    return {}
  }, [variant, mainColor, darkColor])

  // Selection Overlay
  const selectedStyles: SxProps<Theme> = useMemo(() => (selected ? {
    bgcolor: mainColor,
    color: tokens.colors.white,
    boxShadow: tokens.shadows.focus,
  } : {}), [selected, mainColor])

  return (
    <Chip
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {label}
          {badge !== undefined && (
            <Box
              sx={{
                minWidth: 16,
                height: 16,
                borderRadius: tokens.radius.full,
                bgcolor: selected ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 0.5,
              }}
            >
              <Typography variant="caption" sx={{ fontSize: 10, fontWeight: 'bold', color: 'inherit' }}>
                {badge}
              </Typography>
            </Box>
          )}
        </Box>
      }
      onClick={onClick}
      onDelete={onDelete}
      disabled={isDisabled}
      icon={icon}
      avatar={avatar ? (
        <Box sx={{ ml: '4px !important', display: 'flex', alignItems: 'center' }}>
          {avatar}
        </Box>
      ) as React.ReactElement : undefined}
      sx={[baseStyles, variantStyles, selectedStyles, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  )
}

export default MitumbaChip
