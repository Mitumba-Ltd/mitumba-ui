import type { Meta, StoryObj } from '@storybook/react'
import { CartItem } from './CartItem'

const meta: Meta<typeof CartItem> = {
  title: 'Commerce/CartItem',
  component: CartItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CartItem>

export const Default: Story = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6868f2f38e1e?w=200&h=200&fit=crop',
    title: 'Vintage Denim Jacket',
    priceKes: 1800,
    conditionGrade: 'A',
    sellerName: "Jane's Closet",
    onRemove: () => {},
  },
}

export const GoodCondition: Story = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6868f2f38e1e?w=200&h=200&fit=crop',
    title: 'Vintage Denim Jacket',
    priceKes: 1200,
    conditionGrade: 'B',
    sellerName: "Jane's Closet",
    onRemove: () => {},
  },
}

export const FairCondition: Story = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6868f2f38e1e?w=200&h=200&fit=crop',
    title: 'Vintage Denim Jacket',
    priceKes: 800,
    conditionGrade: 'C',
    sellerName: "Jane's Closet",
    onRemove: () => {},
  },
}

export const NoRemove: Story = {
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6868f2f38e1e?w=200&h=200&fit=crop',
    title: 'Vintage Denim Jacket',
    priceKes: 1800,
    conditionGrade: 'A',
    sellerName: "Jane's Closet",
    onRemove: undefined,
  },
}
