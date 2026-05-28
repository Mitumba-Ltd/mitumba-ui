import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { tokens } from '@mitumba/tokens'
import { MitumbaGrid } from '../../layout/MitumbaGrid'
import { VAZIOutfitCard } from '../VAZIOutfitCard'
import { VAZIOutfitCardSkeleton } from '../VAZIOutfitCardSkeleton'
import type { VAZIFeedSectionProps } from './VAZIFeedSection.types'

/**
 * Extraordinary "Pinterest-Level" VAZI Feed Section.
 * Engineered for high-fidelity curation display with systematic grid logic.
 */
export function VAZIFeedSection({ outfits, loading = false, onSeeAll }: VAZIFeedSectionProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: '100%',
      }}
    >
      {/* Premium Section Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingInline: { xs: 2, md: 0 },
        }}
      >
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AutoAwesomeIcon sx={{ fontSize: 18, color: tokens.colors.earth }} />
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 900,
                color: tokens.colors.earth,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              AI Curation
            </Typography>
          </Stack>
          <Typography
            component="h2"
            sx={{
              color: tokens.colors.textPrimary,
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.fontSizes.xxl,
              fontWeight: 900,
              lineHeight: 1,
              margin: 0,
            }}
          >
            VAZI Picks for You
          </Typography>
        </Stack>

        {onSeeAll && (
          <Box
            onClick={onSeeAll}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: tokens.colors.earth,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                gap: 1.5,
                color: tokens.colors.earthDark,
              }
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Explore All
            </Typography>
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        )}
      </Box>

      {/* Extraordinary Grid Logic */}
      <MitumbaGrid columns={{ xs: 1, sm: 2, md: 3, lg: 3 }} gap={3}>
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <VAZIOutfitCardSkeleton key={`vazi-skeleton-${i + 1}`} />
          ))
        ) : (
          outfits.map((outfit) => (
            <VAZIOutfitCard
              key={outfit.outfitName}
              outfitName={outfit.outfitName}
              items={outfit.items}
              totalPriceKes={outfit.totalPriceKes}
              sellersCount={outfit.sellersCount}
              isMultiCity={outfit.isMultiCity}
              onTap={outfit.onTap}
              onBuyAll={outfit.onBuyAll}
            />
          ))
        )}
      </MitumbaGrid>
    </Box>
  )
}

export default VAZIFeedSection
