import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import { useCallback } from 'react'
import { ConditionBadge } from '../ConditionBadge'
import { PriceTag } from '../../commerce/PriceTag'
import { VAZIBadge } from '../../vazi/VAZIBadge'
import { STIScoreChip } from '../../seller/STIScoreChip'
import type { ListingCardProps } from './ListingCard.types'

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
        transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        width: '100%',
        backgroundColor: tokens.colors.surface,
        border: `1px solid ${tokens.colors.divider}`,
        '&:hover': onTap
          ? {
              transform: 'translateY(-4px)',
              boxShadow: tokens.shadows.elevated,
              borderColor: tokens.colors.border,
            }
          : undefined,
        '&:focus-visible': {
          outline: `2px solid ${tokens.colors.greenLight}`,
          boxShadow: tokens.shadows.focus,
        },
      }}
    >
      {/* Image container */}
      <Box
        sx={{
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          backgroundColor: tokens.colors.background,
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
            transition: 'transform 500ms ease',
            '.MuiCard-root:hover &': {
              transform: 'scale(1.05)',
            },
          }}
        />

        {/* Condition badge — top-left */}
        <Box
          sx={{
            left: tokens.spacing.sm,
            position: 'absolute',
            top: tokens.spacing.sm,
            zIndex: 1,
          }}
        >
          <ConditionBadge grade={conditionGrade} />
        </Box>

        {/* VAZI badge — top-right */}
        {isVaziEligible && (
          <Box
            sx={{
              position: 'absolute',
              right: tokens.spacing.sm,
              top: tokens.spacing.sm,
              zIndex: 1,
            }}
          >
            <VAZIBadge size="small" />
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.xs,
          padding: tokens.spacing.base,
          flexGrow: 1,
          '&:last-child': {
            paddingBottom: tokens.spacing.base,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <PriceTag priceKes={priceKes} size="medium" color="green" />
        </Box>

        <Typography
          sx={{
            color: tokens.colors.textPrimary,
            fontSize: tokens.typography.fontSizes.base,
            fontWeight: tokens.typography.fontWeights.medium,
            lineHeight: tokens.typography.lineHeights.snug,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.7em',
            marginBlock: tokens.spacing.xs,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            mt: 'auto',
            pt: tokens.spacing.sm,
            borderTop: `1px solid ${tokens.colors.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                color: tokens.colors.textPrimary,
                fontSize: tokens.typography.fontSizes.sm,
                fontWeight: tokens.typography.fontWeights.semibold,
                lineHeight: 1,
              }}
            >
              {sellerName}
            </Typography>
            <Typography
              sx={{
                color: tokens.colors.textSecondary,
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: tokens.typography.letterSpacings.wide,
                mt: '2px',
              }}
            >
              {city}
            </Typography>
          </Box>

          <STIScoreChip score={sellerSti} compact />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ListingCard
