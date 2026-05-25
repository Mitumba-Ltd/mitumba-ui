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
  const isClickable = Boolean(onClick)

  const colorConfig = {
    green: {
      main: tokens.colors.green,
      light: tokens.colors.greenLight,
      dark: tokens.colors.greenDark,
      text: tokens.colors.textOnGreen,
    },
    earth: {
      main: tokens.colors.earth,
      light: tokens.colors.earthLight,
      dark: tokens.colors.earthDark,
      text: tokens.colors.textOnEarth,
    },
    neutral: {
      main: tokens.colors.border,
      light: tokens.colors.background,
      dark: tokens.colors.divider,
      text: tokens.colors.textSecondary,
    },
  }

  const activeColor = colorConfig[color]

  const getSx = () => {
    const isFilled = variant === 'filled'
    
    return {
      borderRadius: tokens.radius.full,
      fontWeight: tokens.typography.fontWeights.semibold,
      fontFamily: tokens.typography.fontFamily,
      fontSize: size === 'small' ? tokens.typography.fontSizes.xs : tokens.typography.fontSizes.sm,
      height: size === 'small' ? '24px' : '32px',
      transition: 'all 200ms ease',
      cursor: isClickable ? 'pointer' : 'default',
      border: variant === 'outlined' ? `1px solid ${activeColor.main}` : 'none',
      backgroundColor: isFilled ? activeColor.main : 'transparent',
      color: isFilled ? activeColor.text : activeColor.main,
      
      ...(color === 'neutral' && {
        backgroundColor: isFilled ? tokens.colors.background : 'transparent',
        color: tokens.colors.textSecondary,
        borderColor: tokens.colors.border,
      }),

      '& .MuiChip-label': {
        paddingInline: tokens.spacing.sm,
      },

      '& .MuiChip-deleteIcon': {
        color: isFilled ? activeColor.text : activeColor.main,
        fontSize: size === 'small' ? 14 : 18,
        opacity: 0.7,
        '&:hover': {
          opacity: 1,
          color: isFilled ? activeColor.text : activeColor.main,
        },
      },

      ...(isClickable && {
        '&:hover': {
          backgroundColor: isFilled ? activeColor.dark : activeColor.light,
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      }),

      '&:focus-visible': {
        outline: `2px solid ${tokens.colors.greenLight}`,
        outlineOffset: '1px',
      },
    }
  }

  return (
    <Chip
      label={label}
      variant={variant}
      size={size}
      onDelete={onDelete}
      onClick={onClick}
      sx={getSx()}
      tabIndex={isClickable ? 0 : -1}
    />
  )
}

export default MitumbaChip
