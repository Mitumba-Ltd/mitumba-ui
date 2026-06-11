import React, { useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { tokens } from '@mitumba/tokens';
import type { ImageUploaderProps } from './ImageUploader.types';

/**
 * Image uploader — Depop/Vinted-style grid with cover photo emphasis.
 * Supports drag-to-reorder, tap-to-add, and single/grid variants.
 */
export function ImageUploader({
  images,
  onAdd,
  onRemove,
  onReorder,
  maxImages = 6,
  variant = 'grid',
  aspectRatio = '1 / 1',
  hint = 'Add photo',
}: ImageUploaderProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length > 0) {
        onAdd(files);
        if (inputRef.current) inputRef.current.value = '';
      }
    },
    [onAdd],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer?.files ?? []);
      if (files.length > 0) onAdd(files);
    },
    [onAdd],
  );

  const handleDragStart = (index: number) => { dragItem.current = index; };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    dragOverItem.current = index;
  };

  const handleDragEnd = useCallback(() => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      const reordered = [...images.map((img) => img.id)];
      const [moved] = reordered.splice(dragItem.current, 1);
      reordered.splice(dragOverItem.current, 0, moved);
      onReorder(reordered);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  }, [images, onReorder]);

  const canAdd = images.length < maxImages;
  const isSingle = variant === 'single';

  // Single variant — one large upload area
  if (isSingle) {
    const img = images[0];
    return (
      <Box>
        <Box
          onClick={() => !img && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          sx={{
            width: '100%',
            aspectRatio,
            borderRadius: `${tokens.radius.lg}px`,
            border: `2px dashed ${img ? tokens.colors.green : tokens.colors.border}`,
            overflow: 'hidden',
            position: 'relative',
            cursor: img ? 'default' : 'pointer',
            bgcolor: tokens.colors.background,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: `${tokens.spacing.xs}px`,
            transition: tokens.motion.transitions.interaction,
            '&:hover': !img ? { borderColor: tokens.colors.green, bgcolor: tokens.colors.greenLight } : {},
          }}
        >
          {img ? (
            <>
              <Box component="img" src={img.url} alt="Upload preview" sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
              {img.status === 'uploading' && (
                <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CircularProgress size={32} sx={{ color: tokens.colors.green }} />
                </Box>
              )}
              <IconButton
                aria-label="Remove image"
                onClick={(e) => { e.stopPropagation(); onRemove(img.id); }}
                size="small"
                sx={{ position: 'absolute', top: `${tokens.spacing.sm}px`, right: `${tokens.spacing.sm}px`, bgcolor: 'rgba(0,0,0,0.5)', color: tokens.colors.white, '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
              >
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </>
          ) : (
            <>
              <AddAPhotoIcon sx={{ color: tokens.colors.textDisabled, fontSize: 32 }} />
              <Typography variant="caption" color={tokens.colors.textSecondary}>{hint}</Typography>
            </>
          )}
        </Box>
        <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileSelect} aria-label={hint} />
      </Box>
    );
  }

  // Grid variant — multi-image with cover emphasis
  const slots = Array.from({ length: maxImages }, (_, i) => images[i] ?? null);

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: `${tokens.spacing.sm}px`,
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {slots.map((img, index) => (
          <Box
            key={img ? img.id : `empty-${String(index)}`}
            draggable={!!img}
            onDragStart={() => img && handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onClick={() => !img && canAdd && inputRef.current?.click()}
            onDrop={!img ? handleDrop : undefined}
            sx={{
              position: 'relative',
              aspectRatio,
              borderRadius: `${tokens.radius.md}px`,
              overflow: 'hidden',
              border: img
                ? `2px solid ${index === 0 ? tokens.colors.green : tokens.colors.border}`
                : `2px dashed ${tokens.colors.border}`,
              cursor: (() => { if (img) return 'grab'; if (canAdd) return 'pointer'; return 'default'; })(),
              bgcolor: tokens.colors.background,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: `${tokens.spacing.xs}px`,
              transition: tokens.motion.transitions.interaction,
              '&:hover': !img && canAdd ? { borderColor: tokens.colors.green, bgcolor: tokens.colors.greenLight } : {},
              '&:active': img ? { cursor: 'grabbing' } : {},
            }}
          >
            {img ? (
              <>
                <Box component="img" src={img.url} alt={`Photo ${index + 1}`} sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />

                {/* Cover badge */}
                {index === 0 && (
                  <Box sx={{ position: 'absolute', top: `${tokens.spacing.xs}px`, left: `${tokens.spacing.xs}px`, bgcolor: tokens.colors.green, color: tokens.colors.white, borderRadius: `${tokens.radius.sm}px`, px: `${tokens.spacing.xs}px`, py: '2px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <StarIcon sx={{ fontSize: 10 }} />
                    <Typography sx={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Cover</Typography>
                  </Box>
                )}

                {/* Upload progress */}
                {img.status === 'uploading' && (
                  <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress size={24} sx={{ color: tokens.colors.green }} />
                  </Box>
                )}

                {/* Error overlay */}
                {img.status === 'error' && (
                  <Box sx={{ position: 'absolute', inset: 0, bgcolor: `${tokens.colors.errorLight}dd`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography sx={{ fontSize: 10, fontWeight: 700, color: tokens.colors.error, textTransform: 'uppercase' }}>Failed</Typography>
                  </Box>
                )}

                {/* Remove button */}
                <IconButton
                  aria-label={`Remove photo ${index + 1}`}
                  onClick={(e) => { e.stopPropagation(); onRemove(img.id); }}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: `${tokens.spacing.xs}px`,
                    right: `${tokens.spacing.xs}px`,
                    width: 22,
                    height: 22,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    color: tokens.colors.white,
                    opacity: 0,
                    transition: tokens.motion.transitions.interaction,
                    '.MuiBox-root:hover &': { opacity: 1 },
                    '&:hover': { bgcolor: tokens.colors.error },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 12 }} />
                </IconButton>
              </>
            ) : (
              canAdd && (
                <>
                  <AddAPhotoIcon sx={{ color: tokens.colors.textDisabled, fontSize: 22 }} />
                  {index === 0 && (
                    <Typography sx={{ fontSize: 9, color: tokens.colors.textSecondary, fontWeight: 600, textTransform: 'uppercase' }}>Cover</Typography>
                  )}
                </>
              )
            )}
          </Box>
        ))}
      </Box>

      <Typography variant="caption" sx={{ color: tokens.colors.textSecondary, mt: `${tokens.spacing.sm}px`, display: 'block' }}>
        {images.length}/{maxImages} photos · Drag to reorder · First photo is the cover
      </Typography>

      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFileSelect} aria-label="Upload photos" />
    </Box>
  );
}

export default ImageUploader;
