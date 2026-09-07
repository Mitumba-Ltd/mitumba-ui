import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DownloadIcon from '@mui/icons-material/Download';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import { tokens } from '@mitumba/tokens';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import { MitumbaModal } from '../../feedback/MitumbaModal';
import { EmptyState } from '../../feedback/EmptyState';
import { MitumbaChip } from '../../foundation/MitumbaChip';
import { MitumbaAvatar } from '../../foundation/MitumbaAvatar';
import type {
  DisputeEvidenceGalleryProps,
  DisputeEvidenceItem,
  DisputeUploaderRole,
} from './DisputeEvidenceGallery.types';

const ROLE_LABELS: Record<DisputeUploaderRole, string> = {
  buyer: 'Buyer Evidence',
  seller: 'Seller Evidence',
  admin: 'Admin Evidence',
};

/** Per-role visual language: accent color + avatar initial. Non-color cue is the role label text itself. */
const ROLE_ACCENTS: Record<DisputeUploaderRole, { color: string; initial: string }> = {
  buyer: { color: tokens.colors.green, initial: 'Buyer' },
  seller: { color: tokens.colors.earth, initial: 'Seller' },
  admin: { color: tokens.colors.info, initial: 'Admin' },
};

const DEFAULT_EMPTY_TEXT = 'No evidence has been submitted for this dispute yet.';

/** A previewable media item (image or video) shown in the lightbox. */
interface PreviewItem {
  item: DisputeEvidenceItem;
  label: string;
}

/** Formats an ISO timestamp to a friendly locale string; passes non-parseable input through unchanged. */
function formatTimestamp(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** Derives a human-friendly filename from an explicit label or the trailing path segment of a URL. */
function deriveFileName(item: DisputeEvidenceItem): string {
  if (item.fileName) {
    return item.fileName;
  }
  try {
    const url = new URL(item.content, 'https://placeholder.local');
    const last = url.pathname.split('/').filter(Boolean).pop();
    return last ? decodeURIComponent(last) : 'Download file';
  } catch {
    return 'Download file';
  }
}

/** Renders the small timestamp caption used across every evidence item. */
function Timestamp({ value }: { value: string }): React.ReactElement {
  return (
    <Typography
      sx={{
        fontSize: tokens.typography.fontSizes.xs,
        color: tokens.colors.textDisabled,
        mt: `${tokens.spacing.xs}px`,
      }}
    >
      {formatTimestamp(value)}
    </Typography>
  );
}

/** Renders a single piece of evidence (image/video thumbnail, file link, or quoted text) plus its timestamp. */
function EvidenceItem({
  item,
  label,
  accentColor,
  onPreview,
}: {
  item: DisputeEvidenceItem;
  label: string;
  accentColor: string;
  onPreview: (preview: PreviewItem) => void;
}): React.ReactElement {
  const isMedia = item.type === 'image' || item.type === 'video';
  const isText = item.type === 'text';
  const thumbSx = {
    width: '100%',
    height: 120,
    display: 'block',
    borderRadius: `${tokens.radius.md}px`,
    objectFit: 'cover' as const,
  };

  let body: React.ReactNode;
  if (isText) {
    body = (
      <Box
        sx={{
          borderLeft: `3px solid ${accentColor}`,
          pl: `${tokens.spacing.base}px`,
          fontStyle: 'italic',
          color: tokens.colors.textSecondary,
          fontSize: tokens.typography.fontSizes.sm,
        }}
      >
        {item.content}
      </Box>
    );
  } else if (item.type === 'file') {
    body = (
      <Box
        component="a"
        href={item.content}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: `${tokens.spacing.md}px`,
          p: `${tokens.spacing.base}px`,
          borderRadius: `${tokens.radius.md}px`,
          border: `1px solid ${tokens.colors.divider}`,
          bgcolor: tokens.colors.background,
          color: tokens.colors.textPrimary,
          textDecoration: 'none',
          transition: tokens.motion.transitions.interaction,
          '&:hover': { borderColor: accentColor, bgcolor: tokens.colors.surface },
        }}
      >
        <InsertDriveFileIcon sx={{ color: accentColor, fontSize: 24 }} />
        <Typography
          sx={{
            flex: 1,
            minWidth: 0,
            fontSize: tokens.typography.fontSizes.sm,
            fontWeight: tokens.typography.fontWeights.semibold,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {deriveFileName(item)}
        </Typography>
        <DownloadIcon sx={{ color: tokens.colors.textSecondary, fontSize: 18 }} />
      </Box>
    );
  } else {
    body = (
      <Box
        component="button"
        type="button"
        aria-label={`Expand ${label}`}
        onClick={() => onPreview({ item, label })}
        sx={{
          p: 0,
          border: 'none',
          background: 'none',
          display: 'block',
          width: '100%',
          cursor: 'pointer',
          borderRadius: `${tokens.radius.md}px`,
          transition: tokens.motion.transitions.transform,
          '&:hover': { transform: 'scale(1.02)' },
          '&:focus-visible': { outline: `2px solid ${accentColor}`, outlineOffset: 2 },
        }}
      >
        {item.type === 'image' ? (
          <Box component="img" src={item.content} alt={label} sx={thumbSx} />
        ) : (
          <Box component="video" src={item.content} muted sx={thumbSx} aria-label={label} />
        )}
      </Box>
    );
  }

  return (
    <Box component="li" sx={{ listStyle: 'none', gridColumn: isMedia ? 'auto' : '1 / -1' }}>
      {body}
      <Timestamp value={item.created_at} />
    </Box>
  );
}

/**
 * DisputeEvidenceGallery — displays dispute evidence grouped by uploader role
 * as a semantic collection of labelled lists. Images and videos are activatable
 * thumbnails that open an accessible lightbox; files render as downloadable
 * links; empty input renders a friendly empty state.
 */
export function DisputeEvidenceGallery({
  evidence,
  titleLevel,
  emptyText = DEFAULT_EMPTY_TEXT,
}: DisputeEvidenceGalleryProps): React.ReactElement {
  const [preview, setPreview] = React.useState<PreviewItem | null>(null);

  // Flat, ordered list of previewable media for prev/next navigation in the lightbox.
  const previewables = React.useMemo<PreviewItem[]>(() => {
    const grouped = evidence.reduce<Record<string, DisputeEvidenceItem[]>>((acc, item) => {
      (acc[item.uploader_role] ??= []).push(item);
      return acc;
    }, {});
    const list: PreviewItem[] = [];
    Object.entries(grouped).forEach(([role, items]) => {
      const groupLabel = ROLE_LABELS[role as DisputeUploaderRole];
      items.forEach((item, index) => {
        if (item.type === 'image' || item.type === 'video') {
          list.push({ item, label: `${groupLabel} item ${index + 1}` });
        }
      });
    });
    return list;
  }, [evidence]);

  const previewIndex = preview
    ? previewables.findIndex((p) => p.item === preview.item)
    : -1;

  const goTo = (offset: number): void => {
    if (previewIndex < 0 || previewables.length === 0) {
      return;
    }
    const next = (previewIndex + offset + previewables.length) % previewables.length;
    setPreview(previewables[next]);
  };

  if (evidence.length === 0) {
    return (
      <EmptyState
        icon={<CollectionsBookmarkIcon />}
        title="No evidence yet"
        subtitle={emptyText}
        titleLevel={titleLevel}
      />
    );
  }

  const grouped = evidence.reduce<Record<string, DisputeEvidenceItem[]>>((acc, item) => {
    (acc[item.uploader_role] ??= []).push(item);
    return acc;
  }, {});

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.xl}px` }}>
        {Object.entries(grouped).map(([role, items]) => {
          const typedRole = role as DisputeUploaderRole;
          const groupLabel = ROLE_LABELS[typedRole];
          const accent = ROLE_ACCENTS[typedRole];
          const count = items.length;
          const countLabel = `${count} ${count === 1 ? 'item' : 'items'}`;
          return (
            <Box key={role} component="section" aria-label={groupLabel}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${tokens.spacing.md}px`,
                  mb: `${tokens.spacing.base}px`,
                }}
              >
                <MitumbaAvatar name={accent.initial} size="sm" />
                <SemanticTitle
                  titleLevel={titleLevel}
                  fallbackComponent="h3"
                  sx={{
                    fontSize: tokens.typography.fontSizes.md,
                    fontWeight: 700,
                    color: tokens.colors.textPrimary,
                    m: 0,
                  }}
                >
                  {groupLabel}
                </SemanticTitle>
                <MitumbaChip label={countLabel} color="earth" variant="soft" size="small" />
                <Box
                  sx={{
                    ml: 'auto',
                    width: `${tokens.spacing.md}px`,
                    height: `${tokens.spacing.md}px`,
                    borderRadius: tokens.radius.full,
                    bgcolor: accent.color,
                    flexShrink: 0,
                  }}
                />
              </Box>
              <Box
                component="ul"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                  },
                  gap: `${tokens.spacing.base}px`,
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                }}
              >
                {items.map((item, index) => (
                  <EvidenceItem
                    key={`${item.content}-${item.created_at}`}
                    item={item}
                    label={`${groupLabel} item ${index + 1}`}
                    accentColor={accent.color}
                    onPreview={setPreview}
                  />
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>

      <MitumbaModal
        open={preview !== null}
        onClose={() => setPreview(null)}
        title={preview?.label ?? 'Evidence preview'}
        subtitle={preview ? formatTimestamp(preview.item.created_at) : undefined}
        maxWidth={720}
      >
        {preview && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${tokens.spacing.base}px` }}>
            {preview.item.type === 'video' ? (
              <Box
                component="video"
                src={preview.item.content}
                controls
                aria-label={preview.label}
                sx={{ width: '100%', maxHeight: '70vh', borderRadius: `${tokens.radius.md}px` }}
              />
            ) : (
              <Box
                component="img"
                src={preview.item.content}
                alt={preview.label}
                sx={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: `${tokens.radius.md}px`, objectFit: 'contain' }}
              />
            )}
            {previewables.length > 1 && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing.lg}px` }}>
                <IconButton aria-label="Previous evidence" onClick={() => goTo(-1)} sx={{ color: tokens.colors.textPrimary }}>
                  <ChevronLeftIcon />
                </IconButton>
                <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, color: tokens.colors.textSecondary }}>
                  {`${previewIndex + 1} / ${previewables.length}`}
                </Typography>
                <IconButton aria-label="Next evidence" onClick={() => goTo(1)} sx={{ color: tokens.colors.textPrimary }}>
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
      </MitumbaModal>
    </>
  );
}

export default DisputeEvidenceGallery;
