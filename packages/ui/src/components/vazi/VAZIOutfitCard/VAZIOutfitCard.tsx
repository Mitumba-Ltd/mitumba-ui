import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import { useCallback } from 'react'
import { VAZIBadge } from '../VAZIBadge'
import { PriceTag } from '../../commerce/PriceTag'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'
import type { VAZIOutfitCardProps } from './VAZIOutfitCard.types'

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
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        width: '100%',
        backgroundColor: tokens.colors.surface,
        border: `1px solid ${tokens.colors.divider}`,
        '&:hover': onTap
          ? {
              transform: 'translateY(-4px)',
              boxShadow: tokens.shadows.elevated,
              borderColor: tokens.colors.earthLight,
            }
          : undefined,
        '&:focus-visible': {
          outline: `2px solid ${tokens.colors.earthLight}`,
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
          borderBottom: `1px solid ${tokens.colors.background}`,
        }}
      >
        <VAZIBadge size="small" />
        <Typography
          sx={{
            color: tokens.colors.textPrimary,
            flex: 1,
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.bold,
            lineHeight: tokens.typography.lineHeights.snug,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
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
          padding: tokens.spacing.base,
          backgroundColor: tokens.colors.background,
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
              width: '88px',
            }}
          >
            <Box
              sx={{
                aspectRatio: '3 / 4',
                borderRadius: tokens.radius.sm,
                overflow: 'hidden',
                width: '100%',
                backgroundColor: tokens.colors.surface,
                border: `1px solid ${tokens.colors.divider}`,
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
                fontSize: 10,
                fontWeight: tokens.typography.fontWeights.semibold,
                textTransform: 'uppercase',
                letterSpacing: tokens.typography.letterSpacings.wide,
                marginTop: tokens.spacing.xs,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
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
          padding: tokens.spacing.base,
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
          <PriceTag priceKes={totalPriceKes} size="large" color="earth" />

          {onBuyAll && (
            <Box sx={{ flexShrink: 0 }}>
              <MitumbaPrimaryButton
                label="Buy all"
                variant="earth"
                size="small"
                fullWidth={false}
                onClick={(e: React.MouseEvent) => {
                  if (e && e.stopPropagation) {
                    e.stopPropagation()
                  }
                  onBuyAll()
                }}
              />
            </Box>
          )}
        </Box>

        {/* Ships from N sellers badge */}
        {sellersCount > 1 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: tokens.spacing.xs,
              mt: tokens.spacing.xs,
            }}
          >
            <Typography
              sx={{
                color: tokens.colors.textSecondary,
                fontSize: tokens.typography.fontSizes.sm,
                lineHeight: 1,
              }}
            >
              Ships from {sellersCount} sellers
            </Typography>
            {isMultiCity && (
              <Box
                component="span"
                sx={{
                  fontSize: tokens.typography.fontSizes.xs,
                  color: tokens.colors.textDisabled,
                }}
              >
                •
              </Box>
            )}
            {isMultiCity && (
              <Typography
                sx={{
                  color: tokens.colors.earth,
                  fontSize: tokens.typography.fontSizes.xs,
                  fontWeight: tokens.typography.fontWeights.bold,
                  textTransform: 'uppercase',
                  letterSpacing: tokens.typography.letterSpacings.wide,
                  lineHeight: 1,
                }}
              >
                Multi-city
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default VAZIOutfitCard
