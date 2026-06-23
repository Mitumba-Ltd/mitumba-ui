import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { tokens } from '@mitumba/tokens';
import type { DisputeEvidenceGalleryProps, DisputeEvidenceItem } from './DisputeEvidenceGallery.types';

const ROLE_LABELS: Record<DisputeEvidenceItem['uploader_role'], string> = {
  buyer: 'Buyer Evidence',
  seller: 'Seller Evidence',
  admin: 'Admin Evidence',
};

/**
 * DisputeEvidenceGallery — displays dispute evidence grouped by uploader role.
 */
export function DisputeEvidenceGallery({ evidence }: DisputeEvidenceGalleryProps): React.ReactElement {
  const grouped = evidence.reduce<Record<string, DisputeEvidenceItem[]>>((acc, item) => {
    (acc[item.uploader_role] ??= []).push(item);
    return acc;
  }, {});

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.xl}px` }}>
      {Object.entries(grouped).map(([role, items]) => (
        <Box key={role}>
          <Typography
            component="h3"
            sx={{
              fontSize: tokens.typography.fontSizes.md,
              fontWeight: 700,
              color: tokens.colors.textPrimary,
              mb: `${tokens.spacing.base}px`,
            }}
          >
            {ROLE_LABELS[role as DisputeEvidenceItem['uploader_role']]}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing.base}px` }}>
            {items.map((item) => (
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              <EvidenceItem key={`${item.content}-${item.created_at}`} item={item} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function EvidenceItem({ item }: { item: DisputeEvidenceItem }): React.ReactElement {
  return (
    <Box>
      {item.type === 'image' ? (
        <Box
          component="img"
          src={item.content}
          alt="Evidence"
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

export default DisputeEvidenceGallery;
