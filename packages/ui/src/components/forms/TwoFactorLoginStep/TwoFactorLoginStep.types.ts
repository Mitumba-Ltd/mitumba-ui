export interface TwoFactorLoginStepProps {
  onSubmit: (code: string) => void;
  loading?: boolean;
  error?: string;
  onUseBackupCode?: () => void;
}
