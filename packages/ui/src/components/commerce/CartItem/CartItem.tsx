import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { tokens } from '@mitumba/tokens'
import type { CartItemProps } from './CartItem.types'
import { PriceTag } from '../PriceTag'

export function CartItem({ imageUrl, title, priceKes, conditionGrade, sellerName, onRemove }: CartItemProps) {
  const getGradeLabel = (): string => {
    if (conditionGrade === 'A') return 'Like new'
    if (conditionGrade === 'B') return 'Good'
    return 'Fair'
  }

  const getGradeColor = (): string => {
    if (conditionGrade === 'A') return tokens.colors.success
    if (conditionGrade === 'B') return tokens.colors.info
    return tokens.colors.warning
  }

  const gradeLabel = getGradeLabel()
  const gradeColor = getGradeColor()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: tokens.spacing.base,
        p: tokens.spacing.base,
        borderRadius: tokens.radius.lg,
        bgcolor: tokens.colors.surface,
        boxShadow: tokens.shadows.card,
        border: `1px solid ${tokens.colors.divider}`,
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          flexShrink: 0,
          bgcolor: tokens.colors.background,
          position: 'relative',
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: tokens.typography.fontWeights.semibold,
            fontSize: tokens.typography.fontSizes.base,
            color: tokens.colors.textPrimary,
            lineHeight: tokens.typography.lineHeights.tight,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm, mt: tokens.spacing.xs }}>
          <PriceTag priceKes={priceKes} size="small" color="default" />
          <Box
            sx={{
              px: tokens.spacing.sm,
              py: tokens.spacing.xs,
              borderRadius: tokens.radius.full,
              bgcolor: `${gradeColor}14`,
              color: gradeColor,
              fontSize: tokens.typography.fontSizes.xs,
              fontWeight: tokens.typography.fontWeights.semibold,
            }}
          >
            {gradeLabel}
          </Box>
        </Box>
        <Typography
          variant="caption"
          sx={{ color: tokens.colors.textSecondary, fontSize: tokens.typography.fontSizes.sm, mt: tokens.spacing.xs }}
        >
          Sold by {sellerName}
        </Typography>
      </Box>
      {onRemove && (
        <IconButton
          onClick={onRemove}
          aria-label={`Remove ${title} from cart`}
          sx={{
            color: tokens.colors.textSecondary,
            '&:hover': { color: tokens.colors.error },
            p: tokens.spacing.sm,
            mt: tokens.spacing.xs,
          }}
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  )
}

export default CartItem
