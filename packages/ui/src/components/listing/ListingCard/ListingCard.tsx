import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import { useCallback } from 'react'
import { ConditionBadge } from '../ConditionBadge'
import type { ListingCardProps } from './ListingCard.types'

function formatPrice(priceKes: number): string {
  return `KES ${priceKes.toLocaleString('en-KE')}`
}

function stiColor(score: number): string {
  if (score >= 85) return tokens.colors.stiTrusted
  if (score >= 60) return tokens.colors.stiGood
  if (score >= 40) return tokens.colors.stiAtRisk
  if (score >= 20) return tokens.colors.stiFlagged
  return tokens.colors.stiSuspended
}

function stiLabel(score: number): string {
  if (score >= 85) return 'Trusted'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'At risk'
  if (score >= 20) return 'Flagged'
  return 'Suspended'
}

export function ListingCard({
  imageUrl,
  title,
  priceKes,
  sellerName,
  sellerSti,
  city,
  conditionGrade,
  isVaziEligible = false,
  onTap,
}: ListingCardProps) {
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
      {/* Image container */}
      <Box
        sx={{
          aspectRatio: '1 / 1',
          borderRadius: `${tokens.radius.lg}px ${tokens.radius.lg}px 0 0`,
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          loading="lazy"
          sx={{
            display: 'block',
            height: '100%',
            objectFit: 'cover',
            width: '100%',
          }}
        />

        {/* Condition badge — top-left */}
        <Box
          sx={{
            left: tokens.spacing.md,
            position: 'absolute',
            top: tokens.spacing.md,
          }}
        >
          <ConditionBadge grade={conditionGrade} />
        </Box>

        {/* VAZI badge — top-right */}
        {isVaziEligible && (
          <Box
            sx={{
              backgroundColor: tokens.colors.earth,
              borderRadius: tokens.spacing.xs,
              color: tokens.colors.textOnEarth,
              fontSize: tokens.typography.fontSizes.xs,
              fontWeight: tokens.typography.fontWeights.bold,
              lineHeight: tokens.typography.lineHeights.tight,
              paddingInline: tokens.spacing.sm,
              paddingBlock: tokens.spacing.xs,
              position: 'absolute',
              right: tokens.spacing.md,
              top: tokens.spacing.md,
              textTransform: 'uppercase',
              letterSpacing: tokens.typography.letterSpacings.wider,
            }}
            role="status"
            aria-label="VAZI eligible"
          >
            VAZI
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.xs,
          paddingInline: tokens.spacing.base,
          paddingBlock: tokens.spacing.sm,
          '&:last-child': {
            paddingBottom: tokens.spacing.base,
          },
        }}
      >
        <Typography
          sx={{
            color: tokens.colors.info,
            fontSize: tokens.typography.fontSizes.md,
            fontWeight: tokens.typography.fontWeights.semibold,
            lineHeight: tokens.typography.lineHeights.snug,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={title}
        >
          {formatPrice(priceKes)}
        </Typography>

        <Typography
          sx={{
            color: tokens.colors.textPrimary,
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.medium,
            lineHeight: tokens.typography.lineHeights.snug,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={title}
        >
          {title}
        </Typography>

        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: tokens.spacing.sm,
            mt: tokens.spacing.xs,
          }}
        >
          {/* STI chip */}
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: `${stiColor(sellerSti)}0D`,
              border: `${tokens.spacing.xs / tokens.spacing.xs}px solid ${stiColor(sellerSti)}40`,
              borderRadius: tokens.radius.full,
              color: stiColor(sellerSti),
              display: 'flex',
              fontSize: tokens.typography.fontSizes.xs,
              fontWeight: tokens.typography.fontWeights.semibold,
              gap: tokens.spacing.xs,
              lineHeight: tokens.typography.lineHeights.tight,
              minHeight: tokens.spacing.xl,
              paddingInline: tokens.spacing.sm,
            }}
            title={`STI: ${sellerSti} — ${stiLabel(sellerSti)}`}
          >
            {sellerSti >= 85 && <span>★</span>}
            <span>{sellerSti}</span>
          </Box>

          <Typography
            sx={{
              color: tokens.colors.textSecondary,
              fontSize: tokens.typography.fontSizes.sm,
              lineHeight: tokens.typography.lineHeights.normal,
            }}
          >
            {city}
          </Typography>
        </Box>

        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: tokens.spacing.sm,
            mt: tokens.spacing.xs,
          }}
        >
          <Typography
            sx={{
              color: tokens.colors.textSecondary,
              fontSize: tokens.typography.fontSizes.sm,
              lineHeight: tokens.typography.lineHeights.normal,
            }}
          >
            By {sellerName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ListingCard
