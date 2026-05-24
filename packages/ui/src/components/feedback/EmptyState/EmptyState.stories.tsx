import type { Meta, StoryObj } from '@storybook/react'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import { EmptyState } from './EmptyState'

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    icon: <SearchOffIcon />,
    title: 'No results found',
    subtitle: 'Try adjusting your search or filters to find what you are looking for.',
  },
}

export const WithAction: Story = {
  args: {
    icon: <SearchOffIcon />,
    title: 'No results found',
    subtitle: 'Try adjusting your search or filters to find what you are looking for.',
    action: {
      label: 'Clear filters',
      onClick: () => undefined,
    },
  },
}
