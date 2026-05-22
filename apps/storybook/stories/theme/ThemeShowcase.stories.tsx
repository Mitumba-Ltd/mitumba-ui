import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { tokens } from '@mitumba/tokens'
import type { Meta, StoryObj } from '@storybook/react'

const colorGroups = [
  ['green', 'greenLight', 'greenDark'],
  ['earth', 'earthLight', 'earthDark'],
  ['background', 'surface', 'divider', 'border'],
  ['textPrimary', 'textSecondary', 'textDisabled'],
  ['success', 'error', 'warning', 'info'],
  ['stiTrusted', 'stiGood', 'stiAtRisk', 'stiFlagged', 'stiSuspended'],
] as const

const px = (value: number) => `${value}px`

function ThemeShowcase() {
  return (
    <Stack sx={{ gap: px(tokens.spacing.lg), maxWidth: tokens.breakpoints.lg }}>
      <Stack sx={{ gap: px(tokens.spacing.sm) }}>
        <Typography variant="overline" color="text.secondary">
          Mitumba design system
        </Typography>
        <Typography variant="h1">Theme showcase</Typography>
        <Typography variant="body1" color="text.secondary">
          Core brand colors, type scale, and MUI component defaults powered by @mitumba/tokens.
        </Typography>
      </Stack>

      <Paper sx={{ padding: px(tokens.spacing.lg) }}>
        <Stack sx={{ gap: px(tokens.spacing.base) }}>
          <Typography variant="h2">Colors</Typography>
          {colorGroups.map((group) => (
            <Box
              key={group.join('-')}
              sx={{
                display: 'grid',
                gap: px(tokens.spacing.sm),
                gridTemplateColumns: {
                  xs: 'repeat(2, minmax(0, 1fr))',
                  md: 'repeat(5, minmax(0, 1fr))',
                },
              }}
            >
              {group.map((colorName) => (
                <Box key={colorName} sx={{ minWidth: 0 }}>
                  <Box
                    sx={{
                      bgcolor: tokens.colors[colorName],
                      border: `${tokens.spacing.xs / tokens.spacing.xs}px solid ${tokens.colors.divider}`,
                      borderRadius: px(tokens.radius.md),
                      height: tokens.spacing.xxxl,
                      marginBottom: px(tokens.spacing.xs),
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {colorName}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Stack>
      </Paper>

      <Paper sx={{ padding: px(tokens.spacing.lg) }}>
        <Stack sx={{ gap: px(tokens.spacing.base) }}>
          <Typography variant="h2">Typography</Typography>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="body1">
            Body 1 supports dense marketplace surfaces while staying legible on small Android screens.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Body 2 is used for supporting metadata, seller context, and helper copy.
          </Typography>
        </Stack>
      </Paper>

      <Card>
        <CardContent>
          <Stack sx={{ gap: px(tokens.spacing.lg) }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: px(tokens.spacing.sm) }}>
              <Button>Primary action</Button>
              <Button color="earth">VAZI action</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </Stack>

            <Stack direction="row" useFlexGap flexWrap="wrap" sx={{ gap: px(tokens.spacing.sm) }}>
              <Chip label="Trusted seller" color="primary" />
              <Chip label="VAZI Featured" color="earth" />
              <Chip label="Neutral" />
              <Chip label="Outlined" variant="outlined" />
            </Stack>

            <Stack sx={{ gap: px(tokens.spacing.base) }}>
              <TextField label="Listing title" placeholder="Vintage denim jacket" />
              <TextField
                label="Price"
                value="KES 2,500"
                helperText="Prices are always shown in Kenyan Shillings."
              />
              <TextField label="Error state" value="" error helperText="Enter a valid listing title." />
            </Stack>

            <Divider />

            <Stack sx={{ gap: px(tokens.spacing.sm) }}>
              <Alert severity="success">Listing saved successfully.</Alert>
              <Alert severity="warning">Connection is slow. Uploads may take longer.</Alert>
              <Alert severity="error">Payment could not be verified.</Alert>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

const meta: Meta<typeof ThemeShowcase> = {
  title: 'Theme/ThemeShowcase',
  component: ThemeShowcase,
  parameters: {
    layout: 'padded',
  },
}

export default meta

type Story = StoryObj<typeof ThemeShowcase>

export const Default: Story = {}

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
}
