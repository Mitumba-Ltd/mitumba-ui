import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { colors, spacing, typography } from '@mitumba/tokens';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import { ErrorState } from '../ErrorState/ErrorState';
import type { DocumentSheetProps } from './DocumentSheet.types';

/**
 * A document (a PDF) shown in a sheet that slides in from the right: full width on phones, 720px from
 * `md` up, the full height of the viewport. The document scrolls inside the sheet. Download saves it
 * under `filename`; Open in new tab is there for phone browsers that do not render a PDF in a frame.
 */
export function DocumentSheet({
  open,
  onClose,
  title,
  subtitle,
  src,
  filename,
  loading = false,
  error,
  onRetry,
  titleLevel,
}: DocumentSheetProps): React.ReactElement {
  const titleId = React.useId();
  const ready = Boolean(src) && !loading && !error;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        role: 'dialog',
        'aria-modal': true,
        'aria-labelledby': titleId,
        sx: {
          width: { xs: '100%', md: 720 },
          maxWidth: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.surface,
        },
      }}
    >
      <Box
        component="header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: `${String(spacing.sm)}px`,
          px: `${String(spacing.lg)}px`,
          py: `${String(spacing.md)}px`,
          borderBottom: `1px solid ${colors.divider}`,
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <SemanticTitle
            id={titleId}
            titleLevel={titleLevel}
            sx={{ fontWeight: 800, fontSize: typography.fontSizes.lg, color: colors.textPrimary }}
          >
            {title}
          </SemanticTitle>
          {subtitle ? (
            <Typography
              noWrap
              sx={{ fontSize: typography.fontSizes.sm, color: colors.textSecondary }}
            >
              {subtitle}
            </Typography>
          ) : null}
        </Box>
        {ready ? (
          <>
            <Tooltip title="Download">
              <IconButton
                component="a"
                href={src}
                download={filename ?? true}
                aria-label={`Download ${title}`}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open in new tab">
              <IconButton
                component="a"
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${title} in a new tab`}
              >
                <OpenInNewIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : null}
        <Tooltip title="Close">
          <IconButton onClick={onClose} aria-label={`Close ${title}`}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, display: 'flex', backgroundColor: colors.background }}>
        {error ? (
          <Box sx={{ m: 'auto', p: `${String(spacing.lg)}px` }}>
            <ErrorState title="Couldn't open this document" subtitle={error} onRetry={onRetry} variant="compact" />
          </Box>
        ) : null}
        {!error && (loading || !src) ? (
          <Box
            data-testid="document-sheet-loading"
            aria-busy="true"
            aria-label={`Loading ${title}`}
            sx={{ flex: 1, p: `${String(spacing.lg)}px` }}
          >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%', borderRadius: 1 }} />
          </Box>
        ) : null}
        {ready ? (
          <Box
            component="iframe"
            src={src}
            title={subtitle ? `${title} ${subtitle}` : title}
            sx={{ flex: 1, width: '100%', height: '100%', border: 0, backgroundColor: colors.surface }}
          />
        ) : null}
      </Box>
    </Drawer>
  );
}
