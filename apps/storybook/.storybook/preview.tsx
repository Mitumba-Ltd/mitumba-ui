import type { Preview } from '@storybook/react'
import { tokens } from '@mitumba/tokens'
import { MitumbaThemeProvider } from '@mitumba/ui'

const preview: Preview = {
  decorators: [
    (Story) => (
      <MitumbaThemeProvider>
        <Story />
      </MitumbaThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    viewport: {
      viewports: {
        mobile: { name: 'Mobile (375px)', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet (768px)', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop (1280px)', styles: { width: '1280px', height: '800px' } },
      },
      defaultViewport: 'desktop',
    },
    backgrounds: {
      default: 'Mitumba background',
      values: [
        { name: 'Mitumba background', value: tokens.colors.background },
        { name: 'Surface', value: tokens.colors.surface },
      ],
    },
  },
}

export default preview
