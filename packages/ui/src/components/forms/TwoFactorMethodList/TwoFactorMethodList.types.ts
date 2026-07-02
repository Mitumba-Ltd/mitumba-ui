export type TwoFactorMethodType = 'totp' | 'sms' | 'email'

export interface TwoFactorMethodView {
  /** Method ID */
  id: string
  /** Method type */
  type: TwoFactorMethodType
  /** Custom label (falls back to type name if null) */
  label: string | null
  /** Whether this method is enabled */
  enabled: boolean
  /** Whether this is the primary method */
  isPrimary: boolean
  /** Whether verification is still pending (verified_at == null) */
  pending: boolean
  /** Last used timestamp */
  lastUsedAt?: string | null
}

export interface TwoFactorMethodListProps {
  /** List of 2FA methods */
  methods: TwoFactorMethodView[]
  /** Loading state */
  loading?: boolean
  /** Called to add a new method */
  onAdd: () => void
  /** Called to enable a method */
  onEnable: (id: string) => void
  /** Called to disable a method */
  onDisable: (id: string) => void
  /** Called to delete a method */
  onDelete: (id: string) => void
  /** Called to set a method as primary */
  onSetPrimary: (id: string) => void
  /** Called to resume verifying a pending method */
  onVerifyPending?: (id: string) => void
}
