import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import { VAZIOutfitCard } from '../VAZIOutfitCard'
import { VAZIOutfitCardSkeleton } from '../VAZIOutfitCardSkeleton'
import type { VAZIFeedSectionProps } from './VAZIFeedSection.types'

const renderOutfitCards = (outfits: VAZIFeedSectionProps['outfits']) =>
  outfits.map((outfit) => (
    <Box
      key={outfit.outfitName}
      sx={{
        flexShrink: 0,
        width: { xs: '82%', md: '100%' },
        maxWidth: { xs: '340px', md: 'none' },
      }}
    >
      <VAZIOutfitCard
        outfitName={outfit.outfitName}
        items={outfit.items}
        totalPriceKes={outfit.totalPriceKes}
        sellersCount={outfit.sellersCount}
        isMultiCity={outfit.isMultiCity}
        onTap={outfit.onTap}
        onBuyAll={outfit.onBuyAll}
      />
    </Box>
  ))

const renderSkeletons = () =>
  Array.from({ length: 3 }, (_, skeletonIdx) => (
    <Box
      key={`skeleton-${skeletonIdx}`}
      sx={{
        flexShrink: 0,
        width: { xs: '82%', md: '100%' },
        maxWidth: { xs: '340px', md: 'none' },
      }}
    >
      <VAZIOutfitCardSkeleton />
    </Box>
  ))

export function VAZIFeedSection({ outfits, loading = false, onSeeAll }: VAZIFeedSectionProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.base,
        width: '100%',
      }}
    >
      {/* Section header */}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          paddingInline: { xs: tokens.spacing.base, md: 0 },
        }}
      >
        <Box
          component="h2"
          sx={{
            color: tokens.colors.textPrimary,
            fontFamily: tokens.typography.fontFamily,
            fontSize: tokens.typography.fontSizes.xl,
            fontWeight: tokens.typography.fontWeights.bold,
            lineHeight: tokens.typography.lineHeights.snug,
            margin: 0,
          }}
        >
          VAZI Picks
        </Box>
        {onSeeAll && (
          <Box
            component="button"
            onClick={onSeeAll}
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
              color: tokens.colors.earth,
              cursor: 'pointer',
              fontFamily: tokens.typography.fontFamily,
              fontSize: tokens.typography.fontSizes.base,
              fontWeight: tokens.typography.fontWeights.semibold,
              lineHeight: tokens.typography.lineHeights.normal,
              padding: 0,
              textDecoration: 'none',
              transition: 'color 200ms ease',
              whiteSpace: 'nowrap',
              '&:hover': {
                color: tokens.colors.earthDark,
                textDecoration: 'underline',
              },
              '&:focus-visible': {
                outline: `${tokens.spacing.xs}px solid transparent`,
                boxShadow: tokens.shadows.focus,
                borderRadius: tokens.radius.sm,
              },
            }}
          >
            See all
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: { xs: 'flex', md: 'grid' },
          gridTemplateColumns: { md: 'repeat(3, 1fr)' },
          gap: tokens.spacing.base,
          overflowX: { xs: 'auto', md: 'visible' },
          paddingInline: { xs: tokens.spacing.base, md: 0 },
          paddingBottom: { xs: tokens.spacing.sm, md: 0 },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {loading ? renderSkeletons() : renderOutfitCards(outfits)}
      </Box>
    </Box>
  )
}

export default VAZIFeedSection
