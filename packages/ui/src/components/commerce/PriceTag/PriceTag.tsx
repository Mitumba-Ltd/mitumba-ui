import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { PriceTagProps } from './PriceTag.types'

export function PriceTag({ priceKes, size = 'medium', color = 'default', strikethrough = false }: PriceTagProps) {
  const formattedNumber = new Intl.NumberFormat('en-KE').format(priceKes)
  const formatted = `KES ${formattedNumber}`

  const sizeStyles = {
    small: {
      fontSize: tokens.typography.fontSizes.sm,
      fontWeight: tokens.typography.fontWeights.semibold,
    },
    medium: {
      fontSize: tokens.typography.fontSizes.base,
      fontWeight: tokens.typography.fontWeights.bold,
    },
    large: {
      fontSize: tokens.typography.fontSizes.xl,
      fontWeight: tokens.typography.fontWeights.extrabold,
    },
  } as const

  const colorMap = {
    green: tokens.colors.green,
    earth: tokens.colors.earth,
    default: tokens.colors.textPrimary,
  } as const

  return (
    <Typography
      component="span"
      sx={{
        ...sizeStyles[size],
        color: colorMap[color],
        textDecoration: strikethrough ? 'line-through' : 'none',
        opacity: strikethrough ? 0.7 : 1,
        textDecorationColor: strikethrough ? colorMap[color] : undefined,
      }}
      aria-label={`Price: ${formatted}`}
    >
      {formatted}
    </Typography>
  )
}

export default PriceTag
