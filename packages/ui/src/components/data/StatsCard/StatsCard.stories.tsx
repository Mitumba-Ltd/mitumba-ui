import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import PaymentsIcon from '@mui/icons-material/Payments'
import InsightsIcon from '@mui/icons-material/Insights'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { StatsCard } from './StatsCard'
import { MitumbaGrid } from '../../layout/MitumbaGrid'

const meta: Meta<typeof StatsCard> = {
  title: 'Data/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof StatsCard>

export const BenchmarkShowcase: Story = {
  render: () => (
    <Box sx={{ width: 1000, p: 4, bgcolor: '#f8faff' }}>
      <Typography variant="h6" sx={{ mb: 4, fontWeight: 800 }}>Premium Stats System</Typography>
      <MitumbaGrid columns={{ xs: 1, sm: 2, md: 4, lg: 4 }}>
        <StatsCard 
          label="Total Sales" 
          value="142,500" 
          unit="KES" 
          unitPosition="prefix"
          icon={<PaymentsIcon />}
          trend={{ direction: 'up', percent: 12.5 }}
        />
        <StatsCard 
          label="Orders" 
          value="42" 
          unit="Active" 
          color="info"
          icon={<ShoppingBagIcon />}
          trend={{ direction: 'up', percent: 8.2 }}
        />
        <StatsCard 
          variant="elevated"
          label="Store Views" 
          value="1,204" 
          color="earth"
          icon={<StorefrontIcon />}
          trend={{ direction: 'down', percent: 4.1, label: 'vs last week' }}
        />
        <StatsCard 
          variant="glass"
          label="Trust Index" 
          value="98" 
          unit="Score"
          color="success"
          icon={<InsightsIcon />}
          trend={{ direction: 'neutral', percent: 0 }}
        />
      </MitumbaGrid>
    </Box>
  ),
}

export const GlassVariant: Story = {
  render: () => (
    <Box 
      sx={{ 
        width: 600, 
        height: 300, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #3D9A52 30%, #A06235 90%)',
        borderRadius: 4,
        p: 4
      }}
    >
      <Box sx={{ width: 300 }}>
        <StatsCard 
          variant="glass"
          label="Glass Analytics" 
          value="85.4" 
          unit="%" 
          color="success"
          icon={<InsightsIcon />}
          trend={{ direction: 'up', percent: 2.1 }}
        />
      </Box>
    </Box>
  ),
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    label: 'Revenue Overview',
    value: '840,000',
    unit: 'KES',
    unitPosition: 'prefix',
    icon: <PaymentsIcon />,
    trend: { direction: 'up', percent: 24.8 },
  },
}
