import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MobileBottomNav } from './MobileBottomNav';

const meta: Meta<typeof MobileBottomNav> = {
  title: 'Navigation/MobileBottomNav',
  component: MobileBottomNav,
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'mobile' } },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MobileBottomNav>;

function Interactive({ variant }: { variant: string }) {
  const [active, setActive] = useState('home');
  return (
    <Box sx={{ height: '100vh', bgcolor: '#f8f8f8', pt: 4, px: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Variant: {variant}</Typography>
      <Typography variant="body2" color="text.secondary">Tap the nav items below</Typography>
      <MobileBottomNav activeTab={active} onTabChange={setActive} variant={variant as never} />
    </Box>
  );
}

export const Indicator: Story = { render: () => <Interactive variant="indicator" /> };
export const M3: Story = { render: () => <Interactive variant="m3" /> };
export const Expansive: Story = { render: () => <Interactive variant="expansive" /> };
export const Bubble: Story = { render: () => <Interactive variant="bubble" /> };
export const Pill: Story = { render: () => <Interactive variant="pill" /> };
export const PillHorizontal: Story = { render: () => <Interactive variant="pill-horizontal" /> };

export const AllVariants: Story = {
  parameters: { viewport: { defaultViewport: 'responsive' } },
  render: () => {
    const variants = ['indicator', 'm3', 'expansive', 'bubble', 'pill', 'pill-horizontal'];
    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, p: 3, maxWidth: 800, mx: 'auto' }}>
        {variants.map((v) => (
          <Box key={v} sx={{ position: 'relative', height: 120, border: '1px solid #eee', borderRadius: 2, overflow: 'hidden' }}>
            <Typography sx={{ position: 'absolute', top: 8, left: 12, fontSize: 11, fontWeight: 700, color: '#888' }}>{v}</Typography>
            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <MobileBottomNav activeTab="home" onTabChange={() => {}} variant={v as never} sx={{ position: 'relative' }} />
            </Box>
          </Box>
        ))}
      </Box>
    );
  },
};
