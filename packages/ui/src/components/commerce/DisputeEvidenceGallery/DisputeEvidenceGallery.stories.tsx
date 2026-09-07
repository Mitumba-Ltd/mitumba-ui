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
  { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/300x300?text=Damaged+Item', created_at: '2026-06-20T10:30:00Z' },
  { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/300x300?text=Close+Up', created_at: '2026-06-20T10:31:00Z' },
  { uploader_role: 'buyer', type: 'text', content: 'The item arrived with visible tears on the left sleeve and missing buttons.', created_at: '2026-06-20T10:32:00Z' },
  { uploader_role: 'seller', type: 'image', content: 'https://placehold.co/300x300?text=Before+Shipping', created_at: '2026-06-18T15:15:00Z' },
  { uploader_role: 'seller', type: 'text', content: 'Item was in perfect condition when shipped. Please see packaging photos.', created_at: '2026-06-18T15:16:00Z' },
  { uploader_role: 'admin', type: 'file', content: 'https://cdn.example.com/dispute-2451-report.pdf', created_at: '2026-06-22T11:00:00Z', fileName: 'resolution-report.pdf' },
];

export const Default: Story = {
  args: { evidence: MIXED_EVIDENCE },
};

export const ImagesOnly: Story = {
  args: {
    evidence: [
      { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/300x300?text=Photo+1', created_at: '2026-06-20T09:00:00Z' },
      { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/300x300?text=Photo+2', created_at: '2026-06-20T09:01:00Z' },
      { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/300x300?text=Photo+3', created_at: '2026-06-20T09:02:00Z' },
      { uploader_role: 'buyer', type: 'image', content: 'https://placehold.co/300x300?text=Photo+4', created_at: '2026-06-20T09:03:00Z' },
      { uploader_role: 'seller', type: 'image', content: 'https://placehold.co/300x300?text=Proof', created_at: '2026-06-19T14:00:00Z' },
    ],
  },
};

export const TextOnly: Story = {
  args: {
    evidence: [
      { uploader_role: 'buyer', type: 'text', content: 'Never received the package despite tracking showing delivered.', created_at: '2026-06-21T08:00:00Z' },
      { uploader_role: 'admin', type: 'text', content: 'Courier confirms delivery to mailbox. Awaiting buyer response.', created_at: '2026-06-22T11:00:00Z' },
    ],
  },
};

export const FileAndVideo: Story = {
  args: {
    evidence: [
      { uploader_role: 'buyer', type: 'video', content: 'https://cdn.example.com/unboxing.mp4', created_at: '2026-06-20T10:00:00Z', fileName: 'unboxing clip' },
      { uploader_role: 'buyer', type: 'file', content: 'https://cdn.example.com/receipt.pdf', created_at: '2026-06-20T10:05:00Z', fileName: 'receipt.pdf' },
      { uploader_role: 'seller', type: 'file', content: 'https://cdn.example.com/shipping-label.pdf', created_at: '2026-06-18T15:20:00Z', fileName: 'shipping-label.pdf' },
      { uploader_role: 'admin', type: 'video', content: 'https://cdn.example.com/cctv-doorstep.mp4', created_at: '2026-06-22T11:30:00Z', fileName: 'doorstep footage' },
    ],
  },
};

export const Empty: Story = {
  args: { evidence: [] },
};

export const EmptyCustomText: Story = {
  args: { evidence: [], emptyText: 'This dispute is still awaiting evidence from both parties.' },
};

export const DefaultMobile: Story = {
  args: { evidence: MIXED_EVIDENCE },
  parameters: { viewport: { defaultViewport: 'mobile1', defaultOrientation: 'portrait' } },
};

export const DefaultDesktop: Story = {
  args: { evidence: MIXED_EVIDENCE },
  parameters: { viewport: { defaultViewport: 'responsive' } },
};

export const WithHeadingDesktop: Story = {
  args: { evidence: MIXED_EVIDENCE, titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'responsive' } },
};

export const WithHeadingMobile: Story = {
  args: { evidence: MIXED_EVIDENCE, titleLevel: 2 },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
