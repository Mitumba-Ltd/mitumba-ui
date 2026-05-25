import React from 'react'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { MitumbaSliderProps } from './MitumbaSlider.types'

/**
 * Premium "Living" Slider primitive with drag-compression physics.
 * Fulfills the "Selections" design benchmark with custom handles and high-contrast focus.
 */
export function MitumbaSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled = false,
  showTooltip = true,
  sx,
}: MitumbaSliderProps) {
  return (
    <Box sx={{ width: '100%', pt: label ? 1 : 0 }}>
      {label && (
        <Typography
          variant="caption"
          sx={{
            mb: 1.5,
            display: 'block',
            fontWeight: 700,
            color: tokens.colors.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontFamily: tokens.typography.fontFamily,
          }}
        >
          {label}
        </Typography>
      )}
      
      <Slider
        value={value}
        onChange={(_, newValue) => onChange(newValue as number | number[])}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        valueLabelDisplay={showTooltip ? 'auto' : 'off'}
        sx={[
          {
            height: 6,
            color: tokens.colors.green,
            padding: '13px 0',
            
            '& .MuiSlider-thumb': {
              height: 20,
              width: 20,
              backgroundColor: tokens.colors.white,
              border: `2px solid ${tokens.colors.green}`,
              boxShadow: tokens.shadows.card,
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', // Spring transition
              
              '&:hover, &.Mui-focusVisible': {
                boxShadow: tokens.shadows.focus,
                transform: 'scale(1.2) translateY(-2px)',
              },
              
              '&.Mui-active': {
                width: 24, // Compression/Stretch effect
                boxShadow: tokens.shadows.deep,
                transform: 'scale(1.1)',
              },
            },
            
            '& .MuiSlider-track': {
              height: 6,
              borderRadius: 3,
            },
            
            '& .MuiSlider-rail': {
              height: 6,
              borderRadius: 3,
              opacity: 0.2,
              backgroundColor: tokens.colors.divider,
            },
            
            '& .MuiSlider-valueLabel': {
              lineHeight: 1.2,
              fontSize: 10,
              fontWeight: 800,
              background: 'unset',
              padding: 0,
              width: 28,
              height: 28,
              borderRadius: '50% 50% 50% 0',
              backgroundColor: tokens.colors.green,
              transformOrigin: 'bottom left',
              transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
              '&::before': { display: 'none' },
              '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
              },
              '& > *': {
                transform: 'rotate(45deg)',
              },
            },

            '&.Mui-disabled': {
              color: tokens.colors.divider,
              '& .MuiSlider-thumb': {
                borderColor: tokens.colors.divider,
              },
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    </Box>
  )
}

export default MitumbaSlider
