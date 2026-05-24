import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { tokens } from '@mitumba/tokens'

const SKELETON_IMAGE_KEYS = ['image-1', 'image-2', 'image-3', 'image-4'] as const

export function VAZIOutfitCardSkeleton() {
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
      {/* Header skeleton */}
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: tokens.spacing.sm,
          paddingInline: tokens.spacing.base,
          paddingBlock: tokens.spacing.base,
        }}
      >
        <Skeleton
          aria-label="Loading VAZI label"
          variant="rounded"
          sx={{
            borderRadius: tokens.radius.sm,
            height: tokens.spacing.lg,
            width: 48,
          }}
        />
        <Skeleton
          aria-label="Loading outfit name"
          variant="text"
          sx={{
            flex: 1,
            fontSize: tokens.typography.fontSizes.base,
          }}
        />
      </Box>

      {/* Image row skeleton */}
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
        {SKELETON_IMAGE_KEYS.map((imgKey) => (
          <Box
            key={imgKey}
            sx={{
              flexShrink: 0,
              width: `${(3 / 4) * 100}px`,
              minWidth: '88px',
            }}
          >
            <Skeleton
              aria-label={`Loading item image ${imgKey.split('-')[1]}`}
              variant="rounded"
              sx={{
                aspectRatio: '3 / 4',
                borderRadius: tokens.radius.md,
                width: '100%',
              }}
            />
            <Skeleton
              aria-label={`Loading seller name ${imgKey.split('-')[1]}`}
              variant="text"
              sx={{
                fontSize: tokens.typography.fontSizes.xs,
                marginTop: tokens.spacing.xs,
                width: '80%',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Content skeleton */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: tokens.spacing.sm,
          paddingInline: tokens.spacing.base,
          paddingBlock: tokens.spacing.base,
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: tokens.spacing.sm,
            justifyContent: 'space-between',
          }}
        >
          <Skeleton
            aria-label="Loading total price"
            variant="text"
            sx={{
              fontSize: tokens.typography.fontSizes.lg,
              width: '40%',
            }}
          />
          <Skeleton
            aria-label="Loading buy button"
            variant="rounded"
            sx={{
              borderRadius: tokens.radius.md,
              height: '36px',
              width: 100,
            }}
          />
        </Box>
        <Skeleton
          aria-label="Loading seller info"
          variant="text"
          sx={{
            fontSize: tokens.typography.fontSizes.sm,
            width: '60%',
          }}
        />
      </Box>
    </Box>
  )
}

export default VAZIOutfitCardSkeleton
