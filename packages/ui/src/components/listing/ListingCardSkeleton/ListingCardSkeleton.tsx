import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { tokens } from '@mitumba/tokens'

export function ListingCardSkeleton() {
  return (
    <Box
      sx={{
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadows.card,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Image skeleton */}
      <Skeleton
        aria-label="Loading listing image"
        variant="rectangular"
        sx={{
          aspectRatio: '1 / 1',
          borderRadius: `${tokens.radius.lg}px ${tokens.radius.lg}px 0 0`,
          width: '100%',
        }}
      />

      {/* Content skeleton */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.xs,
          paddingInline: tokens.spacing.base,
          paddingBlock: tokens.spacing.base,
        }}
      >
        <Skeleton
          aria-label="Loading price"
          variant="text"
          sx={{
            fontSize: tokens.typography.fontSizes.md,
            width: '40%',
          }}
        />
        <Skeleton
          aria-label="Loading title"
          variant="text"
          sx={{
            fontSize: tokens.typography.fontSizes.base,
            width: '80%',
          }}
        />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: tokens.spacing.sm,
            mt: tokens.spacing.xs,
          }}
        >
          <Skeleton
            aria-label="Loading STI score"
            variant="rounded"
            sx={{
              borderRadius: tokens.radius.full,
              height: tokens.spacing.xl,
              width: 56,
            }}
          />
          <Skeleton
            aria-label="Loading city"
            variant="text"
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              width: '30%',
            }}
          />
        </Box>
        <Skeleton
          aria-label="Loading seller name"
          variant="text"
          sx={{
            fontSize: tokens.typography.fontSizes.sm,
            mt: tokens.spacing.xs,
            width: '50%',
          }}
        />
      </Box>
    </Box>
  )
}

export default ListingCardSkeleton
