import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import { VAZIOutfitCard } from '../VAZIOutfitCard'
import { VAZIOutfitCardSkeleton } from '../VAZIOutfitCardSkeleton'
import type { CompleteThisLookPanelProps } from './CompleteThisLookPanel.types'

export function CompleteThisLookPanel({ outfits, loading = false }: CompleteThisLookPanelProps) {
  if (!loading && outfits.length === 0) {
    return null
  }

  const renderOutfitCards = () =>
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
    ['skel-0', 'skel-1', 'skel-2'].map((skelKey) => (
      <Box
        key={skelKey}
        sx={{
          flexShrink: 0,
          width: { xs: '82%', md: '100%' },
          maxWidth: { xs: '340px', md: 'none' },
        }}
      >
        <VAZIOutfitCardSkeleton />
      </Box>
    ))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.base,
        width: '100%',
      }}
    >
      <Typography
        component="h2"
        sx={{
          color: tokens.colors.textPrimary,
          fontSize: tokens.typography.fontSizes.xl,
          fontWeight: tokens.typography.fontWeights.bold,
          lineHeight: tokens.typography.lineHeights.snug,
          margin: 0,
        }}
      >
        Complete this look
      </Typography>

      <Box
        sx={{
          display: { xs: 'flex', md: 'grid' },
          gridTemplateColumns: { md: 'repeat(3, 1fr)' },
          gap: tokens.spacing.base,
          overflowX: { xs: 'auto', md: 'visible' },
          paddingBottom: { xs: tokens.spacing.sm, md: 0 },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {loading ? renderSkeletons() : renderOutfitCards()}
      </Box>
    </Box>
  )
}

export default CompleteThisLookPanel
