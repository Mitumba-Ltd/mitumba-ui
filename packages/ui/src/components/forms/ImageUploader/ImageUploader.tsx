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
            border: '1px solid',
            borderColor: image.isPrimary ? tokens.colors.green : tokens.colors.border,
            borderWidth: image.isPrimary ? '2px' : '1px',
            cursor: 'grab',
            transition: 'all 200ms ease',
            backgroundColor: tokens.colors.background,
            '&:hover': {
              borderColor: tokens.colors.green,
              boxShadow: tokens.shadows.card,
            },
            '&:hover .remove-btn': {
              opacity: 1,
              transform: 'scale(1)',
            },
          }}
        >
           <Box
              component="img"
              src={image.url}
              alt={`Upload preview ${index + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
           {image.isPrimary && (
            <Box
              sx={{
                position: 'absolute',
                top: tokens.spacing.xs,
                left: tokens.spacing.xs,
                backgroundColor: tokens.colors.green,
                color: tokens.colors.white,
                fontSize: 10,
                fontWeight: tokens.typography.fontWeights.extrabold,
                textTransform: 'uppercase',
                letterSpacing: tokens.typography.letterSpacings.wide,
                paddingInline: tokens.spacing.sm,
                paddingBlock: '2px',
                borderRadius: tokens.radius.xs,
                boxShadow: tokens.shadows.card,
                zIndex: 1,
              }}
            >
              Cover
            </Box>
          )}
          {image.status === 'uploading' && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(2px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tokens.colors.green,
                fontSize: 10,
                fontWeight: tokens.typography.fontWeights.bold,
                textTransform: 'uppercase',
                zIndex: 1,
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
                backgroundColor: `${tokens.colors.errorLight}CC`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: tokens.colors.error,
                fontSize: 10,
                fontWeight: tokens.typography.fontWeights.bold,
                textTransform: 'uppercase',
                zIndex: 1,
              }}
            >
              Error
            </Box>
          )}
          <Box
            className="remove-btn"
            onClick={(e) => {
              e.stopPropagation()
              onRemove(image.id)
            }}
            sx={{
              position: 'absolute',
              top: tokens.spacing.xs,
              right: tokens.spacing.xs,
              width: 24,
              height: 24,
              borderRadius: tokens.radius.full,
              backgroundColor: tokens.colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: tokens.colors.error,
              cursor: 'pointer',
              opacity: 0,
              transform: 'scale(0.8)',
              transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: tokens.shadows.elevated,
              zIndex: 2,
              '&:hover': {
                backgroundColor: tokens.colors.error,
                color: tokens.colors.white,
              },
            }}
          >
            <DeleteIcon sx={{ fontSize: 14 }} />
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
            gap: tokens.spacing.xs,
            cursor: 'pointer',
            transition: 'all 200ms ease',
            backgroundColor: tokens.colors.background,
            '&:hover': {
              borderColor: tokens.colors.green,
              backgroundColor: tokens.colors.greenLight,
              '& .add-icon': { color: tokens.colors.green },
            },
          }}
        >
          <AddPhotoAlternateIcon className="add-icon" sx={{ color: tokens.colors.textDisabled, fontSize: 28, transition: 'color 200ms ease' }} />
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: tokens.typography.fontWeights.bold,
              textTransform: 'uppercase',
              letterSpacing: tokens.typography.letterSpacings.wide,
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
