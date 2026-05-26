import React, { useState, useCallback, useEffect } from 'react'
import Box from '@mui/material/Box'
import { tokens } from '@mitumba/tokens'
import type { ListingImageGalleryProps } from './ListingImageGallery.types'

/**
 * Premium Listing Image Gallery.
 * Engineered for absolute geometric harmony and high-fidelity transitions.
 * Reigned in for professional visual sanity (Very Serious standard).
 */
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
          borderRadius: `${tokens.radius.lg}px`,
          color: tokens.colors.textSecondary,
          display: 'flex',
          fontSize: tokens.typography.fontSizes.base,
          justifyContent: 'center',
          width: '100%',
          border: `1px dashed ${tokens.colors.divider}`,
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
          borderRadius: `${tokens.radius.lg}px`,
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          backgroundColor: tokens.colors.background,
          boxShadow: `
            0 2px 4px 0 rgba(0, 0, 0, 0.05),
            0 8px 16px -4px rgba(0, 0, 0, 0.1)
          `,
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
            transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </Box>

      {/* Thumbnails */}
      {images.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            overflowX: 'auto',
            paddingBlock: 0.5,
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
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
                border: index === activeIndex ? `2px solid ${tokens.colors.green}` : `2px solid transparent`,
                borderRadius: `${tokens.radius.md}px`,
                cursor: 'pointer',
                flexShrink: 0,
                height: 56,
                overflow: 'hidden',
                opacity: index === activeIndex ? 1 : 0.6,
                transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                width: 56,
                '&:hover': {
                  opacity: 1,
                  transform: 'translateY(-2px)',
                },
                '&:focus-visible': {
                  outline: 'none',
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
