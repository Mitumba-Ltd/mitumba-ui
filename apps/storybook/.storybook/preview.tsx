import type { Preview } from '@storybook/react'
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
    viewport: {
      viewports: {
        mobile: { name: 'Mobile (375px)', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet (768px)', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop (1280px)', styles: { width: '1280px', height: '800px' } },
      },
      defaultViewport: 'mobile',
    },
  },
}

export default preview
