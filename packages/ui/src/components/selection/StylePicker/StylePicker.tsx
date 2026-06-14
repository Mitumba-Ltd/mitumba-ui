import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { tokens } from '@mitumba/tokens';
import type { StylePickerProps } from './StylePicker.types';

/**
 * StylePicker — generic visual style selector with live previews.
 * Used for customizing any component variant (nav bar, themes, layouts, etc).
 * Grid of option cards, each showing a miniature preview + label.
 * Selected card has green border + checkmark. Changes fire immediately.
 */
export function StylePicker({
  options,
  value,
  onChange,
  title,
  subtitle,
  columns = 2,
}: StylePickerProps): React.ReactElement {
  return (
    <Box>
      {/* Header */}
      {(title || subtitle) && (
        <Box sx={{ mb: `${tokens.spacing.xl}px` }}>
          {title && (
            <Typography sx={{ fontSize: tokens.typography.fontSizes.base, fontWeight: 700, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, color: tokens.colors.textSecondary, fontFamily: tokens.typography.fontFamily, mt: `${tokens.spacing.xs}px` }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Options grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: `repeat(${columns}, 1fr)` },
          gap: `${tokens.spacing.md}px`,
        }}
      >
        {options.map((option) => {
          const isSelected = value === option.id;
          return (
            <Box
              key={option.id}
              onClick={() => onChange(option.id)}
              sx={{
                position: 'relative',
                borderRadius: `${tokens.radius.lg}px`,
                border: `2px solid ${isSelected ? tokens.colors.green : tokens.colors.border}`,
                bgcolor: isSelected ? tokens.colors.greenLight : tokens.colors.surface,
                cursor: 'pointer',
                overflow: 'hidden',
                transition: tokens.motion.transitions.interaction,
                '&:hover': { borderColor: tokens.colors.green },
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
                  <Typography sx={{ fontSize: tokens.typography.fontSizes.sm, fontWeight: 700, color: tokens.colors.textPrimary, fontFamily: tokens.typography.fontFamily }}>
                    {option.label}
                  </Typography>
                  {option.description && (
                    <Typography sx={{ fontSize: tokens.typography.fontSizes.xs, color: tokens.colors.textSecondary, fontFamily: tokens.typography.fontFamily, mt: '1px' }}>
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
