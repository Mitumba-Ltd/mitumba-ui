import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Stack from '@mui/material/Stack'
import { MitumbaStepper } from './MitumbaStepper'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton/MitumbaPrimaryButton'

const meta: Meta<typeof MitumbaStepper> = {
  title: 'Navigation/MitumbaStepper',
  component: MitumbaStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MitumbaStepper>

const checkoutSteps = [
  { label: 'Address', subtitle: 'Delivery info' },
  { label: 'Payment', subtitle: 'Method & billing' },
  { label: 'Review', subtitle: 'Summary' },
  { label: 'Success', subtitle: 'Done!' },
]

function InteractiveStepper() {
  const [activeStep, setActiveStep] = useState(1)

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, checkoutSteps.length - 1))
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0))

  return (
    <Stack spacing={8} sx={{ width: 800 }}>
      <MitumbaStepper steps={checkoutSteps} activeStep={activeStep} />
      
      <Stack direction="row" spacing={2} justifyContent="center">
        <MitumbaPrimaryButton 
          label="Back" 
          variant="outline" 
          onClick={handleBack} 
          disabled={activeStep === 0} 
        />
        <MitumbaPrimaryButton 
          label={activeStep === checkoutSteps.length - 1 ? 'Finish' : 'Next Step'} 
          onClick={handleNext} 
        />
      </Stack>
    </Stack>
  )
}

export const Standard: Story = {
  render: () => <InteractiveStepper />,
}
