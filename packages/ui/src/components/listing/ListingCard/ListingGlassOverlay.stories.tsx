import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ListingCard } from './ListingCard'
import { MitumbaGlass } from '../../foundation/MitumbaGlass'
import { MitumbaPrimaryButton } from '../../foundation/MitumbaPrimaryButton'

const meta: Meta<typeof ListingCard> = {
  title: 'Listing/GlassOverlay',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const sampleImages = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
]

function GlassOverlayComponent() {
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f0f0' }}>
      <Box sx={{ width: 400 }}>
        <ListingCard 
          images={sampleImages} 
          title="Nike Airforce1 Premium" 
          price={11500} 
          onClick={() => setShowOverlay(true)}
        />
      </Box>

      {showOverlay && (
        <Box 
          sx={{ 
            position: 'absolute', 
            inset: 0, 
            zIndex: 100, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}
        >
          <MitumbaGlass 
            rounding="large" 
            sx={{ 
              width: '90%', 
              height: '90%', 
              maxWidth: 1000, 
              display: 'flex', 
              flexDirection: 'column',
              p: 4
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
              <MitumbaPrimaryButton 
                label="Back to List" 
                variant="ghost" 
                icon={<ArrowBackIcon />} 
                onClick={() => setShowOverlay(false)} 
              />
              <Stack direction="row" spacing={2}>
                <MitumbaPrimaryButton label="Add to Cart" variant="earth" />
                <MitumbaPrimaryButton label="Buy Now" />
              </Stack>
            </Stack>

            <Box sx={{ flexGrow: 1, display: 'flex', gap: 4 }}>
               <Box sx={{ width: '60%', borderRadius: 4, overflow: 'hidden' }}>
                  <img src={sampleImages[0]} alt="detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </Box>
               <Box sx={{ width: '40%', py: 4 }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>Nike Airforce1 Premium</Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                    Step back into classic hoops style with a durable leather upper and premium cushioning. 
                    This extraordinary listing brings a touch of Pinterest luxury to your feet.
                  </Typography>
                  
                  <Box sx={{ p: 3, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>KES 11,500</Typography>
                    <Typography variant="caption">Free Delivery in Nairobi</Typography>
                  </Box>
               </Box>
            </Box>
          </MitumbaGlass>
        </Box>
      )}
    </Box>
  )
}

export const InteractiveOverlay: StoryObj = {
  render: () => <GlassOverlayComponent />,
}
