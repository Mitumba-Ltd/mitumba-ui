import type { Meta, StoryObj } from '@storybook/react';
import { DocumentSheet } from './DocumentSheet';

// A tiny one-page PDF, so the story shows a real document without a network request.
const SAMPLE_PDF =
  'data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA1OTUgODQyXT4+CmVuZG9iagp0cmFpbGVyCjw8L1Jvb3QgMSAwIFI+PgolJUVPRgo=';

const meta: Meta<typeof DocumentSheet> = {
  title: 'Feedback/DocumentSheet',
  component: DocumentSheet,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  args: {
    open: true,
    onClose: () => {},
    title: 'Receipt',
    subtitle: 'RCT-20261110-C0FFEE00',
    titleLevel: 2,
  },
};

export default meta;
type Story = StoryObj<typeof DocumentSheet>;

export const Loaded: Story = {
  args: { src: SAMPLE_PDF, filename: 'Mitumba-Receipt-RCT-20261110-C0FFEE00.pdf' },
};

export const Invoice: Story = {
  args: { title: 'Invoice', subtitle: 'INV-20261110-C0FFEE00', src: SAMPLE_PDF, filename: 'Mitumba-Invoice-INV-20261110-C0FFEE00.pdf' },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Failed: Story = {
  args: { error: 'Check your connection and try again.', onRetry: () => {} },
};
