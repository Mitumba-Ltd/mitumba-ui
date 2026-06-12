import type { ReactNode } from 'react';

export interface InboxLayoutProps {
  conversationList: ReactNode;
  chatThread: ReactNode;
  title?: string;
  showMobileBack?: boolean;
  onMobileBack?: () => void;
}
