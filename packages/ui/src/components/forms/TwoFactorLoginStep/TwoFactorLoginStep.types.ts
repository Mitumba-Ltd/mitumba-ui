import type { TwoFactorMethodType } from '../TwoFactorMethodList/TwoFactorMethodList.types'

export interface TwoFactorLoginMethod {
  /** Method ID */
  id: string
  /** Method type */
  type: TwoFactorMethodType
  /** Display label (e.g. "Authenticator", "SMS ••••90") */
  label?: string
}

export interface TwoFactorLoginStepProps {
  /** Called with the entered code */
  onSubmit: (code: string) => void
  /** Whether verification is in progress */
  loading?: boolean
  /** Error message */
  error?: string
  /** Called when user chooses backup code flow */
  onUseBackupCode?: () => void
  /** Available methods (shows method chooser when >1) */
  methods?: TwoFactorLoginMethod[]
  /** Currently active method ID */
  activeMethodId?: string
  /** Called when user switches method */
  onMethodChange?: (methodId: string) => void
  /** Called to trigger sending a code for SMS/email methods */
  onSendCode?: (methodId: string) => void
}
