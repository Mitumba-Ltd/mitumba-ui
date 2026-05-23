import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import { useState, useCallback, useEffect } from 'react'
import type { ListingImageGalleryProps } from './ListingImageGallery.types'

export function ListingImageGallery({ images, title }: ListingImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(images.length - 1, index))
      setActiveIndex(clamped)
    },
    [images.length],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goTo(activeIndex - 1)
      } else if (e.key === 'ArrowRight') {
        goTo(activeIndex + 1)
      }
    },
    [activeIndex, goTo],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  if (images.length === 0) {
    return (
      <Box
        sx={{
          alignItems: 'center',
          aspectRatio: '1 / 1',
          backgroundColor: tokens.colors.background,
          borderRadius: tokens.radius.lg,
          color: tokens.colors.textSecondary,
          display: 'flex',
          fontSize: tokens.typography.fontSizes.base,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        No images available
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacing.base,
        width: '100%',
      }}
    >
      {/* Primary image */}
      <Box
        sx={{
          aspectRatio: '1 / 1',
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <Box
          component="img"
          src={images[activeIndex]}
          alt={`${title} — image ${activeIndex + 1} of ${images.length}`}
          sx={{
            display: 'block',
            height: '100%',
            objectFit: 'cover',
            width: '100%',
          }}
        />
      </Box>

      {/* Thumbnails — only shown when there are multiple images */}
      {images.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: tokens.spacing.sm,
            overflowX: 'auto',
            paddingBlock: tokens.spacing.xs,
          }}
        >
          {images.map((img, index) => (
            <Box
              key={img}
              onClick={() => goTo(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  goTo(index)
                }
              }}
              role="button"
              tabIndex={0}
              sx={{
                border:
                  index === activeIndex
                    ? `${tokens.spacing.xs / tokens.spacing.xs}px solid ${tokens.colors.green}`
                    : `${tokens.spacing.xs / tokens.spacing.xs}px solid transparent`,
                borderRadius: tokens.radius.md,
                cursor: 'pointer',
                flexShrink: 0,
                height: 64,
                overflow: 'hidden',
                opacity: index === activeIndex ? 1 : 0.7,
                transition: 'all 200ms ease',
                width: 64,
                '&:hover': {
                  opacity: 1,
                },
                '&:focus-visible': {
                  outline: `${tokens.spacing.xs}px solid transparent`,
                  boxShadow: tokens.shadows.focus,
                },
              }}
              aria-label={`View image ${index + 1} of ${images.length}`}
              aria-pressed={index === activeIndex}
            >
              <Box
                component="img"
                src={img}
                alt={`${title} thumbnail ${index + 1}`}
                sx={{
                  display: 'block',
                  height: '100%',
                  objectFit: 'cover',
                  width: '100%',
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default ListingImageGallery
