import type { TwoFactorMethodType } from '../TwoFactorMethodList/TwoFactorMethodList.types'

export interface AddTwoFactorMethodModalProps {
  /** Whether the modal is open */
  open: boolean
  /** Close handler */
  onClose: () => void
  /** Which method types are available to add */
  availableTypes: TwoFactorMethodType[]
  /** Called when user picks a type — app runs type-specific flow */
  onSelectType: (type: TwoFactorMethodType) => void
}
