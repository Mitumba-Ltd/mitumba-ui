import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import type { DisputeEvidenceGalleryProps, DisputeEvidenceItem } from './DisputeEvidenceGallery.types';

const ROLE_LABELS: Record<DisputeEvidenceItem['uploader_role'], string> = {
  buyer: 'Buyer Evidence',
  seller: 'Seller Evidence',
  admin: 'Admin Evidence',
};

/** Renders a single piece of evidence (image preview or quoted text) plus its timestamp. */
function EvidenceItem({ item, label }: { item: DisputeEvidenceItem; label: string }): React.ReactElement {
  return (
    <Box component="li" sx={{ listStyle: 'none' }}>
      {item.type === 'image' ? (
        <Box
          component="img"
          src={item.content}
          alt={label}
          sx={{
            width: 80,
            height: 80,
            borderRadius: `${tokens.radius.md}px`,
            objectFit: 'cover',
          }}
        />
      ) : (
        <Box
          sx={{
            borderLeft: `3px solid ${tokens.colors.earth}`,
            pl: `${tokens.spacing.base}px`,
            fontStyle: 'italic',
            color: tokens.colors.textSecondary,
            fontSize: tokens.typography.fontSizes.sm,
          }}
        >
          {item.content}
        </Box>
      )}
      <Typography
        sx={{
          fontSize: 11,
          color: tokens.colors.textDisabled,
          mt: `${tokens.spacing.xs}px`,
        }}
      >
        {item.created_at}
      </Typography>
    </Box>
  );
}

/**
 * DisputeEvidenceGallery — displays dispute evidence grouped by uploader role
 * as a semantic collection of labelled lists.
 */
export function DisputeEvidenceGallery({
  evidence,
  titleLevel,
}: DisputeEvidenceGalleryProps): React.ReactElement {
  const grouped = evidence.reduce<Record<string, DisputeEvidenceItem[]>>((acc, item) => {
    (acc[item.uploader_role] ??= []).push(item);
    return acc;
  }, {});

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.xl}px` }}>
      {Object.entries(grouped).map(([role, items]) => {
        const groupLabel = ROLE_LABELS[role as DisputeEvidenceItem['uploader_role']];
        return (
          <Box key={role} component="section" aria-label={groupLabel}>
            <SemanticTitle
              titleLevel={titleLevel}
              fallbackComponent="h3"
              sx={{
                fontSize: tokens.typography.fontSizes.md,
                fontWeight: 700,
                color: tokens.colors.textPrimary,
                mb: `${tokens.spacing.base}px`,
              }}
            >
              {groupLabel}
            </SemanticTitle>
            <Box
              component="ul"
              sx={{
                display: 'flex',
                flexDirection: 'column',
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
                />
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default DisputeEvidenceGallery;
