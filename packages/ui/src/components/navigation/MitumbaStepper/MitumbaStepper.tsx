import React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckIcon from '@mui/icons-material/Check'
import { tokens } from '@mitumba/tokens'
import type { MitumbaStepperProps } from './MitumbaStepper.types'

const MitumbaConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 18,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: tokens.colors.green,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: tokens.colors.green,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: tokens.colors.divider,
    borderTopWidth: 2,
    borderRadius: 1,
    transition: 'all 0.3s ease',
    borderStyle: 'dashed', // Benchmark style for pending
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    borderStyle: 'solid', // Benchmark style for completed
  }
}))

function MitumbaStepIcon(props: { active?: boolean; completed?: boolean; icon: React.ReactNode }) {
  const { active, completed, icon } = props

  return (
    <Box
      sx={{
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        backgroundColor: completed || active ? tokens.colors.green : tokens.colors.background,
        color: completed || active ? tokens.colors.white : tokens.colors.textDisabled,
        border: active || completed ? 'none' : `1px solid ${tokens.colors.divider}`,
        boxShadow: active ? tokens.shadows.card : 'none',
        zIndex: 1,
        fontWeight: 800,
        fontSize: 14,
        fontFamily: tokens.typography.fontFamily,
        ...(active && {
           backgroundColor: tokens.colors.info,
           transform: 'scale(1.1)',
        })
      }}
    >
      {completed ? <CheckIcon sx={{ fontSize: 20 }} /> : icon}
    </Box>
  )
}

/**
 * Premium "Living" Stepper primitive.
 * Fulfills high-end process tracking standards with custom icons and spring transitions.
 */
export function MitumbaStepper({
  activeStep,
  steps,
  sx,
}: MitumbaStepperProps) {
  return (
    <Box sx={[{ width: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel 
        connector={<MitumbaConnector />}
      >
        {steps.map((step, index) => {
          const active = activeStep === index
          return (
            <Step key={step.label}>
              <StepLabel 
                StepIconComponent={MitumbaStepIcon}
                sx={{
                  '& .MuiStepLabel-label': {
                    mt: 1.5,
                  }
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography
                    sx={{
                      fontWeight: active ? 800 : 600,
                      fontFamily: tokens.typography.fontFamily,
                      color: active ? tokens.colors.textPrimary : tokens.colors.textSecondary,
                      fontSize: 12,
                    }}
                  >
                    {step.label}
                  </Typography>
                  {step.subtitle && (
                    <Typography variant="caption" sx={{ color: tokens.colors.textDisabled, mt: 0.2 }}>
                      {step.subtitle}
                    </Typography>
                  )}
                </Box>
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}

export default MitumbaStepper
