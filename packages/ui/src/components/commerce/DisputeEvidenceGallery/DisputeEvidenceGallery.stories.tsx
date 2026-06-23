import type { Meta, StoryObj } from '@storybook/react';
import { DisputeEvidenceGallery } from './DisputeEvidenceGallery';
import type { DisputeEvidenceItem } from './DisputeEvidenceGallery.types';

const meta: Meta<typeof DisputeEvidenceGallery> = {
  title: 'Commerce/DisputeEvidenceGallery',
  component: DisputeEvidenceGallery,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DisputeEvidenceGallery>;

const MIXED_EVIDENCE: DisputeEvidenceItem[] = [
  { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/200x200?text=Damaged+Item', created_at: '2026-06-20 10:30 AM' },
  { uploader_role: 'buyer', type: 'text', content: 'The item arrived with visible tears on the left sleeve and missing buttons.', created_at: '2026-06-20 10:32 AM' },
  { uploader_role: 'seller', type: 'image', content: 'https://placehold.co/200x200?text=Before+Shipping', created_at: '2026-06-18 03:15 PM' },
  { uploader_role: 'seller', type: 'text', content: 'Item was in perfect condition when shipped. Please see packaging photos.', created_at: '2026-06-18 03:16 PM' },
];

export const Default: Story = {
  args: { evidence: MIXED_EVIDENCE },
};

export const ImagesOnly: Story = {
  args: {
    evidence: [
      { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/200x200?text=Photo+1', created_at: '2026-06-20 09:00 AM' },
      { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/200x200?text=Photo+2', created_at: '2026-06-20 09:01 AM' },
      { uploader_role: 'seller', type: 'image', content: 'https://placehold.co/200x200?text=Proof', created_at: '2026-06-19 02:00 PM' },
    ],
  },
};

export const TextOnly: Story = {
  args: {
    evidence: [
      { uploader_role: 'buyer', type: 'text', content: 'Never received the package despite tracking showing delivered.', created_at: '2026-06-21 08:00 AM' },
      { uploader_role: 'admin', type: 'text', content: 'Courier confirms delivery to mailbox. Awaiting buyer response.', created_at: '2026-06-22 11:00 AM' },
    ],
  },
};

export const Mobile: Story = {
  args: { evidence: MIXED_EVIDENCE },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
