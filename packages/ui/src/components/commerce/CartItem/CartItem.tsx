import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { tokens } from '@mitumba/tokens'
import type { CartItemProps } from './CartItem.types'
import { PriceTag } from '../PriceTag'
import { ConditionBadge } from '../../listing/ConditionBadge'

export function CartItem({ imageUrl, title, priceKes, conditionGrade, sellerName, onRemove }: CartItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacing.base,
        p: tokens.spacing.sm,
        borderRadius: tokens.radius.lg,
        bgcolor: tokens.colors.surface,
        boxShadow: tokens.shadows.card,
        border: `1px solid ${tokens.colors.divider}`,
        transition: 'all 200ms ease',
        '&:hover': {
          borderColor: tokens.colors.border,
          boxShadow: tokens.shadows.elevated,
        },
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          flexShrink: 0,
          bgcolor: tokens.colors.background,
          border: `1px solid ${tokens.colors.divider}`,
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontWeight: tokens.typography.fontWeights.semibold,
            fontSize: tokens.typography.fontSizes.base,
            color: tokens.colors.textPrimary,
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm, mt: '2px' }}>
          <PriceTag priceKes={priceKes} size="small" color="green" />
          <ConditionBadge grade={conditionGrade} showLabel />
        </Box>
        <Typography
          sx={{
            color: tokens.colors.textSecondary,
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: tokens.typography.letterSpacings.wide,
            mt: '4px',
          }}
        >
          Sold by {sellerName}
        </Typography>
      </Box>
      {onRemove && (
        <IconButton
          onClick={onRemove}
          aria-label={`Remove ${title} from cart`}
          sx={{
            color: tokens.colors.textDisabled,
            '&:hover': { 
              color: tokens.colors.error,
              backgroundColor: tokens.colors.errorLight,
            },
            transition: 'all 200ms ease',
          }}
          size="small"
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      )}
    </Box>
  )
}

export default CartItem
