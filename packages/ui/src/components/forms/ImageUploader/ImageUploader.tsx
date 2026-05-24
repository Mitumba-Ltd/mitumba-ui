import { useRef, useCallback } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { tokens } from '@mitumba/tokens'
import type { ImageUploaderProps } from './ImageUploader.types'

/**
 * Drag-and-drop image uploader with reorder and cover photo support.
 */
export function ImageUploader({
  images,
  onAdd,
  onRemove,
  onReorder,
  maxImages = 6,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? [])
      if (files.length > 0) {
        onAdd(files)
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      }
    },
    [onAdd]
  )

   const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const files: File[] = e.dataTransfer ? Array.from(e.dataTransfer.files) : []
      if (files.length > 0) {
        onAdd(files)
      }
    },
    [onAdd]
  )

  const handleDragStart = (index: number) => {
    dragItem.current = index
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    dragOverItem.current = index
  }

  const handleDragEnd = useCallback(() => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const [draggedItem] = images.splice(dragItem.current, 1)
      images.splice(dragOverItem.current, 0, draggedItem)
      onReorder(images.map((img) => img.id))
    }
    dragItem.current = null
    dragOverItem.current = null
  }, [images, onReorder])

  const canAdd = images.length < maxImages

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: tokens.spacing.base,
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {images.map((image, index) => (
        <Box
          key={image.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          sx={{
            position: 'relative',
            aspectRatio: '1 / 1',
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            border: `${tokens.spacing.xs / tokens.spacing.xs}px solid ${image.isPrimary ? tokens.colors.green : tokens.colors.border}`,
            cursor: 'grab',
            '&:hover .remove-btn': {
              opacity: 1,
            },
          }}
        >
           {/* Next.js image handling with legacy img tag */}
           <img
              src={image.url}
              alt={`Upload preview ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
           {image.isPrimary && (
            <Box
              sx={{
                position: 'absolute',
                top: 4,
                left: 4,
                backgroundColor: tokens.colors.green,
                color: tokens.colors.white,
                fontSize: tokens.typography.fontSizes.xs,
                fontWeight: tokens.typography.fontWeights.bold,
                paddingInline: tokens.spacing.sm,
                paddingBlock: tokens.spacing.xs,
                borderRadius: tokens.radius.sm,
              }}
            >
              Cover photo
            </Box>
          )}
          {image.status === 'uploading' && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tokens.colors.white,
                fontSize: tokens.typography.fontSizes.sm,
                fontWeight: tokens.typography.fontWeights.medium,
              }}
            >
              Uploading...
            </Box>
          )}
          {image.status === 'error' && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(217,48,37,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tokens.colors.error,
                fontSize: tokens.typography.fontSizes.sm,
                fontWeight: tokens.typography.fontWeights.medium,
              }}
            >
              Error
            </Box>
          )}
          <Box
            className="remove-btn"
            onClick={() => onRemove(image.id)}
            sx={{
              position: 'absolute',
              top: 4,
              right: 4,
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
                justifyContent: 'center',
              color: tokens.colors.white,
              cursor: 'pointer',
              opacity: 0,
              transition: 'opacity 0.2s',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <DeleteIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      ))}
      {canAdd && (
        <Box
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          sx={{
            aspectRatio: '1 / 1',
            border: `2px dashed ${tokens.colors.border}`,
            borderRadius: tokens.radius.md,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.spacing.sm,
            cursor: 'pointer',
            transition: 'border-color 0.2s',
            '&:hover': {
              borderColor: tokens.colors.green,
            },
          }}
        >
          <AddPhotoAlternateIcon sx={{ color: tokens.colors.textSecondary, fontSize: 32 }} />
          <Typography
            sx={{
              fontSize: tokens.typography.fontSizes.sm,
              color: tokens.colors.textSecondary,
              textAlign: 'center',
            }}
          >
            Add Photo
          </Typography>
        </Box>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </Box>
  )
}

export default ImageUploader
