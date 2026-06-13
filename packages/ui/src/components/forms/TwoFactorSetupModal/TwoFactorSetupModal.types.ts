export interface TwoFactorSetupModalProps {
  open: boolean;
  onClose: () => void;
  otpauthUri: string;
  secret: string;
  onVerify: (code: string) => Promise<void>;
  backupCodes?: string[];
  verifying?: boolean;
  error?: string;
}
