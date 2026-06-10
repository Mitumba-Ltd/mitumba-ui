import type { Meta, StoryObj } from '@storybook/react';
import { ListingCard } from './ListingCard';

const meta: Meta<typeof ListingCard> = {
  title: 'Listing/ListingCard',
  component: ListingCard,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'onClick' },
    onSaveToggle: { action: 'onSaveToggle' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 220 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ListingCard>;

export const Default: Story = {
  args: {
    id: 'abc123',
    title: 'Nike Air Force 1 Low White',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    storeName: 'NairobiKicks',
    condition: 'like_new',
  },
};

export const Saved: Story = {
  args: { ...Default.args, isSaved: true },
};

export const NoCondition: Story = {
  args: { ...Default.args, condition: undefined },
};

export const NoStore: Story = {
  args: { ...Default.args, storeName: undefined },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: "Vintage Levi's 501 Original Fit Stonewash Blue Denim Jeans W32 L30 Made in USA",
  },
};

export const ConditionNew: Story = { args: { ...Default.args, condition: 'new' } };
export const ConditionGood: Story = { args: { ...Default.args, condition: 'good' } };
export const ConditionFair: Story = { args: { ...Default.args, condition: 'fair' } };

export const HighPrice: Story = {
  args: { ...Default.args, price: 15000, title: 'Gucci Monogram Crossbody Bag' },
};

export const InGrid: Story = {
  decorators: [
    (Story) => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 720 }}>
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </div>
    ),
  ],
  args: Default.args,
};

export const Mobile: Story = {
  args: Default.args,
  parameters: { viewport: { defaultViewport: 'mobile' } },
  decorators: [(Story) => <div style={{ maxWidth: 170 }}><Story /></div>],
};
