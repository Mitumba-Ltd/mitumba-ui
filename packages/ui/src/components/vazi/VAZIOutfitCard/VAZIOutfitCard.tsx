import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import { useCallback } from 'react'
import type { VAZIOutfitCardProps } from './VAZIOutfitCard.types'

function formatPrice(priceKes: number): string {
  return `KES ${priceKes.toLocaleString('en-KE')}`
}

export function VAZIOutfitCard({
  outfitName,
  items,
  totalPriceKes,
  sellersCount,
  isMultiCity = false,
  onTap,
  onBuyAll,
}: VAZIOutfitCardProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onTap?.()
      }
    },
    [onTap],
  )

  return (
    <Card
      onClick={onTap}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={onTap ? 0 : -1}
      sx={{
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadows.card,
        cursor: onTap ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        width: '100%',
        '&:hover': onTap
          ? {
              transform: 'translateY(-2px)',
              boxShadow: tokens.shadows.elevated,
            }
          : undefined,
        '&:focus-visible': {
          outline: `${tokens.spacing.xs}px solid transparent`,
          boxShadow: tokens.shadows.focus,
        },
      }}
    >
      {/* Header: VAZI label + outfit name */}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: tokens.spacing.sm,
          paddingInline: tokens.spacing.base,
          paddingBlock: tokens.spacing.base,
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: tokens.colors.earth,
            borderRadius: tokens.radius.sm,
            color: tokens.colors.textOnEarth,
            display: 'flex',
            fontSize: tokens.typography.fontSizes.xs,
            fontWeight: tokens.typography.fontWeights.bold,
            lineHeight: tokens.typography.lineHeights.tight,
            paddingInline: tokens.spacing.sm,
            paddingBlock: tokens.spacing.xs,
            textTransform: 'uppercase',
            letterSpacing: tokens.typography.letterSpacings.wider,
          }}
          role="status"
          aria-label="VAZI outfit"
        >
          VAZI
        </Box>
        <Typography
          sx={{
            color: tokens.colors.textPrimary,
            flex: 1,
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.semibold,
            lineHeight: tokens.typography.lineHeights.snug,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={outfitName}
        >
          {outfitName}
        </Typography>
      </Box>

      {/* Horizontal scroll of item images (3:4 aspect ratio each) */}
      <Box
        sx={{
          display: 'flex',
          gap: tokens.spacing.sm,
          overflowX: 'auto',
          paddingInline: tokens.spacing.base,
          paddingBottom: tokens.spacing.base,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {items.map((item) => (
          <Box
            key={item.listingId}
            sx={{
              flexShrink: 0,
              width: `${(3 / 4) * 100}px`,
              minWidth: '88px',
            }}
          >
            <Box
              sx={{
                aspectRatio: '3 / 4',
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <Box
                component="img"
                src={item.imageUrl}
                alt={`${item.garmentType} — ${item.sellerName}`}
                loading="lazy"
                sx={{
                  display: 'block',
                  height: '100%',
                  objectFit: 'cover',
                  width: '100%',
                }}
              />
            </Box>
            <Typography
              sx={{
                color: tokens.colors.textSecondary,
                fontSize: tokens.typography.fontSizes.xs,
                fontWeight: tokens.typography.fontWeights.medium,
                lineHeight: tokens.typography.lineHeights.tight,
                marginTop: tokens.spacing.xs,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={item.sellerName}
            >
              {item.sellerName}
            </Typography>
          </Box>
        ))}
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.sm,
          paddingInline: tokens.spacing.base,
          paddingBlock: tokens.spacing.sm,
          '&:last-child': {
            paddingBottom: tokens.spacing.base,
          },
        }}
      >
        {/* Total price + Buy button row */}
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: tokens.spacing.sm,
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              color: tokens.colors.earth,
              fontSize: tokens.typography.fontSizes.lg,
              fontWeight: tokens.typography.fontWeights.bold,
              lineHeight: tokens.typography.lineHeights.snug,
            }}
          >
            {formatPrice(totalPriceKes)}
          </Typography>

          {onBuyAll && (
            <Box
              component="button"
              onClick={(e) => {
                e.stopPropagation()
                onBuyAll()
              }}
              sx={{
                alignItems: 'center',
                backgroundColor: tokens.colors.earth,
                border: 'none',
                borderRadius: tokens.radius.md,
                color: tokens.colors.textOnEarth,
                cursor: 'pointer',
                display: 'flex',
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.fontSizes.sm,
                fontWeight: tokens.typography.fontWeights.bold,
                lineHeight: tokens.typography.lineHeights.normal,
                minHeight: '36px',
                paddingInline: tokens.spacing.base,
                paddingBlock: tokens.spacing.sm,
                transition: 'background-color 200ms ease',
                whiteSpace: 'nowrap',
                '&:hover': {
                  backgroundColor: tokens.colors.earthDark,
                },
                '&:focus-visible': {
                  outline: `${tokens.spacing.xs}px solid transparent`,
                  boxShadow: tokens.shadows.focus,
                },
              }}
            >
              Buy this look
            </Box>
          )}
        </Box>

        {/* Ships from N sellers badge */}
        {sellersCount > 1 && (
          <Typography
            sx={{
              color: tokens.colors.textSecondary,
              fontSize: tokens.typography.fontSizes.sm,
              lineHeight: tokens.typography.lineHeights.normal,
            }}
          >
            Ships from {sellersCount} sellers{sellersCount > 1 && isMultiCity ? ' · Multi-city' : ''}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default VAZIOutfitCard
