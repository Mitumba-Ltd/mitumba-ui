import Chip from '@mui/material/Chip'
import { tokens } from '@mitumba/tokens'
import type { MitumbaChipProps } from './MitumbaChip.types'

export function MitumbaChip({
  label,
  variant = 'filled',
  color = 'green',
  onDelete,
  onClick,
  size = 'medium',
}: MitumbaChipProps) {
  const getColor = (): 'default' | 'primary' | 'secondary' => {
    switch (color) {
      case 'green':
        return 'primary'
      case 'earth':
        return 'secondary'
      case 'neutral':
      default:
        return 'default'
    }
  }

  const getSx = () => {
    const baseSx = {
      borderRadius: tokens.radius.full,
      fontWeight: tokens.typography.fontWeights.semibold,
      fontSize:
        size === 'small'
          ? tokens.typography.fontSizes.sm
          : tokens.typography.fontSizes.base,
      height:
        size === 'small'
          ? tokens.spacing.xl
          : tokens.spacing.xxl,
      px: tokens.spacing.md,
      cursor: onClick ? 'pointer' : 'default',
      '&:focus-visible': {
        outline: `${tokens.spacing.xs}px solid transparent`,
        boxShadow: tokens.shadows.focus,
      },
    }

    if (color === 'neutral') {
      return {
        ...baseSx,
        bgcolor:
          variant === 'outlined' ? 'transparent' : tokens.colors.background,
        color: tokens.colors.textSecondary,
        borderColor: tokens.colors.border,
        '&:hover': onClick
          ? {
              bgcolor:
                variant === 'outlined'
                  ? tokens.colors.background
                  : tokens.colors.divider,
            }
          : undefined,
      }
    }

    return baseSx
  }

  return (
    <Chip
      label={label}
      color={getColor()}
      variant={variant}
      size={size}
      onDelete={onDelete}
      onClick={onClick}
      sx={getSx()}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? 'button' : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    />
  )
}

export default MitumbaChip
