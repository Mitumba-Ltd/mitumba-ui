import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { tokens } from '@mitumba/tokens'

const meta: Meta = {
  title: 'Theme/ThemeShowcase',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* Colors */}
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>Brand Colors</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minwidth(120px))', gap: 2 }}>
          {Object.entries(tokens.colors).map(([name, value]) => (
            <Box key={name} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ width: '100%', height: 60, backgroundColor: value, borderRadius: 1, border: '1px solid #eee' }} />
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{name}</Typography>
              <Typography variant="caption" color="text.secondary">{value}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Typography */}
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>Typography</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h1">Heading 1 (Display)</Typography>
          <Typography variant="h2">Heading 2 (XXXL)</Typography>
          <Typography variant="h3">Heading 3 (XXL)</Typography>
          <Typography variant="h4">Heading 4 (XL)</Typography>
          <Typography variant="h5">Heading 5 (LG)</Typography>
          <Typography variant="h6">Heading 6 (MD)</Typography>
          <Typography variant="body1">Body 1 (MD) — The quick brown fox jumps over the lazy dog.</Typography>
          <Typography variant="body2">Body 2 (Base) — The quick brown fox jumps over the lazy dog.</Typography>
          <Typography variant="caption">Caption (SM)</Typography>
          <Typography variant="overline">Overline (XS)</Typography>
        </Box>
      </Box>

      {/* Buttons */}
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>Buttons</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary (Earth)</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="contained" color="success">Success</Button>
          <Button variant="contained" color="error">Error</Button>
          <Button variant="contained" disabled>Disabled</Button>
          <Button variant="contained" size="small">Small</Button>
          <Button variant="contained" size="large">Large</Button>
        </Box>
      </Box>

      {/* Inputs */}
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>Inputs</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
          <TextField label="Default" placeholder="Enter text..." />
          <TextField label="Focused" placeholder="Enter text..." autoFocus />
          <TextField label="Error" placeholder="Enter text..." error helperText="This field is required" />
          <TextField label="Disabled" placeholder="Enter text..." disabled />
        </Box>
      </Box>

      {/* Chips */}
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>Chips</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Chip label="Green Filled" color="primary" />
          <Chip label="Earth Filled" color="secondary" />
          <Chip label="Neutral Filled" />
          <Chip label="Green Outlined" variant="outlined" color="primary" />
          <Chip label="Small" size="small" color="primary" />
          <Chip label="Deletable" onDelete={() => {}} color="primary" />
        </Box>
      </Box>

      {/* Cards & Shadows */}
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>Cards & Shadows</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Standard Card</Typography>
              <Typography variant="body2" color="text.secondary">Using tokens.shadows.card</Typography>
            </CardContent>
          </Card>
          <Card sx={{ boxShadow: tokens.shadows.elevated }}>
            <CardContent>
              <Typography variant="h6">Elevated Card</Typography>
              <Typography variant="body2" color="text.secondary">Using tokens.shadows.elevated</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Spacing */}
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>Spacing Scale</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {Object.entries(tokens.spacing).map(([name, value]) => (
            <Box key={name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: value, height: 20, backgroundColor: tokens.colors.green, borderRadius: '2px' }} />
              <Typography variant="caption" sx={{ minWidth: 40 }}>{name}</Typography>
              <Typography variant="caption" color="text.secondary">{value}px</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  ),
}
