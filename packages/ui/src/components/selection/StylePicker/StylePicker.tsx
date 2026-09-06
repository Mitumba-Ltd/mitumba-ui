import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { tokens } from '@mitumba/tokens';
import { SemanticTitle } from '../../../internal/SemanticTitle';
import type { StylePickerProps } from './StylePicker.types';

/**
 * StylePicker — generic visual style selector with live previews.
 * Used for customizing any component variant (nav bar, themes, layouts, etc).
 * Rendered as a real ARIA radiogroup: each option card is a `radio` with
 * selected/disabled state and keyboard selection (arrows + Space/Enter). Grid of
 * option cards, each showing a miniature preview + label. Selected card has a
 * green border + checkmark. Changes fire immediately.
 */
export function StylePicker({
  options,
  value,
  onChange,
  title,
  subtitle,
  columns = 2,
  titleLevel,
}: StylePickerProps): React.ReactElement {
  const groupLabelId = React.useId();
  const selectableIds = options.filter((o) => !o.disabled).map((o) => o.id);

  const moveSelection = (currentId: string, direction: 1 | -1) => {
    if (selectableIds.length === 0) return;
    const currentIndex = selectableIds.indexOf(currentId);
    const from = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (from + direction + selectableIds.length) % selectableIds.length;
    onChange(selectableIds[nextIndex]);
  };

  const handleKeyDown = (event: React.KeyboardEvent, option: { id: string; disabled?: boolean }) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      moveSelection(option.id, 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveSelection(option.id, -1);
    } else if ((event.key === ' ' || event.key === 'Enter') && !option.disabled) {
      event.preventDefault();
      onChange(option.id);
    }
  };

  return (
    <Box>
      {/* Header */}
      {(title || subtitle) && (
        <Box sx={{ mb: `${tokens.spacing.xl}px` }}>
          {title && (
            <SemanticTitle
              titleLevel={titleLevel}
              id={groupLabelId}
              sx={{ fontSize: tokens.typography.fontSizes.base, fontWeight: 700, color: tokens.colors.textPrimary }}
            >
              {title}
            </SemanticTitle>
          )}
          {subtitle && (
            <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, color: tokens.colors.textSecondary, mt: `${tokens.spacing.xs}px` }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Options grid */}
      <Box
        role="radiogroup"
        aria-labelledby={title ? groupLabelId : undefined}
        aria-label={title ? undefined : 'Style options'}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: `repeat(${columns}, 1fr)` },
          gap: `${tokens.spacing.md}px`,
        }}
      >
        {options.map((option) => {
          const isSelected = value === option.id;
          const isDisabled = Boolean(option.disabled);
          // Roving tabindex: the selected (or first selectable) radio is tabbable.
          const isTabbable = isSelected || (!value && option.id === selectableIds[0]);
          const tabIndex = !isDisabled && isTabbable ? 0 : -1;
          return (
            <Box
              key={option.id}
              role="radio"
              aria-checked={isSelected}
              aria-disabled={isDisabled || undefined}
              aria-label={option.label}
              tabIndex={tabIndex}
              onClick={isDisabled ? undefined : () => onChange(option.id)}
              onKeyDown={(e) => handleKeyDown(e, option)}
              sx={{
                position: 'relative',
                borderRadius: `${tokens.radius.lg}px`,
                border: `2px solid ${isSelected ? tokens.colors.green : tokens.colors.border}`,
                bgcolor: isSelected ? tokens.colors.greenLight : tokens.colors.surface,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.5 : 1,
                overflow: 'hidden',
                transition: tokens.motion.transitions.interaction,
                '&:hover': { borderColor: isDisabled ? tokens.colors.border : tokens.colors.green },
              }}
            >
              {/* Preview area */}
              <Box
                sx={{
                  height: 80,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  bgcolor: tokens.colors.background,
                  borderBottom: `1px solid ${isSelected ? tokens.colors.greenLight : tokens.colors.divider}`,
                  px: `${tokens.spacing.sm}px`,
                  pt: `${tokens.spacing.sm}px`,
                }}
              >
                <Box sx={{ width: '100%', transform: 'scale(0.75)', transformOrigin: 'bottom center', pointerEvents: 'none' }}>
                  {option.preview}
                </Box>
              </Box>

              {/* Label area */}
              <Box sx={{ p: `${tokens.spacing.md}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, fontWeight: 700, color: tokens.colors.textPrimary }}>
                    {option.label}
                  </Typography>
                  {option.description && (
                    <Typography sx={{ fontSize: tokens.typography.fontSizes.xs, color: tokens.colors.textSecondary, mt: '1px' }}>
                      {option.description}
                    </Typography>
                  )}
                </Box>
                {isSelected && <CheckCircleIcon sx={{ fontSize: 18, color: tokens.colors.green }} />}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default StylePicker;
